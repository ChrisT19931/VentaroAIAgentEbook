import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from './supabase'

export interface UserSession {
  email: string
  isAuthenticated: boolean
}

export async function validateSession(request: NextRequest): Promise<UserSession> {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value

    if (!sessionToken) {
      return { email: '', isAuthenticated: false }
    }

    // Verify session token
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('user_sessions')
      .select('*')
      .eq('session_token', sessionToken)
      .single()

    if (sessionError || !session) {
      return { email: '', isAuthenticated: false }
    }

    // Check if session is expired
    if (new Date(session.expires_at) < new Date()) {
      return { email: '', isAuthenticated: false }
    }

    return {
      email: session.email,
      isAuthenticated: true
    }
  } catch (error) {
    console.error('Session validation error:', error)
    return { email: '', isAuthenticated: false }
  }
}

export async function getUserPurchases(email: string) {
  try {
    const { data: purchases, error } = await supabaseAdmin
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
        digital_products (id, name, description, file_name, file_size)
      `)
      .eq('email', email)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user purchases:', error)
      return { purchases: null, error: error.message }
    }

    return { 
      purchases: purchases.map(purchase => ({
        id: purchase.id,
        downloadToken: purchase.download_token,
        downloadCount: purchase.download_count,
        maxDownloads: purchase.max_downloads,
        expiresAt: purchase.expires_at,
        createdAt: purchase.created_at,
        product: purchase.digital_products,
        canDownload: (
          !purchase.expires_at || new Date(purchase.expires_at) > new Date()
        ) && purchase.download_count < purchase.max_downloads
      })), 
      error: null 
    }
  } catch (error) {
    console.error('Error in getUserPurchases:', error)
    return { 
      purchases: null, 
      error: error instanceof Error ? error.message : 'Failed to get purchases' 
    }
  }
}

export async function logoutUser(sessionToken: string) {
  try {
    const { error } = await supabaseAdmin
      .from('user_sessions')
      .update({ is_active: false })
      .eq('session_token', sessionToken)

    return { success: !error, error: error?.message }
  } catch (error) {
    console.error('Logout error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to logout' 
    }
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const session = await validateSession(request)
    
    if (!session.isAuthenticated) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }
    
    return handler(request, session)
  }
}