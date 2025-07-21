import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateSession } from './lib/auth'

// Paths that require authentication
const PROTECTED_PATHS = [
  '/account',
]

// Paths that should redirect to /account if already authenticated
const AUTH_PATHS = [
  '/login',
  '/login/verify',
]

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Check if the path requires authentication
  const isProtectedPath = PROTECTED_PATHS.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  )
  
  // Check if the path should redirect when authenticated
  const isAuthPath = AUTH_PATHS.some(authPath => 
    path === authPath || path.startsWith(`${authPath}/`)
  )
  
  // Validate the session
  const session = await validateSession(request)
  
  // Handle protected paths
  if (isProtectedPath && !session.isAuthenticated) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', encodeURIComponent(request.nextUrl.pathname))
    return NextResponse.redirect(url)
  }
  
  // Handle auth paths (redirect to account if already logged in)
  if (isAuthPath && session.isAuthenticated) {
    return NextResponse.redirect(new URL('/account', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (/api/*)
     * - Static files (/_next/*)
     * - Public files (/public/*)
     * - Favicon (favicon.ico)
     */
    '/((?!api|_next/static|_next/image|public|favicon.ico).*)',
  ],
}