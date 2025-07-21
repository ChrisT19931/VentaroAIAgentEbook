'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Users, Download, Shield } from 'lucide-react'
import Image from 'next/image'

interface HeroProps {
  onGetStarted: () => void
}

export function Hero({ onGetStarted }: HeroProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(70,70,70,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(70,70,70,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(70,70,70,0.1),transparent_50%)]" />
      
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-zinc-400 to-zinc-600 rounded-full blur-xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-zinc-500 to-zinc-700 rounded-full blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-zinc-400 to-zinc-500 rounded-full blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      
      <div className="container-section relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-6 text-white/80"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                <Star className="w-5 h-5 fill-brand-gold text-brand-gold" />
                <span className="ml-2 text-sm font-medium">5.0 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">1,000+ Readers</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Ventaro AI: 2025 Edition</span>
                <span className="block bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
                  Professional AI Prompt Guide
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl">
                Concise, actionable AI prompts designed for business efficiency and growth in 2025. 
                A carefully crafted guide with proven strategies to help you leverage AI technology for your business
                <span className="text-white font-semibold"> effectively and professionally</span>.
              </p>
            </motion.div>

            {/* Value Propositions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-8 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-medium">Practical AI Strategies</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✅</span>
                <span className="text-sm font-medium">2025 Edition</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">📧</span>
                <span className="text-sm font-medium">Instant Delivery</span>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={onGetStarted}
                  className="px-8 py-4 bg-gradient-to-r from-zinc-700 to-zinc-900 text-white font-bold text-lg rounded-lg hover:from-zinc-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Get Professional Guide
                  <ArrowRight className={`ml-2 w-5 h-5 inline transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                </motion.button>
                
                <motion.button
                  className="px-8 py-4 border-2 border-zinc-600 text-zinc-300 font-medium text-lg rounded-lg hover:bg-zinc-800 hover:border-zinc-500 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View AI Strategies
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - AI Prompts Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative max-w-lg w-full">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-500 to-zinc-700 rounded-3xl blur-2xl opacity-20 scale-110" />
              
              {/* Main Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-zinc-700/50 p-8 shadow-2xl"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-500/20 text-zinc-400 rounded-full text-sm font-medium border border-zinc-500/30">
                      <span className="w-2 h-2 bg-zinc-400 rounded-full animate-pulse"></span>
                      Live Preview
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      2025 Professional AI Guide
                    </h3>
                  </div>
                  
                  {/* Animated Money Icons */}
                  <div className="relative h-32 bg-gradient-to-br from-zinc-800 to-black rounded-2xl overflow-hidden border border-zinc-700/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl animate-bounce">
                        💰
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 text-2xl animate-pulse">
                      💡
                    </div>
                    <div className="absolute top-4 right-4 text-2xl animate-pulse" style={{ animationDelay: '1s' }}>
                      🚀
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>
                      💎
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Strategies Included</span>
                      <span className="text-white font-medium">Professional</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Edition</span>
                      <span className="text-green-400 font-medium">2025</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Delivery</span>
                      <span className="text-white font-medium">Instant</span>
                    </div>
                  </div>
                  
                  {/* Price Badge */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-zinc-700 text-white px-4 py-2 rounded-full font-bold">
                      <span className="text-lg">Only $3</span>
                      <span className="text-sm opacity-80">USD</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements Around Book */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-zinc-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
              >
                Bestseller
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white text-zinc-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg border-2 border-zinc-500"
              >
                Instant Access
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}