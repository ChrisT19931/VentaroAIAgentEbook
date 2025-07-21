// Database types
export interface Purchase {
  id: string
  email: string
  stripePaymentId: string
  stripeSessionId?: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded' | 'expired'
  downloadToken: string
  downloadCount: number
  maxDownloads: number
  firstName?: string
  lastName?: string
  country?: string
  ipAddress?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  downloads: Download[]
}

export interface Download {
  id: string
  purchaseId: string
  ipAddress: string
  userAgent?: string
  downloadedAt: Date
  purchase: Purchase
}

export interface NewsletterSubscriber {
  id: string
  email: string
  firstName?: string
  lastName?: string
  source?: string
  isActive: boolean
  confirmedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface PageView {
  id: string
  page: string
  ipAddress: string
  userAgent?: string
  referrer?: string
  country?: string
  city?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  sessionId?: string
  viewedAt: Date
}

export interface ConversionEvent {
  id: string
  eventType: string
  page: string
  element?: string
  value?: string
  ipAddress: string
  userAgent?: string
  sessionId?: string
  createdAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  ipAddress: string
  userAgent?: string
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface CheckoutFormData {
  email: string
  firstName?: string
  lastName?: string
  newsletterSignup?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

export interface NewsletterFormData {
  email: string
  firstName?: string
  lastName?: string
}

// Stripe types
export interface StripeCheckoutSession {
  id: string
  url: string
  customer_email?: string
  metadata: Record<string, string>
}

export interface StripeWebhookEvent {
  id: string
  type: string
  data: {
    object: any
  }
  created: number
}

// Analytics types
export interface AnalyticsData {
  totalPurchases: number
  totalRevenue: number
  pageViews: number
  conversionEvents: {
    eventType: string
    _count: {
      eventType: number
    }
  }[]
}

export interface ConversionFunnel {
  pageViews: number
  checkoutStarts: number
  checkoutCompletes: number
  downloads: number
  conversionRate: number
}

// Component props types
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'url'
  value?: string
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// SEO types
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
}

// Feature flags
export interface FeatureFlags {
  enableNewsletter: boolean
  enableSocialSharing: boolean
  enableBenefits: boolean
  enableBonusResources: boolean
  enableDiscountCodes: boolean
  enableAffiliate: boolean
}

// Site configuration
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  creator: {
    name: string
    twitter?: string
  }
}

// eBook configuration
export interface EBookConfig {
  title: string
  subtitle: string
  description: string
  price: number
  currency: string
  coverImage: string
  previewPages?: number
  totalPages: number
  fileSize: string
  format: string
  language: string
  isbn?: string
}

// Download configuration
export interface DownloadConfig {
  maxDownloads: number
  expiryHours: number
  allowedFileTypes: string[]
  maxFileSize: number
}

// Email template data
export interface EmailTemplateData {
  customerName: string
  downloadUrl: string
  purchaseId: string
  expiresAt: string
  supportEmail: string
  siteUrl: string
}

// Testimonial types
export interface Testimonial {
  id: string
  name: string
  role?: string
  company?: string
  content: string
  rating: number
  avatar?: string
  verified: boolean
  createdAt: Date
}

// FAQ types
export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
  isPublished: boolean
}

// Social sharing types
export interface SocialShareData {
  url: string
  title: string
  description: string
  hashtags?: string[]
  via?: string
}

// Error types
export interface AppError {
  message: string
  code?: string
  statusCode: number
  details?: Record<string, any>
}

// Utility types
export type Nullable<T> = T | null
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

// API endpoint types
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface APIEndpoint {
  method: HTTPMethod
  path: string
  handler: (request: Request) => Promise<Response>
}

// Rate limiting types
export interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

// Webhook types
export interface WebhookPayload {
  event: string
  data: Record<string, any>
  timestamp: number
  signature: string
}

// File upload types
export interface FileUpload {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'error'
  error?: string
  url?: string
}

// Search types
export interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'faq' | 'resource'
  relevance: number
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

export interface ThemeConfig {
  theme: Theme
  primaryColor: string
  accentColor: string
  fontFamily: string
}

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType
  children?: NavigationItem[]
  external?: boolean
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

// Toast notification types
export interface Toast {
  id: string
  title?: string
  description: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

// Loading state types
export interface LoadingState {
  isLoading: boolean
  error?: string
  data?: any
}

// Pagination types
export interface PaginationConfig {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Filter types
export interface FilterOption {
  label: string
  value: string
  count?: number
}

export interface FilterConfig {
  key: string
  label: string
  type: 'select' | 'multiselect' | 'range' | 'date'
  options?: FilterOption[]
  min?: number
  max?: number
}

// Sort types
export interface SortOption {
  label: string
  value: string
  direction: 'asc' | 'desc'
}

// Global window extensions
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: Record<string, any>[]
  }
}

export {}