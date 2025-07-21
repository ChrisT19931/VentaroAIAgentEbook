'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Check, 
  Download, 
  Shield, 
  Clock, 
  Star, 
  Gift, 
  Zap,
  ArrowRight,
  DollarSign,
  HeadphonesIcon,
  Globe,
  AlertTriangle,
  TrendingUp
} from 'lucide-react'

interface PricingProps {
  onPurchase: () => void
}

const features = [
  'Concise professional 2025 Edition guide',
  'Instant email delivery',
  'Practical AI implementation strategies',
  'Business efficiency frameworks',
  'Professional AI prompt templates',
  'Business-focused AI applications',
  'Time-saving workflow guides',
  'Growth optimization techniques',
  'Step-by-step implementation plans',
  'Lifetime access to future updates'
]

const bonuses = [
  {
    icon: Gift,
    title: 'Professional AI Tools List',
    description: 'Curated list of enterprise-grade AI tools for business efficiency',
    value: '$29'
  },
  {
    icon: Zap,
    title: 'Implementation Framework',
    description: 'Structured approach to integrate AI strategies into your existing workflow',
    value: '$19'
  },
  {
    icon: Star,
    title: '2025 Updates',
    description: 'Access to updated strategies as AI technology evolves throughout 2025',
    value: '$49'
  }
]

const guarantees = [
  {
    icon: Download,
    title: '2025 Edition',
    description: 'Receive the 2025 AI Prompts eBook via email immediately after purchase'
  },
  {
    icon: Clock,
    title: 'Prompt Support',
    description: 'Direct email support at chris.t@ventarosales.com for any questions'
  },
  {
    icon: Shield,
    title: 'Secure Purchase',
    description: 'Your payment information is protected with bank-level security'
  }
]

export function Pricing({ onPurchase }: PricingProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-zinc-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-zinc-800/10 rounded-full blur-3xl" />
      
      <div className="container-section relative z-10">
        {/* Cost of Inaction Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-zinc-900 to-black rounded-3xl p-8 text-white max-w-4xl mx-auto mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            The Real Cost of <span className="text-red-500">Waiting</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center mb-6">
            <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-500 mb-2">-$2,500/mo</div>
              <div className="text-zinc-400 text-sm">Lost revenue opportunities</div>
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <Clock className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-500 mb-2">-80 hrs/mo</div>
              <div className="text-zinc-400 text-sm">Wasted time & resources</div>
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">
              <TrendingUp className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-500 mb-2">-30% Growth</div>
              <div className="text-zinc-400 text-sm">Stunted business growth</div>
            </div>
          </div>
          <p className="text-zinc-400 text-center font-medium">
            Every day without effective AI prompts is costing your business real dollars and competitive advantage.
          </p>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Choose Your <span className="text-zinc-400">2025 Package</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Select the option that best fits your needs and budget. From self-guided learning to full implementation support.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            {/* Professional Guide - $3 eBook */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-xl w-full"
            >
              <Card className="relative overflow-hidden border-0 shadow-xl bg-zinc-800 h-full">
                {/* Premium Badge */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-zinc-700 to-zinc-800 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ✨ PROFESSIONAL EDITION
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      2025 Professional AI Guide
                    </h3>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-lg text-zinc-500 line-through">$97</span>
                        <span className="bg-zinc-700 text-white px-2 py-1 rounded text-xs font-bold">97% OFF</span>
                      </div>
                      <div className="text-5xl font-bold text-white mb-2">
                        $3
                        <span className="text-xl text-zinc-400 font-normal">.00</span>
                      </div>
                      <p className="text-zinc-400 text-sm">One-time payment • Instant delivery</p>
                    </div>
                    
                    {/* CTA Button */}
                    <Button
                      size="lg"
                      variant="gradient"
                      onClick={onPurchase}
                      className="w-full group mb-4 bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <DollarSign className="mr-2 w-4 h-4" />
                      Get Professional Guide
                      <ArrowRight className={`ml-2 w-4 h-4 transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                    </Button>
                    
                    <p className="text-xs text-zinc-400">
                      Secure payment via Stripe • Instant delivery
                    </p>
                  </div>
                  
                  {/* Features List */}
                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-white mb-3 text-center">
                      What You Get:
                    </h4>
                    <div className="space-y-2">
                      {features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          className="flex items-start gap-2"
                        >
                          <Check className="w-4 h-4 text-zinc-400 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-400 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Service Assurance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-lg bg-zinc-800">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold text-white mb-4 text-center">
                  ✓ Our Service Assurance
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {guarantees.map((guarantee, index) => {
                    const IconComponent = guarantee.icon
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-zinc-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm mb-1">
                            {guarantee.title}
                          </div>
                          <p className="text-xs text-zinc-400">
                            {guarantee.description}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Business Value Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Business Value Proposition
            </h3>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              Our professional AI guide provides practical strategies that deliver measurable improvements to your business operations.
              Here's what our guide offers:
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-3xl font-bold text-zinc-300 mb-2">Efficiency</div>
                <div className="text-white/80 font-medium mb-1">Streamlined Workflows</div>
                <div className="text-zinc-400 text-sm">Optimize your business processes with AI-powered solutions</div>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-3xl font-bold text-zinc-300 mb-2">Quality</div>
                <div className="text-white/80 font-medium mb-1">Enhanced Output</div>
                <div className="text-zinc-400 text-sm">Improve the quality of your work with AI assistance</div>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-3xl font-bold text-zinc-300 mb-2">Growth</div>
                <div className="text-white/80 font-medium mb-1">Strategic Advantage</div>
                <div className="text-zinc-400 text-sm">Stay ahead of competitors with cutting-edge AI implementation</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Elevate Your Business with Professional AI Strategies
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
            Our comprehensive guide provides the knowledge and tools you need to effectively implement AI in your business operations and achieve sustainable growth.
          </p>
          <Button
            size="xl"
            className="group bg-gradient-to-r from-zinc-700 to-zinc-900 hover:from-zinc-600 hover:to-zinc-800 transition-all duration-300 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl mx-auto"
            onClick={onPurchase}
          >
            Get Professional AI Guide
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-zinc-400 mt-4">
            chris.t@ventarosales.com
          </p>
        </motion.div>
      </div>
    </section>
  )
}