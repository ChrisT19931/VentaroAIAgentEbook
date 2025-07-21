import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { generateSecureToken } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, email } = body

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Token and email are required' },
        { status: 400 }
      )
    }

    // Verify the token
    const { data: tokenData, error: tokenError } = await supabaseAdmin
      .from('login_tokens')
      .select('*')
      .eq('token', token)
      .eq('email', email)
      .eq('is_used', false)
      .single()

    if (tokenError || !tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired login token' },
        { status: 401 }
      )
    }

    // Check if token is expired
    if (new Date(tokenData.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Login token has expired' },
        { status: 401 }
      )
    }

    // Mark token as used
    await supabaseAdmin
      .from('login_tokens')
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq('id', tokenData.id)

    // Get user's purchases
    const { data: purchases, error: purchasesError } = await supabaseAdmin
      .from('purchases')
      .select(`
        id,
        email,
        download_token,
        download_count,
        max_downloads,
        expires_at,
        status,
        created_at,
        digital_products (id, name, description, file_name)
      `)
      .eq('email', email)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError)
      return NextResponse.json(
        { error: 'Failed to retrieve purchase history' },
        { status: 500 }
      )
    }

    // Create a session token
    const sessionToken = generateSecureToken(64)
    const sessionExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    // Store session in database
    const { error: sessionError } = await supabaseAdmin
      .from('user_sessions')
      .insert({
        email,
        session_token: sessionToken,
        expires_at: sessionExpiry.toISOString(),
        ip_address: request.ip || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown'
      })

    if (sessionError) {
      console.error('Error creating session:', sessionError)
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    // Set session cookie
    const cookieStore = cookies()
    cookieStore.set({
      name: 'session_token',
      value: sessionToken,
      expires: sessionExpiry,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })

    return NextResponse.json({
      success: true,
      purchases: purchases.map(purchase => ({
        id: purchase.id,
        downloadToken: purchase.download_token,
        downloadCount: purchase.download_count,
        maxDownloads: purchase.max_downloads,
        expiresAt: purchase.expires_at,
        createdAt: purchase.created_at,
        product: purchase.digital_products
      })),
      redirectUrl: '/account'
    })

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}