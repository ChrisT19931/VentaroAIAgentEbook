'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast'
import { 
  Mail, 
  Send, 
  Gift, 
  TrendingUp, 
  Users, 
  Bell,
  CheckCircle,
  Sparkles
} from 'lucide-react'

const benefits = [
  {
    icon: Gift,
    title: '2025 Edition Updates',
    description: 'Get notified about updates to the 2025 AI prompts eBook'
  },
  {
    icon: TrendingUp,
    title: 'Revenue Strategies',
    description: 'Learn new ways to monetize AI prompts in 2025'
  },
  {
    icon: Bell,
    title: 'Early Access',
    description: 'Be first to know about new editions and special offers'
  },
  {
    icon: Users,
    title: 'Direct Support',
    description: 'Get direct support from chris.t@ventarosales.com'
  }
]

const incentives = [
  '🎯 2025 AI prompt updates',
  '📊 Revenue generation strategies',
  '🚀 Success stories from 2025 edition users',
  '💡 New AI tool recommendations',
  '🎁 Exclusive discounts on future editions',
  '📧 Direct support from chris.t@ventarosales.com'
]

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address to subscribe.',
        variant: 'destructive'
      })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSubscribed(true)
        setEmail('')
        toast({
          title: 'Successfully Subscribed!',
          description: 'Welcome to our AI community. Check your email for a confirmation.',
          variant: 'success'
        })
      } else {
        throw new Error(data.error || 'Subscription failed')
      }
    } catch (error) {
      toast({
        title: 'Subscription Failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden" id="newsletter-2025">
        <div className="absolute inset-0 bg-[url('/images/success-pattern.svg')] opacity-10" />
        
        <div className="container-section relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎉 Thanks for Subscribing to 2025 Updates!
            </h2>
            
            <p className="text-xl text-white/90 mb-8">
              You'll receive updates about our 2025 Edition AI prompts. For immediate assistance, 
              contact chris.t@ventarosales.com directly.
            </p>
            
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-bold mb-4">What happens next?</h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                    <span>Check your email for a confirmation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                    <span>Receive updates about the 2025 Edition</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                    <span>Contact chris.t@ventarosales.com for support</span>
                  </div>
                </div>
              </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-zinc-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-zinc-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-zinc-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-section relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-zinc-400" />
                <span className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                  2025 UPDATES
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Get the <span className="text-zinc-400">2025 Edition</span> Updates
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Subscribe for updates on our 2025 AI prompts or contact our support directly at <span className="text-white font-semibold">chris.t@ventarosales.com</span> for immediate assistance.
              </p>
              
              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-10 h-10 bg-zinc-700/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{benefit.title}</h3>
                        <p className="text-white/80 text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              
              {/* Contact Info */}
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">chris.t@ventarosales.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">📧 Email Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">📱 24/7 Support</span>
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">
                  Get 2025 Edition Updates
                </h3>
                <p className="text-zinc-600">
                  Subscribe for updates or contact chris.t@ventarosales.com directly
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg"
                  disabled={isLoading}
                />
                
                <Button
                  type="submit"
                  size="lg"
                  variant="gradient"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Subscribing...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 w-5 h-5" />
                      Get 2025 Edition Updates
                    </>
                  )}
                </Button>
              </form>
              
              {/* What You'll Get */}
              <div className="space-y-3">
                <h4 className="font-bold text-zinc-800 text-center mb-4">
                  What you'll receive:
                </h4>
                <div className="space-y-2">
                  {incentives.map((incentive, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="flex items-center gap-2 text-sm text-zinc-600"
                    >
                      <CheckCircle className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                      <span>{incentive}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-zinc-600">
                  🔒 Your email is safe with us. Unsubscribe anytime.<br />
                  For immediate assistance: chris.t@ventarosales.com
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}