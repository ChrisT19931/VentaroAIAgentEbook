'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: 'What exactly do I get when I purchase this eBook?',
    answer: 'You get the 2025 Edition of our AI prompts eBook delivered via email. This concise 10-page guide contains powerful AI prompts designed to generate revenue. After purchase, the eBook will be sent to your email address.'
  },
  {
    question: 'Is this suitable for beginners or do I need technical knowledge?',
    answer: 'This guide is written for anyone interested in using AI to generate revenue. No technical background required! The prompts are designed to be practical and actionable, with clear instructions that anyone can use immediately.'
  },
  {
    question: 'How is this different from other AI prompt collections?',
    answer: 'Unlike generic prompt collections, our 2025 Edition focuses specifically on revenue generation. Each prompt is carefully crafted and tested to produce results that can directly impact your bottom line.'
  },
  {
    question: 'Why is the price so low? Is this a limited-time offer?',
    answer: 'Yes! The $3 price is a special offer for our 2025 Edition. We believe in providing high-value content at an accessible price point so more people can benefit from these revenue-generating prompts.'
  },
  {
    question: 'What if I\'m not satisfied with the content?',
    answer: 'We encourage you to carefully review the product description before purchasing. All sales are final, and we do not offer refunds. We\'re confident you\'ll find the prompts valuable, which is why we price it affordably.'
  },
  {
    question: 'How quickly can I start using these prompts?',
    answer: 'You can start using the prompts immediately after receiving the eBook in your email. Simply copy and paste them into your preferred AI tool and follow the instructions included in the guide.'
  },
  {
    question: 'Will these prompts become outdated as AI evolves?',
    answer: 'The 2025 Edition is specifically designed for the current AI landscape. We regularly release updated editions to keep pace with AI developments. For future updates, contact chris.t@ventarosales.com.'
  },
  {
    question: 'How is the eBook delivered?',
    answer: 'The eBook is delivered via email as a PDF file that works on all devices - computers, tablets, smartphones, and e-readers. You can read it online or offline, print it, or access it from multiple devices.'
  },
  {
    question: 'Do you offer bulk discounts for teams or organizations?',
    answer: 'Yes! For orders of 10+ copies, we offer special team pricing. Contact us at chris.t@ventarosales.com for custom pricing and team implementation packages.'
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Absolutely. All payments are processed through Stripe, a leading payment processor used by millions of businesses worldwide. We never store your payment information, and all transactions are encrypted and secure.'
  },
  {
    question: 'Can I share this eBook with others?',
    answer: 'The eBook is licensed for individual use only. For team access, please consider our bulk pricing options or contact chris.t@ventarosales.com for special arrangements.'
  },
  {
    question: 'What if I have questions after reading the eBook?',
    answer: 'We provide email support for all readers. You can reach us at chris.t@ventarosales.com with any questions about the prompts or how to use them effectively. We typically respond within 24 hours.'
  }
]

const categories = [
  {
    title: 'About the eBook',
    faqs: faqs.slice(0, 4)
  },
  {
    title: 'Implementation & Support',
    faqs: faqs.slice(4, 8)
  },
  {
    title: 'Purchase & Technical',
    faqs: faqs.slice(8, 12)
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-zinc-900 to-black">
      <div className="container-section">
        {/* Section Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="w-8 h-8 text-zinc-400" />
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                2025 Edition <span className="text-zinc-400">FAQ</span>
              </h2>
            </div>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Got questions? We've got answers. Here are the most common questions 
              about our 2025 AI Prompts eBook.
            </p>
          </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-12">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-zinc-300 mb-6 text-center">
                {category.title}
              </h3>
              
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${categoryIndex}-${index}`}
                    className="bg-zinc-800 rounded-2xl shadow-sm border border-zinc-700 px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6">
                      <span className="font-semibold text-white pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="text-zinc-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-brand-navy to-brand-charcoal rounded-3xl p-12 text-white max-w-3xl mx-auto">
            <MessageCircle className="w-12 h-12 text-brand-gold mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              We're here to help! Reach out to our support team and we'll get back to you 
              within 24 hours with detailed answers to any questions you might have.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-navy"
              >
                <Mail className="mr-2 w-5 h-5" />
                Email Support
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Live Chat
              </Button>
            </div>
            
            <div className="mt-6 text-white/70 text-sm">
              <p>📧 chris.t@ventarosales.com</p>
              <p>⏰ Response time: Within 24 hours</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '< 2 min', label: 'Average Response Time' },
            { number: '99.8%', label: 'Customer Satisfaction' },
            { number: '24/7', label: 'Email Support' },
            { number: '1,000+', label: 'Questions Answered' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-brand-navy mb-2">
                {stat.number}
              </div>
              <div className="text-brand-steel font-medium text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}