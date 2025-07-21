import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import crypto from 'crypto'

// Tailwind CSS class merging utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

// Generate download token
export function generateDownloadToken(): string {
  return generateSecureToken(16)
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100) // Convert from cents
}

// Format date
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }).format(dateObj)
}

// Format relative time
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else {
    return formatDate(dateObj)
  }
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Slugify string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Get client IP address
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  return 'unknown'
}

// Get user agent
export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown'
}

// Get referrer
export function getReferrer(request: Request): string {
  return request.headers.get('referer') || request.headers.get('referrer') || 'direct'
}

// Parse UTM parameters
export function parseUTMParams(url: string): {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
} {
  const urlObj = new URL(url)
  return {
    utmSource: urlObj.searchParams.get('utm_source') || undefined,
    utmMedium: urlObj.searchParams.get('utm_medium') || undefined,
    utmCampaign: urlObj.searchParams.get('utm_campaign') || undefined,
    utmTerm: urlObj.searchParams.get('utm_term') || undefined,
    utmContent: urlObj.searchParams.get('utm_content') || undefined,
  }
}

// Generate session ID
export function generateSessionId(): string {
  return `sess_${Date.now()}_${generateSecureToken(8)}`
}

// Validate download token format
export function isValidDownloadToken(token: string): boolean {
  return /^[a-f0-9]{32}$/i.test(token)
}

// Check if download is expired
export function isDownloadExpired(expiresAt: Date | string): boolean {
  const expiryDate = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt
  return new Date() > expiryDate
}

// Check if download limit exceeded
export function isDownloadLimitExceeded(downloadCount: number, maxDownloads: number): boolean {
  return downloadCount >= maxDownloads
}

// Sanitize filename
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

// Generate secure download URL
export function generateDownloadUrl(token: string, baseUrl?: string): string {
  const base = baseUrl || process.env.SITE_URL || 'http://localhost:3000'
  return `${base}/api/download/${token}`
}

// Validate purchase data
export function validatePurchaseData(data: any): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required')
  }

  if (!data.stripePaymentId || typeof data.stripePaymentId !== 'string') {
    errors.push('Stripe payment ID is required')
  }

  if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) {
    errors.push('Valid amount is required')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs

    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, [])
    }

    const requests = this.requests.get(identifier)!
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => time > windowStart)
    this.requests.set(identifier, validRequests)

    if (validRequests.length >= this.maxRequests) {
      return false
    }

    // Add current request
    validRequests.push(now)
    return true
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const windowStart = now - this.windowMs
    const requests = this.requests.get(identifier) || []
    const validRequests = requests.filter(time => time > windowStart)
    return Math.max(0, this.maxRequests - validRequests.length)
  }

  getResetTime(identifier: string): number {
    const requests = this.requests.get(identifier) || []
    if (requests.length === 0) return 0
    return Math.max(0, requests[0] + this.windowMs - Date.now())
  }
}

// Create global rate limiter instance
export const globalRateLimiter = new RateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
)

// Error handling utilities
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleApiError(error: unknown): {
  message: string
  statusCode: number
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    }
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  }
}

// Environment utilities
export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name]
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is required`)
  }
  return value || defaultValue!
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

// Analytics utilities
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

export function trackPurchase(transactionId: string, value: number, currency: string = 'USD') {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value,
    currency,
  })
}

export function trackDownload(downloadId: string) {
  trackEvent('download', {
    download_id: downloadId,
  })
}

// Type guards
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Async utilities
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))
      
      if (attempt === maxAttempts) {
        throw lastError
      }
      
      await delay(delayMs * attempt)
    }
  }

  throw lastError!
}