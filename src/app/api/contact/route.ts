import { NextRequest, NextResponse } from 'next/server'
import { createContactMessage } from '@/lib/prisma'
import { isValidEmail, trackEvent, rateLimiter } from '@/lib/utils'
import { sendContactNotification } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.ip || 'unknown'
    const rateLimitResult = await rateLimiter.checkLimit(`contact:${clientIp}`, 3, 300) // 3 requests per 5 minutes
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Too many contact attempts. Please try again later.',
          retryAfter: rateLimitResult.retryAfter
        },
        { status: 429 }
      )
    }

    const { name, email, subject, message, type = 'general' } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      )
    }

    // Validate name length
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      )
    }

    // Validate subject length
    if (subject.length < 5 || subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be between 5 and 200 characters' },
        { status: 400 }
      )
    }

    // Basic spam detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations', 'click here', 'free money']
    const messageText = `${subject} ${message}`.toLowerCase()
    const hasSpam = spamKeywords.some(keyword => messageText.includes(keyword))
    
    if (hasSpam) {
      await trackEvent('contact_spam_detected', {
        email: email.toLowerCase().trim(),
        ip_address: clientIp,
        subject,
        message_preview: message.substring(0, 100)
      })
      
      return NextResponse.json(
        { error: 'Message appears to be spam. Please contact us directly.' },
        { status: 400 }
      )
    }

    // Create contact message
    const contactMessage = await createContactMessage({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      type,
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent') || 'unknown',
      referrer: request.headers.get('referer') || null
    })

    // Send notification email to admin
    try {
      await sendContactNotification({
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        message: contactMessage.message,
        type: contactMessage.type,
        submittedAt: contactMessage.createdAt
      })
    } catch (emailError) {
      console.error('Contact notification email failed:', emailError)
      // Don't fail the contact form if email fails
    }

    // Track contact event
    await trackEvent('contact_form_submitted', {
      email: contactMessage.email,
      type: contactMessage.type,
      subject: contactMessage.subject,
      ip_address: clientIp,
      user_agent: request.headers.get('user-agent'),
      referrer: request.headers.get('referer')
    })

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We\'ll get back to you within 24 hours.',
      contactMessage: {
        id: contactMessage.id,
        submittedAt: contactMessage.createdAt
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    
    await trackEvent('contact_form_error', {
      error: error instanceof Error ? error.message : 'Unknown contact form error',
      ip_address: request.ip
    })

    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}

// Get contact messages (admin only)
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you'd verify admin authentication here
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status') || 'all'
    
    // This would fetch contact messages from the database
    // const messages = await getContactMessages({ page, limit, status })
    
    return NextResponse.json({
      success: true,
      message: 'Admin endpoint - authentication required in production',
      pagination: {
        page,
        limit,
        total: 0
      },
      messages: []
    })

  } catch (error) {
    console.error('Get contact messages error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}