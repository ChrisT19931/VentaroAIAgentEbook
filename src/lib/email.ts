import sgMail from '@sendgrid/mail'

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@yourdomain.com'
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@yourdomain.com'
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000'
const PURCHASE_TEMPLATE_ID = process.env.SENDGRID_PURCHASE_TEMPLATE_ID || 'd-7e4a7874657349d4bdc34d9a64edc5b1'
const LOGIN_TEMPLATE_ID = process.env.SENDGRID_LOGIN_TEMPLATE_ID || 'd-7e4a7874657349d4bdc34d9a64edc5b2' // You'll need to create this template in SendGrid

// Email templates
export const emailTemplates = {
  loginLink: (data: {
    email: string
    loginUrl: string
    expiresAt: string
  }) => ({
    subject: 'Your Login Link for AI Reality Check',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Login Link</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .login-section { background-color: #f1f5f9; border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center; }
            .login-button { display: inline-block; background-color: #F59E0B; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; margin: 20px 0; }
            .login-button:hover { background-color: #EA580C; }
            .warning { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 20px 0; }
            .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 14px; color: #64748b; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .highlight { color: #F59E0B; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AI Reality Check</div>
              <h1>Access Your Purchases</h1>
              <p>Click the link below to access your purchased products</p>
            </div>
            
            <div class="content">
              <p>Hello,</p>
              <p>You requested a login link to access your purchased products. Click the button below to log in:</p>
              
              <div class="login-section">
                <a href="${data.loginUrl}" class="login-button">Log In Now</a>
                <p>This link will expire on ${new Date(data.expiresAt).toLocaleString()}.</p>
              </div>
              
              <div class="warning">
                <p><strong>Important:</strong> If you didn't request this login link, please ignore this email.</p>
              </div>
              
              <p>Thank you for your purchase!</p>
              <p>The AI Reality Check Team</p>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} AI Reality Check. All rights reserved.</p>
              <p>If you need assistance, please contact <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Your Login Link for AI Reality Check

Hello,

You requested a login link to access your purchased products. Please use the link below to log in:

${data.loginUrl}

This link will expire on ${new Date(data.expiresAt).toLocaleString()}.

Important: If you didn't request this login link, please ignore this email.

Thank you for your purchase!
The AI Reality Check Team

© ${new Date().getFullYear()} AI Reality Check. All rights reserved.
If you need assistance, please contact ${SUPPORT_EMAIL}
    `
  }),
  purchaseConfirmation: (data: {
    customerName: string
    downloadUrl: string
    purchaseId: string
    expiresAt: string
  }) => ({
    subject: '🎉 Your AI Reality Check eBook is Ready for Download!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your eBook Download</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .download-section { background-color: #f1f5f9; border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center; }
            .download-button { display: inline-block; background-color: #F59E0B; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; margin: 20px 0; }
            .download-button:hover { background-color: #EA580C; }
            .warning { background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 20px 0; }
            .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 14px; color: #64748b; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .highlight { color: #F59E0B; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AI Reality Check</div>
              <h1>Thank You for Your Purchase!</h1>
              <p>Your journey to AI mastery starts now</p>
            </div>
            
            <div class="content">
              <h2>Hi ${data.customerName},</h2>
              
              <p>Congratulations! You've just taken a crucial step toward understanding and implementing AI in your business. Your copy of <strong>"AI Reality Check: What You Aren't Doing, What You Can Do, What You Will Be Able to Do"</strong> is ready for download.</p>
              
              <div class="download-section">
                <h3>🚀 Download Your eBook Now</h3>
                <p>Click the button below to securely download your eBook:</p>
                <a href="${data.downloadUrl}" class="download-button">Download AI Reality Check eBook</a>
                <p><small>Direct link: <a href="${data.downloadUrl}">${data.downloadUrl}</a></small></p>
              </div>
              
              <div class="warning">
                <h4>⚠️ Important Download Information</h4>
                <ul style="text-align: left; margin: 0;">
                  <li>This download link expires on <span class="highlight">${data.expiresAt}</span></li>
                  <li>You can download the eBook up to <span class="highlight">3 times</span></li>
                  <li>Save the PDF to your device for permanent access</li>
                  <li>Your purchase ID: <code>${data.purchaseId}</code></li>
                </ul>
              </div>
              
              <h3>What's Inside Your eBook:</h3>
              <ul>
                <li>✅ <strong>What You Aren't Doing:</strong> Common AI implementation mistakes and missed opportunities</li>
                <li>✅ <strong>What You Can Do:</strong> Practical steps to start implementing AI today</li>
                <li>✅ <strong>What You Will Be Able to Do:</strong> Future AI capabilities and how to prepare</li>
                <li>✅ <strong>Real-world case studies</strong> and actionable insights</li>
                <li>✅ <strong>Implementation roadmap</strong> for your business</li>
              </ul>
              
              <h3>Need Help?</h3>
              <p>If you have any issues downloading your eBook or questions about the content, don't hesitate to reach out to our support team at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
              
              <p>Thank you for choosing AI Reality Check. We're excited to be part of your AI transformation journey!</p>
              
              <p>Best regards,<br>
              <strong>The AI Reality Check Team</strong></p>
            </div>
            
            <div class="footer">
              <p>This email was sent because you purchased the AI Reality Check eBook.</p>
              <p>If you didn't make this purchase, please contact us immediately at ${SUPPORT_EMAIL}</p>
              <p>&copy; 2024 AI Reality Check. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${data.customerName},
      
      Thank you for purchasing "AI Reality Check: What You Aren't Doing, What You Can Do, What You Will Be Able to Do"!
      
      Download your eBook here: ${data.downloadUrl}
      
      Important:
      - This link expires on ${data.expiresAt}
      - You can download up to 3 times
      - Your purchase ID: ${data.purchaseId}
      
      Need help? Contact us at ${SUPPORT_EMAIL}
      
      Best regards,
      The AI Reality Check Team
    `,
  }),

  newsletterWelcome: (data: { firstName?: string; email: string }) => ({
    subject: 'Welcome to AI Reality Check Updates! 🚀',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to AI Reality Check</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .cta-section { background-color: #f1f5f9; border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center; }
            .cta-button { display: inline-block; background-color: #F59E0B; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 18px; margin: 20px 0; }
            .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 14px; color: #64748b; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AI Reality Check</div>
              <h1>Welcome to the Community!</h1>
            </div>
            
            <div class="content">
              <h2>Hi ${data.firstName || 'there'},</h2>
              
              <p>Welcome to AI Reality Check! You're now part of a community that's serious about understanding and implementing AI effectively.</p>
              
              <p>Here's what you can expect from us:</p>
              <ul>
                <li>🎯 <strong>Practical AI insights</strong> you can implement immediately</li>
                <li>📊 <strong>Real case studies</strong> from successful AI implementations</li>
                <li>🚀 <strong>Early access</strong> to new resources and tools</li>
                <li>💡 <strong>Expert tips</strong> on avoiding common AI pitfalls</li>
              </ul>
              
              <div class="cta-section">
                <h3>Haven't got the eBook yet?</h3>
                <p>Get your copy of "AI Reality Check" for just $3 and start your AI transformation today.</p>
                <a href="${SITE_URL}" class="cta-button">Get the eBook Now</a>
              </div>
              
              <p>We're excited to have you on board!</p>
              
              <p>Best regards,<br>
              <strong>The AI Reality Check Team</strong></p>
            </div>
            
            <div class="footer">
              <p>You're receiving this because you subscribed to AI Reality Check updates.</p>
              <p><a href="${SITE_URL}/unsubscribe?email=${encodeURIComponent(data.email)}">Unsubscribe</a> | <a href="${SITE_URL}/privacy">Privacy Policy</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${data.firstName || 'there'},
      
      Welcome to AI Reality Check! You're now part of a community focused on practical AI implementation.
      
      What to expect:
      - Practical AI insights
      - Real case studies
      - Early access to resources
      - Expert implementation tips
      
      Haven't got the eBook yet? Get it at ${SITE_URL}
      
      Best regards,
      The AI Reality Check Team
    `,
  }),

  contactConfirmation: (data: { name: string; subject?: string }) => ({
    subject: 'We received your message - AI Reality Check Support',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message Received</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); color: white; padding: 40px 30px; text-align: center; }
            .content { padding: 40px 30px; }
            .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 14px; color: #64748b; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AI Reality Check</div>
              <h1>Message Received</h1>
            </div>
            
            <div class="content">
              <h2>Hi ${data.name},</h2>
              
              <p>Thank you for reaching out to us! We've received your message${data.subject ? ` about "${data.subject}"` : ''} and will get back to you within 24 hours.</p>
              
              <p>Our support team is committed to providing you with the best possible assistance.</p>
              
              <p>In the meantime, you might find these resources helpful:</p>
              <ul>
                <li><a href="${SITE_URL}/faq">Frequently Asked Questions</a></li>
                <li><a href="${SITE_URL}">AI Reality Check eBook</a></li>
              </ul>
              
              <p>Best regards,<br>
              <strong>The AI Reality Check Support Team</strong></p>
            </div>
            
            <div class="footer">
              <p>AI Reality Check Support | ${SUPPORT_EMAIL}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Hi ${data.name},
      
      Thank you for reaching out! We've received your message${data.subject ? ` about "${data.subject}"` : ''} and will respond within 24 hours.
      
      Check out our FAQ: ${SITE_URL}/faq
      
      Best regards,
      The AI Reality Check Support Team
    `,
  }),
}

// Send email function
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}) {
  try {
    const msg = {
      to: Array.isArray(to) ? to : [to],
      from: FROM_EMAIL,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML if no text provided
      replyTo: replyTo || SUPPORT_EMAIL,
    }

    const result = await sgMail.send(msg)
    return { result, error: null }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      result: null,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

// Convenience functions for specific email types
export async function sendPurchaseConfirmationEmail(data: {
  email: string
  customerName: string
  downloadUrl: string
  purchaseId: string
  expiresAt: string
}) {
  try {
    // Use SendGrid dynamic template instead of custom HTML
    const msg = {
      to: data.email,
      from: FROM_EMAIL,
      templateId: PURCHASE_TEMPLATE_ID,
      dynamicTemplateData: {
        customerName: data.customerName,
        downloadUrl: data.downloadUrl,
        purchaseId: data.purchaseId,
        expiresAt: data.expiresAt,
        supportEmail: SUPPORT_EMAIL,
        siteUrl: SITE_URL
      },
      replyTo: SUPPORT_EMAIL,
    }

    const result = await sgMail.send(msg)
    return { result, error: null }
  } catch (error) {
    console.error('Error sending purchase confirmation email:', error)
    return {
      result: null,
      error: error instanceof Error ? error.message : 'Failed to send purchase confirmation email',
    }
  }
}

export async function sendNewsletterWelcomeEmail(data: {
  email: string
  firstName?: string
}) {
  const template = emailTemplates.newsletterWelcome(data)
  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  })
}

export async function sendContactConfirmationEmail(data: {
  email: string
  name: string
  subject?: string
}) {
  const template = emailTemplates.contactConfirmation(data)
  return sendEmail({
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  })
}

// Send contact notification to admin
export async function sendContactNotification(data: {
  name: string
  email: string
  subject?: string
  message: string
  messageType?: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn('ADMIN_EMAIL not set, skipping contact notification')
    return { result: null, error: 'Admin email not configured' }
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Message</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0F172A; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background-color: #f8fafc; padding: 20px; border-radius: 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { margin-top: 5px; }
          .message-box { background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #F59E0B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Message - AI Reality Check</h1>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">From:</div>
              <div class="value">${data.name} (${data.email})</div>
            </div>
            
            ${data.subject ? `
            <div class="field">
              <div class="label">Subject:</div>
              <div class="value">${data.subject}</div>
            </div>
            ` : ''}
            
            ${data.messageType ? `
            <div class="field">
              <div class="label">Message Type:</div>
              <div class="value">${data.messageType}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="field">
              <div class="label">Received:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: adminEmail,
    subject: `[AI Reality Check] New Contact: ${data.subject || 'General Inquiry'}`,
    html,
    text: `New Contact Message\n\nFrom: ${data.name} (${data.email})\n${data.subject ? `Subject: ${data.subject}\n` : ''}${data.messageType ? `Type: ${data.messageType}\n` : ''}\nMessage:\n${data.message}\n\nReceived: ${new Date().toLocaleString()}`,
    replyTo: data.email,
  })
}

// Send notification to admin
export async function sendAdminNotification({
  subject,
  message,
  data,
}: {
  subject: string
  message: string
  data?: Record<string, any>
}) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn('ADMIN_EMAIL not set, skipping admin notification')
    return { result: null, error: 'Admin email not configured' }
  }

  const html = `
    <h2>${subject}</h2>
    <p>${message}</p>
    ${data ? `<pre>${JSON.stringify(data, null, 2)}</pre>` : ''}
  `

  return sendEmail({
    to: adminEmail,
    subject: `[AI Reality Check] ${subject}`,
    html,
    text: `${subject}\n\n${message}${data ? `\n\n${JSON.stringify(data, null, 2)}` : ''}`,
  })
}

// Send login link email
export async function sendLoginLink(data: {
  email: string
  loginUrl: string
  expiresAt: string
}) {
  try {
    // Use SendGrid template if available
    if (LOGIN_TEMPLATE_ID) {
      const result = await sgMail.send({
        to: data.email,
        from: FROM_EMAIL,
        templateId: LOGIN_TEMPLATE_ID,
        dynamicTemplateData: {
          email: data.email,
          loginUrl: data.loginUrl,
          expiresAt: new Date(data.expiresAt).toLocaleString(),
          year: new Date().getFullYear(),
          supportEmail: SUPPORT_EMAIL,
          siteUrl: SITE_URL
        },
      })
      return { result, error: null }
    }

    // Fallback to custom template
    const template = emailTemplates.loginLink(data)
    return sendEmail({
      to: data.email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    })
  } catch (error) {
    console.error('Error sending login link email:', error)
    return { 
      result: null, 
      error: error instanceof Error ? error.message : 'Failed to send login email' 
    }
  }
}