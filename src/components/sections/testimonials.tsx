'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechStart Solutions',
    company: 'Fortune 500 Consulting',
    image: '/images/testimonials/sarah-chen.jpg',
    rating: 5,
    text: 'This book cut through months of confusion about AI implementation. The practical steps in Part 2 alone saved us $50,000 in consulting fees. Finally, a resource that tells you what actually works.',
    highlight: 'Saved $50,000 in consulting fees'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO, InnovateNow',
    company: 'SaaS Startup',
    image: '/images/testimonials/marcus-rodriguez.jpg',
    rating: 5,
    text: 'I\'ve read dozens of AI books, but this one is different. It doesn\'t just explain what AI is—it shows you exactly how to implement it. Our productivity increased 40% in the first month.',
    highlight: '40% productivity increase'
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Head of Digital Strategy',
    company: 'Global Manufacturing Corp',
    image: '/images/testimonials/emily-watson.jpg',
    rating: 5,
    text: 'The future-planning section is invaluable. We\'re now ahead of our competitors because we understood what was coming. This book is essential reading for any business leader.',
    highlight: 'Ahead of competitors'
  },
  {
    name: 'James Park',
    role: 'Founder & CEO',
    company: 'E-commerce Platform',
    image: '/images/testimonials/james-park.jpg',
    rating: 5,
    text: 'Practical, actionable, and honest. No fluff, no hype—just real strategies that work. Implemented 3 AI solutions from the book and saw immediate ROI. Worth every penny.',
    highlight: 'Immediate ROI on 3 solutions'
  },
  {
    name: 'Lisa Thompson',
    role: 'VP of Operations',
    company: 'Healthcare Technology',
    image: '/images/testimonials/lisa-thompson.jpg',
    rating: 5,
    text: 'This book saved me from making expensive mistakes. The risk mitigation strategies alone are worth 100x the price. Clear, concise, and incredibly valuable.',
    highlight: 'Avoided expensive mistakes'
  },
  {
    name: 'David Kim',
    role: 'Digital Transformation Lead',
    company: 'Financial Services',
    image: '/images/testimonials/david-kim.jpg',
    rating: 5,
    text: 'Finally, someone who understands the real challenges of AI implementation. The step-by-step approach made it possible for our team to move from confusion to confidence.',
    highlight: 'From confusion to confidence'
  }
]

const stats = [
  { number: '1,000+', label: 'Happy Readers' },
  { number: '5.0', label: 'Average Rating' },
  { number: '98%', label: 'Would Recommend' },
  { number: '24hrs', label: 'Average Read Time' }
]

interface TestimonialCardProps {
  testimonial: typeof testimonials[0]
  index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 h-full flex flex-col">
          {/* Quote Icon */}
          <div className="mb-4">
            <Quote className="w-8 h-8 text-brand-gold" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
            ))}
          </div>
          
          {/* Testimonial Text */}
          <blockquote className="text-brand-steel leading-relaxed mb-6 flex-grow">
            "{testimonial.text}"
          </blockquote>
          
          {/* Highlight */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-brand-gold rounded-full" />
              {testimonial.highlight}
            </div>
          </div>
          
          {/* Author */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-brand-copper rounded-full flex items-center justify-center text-white font-bold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div>
              <div className="font-bold text-brand-navy">{testimonial.name}</div>
              <div className="text-sm text-brand-steel">{testimonial.role}</div>
              <div className="text-xs text-brand-steel/70">{testimonial.company}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mb-6">
            What <span className="text-gradient">Readers</span> Are Saying
          </h2>
          <p className="text-xl text-brand-steel max-w-3xl mx-auto leading-relaxed">
            Join thousands of business leaders who have transformed their AI strategy 
            with actionable insights from this comprehensive guide.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-brand-navy mb-2">
                {stat.number}
              </div>
              <div className="text-brand-steel font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-brand-navy to-brand-charcoal rounded-3xl p-12 text-white text-center"
        >
          <Quote className="w-12 h-12 text-brand-gold mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 max-w-4xl mx-auto">
            "This isn't just another AI book—it's the definitive guide to actually implementing AI in your business. 
            The practical insights and step-by-step approach make it essential reading for any serious entrepreneur."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-brand-navy font-bold text-lg">
              MJ
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Michael Johnson</div>
              <div className="text-brand-gold">Serial Entrepreneur & AI Consultant</div>
              <div className="text-white/70 text-sm">Author of "Digital Transformation Mastery"</div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-brand-steel mb-8">
            Trusted by professionals at leading companies:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              'Google', 'Microsoft', 'Amazon', 'Tesla', 'Apple', 
              'Meta', 'Netflix', 'Salesforce', 'Adobe', 'IBM'
            ].map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-brand-steel font-medium text-lg"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}