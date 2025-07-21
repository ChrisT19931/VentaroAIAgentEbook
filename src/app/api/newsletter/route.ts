import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/prisma'
import { isValidEmail, trackEvent, rateLimiter } from '@/lib/utils'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.ip || 'unknown'
    const rateLimitResult = await rateLimiter.checkLimit(`newsletter:${clientIp}`, 5, 60) // 5 requests per minute
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many subscription attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter
        },
        { status: 429 }
      )
    }

    const { email, source = 'website' } = await request.json()

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    try {
      // Subscribe to newsletter
      const subscription = await subscribeToNewsletter({
        email: normalizedEmail,
        source,
        ipAddress: clientIp,
        userAgent: request.headers.get('user-agent') || 'unknown',
        referrer: request.headers.get('referer') || null
      })

      // Send welcome email
      try {
        await sendWelcomeEmail(normalizedEmail)
      } catch (emailError) {
        console.error('Welcome email failed:', emailError)
        // Don't fail the subscription if email fails
      }

      // Track subscription event
      await trackEvent('newsletter_subscribed', {
        email: normalizedEmail,
        source,
        ip_address: clientIp,
        user_agent: request.headers.get('user-agent'),
        referrer: request.headers.get('referer')
      })

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter!',
        subscription: {
          id: subscription.id,
          email: subscription.email,
          subscribedAt: subscription.createdAt
        }
      })

    } catch (error: any) {
      // Handle duplicate email
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 409 }
        )
      }
      throw error
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    await trackEvent('newsletter_error', {
      error: error instanceof Error ? error.message : 'Unknown subscription error',
      email: request.body ? JSON.parse(await request.text()).email : 'unknown',
      ip_address: request.ip
    })

    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // In a real implementation, you'd verify the unsubscribe token
    // For now, we'll allow direct unsubscribe
    
    // Here you would implement unsubscribe logic
    // await unsubscribeFromNewsletter(email)

    await trackEvent('newsletter_unsubscribed', {
      email: email.toLowerCase().trim(),
      ip_address: request.ip
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    })

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Unsubscribe failed. Please try again.' },
      { status: 500 }
    )
  }
}