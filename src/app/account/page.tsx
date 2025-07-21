'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  file_name: string
}

interface Purchase {
  id: string
  downloadToken: string
  downloadCount: number
  maxDownloads: number
  expiresAt: string | null
  createdAt: string
  product: Product
  canDownload: boolean
}

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch('/api/auth/purchases')
        
        if (response.status === 401) {
          // Not authenticated
          router.push('/login')
          return
        }
        
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch purchases')
        }
        
        setPurchases(data.purchases || [])
        setIsAuthenticated(true)
      } catch (err) {
        console.error('Error fetching purchases:', err)
        setError('Failed to load your purchases. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPurchases()
  }, [router])
  
  const handleDownload = async (downloadToken: string) => {
    try {
      window.open(`/api/download/${downloadToken}`, '_blank')
    } catch (err) {
      console.error('Download error:', err)
      setError('Failed to download file. Please try again.')
    }
  }
  
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }
  
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto my-16 px-4">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500 mb-4"></div>
          <p className="text-gray-600">Loading your purchases...</p>
        </div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-8 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Purchases</h1>
            <button
              onClick={handleLogout}
              className="bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {purchases.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">You don't have any purchases yet.</p>
              <Link 
                href="/" 
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {purchases.map((purchase) => (
                <div key={purchase.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b">
                    <h3 className="font-medium text-lg">{purchase.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Purchased on {new Date(purchase.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-700 mb-4">{purchase.product.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Downloads:</span>{' '}
                        {purchase.downloadCount} of {purchase.maxDownloads} used
                      </div>
                      
                      {purchase.expiresAt && (
                        <div>
                          <span className="font-medium">Expires:</span>{' '}
                          {new Date(purchase.expiresAt) > new Date() 
                            ? new Date(purchase.expiresAt).toLocaleDateString() 
                            : 'Expired'}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <button
                        onClick={() => handleDownload(purchase.downloadToken)}
                        disabled={!purchase.canDownload}
                        className={`${purchase.canDownload 
                          ? 'bg-amber-500 hover:bg-amber-600' 
                          : 'bg-gray-300 cursor-not-allowed'} 
                          text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out`}
                      >
                        {purchase.canDownload 
                          ? 'Download' 
                          : purchase.expiresAt && new Date(purchase.expiresAt) < new Date() 
                            ? 'Download Expired' 
                            : 'Download Limit Reached'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}