import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Ventaro AI: 2025 Edition - Money-Making AI Prompts',
    template: '%s | Ventaro AI 2025'
  },
  description: 'Get the 2025 Edition of money-making AI prompts. 10 pages of concise, actionable strategies to generate revenue with AI. Only $3.',
  keywords: [
    'AI prompts',
    'money-making AI',
    'AI revenue',
    'business AI',
    'AI 2025',
    'practical AI prompts',
    'AI income',
    'AI business strategies'
  ],
  authors: [{ name: 'Ventaro AI' }],
  creator: 'Ventaro AI',
  publisher: 'Ventaro AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Ventaro AI: 2025 Edition - Money-Making AI Prompts',
    description: 'Get the 2025 Edition of money-making AI prompts. 10 pages of concise, actionable strategies to generate revenue with AI. Only $3.',
    siteName: 'Ventaro AI',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Ventaro AI 2025 Edition Cover',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ventaro AI: 2025 Edition - Money-Making AI Prompts',
    description: 'Get the 2025 Edition of money-making AI prompts. 10 pages of concise, actionable strategies to generate revenue with AI. Only $3.',
    images: ['/og-image.svg'],
    creator: '@ventarosales',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="msapplication-TileColor" content="#0F172A" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
        <Analytics />
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          />
        )}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}