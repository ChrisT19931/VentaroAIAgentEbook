import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getUserPurchases } from '@/lib/auth'

export const GET = requireAuth(async (request: NextRequest, session: { email: string, isAuthenticated: boolean }) => {
  try {
    const { purchases, error } = await getUserPurchases(session.email)
    
    if (error) {
      return NextResponse.json(
        { error },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ purchases })
  } catch (error) {
    console.error('Error fetching purchases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch purchases' },
      { status: 500 }
    )
  }
})