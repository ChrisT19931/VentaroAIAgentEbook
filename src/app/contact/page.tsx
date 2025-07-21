'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'
import { Mail, MessageSquare, Clock, Phone, MapPin, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  type: 'general' | 'support' | 'refund' | 'technical'
}

export default function ContactPage() {
  const { toast } = useToast()
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {}

    if (!form.name.trim() || form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!form.subject.trim() || form.subject.length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters'
    }

    if (!form.message.trim() || form.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the errors in the form',
        variant: 'destructive'
      })
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: 'Message Sent!',
          description: data.message,
          variant: 'success'
        })
        
        // Reset form
        setForm({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        })
        setErrors({})
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Contact Support
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have questions about your purchase or need help with the eBook? We're here to help!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Message Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => handleInputChange('type', e.target.value as ContactForm['type'])}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Product Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="refund">Refund Request</option>
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={form.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      error={errors.name}
                      placeholder="Your full name"
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      error={errors.email}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <Input
                    label="Subject"
                    value={form.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    error={errors.subject}
                    placeholder="Brief description of your inquiry"
                    required
                  />

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        errors.message ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="Please provide details about your inquiry..."
                      required
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                    <p className="mt-1 text-xs text-slate-500">
                      {form.message.length}/2000 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-amber-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-slate-600">chris.t@ventarosales.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-slate-600">Within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-slate-600">Mon-Fri, 9AM-5PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
                <CardDescription>
                  Common questions and solutions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-sm">Download Issues?</h4>
                  <p className="text-xs text-slate-600">
                    Check your email for the download link. Links expire after 7 days.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium text-sm">Purchase Policy</h4>
                  <p className="text-xs text-slate-600">
                    All sales are final. No refunds available.
                  </p>
                </div>
                
                <div className="border-l-4 border-amber-500 pl-4">
                  <h4 className="font-medium text-sm">Technical Support</h4>
                  <p className="text-xs text-slate-600">
                    Having trouble with the PDF? We can help with compatibility issues.
                  </p>
                </div>
                
                <Link href="/#faq">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Full FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Download Information */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📥</span>
                </div>
                <h3 className="font-semibold text-blue-800 mb-2">
                  Download Information
                </h3>
                <p className="text-sm text-blue-700">
                  Your download link is valid for 30 days and can be used 3 times.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}