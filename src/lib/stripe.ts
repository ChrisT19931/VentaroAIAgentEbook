import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

if (!process.env.STRIPE_PUBLISHABLE_KEY) {
  throw new Error('STRIPE_PUBLISHABLE_KEY is not set')
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Client-side Stripe instance
let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Product configuration
export const EBOOK_PRODUCT = {
  name: 'AI Reality Check: What You Aren\'t Doing, What You Can Do, What You Will Be Able to Do',
  description: 'A comprehensive guide to understanding and implementing AI in your business. Discover what you\'re missing, what you can start today, and what the future holds.',
  price: 300, // $3.00 in cents
  currency: 'usd',
  images: ['/images/ebook-cover.jpg'],
} as const

// Create checkout session
export async function createCheckoutSession({
  email,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  email?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: EBOOK_PRODUCT.currency,
            product_data: {
              name: EBOOK_PRODUCT.name,
              description: EBOOK_PRODUCT.description,
              images: EBOOK_PRODUCT.images,
            },
            unit_amount: EBOOK_PRODUCT.price,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        product: 'ai-reality-check-ebook',
        ...metadata,
      },
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI'],
      },
      allow_promotion_codes: true,
      consent_collection: {
        terms_of_service: 'required',
      },
      custom_fields: [
        {
          key: 'newsletter_signup',
          label: {
            type: 'custom',
            custom: 'Subscribe to our newsletter for AI insights and updates',
          },
          type: 'dropdown',
          dropdown: {
            options: [
              {
                label: 'Yes, send me updates',
                value: 'yes',
              },
              {
                label: 'No thanks',
                value: 'no',
              },
            ],
          },
          optional: true,
        },
      ],
    })

    return { session, error: null }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return { 
      session: null, 
      error: error instanceof Error ? error.message : 'Failed to create checkout session' 
    }
  }
}

// Verify webhook signature
export function verifyWebhookSignature(body: string, signature: string): Stripe.Event | null {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not set')
    }

    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return null
  }
}

// Get payment intent details
export async function getPaymentIntent(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return { paymentIntent, error: null }
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    return { 
      paymentIntent: null, 
      error: error instanceof Error ? error.message : 'Failed to retrieve payment intent' 
    }
  }
}

// Create refund
export async function createRefund(paymentIntentId: string, reason?: string) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: 'requested_by_customer',
      metadata: {
        reason: reason || 'Customer request',
      },
    })
    return { refund, error: null }
  } catch (error) {
    console.error('Error creating refund:', error)
    return { 
      refund: null, 
      error: error instanceof Error ? error.message : 'Failed to create refund' 
    }
  }
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'usd'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100)
}

// Validate webhook event types
export const WEBHOOK_EVENTS = {
  CHECKOUT_COMPLETED: 'checkout.session.completed',
  PAYMENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_FAILED: 'payment_intent.payment_failed',
  INVOICE_PAID: 'invoice.payment_succeeded',
  CUSTOMER_CREATED: 'customer.created',
} as const

export type WebhookEventType = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS]