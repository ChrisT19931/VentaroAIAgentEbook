# AI Reality Check - Complete Setup Guide

This guide will walk you through setting up the complete digital product delivery system with Stripe payments, Supabase database, and SendGrid email integration.

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Stripe account
- A SendGrid account
- Your digital product file (PDF)

## 1. Environment Setup

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in all the environment variables (see sections below)

## 2. Supabase Setup

### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready
3. Go to Settings > API to get your keys

### Update Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."
```

### Database Setup
1. Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

2. Generate Prisma client:
```bash
npx prisma generate
```

### File Storage Setup
1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `digital-products`
3. Set the bucket to public or configure RLS policies
4. Upload your PDF file to the bucket
5. Note the file path for the next step

## 3. Seed Initial Product

1. Install dependencies:
```bash
npm install
```

2. Run the seed script:
```bash
node scripts/seed-products.js
```

3. Update the product's file_url in Supabase to match your uploaded file path

## 4. Stripe Setup

### Get API Keys
1. Go to [stripe.com](https://stripe.com) and log in
2. Go to Developers > API keys
3. Copy your publishable and secret keys

### Update Environment Variables
```env
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### Webhook Setup
1. Go to Developers > Webhooks in Stripe
2. Click "Add endpoint"
3. Set the URL to: `https://yourdomain.com/api/webhooks/stripe`
4. Select these events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Copy the webhook signing secret

### Update Environment Variables
```env
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 5. SendGrid Setup

### Get API Key
1. Go to [sendgrid.com](https://sendgrid.com) and log in
2. Go to Settings > API Keys
3. Create a new API key with full access
4. Copy the API key

### Update Environment Variables
```env
SENDGRID_API_KEY="SG..."
SENDGRID_FROM_EMAIL="noreply@yourdomain.com"
```

### Verify Sender
1. Go to Settings > Sender Authentication
2. Verify your sender email address
3. Update the `SENDGRID_FROM_EMAIL` to match

## 6. Application Setup

### Update App URL
```env
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

## 7. Testing

### Test Purchase Flow
1. Go to your local development site
2. Click the purchase button
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete the checkout
5. Verify you receive the confirmation email
6. Test the download link

### Test Cards
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

## 8. Production Deployment

### Environment Variables
1. Update all URLs to production domains
2. Use production Stripe keys
3. Use production Supabase project
4. Verify SendGrid sender domain

### Webhook URL
Update your Stripe webhook URL to point to your production domain:
`https://yourdomain.com/api/webhooks/stripe`

## Support

If you encounter any issues during setup:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure your Supabase database is properly migrated
4. Test your Stripe webhook with Stripe CLI
5. Contact support: chris.t@ventarosales.com

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── checkout/          # Stripe checkout sessions
│   │   ├── download/          # Secure download handling
│   │   ├── products/          # Product management
│   │   └── webhooks/stripe/   # Stripe webhook handler
│   ├── success/               # Post-purchase page
│   └── page.tsx              # Main landing page
├── lib/
│   ├── email.ts              # SendGrid email functions
│   ├── supabase.ts           # Supabase client setup
│   └── stripe.ts             # Stripe configuration
└── components/
    └── sections/
        ├── pricing.tsx       # Pricing section with purchase button
        └── ...
```

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive data
- Verify webhook signatures in production
- Implement proper error handling
- Monitor download limits and expiration
- Use HTTPS in production

## Next Steps

1. Customize the email templates in `src/lib/email.ts`
2. Add more products to your catalog
3. Implement customer dashboard
4. Add analytics and tracking
5. Set up monitoring and alerts