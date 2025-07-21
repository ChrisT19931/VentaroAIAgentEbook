import { NextRequest, NextResponse } from 'next/server'
import { getPurchaseByToken, recordDownload } from '@/lib/prisma'
import { isDownloadTokenValid, isDownloadExpired, hasExceededDownloadLimit, trackEvent } from '@/lib/utils'
import { headers } from 'next/headers'
import path from 'path'
import fs from 'fs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const purchaseId = searchParams.get('purchase_id')

    if (!token || !purchaseId) {
      return NextResponse.json(
        { error: 'Download token and purchase ID are required' },
        { status: 400 }
      )
    }

    // Validate token format
    if (!isDownloadTokenValid(token)) {
      return NextResponse.json(
        { error: 'Invalid download token format' },
        { status: 400 }
      )
    }

    // Get purchase record
    const purchase = await getPurchaseByToken(token)
    if (!purchase || purchase.id !== purchaseId) {
      return NextResponse.json(
        { error: 'Invalid download link' },
        { status: 404 }
      )
    }

    // Check if purchase is completed
    if (purchase.status !== 'completed') {
      return NextResponse.json(
        { error: 'Purchase not completed' },
        { status: 403 }
      )
    }

    // Check if download has expired (7 days)
    if (isDownloadExpired(purchase.createdAt)) {
      return NextResponse.json(
        { error: 'Download link has expired. Please contact support.' },
        { status: 410 }
      )
    }

    // Check download limit (5 downloads per purchase)
    if (hasExceededDownloadLimit(purchase.downloadCount || 0)) {
      return NextResponse.json(
        { error: 'Download limit exceeded. Please contact support.' },
        { status: 429 }
      )
    }

    // Record download
    await recordDownload({
      purchaseId: purchase.id,
      ipAddress: request.ip || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    })

    // Track download event
    await trackEvent('ebook_downloaded', {
      purchase_id: purchase.id,
      customer_email: purchase.customerEmail,
      download_count: (purchase.downloadCount || 0) + 1,
      ip_address: request.ip
    })

    // In production, this would serve from a secure storage like AWS S3
    // For now, we'll return a download URL or serve the file directly
    const ebookPath = path.join(process.cwd(), 'public', 'downloads', 'ai-reality-check.pdf')
    
    // Check if file exists
    if (!fs.existsSync(ebookPath)) {
      // Return a placeholder response for development
      return NextResponse.json({
        message: 'Download successful',
        filename: 'AI-Reality-Check-eBook.pdf',
        downloadUrl: '/downloads/ai-reality-check.pdf',
        note: 'In production, this would be a secure download from cloud storage'
      })
    }

    // Read and serve the file
    const fileBuffer = fs.readFileSync(ebookPath)
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="AI-Reality-Check-eBook.pdf"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('Download error:', error)
    
    await trackEvent('download_error', {
      error: error instanceof Error ? error.message : 'Unknown download error',
      token: request.nextUrl.searchParams.get('token'),
      ip_address: request.ip
    })

    return NextResponse.json(
      { error: 'Download failed. Please try again or contact support.' },
      { status: 500 }
    )
  }
}

// Handle POST for download link generation (if needed)
export async function POST(request: NextRequest) {
  try {
    const { purchaseId, email } = await request.json()

    if (!purchaseId || !email) {
      return NextResponse.json(
        { error: 'Purchase ID and email are required' },
        { status: 400 }
      )
    }

    // Get purchase by ID and verify email
    const purchase = await getPurchaseByToken(purchaseId)
    if (!purchase || purchase.customerEmail !== email) {
      return NextResponse.json(
        { error: 'Purchase not found or email mismatch' },
        { status: 404 }
      )
    }

    // Generate new download URL
    const downloadUrl = `/api/download?token=${purchase.downloadToken}&purchase_id=${purchase.id}`
    
    return NextResponse.json({
      downloadUrl,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      downloadsRemaining: Math.max(0, 5 - (purchase.downloadCount || 0))
    })

  } catch (error) {
    console.error('Download link generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate download link' },
      { status: 500 }
    )
  }
}