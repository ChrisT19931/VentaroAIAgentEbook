'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Download, Mail, Clock, Shield, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface PurchaseData {
  id: string
  customerEmail: string
  downloadUrl: string
  downloadToken: string
  expiresAt: string
  downloadsRemaining: number
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [purchaseData, setPurchaseData] = useState<PurchaseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (sessionId) {
      fetchPurchaseData()
    } else {
      setError('Invalid purchase session')
      setLoading(false)
    }
  }, [sessionId])

  const fetchPurchaseData = async () => {
    try {
      const response = await fetch(`/api/checkout?session_id=${sessionId}`)
      const data = await response.json()
      
      if (response.ok && data.success) {
        setPurchaseData(data.purchase)
      } else {
        setError(data.error || 'Failed to retrieve purchase information')
      }
    } catch (err) {
      setError('Failed to load purchase details')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!purchaseData) return
    
    setDownloading(true)
    try {
      // Use the download API endpoint which handles security and tracking
      const response = await fetch(purchaseData.downloadUrl, {
        method: 'GET',
      })
      
      if (response.ok) {
        // The API will redirect to the actual file or return download info
        if (response.redirected) {
          // If redirected, open the download URL
          window.open(response.url, '_blank')
        } else {
          // Handle direct download
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'AI-Reality-Check-eBook.pdf'
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        }
        
        // Update downloads remaining
        setPurchaseData(prev => prev ? {
          ...prev,
          downloadsRemaining: Math.max(0, prev.downloadsRemaining - 1)
        } : null)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Download failed')
      }
    } catch (err) {
      console.error('Download error:', err)
      setError('Download failed. Please try again or contact support at chris.t@ventarosales.com')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
          <p className="text-white">Loading your purchase details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">!</span>
              </div>
            </div>
            <CardTitle className="text-red-600">Purchase Error</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Purchase Successful!
          </h1>
          <p className="text-xl text-slate-300">
            Thank you for your purchase. Your eBook is ready for download.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Download Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-amber-600" />
                  Download Your eBook
                </CardTitle>
                <CardDescription>
                  Get instant access to "AI Reality Check" - your comprehensive guide to AI implementation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleDownload}
                  disabled={downloading || !purchaseData}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                  size="lg"
                >
                  {downloading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF (2.1 MB)
                    </>
                  )}
                </Button>
                
                {purchaseData && (
                  <div className="text-sm text-slate-600 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Downloads remaining:</span>
                      <span className="font-medium">{purchaseData.downloadsRemaining}/3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Link expires:</span>
                      <span className="font-medium">
                        {new Date(purchaseData.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Confirmation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Email Confirmation
                </CardTitle>
                <CardDescription>
                  We've sent a confirmation email with your download link.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Email sent to:</strong> {purchaseData?.customerEmail}
                  </p>
                </div>
                
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Email delivery: Usually within 2-5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure download link included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>Bonus materials attached</span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-500">
                  Don't see the email? Check your spam folder or contact support at{' '}
                  <a 
                    href="mailto:chris.t@ventarosales.com" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    chris.t@ventarosales.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
              <CardDescription>
                Make the most of your AI Reality Check eBook
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📖</span>
                  </div>
                  <h3 className="font-semibold mb-2">Read & Implement</h3>
                  <p className="text-sm text-slate-600">
                    Start with Chapter 1 and follow the step-by-step implementation guide.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Use Bonus Tools</h3>
                  <p className="text-sm text-slate-600">
                    Access your AI Tools Checklist and Quick Start Guide for immediate results.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Support</h3>
                  <p className="text-sm text-slate-600 mb-2">
                    Questions? Contact our support team - we're here to help you succeed.
                  </p>
                  <a 
                    href="mailto:chris.t@ventarosales.com" 
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    chris.t@ventarosales.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 pb-8"
        >
          <Link href="/">
            <Button variant="outline" size="lg">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}