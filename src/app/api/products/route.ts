import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { headers } from 'next/headers'

// Get all active digital products
export async function GET() {
  try {
    const { data: products, error } = await supabaseAdmin
      .from('digital_products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error in products API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create a new digital product (admin only)
export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const authorization = headersList.get('authorization')
    
    // Simple admin check - in production, use proper authentication
    if (authorization !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, currency, file_url, file_name, file_size } = body

    if (!name || !price || !file_url || !file_name) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, file_url, file_name' },
        { status: 400 }
      )
    }

    const { data: product, error } = await supabaseAdmin
      .from('digital_products')
      .insert({
        name,
        description,
        price,
        currency: currency || 'usd',
        file_url,
        file_name,
        file_size,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating product:', error)
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      )
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error in products POST API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}