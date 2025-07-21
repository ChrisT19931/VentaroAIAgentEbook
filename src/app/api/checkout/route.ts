import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer']
    })

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { success: false, error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Find the purchase in our database
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select(`
        *,
        product:digital_products(*)
      `)
      .eq('stripe_session_id', sessionId)
      .single()

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { success: false, error: 'Purchase not found' },
        { status: 404 }
      )
    }

    // Generate download URL
    const downloadUrl = `/api/download/${purchase.download_token}`
    
    // Calculate downloads remaining
    const downloadsRemaining = Math.max(0, purchase.max_downloads - purchase.download_count)
    
    // Check if download link has expired
    const isExpired = purchase.expires_at && new Date(purchase.expires_at) < new Date()
    
    return NextResponse.json({
      success: true,
      purchase: {
        id: purchase.id,
        customerEmail: purchase.email,
        downloadUrl,
        downloadToken: purchase.download_token,
        expiresAt: purchase.expires_at,
        downloadsRemaining,
        isExpired,
        product: {
          name: purchase.product.name,
          description: purchase.product.description
        }
      }
    })
  } catch (error) {
    console.error('Checkout API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, successUrl, cancelUrl } = body

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Get product details from Supabase
    const { data: product, error: productError } = await supabaseAdmin
      .from('digital_products')
      .select('*')
      .eq('id', productId)
      .eq('is_active', true)
      .single()

    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: product.currency,
            product_data: {
              name: product.name,
              description: product.description || undefined,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}`,
      customer_email: body.customerEmail,
      metadata: {
        productId: product.id,
      },
    })

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url
    })
  } catch (error) {
    console.error('Checkout creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}