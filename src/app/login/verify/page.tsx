'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function VerifyLoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const token = searchParams?.get('token')
  const email = searchParams?.get('email')

  useEffect(() => {
    if (!token || !email) {
      setError('Invalid login link. Missing token or email.')
      setIsLoading(false)
      return
    }

    const verifyToken = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token, email }),
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Failed to verify login')
        } else {
          setSuccess(true)
          // Redirect to account page after successful login
          setTimeout(() => {
            router.push(data.redirectUrl || '/account')
          }, 2000)
        }
      } catch (err) {
        setError('An unexpected error occurred')
        console.error('Verification error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token, email, router])

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-8 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Verifying Login</h1>
          <p className="text-slate-300">Please wait while we verify your login</p>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4"></div>
              <p className="text-gray-600">Verifying your login...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
              <div className="mt-4">
                <Link 
                  href="/login" 
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Return to login
                </Link>
              </div>
            </div>
          ) : success ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-green-700">Login successful!</p>
              <p className="text-sm text-green-600 mt-2">
                Redirecting you to your account...
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}