import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { sendPurchaseConfirmationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  try {
    const productId = session.metadata?.productId
    
    if (!productId) {
      console.error('No product ID in session metadata')
      return
    }

    // Get product details
    const { data: product, error: productError } = await supabaseAdmin
      .from('digital_products')
      .select('*')
      .eq('id', productId)
      .single()

    if (productError || !product) {
      console.error('Product not found:', productError)
      return
    }

    // Create purchase record
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30) // 30 days expiration

    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .insert({
        email: session.customer_details?.email || session.customer_email,
        stripe_payment_id: session.payment_intent as string,
        stripe_session_id: session.id,
        product_id: productId,
        amount: session.amount_total || 0,
        currency: session.currency || 'usd',
        status: 'completed',
        first_name: session.customer_details?.name?.split(' ')[0],
        last_name: session.customer_details?.name?.split(' ').slice(1).join(' '),
        country: session.customer_details?.address?.country,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single()

    if (purchaseError) {
      console.error('Failed to create purchase record:', purchaseError)
      return
    }

    // Send confirmation email
    if (purchase && session.customer_details?.email) {
      try {
        await sendPurchaseConfirmationEmail({
          email: session.customer_details.email,
          customerName: session.customer_details.name || 'Customer',
          downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/download/${purchase.download_token}`,
          purchaseId: purchase.id,
          expiresAt: expiresAt.toISOString()
        })
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
      }
    }

    console.log('Purchase created successfully:', purchase.id)
  } catch (error) {
    console.error('Error handling checkout completion:', error)
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    // Update purchase status if needed
    const { error } = await supabaseAdmin
      .from('purchases')
      .update({ status: 'completed' })
      .eq('stripe_payment_id', paymentIntent.id)

    if (error) {
      console.error('Failed to update purchase status:', error)
    }
  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}