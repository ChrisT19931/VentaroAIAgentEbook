import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set')
}

// Client-side Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Server-side Supabase client with service role key
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Types for our database tables
export type Database = {
  public: {
    Tables: {
      purchases: {
        Row: {
          id: string
          email: string
          stripe_payment_id: string
          stripe_session_id: string | null
          amount: number
          currency: string
          status: string
          download_token: string
          download_count: number
          max_downloads: number
          first_name: string | null
          last_name: string | null
          country: string | null
          ip_address: string | null
          user_agent: string | null
          referrer: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          created_at: string
          updated_at: string
          expires_at: string | null
        }
        Insert: {
          id?: string
          email: string
          stripe_payment_id: string
          stripe_session_id?: string | null
          amount: number
          currency?: string
          status?: string
          download_token?: string
          download_count?: number
          max_downloads?: number
          first_name?: string | null
          last_name?: string | null
          country?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          stripe_payment_id?: string
          stripe_session_id?: string | null
          amount?: number
          currency?: string
          status?: string
          download_token?: string
          download_count?: number
          max_downloads?: number
          first_name?: string | null
          last_name?: string | null
          country?: string | null
          ip_address?: string | null
          user_agent?: string | null
          referrer?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          created_at?: string
          updated_at?: string
          expires_at?: string | null
        }
      }
      digital_products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          currency: string
          file_url: string
          file_name: string
          file_size: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          currency?: string
          file_url: string
          file_name: string
          file_size?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          currency?: string
          file_url?: string
          file_name?: string
          file_size?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}