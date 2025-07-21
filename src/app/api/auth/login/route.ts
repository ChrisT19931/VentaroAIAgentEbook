import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isValidEmail, generateSecureToken, rateLimiter } from '@/lib/utils'
import { sendLoginLink } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.ip || 'unknown'
    const rateLimitResult = await rateLimiter.checkLimit(`login:${clientIp}`, 5, 300) // 5 requests per 5 minutes
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email } = body

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Check if the email exists in purchases
    const { data: purchases, error: purchasesError } = await supabaseAdmin
      .from('purchases')
      .select('id, email, status')
      .eq('email', email)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)

    if (purchasesError) {
      console.error('Error checking purchases:', purchasesError)
      return NextResponse.json(
        { error: 'Failed to verify purchase history' },
        { status: 500 }
      )
    }

    // If no purchases found, return a generic message for security
    if (!purchases || purchases.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'If your email is associated with a purchase, you will receive a login link shortly.'
      })
    }

    // Generate a secure login token
    const loginToken = generateSecureToken(32)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes

    // Store the login token in the database
    const { error: tokenError } = await supabaseAdmin
      .from('login_tokens')
      .insert({
        email,
        token: loginToken,
        expires_at: expiresAt.toISOString(),
        ip_address: clientIp,
        user_agent: request.headers.get('user-agent') || 'unknown'
      })

    if (tokenError) {
      console.error('Error storing login token:', tokenError)
      return NextResponse.json(
        { error: 'Failed to generate login link' },
        { status: 500 }
      )
    }

    // Send login link email
    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login/verify?token=${loginToken}&email=${encodeURIComponent(email)}`
    await sendLoginLink({
      email,
      loginUrl,
      expiresAt: expiresAt.toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Login link has been sent to your email address.'
    })

  } catch (error) {
    console.error('Login request error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}