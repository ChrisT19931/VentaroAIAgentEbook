import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { logoutUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get('session_token')?.value
    
    if (sessionToken) {
      // Invalidate the session in the database
      await logoutUser(sessionToken)
      
      // Clear the session cookie
      cookieStore.delete('session_token')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Failed to log out' },
      { status: 500 }
    )
  }
}