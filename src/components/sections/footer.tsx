'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  MessageCircle, 
  Shield, 
  FileText, 
  ExternalLink,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Heart
} from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  product: [
    { name: '2025 Edition', href: '#features' },
    { name: 'AI Prompts', href: '#features' },
    { name: 'Revenue Systems', href: '#benefits' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' }
  ],
  support: [
    { name: 'Contact Us', href: 'mailto:chris.t@ventarosales.com' },
    { name: 'Email Delivery', href: '#faq' },
    { name: 'Purchase Help', href: '#faq' },
    { name: 'Purchase Policy', href: '#faq' },
    { name: 'Direct Support', href: 'mailto:chris.t@ventarosales.com' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'DMCA', href: '/dmca' },
    { name: 'Disclaimer', href: '/disclaimer' }
  ],
  resources: [
    { name: 'AI Tools Directory', href: '/ai-tools' },
    { name: 'Blog', href: '/blog' },
    { name: 'Success Stories', href: '/case-studies' },
    { name: 'Free Resources', href: '/resources' },
    { name: '2025 Updates', href: '#newsletter-2025' }
  ]
}

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ventarosales' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/ventarosales' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@ventarosales' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ventarosales' }
]

const trustBadges = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'SSL encrypted transactions'
  },
  {
    icon: FileText,
    title: '2025 Edition',
    description: '10 Revenue-Generating Prompts'
  },
  {
    icon: Mail,
    title: 'Direct Support',
    description: 'chris.t@ventarosales.com'
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-zinc-900 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/footer-pattern.svg')] opacity-5" />
      
      <div className="container-section relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-4">
                  Ventaro AI: 2025 Edition
                </h3>
                <p className="text-white/80 leading-relaxed mb-6 max-w-md">
                  The definitive guide to money-making AI prompts for 2025. 
                  Concise, actionable strategies to generate revenue with AI.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-zinc-400" />
                    <a href="mailto:chris.t@ventarosales.com" className="text-white/80 hover:text-white transition-colors">
                      chris.t@ventarosales.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-zinc-400" />
                    <span className="text-white/80">2025 Edition Support - 24/7</span>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors"
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            </div>
            
            {/* Links Columns */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
              {/* Product Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h4 className="font-bold text-lg mb-4">Product</h4>
                <ul className="space-y-3">
                  {footerLinks.product.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Support Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h4 className="font-bold text-lg mb-4">Support</h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h4 className="font-bold text-lg mb-4">Legal</h4>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-8 border-t border-white/10"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon
              return (
                <div key={index} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-10 h-10 bg-zinc-700/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{badge.title}</div>
                    <div className="text-white/70 text-xs">{badge.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-white/70">
              <p>
                © {currentYear} Ventaro AI. All rights reserved.
              </p>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
              <span>for AI innovators</span>
            </div>
          </div>
        </div>
        
        {/* Additional Legal Notice */}
        <div className="py-4 border-t border-white/5">
          <div className="text-center text-xs text-white/50 max-w-4xl mx-auto leading-relaxed">
            <p className="mb-2">
              <strong>Disclaimer:</strong> The 2025 Edition AI Prompts are for educational purposes only. 
              Results may vary based on individual implementation and market conditions. 
              We do not guarantee specific revenue outcomes from using these prompts.
            </p>
            <p>
              <strong>Contact:</strong> For immediate support or inquiries about the 2025 Edition, email chris.t@ventarosales.com.
              We aim to respond to all inquiries within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}