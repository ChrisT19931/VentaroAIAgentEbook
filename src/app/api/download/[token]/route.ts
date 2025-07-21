import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { headers } from 'next/headers'

interface RouteParams {
  params: {
    token: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { token } = params
    const headersList = headers()
    const userAgent = headersList.get('user-agent') || 'Unknown'
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'Unknown'

    if (!token) {
      return NextResponse.json(
        { error: 'Download token is required' },
        { status: 400 }
      )
    }

    // Find the purchase by download token
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select(`
        *,
        digital_products (
          file_url,
          file_name,
          file_size
        )
      `)
      .eq('download_token', token)
      .eq('status', 'completed')
      .single()

    if (purchaseError || !purchase) {
      console.error('Purchase not found:', purchaseError)
      return NextResponse.json(
        { error: 'Invalid or expired download link' },
        { status: 404 }
      )
    }

    // Check if download link has expired
    if (purchase.expires_at && new Date(purchase.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Download link has expired' },
        { status: 410 }
      )
    }

    // Check download count limit
    if (purchase.download_count >= purchase.max_downloads) {
      return NextResponse.json(
        { error: 'Download limit exceeded' },
        { status: 429 }
      )
    }

    // Get the product file URL from Supabase Storage
    const product = purchase.digital_products
    if (!product || !product.file_url) {
      return NextResponse.json(
        { error: 'Product file not found' },
        { status: 404 }
      )
    }

    // Create a signed URL for secure download (expires in 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin
      .storage
      .from('digital-products')
      .createSignedUrl(product.file_url, 3600) // 1 hour expiry

    if (signedUrlError || !signedUrlData) {
      console.error('Error creating signed URL:', signedUrlError)
      return NextResponse.json(
        { error: 'Failed to generate download link' },
        { status: 500 }
      )
    }

    // Record the download
    const { error: downloadError } = await supabaseAdmin
      .from('downloads')
      .insert({
        purchase_id: purchase.id,
        ip_address: ipAddress,
        user_agent: userAgent
      })

    if (downloadError) {
      console.error('Error recording download:', downloadError)
      // Don't fail the download, just log the error
    }

    // Update download count
    const { error: updateError } = await supabaseAdmin
      .from('purchases')
      .update({ 
        download_count: purchase.download_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', purchase.id)

    if (updateError) {
      console.error('Error updating download count:', updateError)
      // Don't fail the download, just log the error
    }

    // Redirect to the signed URL for download
    return NextResponse.redirect(signedUrlData.signedUrl)

  } catch (error) {
    console.error('Error in download API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get download info without triggering download
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { token } = params

    if (!token) {
      return NextResponse.json(
        { error: 'Download token is required' },
        { status: 400 }
      )
    }

    // Find the purchase by download token
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from('purchases')
      .select(`
        id,
        email,
        download_count,
        max_downloads,
        expires_at,
        status,
        created_at,
        digital_products (
          name,
          file_name,
          file_size
        )
      `)
      .eq('download_token', token)
      .single()

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { error: 'Invalid download token' },
        { status: 404 }
      )
    }

    const isExpired = purchase.expires_at && new Date(purchase.expires_at) < new Date()
    const isLimitExceeded = purchase.download_count >= purchase.max_downloads
    const isCompleted = purchase.status === 'completed'

    return NextResponse.json({
      purchase: {
        id: purchase.id,
        email: purchase.email,
        downloadCount: purchase.download_count,
        maxDownloads: purchase.max_downloads,
        expiresAt: purchase.expires_at,
        status: purchase.status,
        createdAt: purchase.created_at,
        product: purchase.digital_products
      },
      canDownload: isCompleted && !isExpired && !isLimitExceeded,
      isExpired,
      isLimitExceeded,
      isCompleted
    })

  } catch (error) {
    console.error('Error in download info API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}