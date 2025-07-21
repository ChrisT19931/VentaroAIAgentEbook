'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Benefits } from '@/components/sections/benefits'
import { Pricing } from '@/components/sections/pricing'
import { FAQ } from '@/components/sections/faq'
import { Newsletter } from '@/components/sections/newsletter'
import { Footer } from '@/components/sections/footer'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/toast'
import { trackEvent } from '@/lib/utils'

// Loading component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-zinc-600/30 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Ventaro AI: 2025 Edition</h2>
        <p className="text-white/70">Loading your Professional AI Guide...</p>
      </div>
    </div>
  )
}

// Floating CTA Button
function FloatingCTA({ onPurchase }: { onPurchase: () => void }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const threshold = window.innerHeight * 0.5 // Show after scrolling 50% of viewport
      setIsVisible(scrolled > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <motion.button
            onClick={onPurchase}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-zinc-700 to-zinc-900 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-lg">💰</span>
            <span>Get 2025 Edition - $3</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scroll Progress Indicator
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-zinc-600 to-zinc-800"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const { toast } = useToast()

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Track page view
  useEffect(() => {
    if (!isLoading) {
      trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
      })
    }
  }, [isLoading])

  const handlePurchase = async () => {
    if (isPurchasing) return

    setIsPurchasing(true)
    
    try {
      // Track purchase intent
      trackEvent('purchase_intent', {
        source: 'cta_button',
        timestamp: new Date().toISOString()
      })

      // First, get the default product (AI Reality Check eBook)
      const productsResponse = await fetch('/api/products')
      const productsData = await productsResponse.json()
      
      if (!productsData.success || !productsData.products.length) {
        throw new Error('Product not available')
      }
      
      const product = productsData.products[0] // Get the first active product

      // Create Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}?canceled=true`,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        // Fallback: use Stripe.js redirect
        const stripe = (await import('@stripe/stripe-js')).loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        )
        
        const stripeInstance = await stripe
        if (stripeInstance && data.sessionId) {
          await stripeInstance.redirectToCheckout({ sessionId: data.sessionId })
        }
      }
    } catch (error) {
      console.error('Purchase error:', error)
      toast({
        title: 'Purchase Failed',
        description: error instanceof Error ? error.message : 'There was an error processing your 2025 Edition purchase. Please try again or contact support at chris.t@ventarosales.com',
        variant: 'destructive'
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  const handleGetStarted = () => {
    // Smooth scroll to pricing section
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' })
    }
    
    trackEvent('cta_click', {
      source: 'hero_section',
      action: 'scroll_to_pricing'
    })
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <ScrollProgress />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="hero">
          <Hero onGetStarted={handleGetStarted} />
        </section>

        {/* Features Section */}
        <section id="features">
          <Features />
        </section>

        {/* Benefits Section */}
        <section id="benefits">
          <Benefits />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <Pricing onPurchase={handlePurchase} />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FAQ />
        </section>

        {/* Newsletter Section */}
        <section id="newsletter">
          <Newsletter />
        </section>

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating CTA */}
      <FloatingCTA onPurchase={handlePurchase} />

      {/* Toast Notifications */}
      <Toaster />

      {/* Purchase Loading Overlay */}
      <AnimatePresence>
        {isPurchasing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-zinc-900 rounded-2xl p-8 text-center max-w-md mx-4 border border-zinc-700">
              <div className="w-16 h-16 border-4 border-zinc-600/30 border-t-zinc-600 rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Redirecting to Secure Checkout
              </h3>
              <p className="text-zinc-400">
                Please wait while we prepare your 2025 Edition purchase...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Ventaro AI: 2025 Edition - Professional AI Guide',
            description: 'Comprehensive guide with professional AI strategies to enhance business efficiency and growth in 2025.',
            brand: {
              '@type': 'Brand',
              name: 'Ventaro AI'
            },
            offers: {
              '@type': 'Offer',
              price: '3.00',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'Ventaro AI'
              }
            },
            author: {
              '@type': 'Person',
              name: 'Chris T',
              email: 'chris.t@ventarosales.com'
            }
          })
        }}
      />
    </>
  )
}