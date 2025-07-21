'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, BookOpen, Lightbulb, TrendingUp, Shield, Clock, DollarSign } from 'lucide-react'

const benefits = [
  {
    title: 'Revenue Generation',
    description: 'Ready-to-use AI prompts designed specifically to increase your business revenue and sales conversions.',
    icon: <DollarSign className="w-8 h-8 text-zinc-700" />
  },
  {
    title: 'Time-Saving Templates',
    description: 'Access a library of proven prompt templates that save hours of trial and error when working with AI.',
    icon: <Clock className="w-8 h-8 text-zinc-700" />
  },
  {
    title: 'Strategic Implementation',
    description: 'Learn exactly how to implement these AI prompts in your business workflow for maximum profit.',
    icon: <CheckCircle className="w-8 h-8 text-zinc-700" />
  },
  {
    title: 'Growth Opportunities',
    description: 'Discover untapped markets and opportunities that AI can help you capitalize on immediately.',
    icon: <TrendingUp className="w-8 h-8 text-zinc-700" />
  },
  {
    title: 'Competitive Advantage',
    description: 'Stay ahead of competitors with cutting-edge AI prompt strategies most businesses don\'t know about.',
    icon: <Shield className="w-8 h-8 text-zinc-700" />
  },
  {
    title: 'Practical Knowledge',
    description: 'No theoretical fluff - only practical, actionable prompts that directly impact your bottom line.',
    icon: <BookOpen className="w-8 h-8 text-zinc-700" />
  }
]

interface BenefitCardProps {
  benefit: typeof benefits[0]
  index: number
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-zinc-100/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 h-full flex flex-col">
          {/* Icon */}
          <div className="mb-4">
            {benefit.icon}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-zinc-900 mb-3">
            {benefit.title}
          </h3>
          
          {/* Description */}
          <p className="text-zinc-600 leading-relaxed">
            {benefit.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Benefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/testimonial-pattern.svg')] opacity-5" />
      
      <div className="container-section relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-6">
            Money-Making <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-700 to-zinc-900">Benefits</span>
          </h2>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Discover how these AI prompts can transform your business and generate real revenue immediately.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              benefit={benefit}
              index={index}
            />
          ))}
        </div>

        {/* Featured Benefit */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-zinc-900 to-black rounded-3xl p-12 text-white text-center"
        >
          <DollarSign className="w-12 h-12 text-zinc-400 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
            Turn AI into your 24/7 revenue-generating asset
          </h3>
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            These proven AI prompts will help you automate sales, marketing, and customer service processes to generate income while you sleep.
          </p>
        </motion.div>
      </div>
    </section>
  )
}