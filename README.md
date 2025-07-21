# AI Reality Check - eBook Sales Platform

A modern, high-converting eBook sales platform built with Next.js 14, TypeScript, Stripe, and Prisma. Designed for selling "AI Reality Check: What You Aren't Doing, What You Can Do, What You Will Be Able to Do" at $3 USD.

## 🚀 Features

- **Modern Landing Page** - High-converting design with key benefits and features
- **Secure Payments** - Stripe integration with webhook handling
- **Instant Delivery** - Automated eBook delivery via email
- **Email Marketing** - Newsletter subscription with SendGrid integration
- **Analytics Tracking** - Built-in event tracking and conversion monitoring
- **Mobile Responsive** - Optimized for all devices
- **SEO Optimized** - Meta tags, structured data, and performance optimized```
- **Legal Compliance** - Terms, Privacy Policy, and Purchase Policy pages
```- **Rate Limiting** - Built-in protection against abuse
- **Admin Dashboard** - Contact form management and analytics

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Email**: SendGrid with dynamic templates
- **UI Components**: Radix UI + Custom Components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (test/live)
- Resend account for emails
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd ai-reality-check-ebook
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Required for basic functionality
DATABASE_URL="postgresql://username:password@localhost:5432/ai_reality_check"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
SENDGRID_API_KEY="SG_..."
FROM_EMAIL="noreply@yourdomain.com"
SUPPORT_EMAIL="support@yourdomain.com"
SENDGRID_PURCHASE_TEMPLATE_ID="d-7e4a7874657349d4bdc34d9a64edc5b1"
NEXTAUTH_SECRET="your-secret-here"
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🔧 Configuration

### Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Create a product and price in Stripe Dashboard
4. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
5. Add webhook events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### Email Setup (SendGrid)

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Verify your domain
3. Get your API key
4. Update `SENDGRID_API_KEY`, `FROM_EMAIL`, and `SUPPORT_EMAIL` in environment variables
5. For purchase confirmations:
   - Use the provided template ID: `d-7e4a7874657349d4bdc34d9a64edc5b1`
   - Or create your own dynamic template in SendGrid and update `SENDGRID_PURCHASE_TEMPLATE_ID`
   - The template should use these variables: `{{customerName}}`, `{{downloadUrl}}`, `{{purchaseId}}`, `{{expiresAt}}`, `{{supportEmail}}`, `{{siteUrl}}`

### Database Setup

#### Local PostgreSQL
```bash
# Install PostgreSQL
brew install postgresql  # macOS
sudo apt install postgresql  # Ubuntu

# Create database
createdb ai_reality_check
```

#### Hosted Database (Recommended for Production)
- **Vercel Postgres**: Integrated with Vercel deployment
- **Supabase**: Free tier available
- **PlanetScale**: Serverless MySQL alternative
- **Railway**: Simple PostgreSQL hosting

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── checkout/      # Stripe checkout
│   │   ├── contact/       # Contact form
│   │   ├── download/      # File downloads
│   │   ├── newsletter/    # Email subscription
│   │   └── webhooks/      # Stripe webhooks
│   ├── contact/           # Contact page```
│   ├── privacy/           # Privacy policy```
│   ├── refund/            # Purchase policy (no refunds)
```│   ├── success/           # Post-purchase page
│   ├── terms/             # Terms of service
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── sections/          # Landing page sections
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── email.ts           # Email functions
│   ├── prisma.ts          # Database client
│   ├── stripe.ts          # Stripe client
│   └── utils.ts           # Helper functions
└── types/                 # TypeScript definitions
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables in Vercel**
   Add all variables from `.env.local` to Vercel dashboard:
   - Project Settings → Environment Variables
   - Add each variable individually
   - Redeploy after adding variables

4. **Database Setup**
   ```bash
   # After deployment, run migrations
   npx prisma db push
   ```

5. **Stripe Webhook Configuration**
   - Update webhook URL to: `https://yourdomain.vercel.app/api/webhooks/stripe`
   - Update `STRIPE_WEBHOOK_SECRET` in Vercel

### Deploy to Other Platforms

#### Netlify
```bash
# Build command
npm run build

# Publish directory
out
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

## 🧪 Testing

### Test Payment Flow

1. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0025 0000 3155`

2. Test webhook locally:
   ```bash
   # Install Stripe CLI
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## 📊 Analytics & Monitoring

### Google Analytics
1. Create GA4 property
2. Add `GOOGLE_ANALYTICS_ID` to environment
3. Events are automatically tracked

### Plausible Analytics (Alternative)
1. Add domain to Plausible
2. Set `PLAUSIBLE_DOMAIN` in environment

### Error Monitoring
Consider adding:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **Vercel Analytics**: Performance monitoring

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Input validation implemented
- [ ] SQL injection protection (Prisma)
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Webhook signature verification
- [ ] Download token expiration
- [ ] Admin routes protected

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Error
```bash
# Check database URL format
DATABASE_URL="postgresql://user:password@host:port/database"

# Test connection
npx prisma db pull
```

#### Stripe Webhook Issues
```bash
# Verify webhook secret
echo $STRIPE_WEBHOOK_SECRET

# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

#### Email Delivery Issues
```bash
# Check SendGrid API key
curl -X POST 'https://api.sendgrid.com/v3/mail/send' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json'
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Performance Optimization

1. **Image Optimization**
   - Use Next.js Image component
   - Optimize images before upload
   - Consider WebP format

2. **Database Optimization**
   - Add database indexes
   - Use connection pooling
   - Monitor query performance

3. **Caching**
   - Enable Vercel Edge Caching
   - Use Redis for session storage
   - Implement API response caching

## 📝 Customization

### Branding
1. Update colors in `tailwind.config.js`
2. Replace logo and favicon
3. Update meta tags in `layout.tsx`
4. Customize email templates in `lib/email.ts`

### Content
1. Update eBook details in `src/components/sections/`
2. Modify pricing in `src/components/sections/pricing.tsx`
3. Update testimonials and social proof
4. Customize FAQ content

### Features
1. Add new payment methods
2. Implement affiliate system
3. Add customer dashboard
4. Create admin panel
```
## 📞 Support

- **Documentation**: This README
- **Issues**: GitHub Issues
- **Email**: chris.t@ventarosales.com
```
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🔄 Updates

### Version 1.0.0
- Initial release
- Complete eBook sales platform
- Stripe integration
- Email automation
- Legal pages
- Mobile responsive design

---

**Ready to launch your eBook business? Follow this guide and you'll be selling in minutes!** 🚀