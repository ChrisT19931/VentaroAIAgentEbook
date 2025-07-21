import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-slate max-w-none p-8">
            <h2>1. Information We Collect</h2>
            
            <h3>Personal Information</h3>
            <p>
              When you purchase our eBook "AI Reality Check," we collect:
            </p>
            <ul>
              <li>Name and email address (for purchase confirmation and delivery)</li>
              <li>Payment information (processed securely by Stripe)</li>
              <li>IP address and browser information (for security and analytics)</li>
            </ul>

            <h3>Newsletter Subscription</h3>
            <p>
              If you subscribe to our newsletter, we collect:
            </p>
            <ul>
              <li>Email address</li>
              <li>Subscription date and source</li>
              <li>Email engagement data (opens, clicks)</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              We automatically collect certain information when you visit our website:
            </p>
            <ul>
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent</li>
              <li>Referral source</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use the collected information for:
            </p>
            <ul>
              <li><strong>Product Delivery:</strong> To deliver your purchased eBook and send confirmation emails</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries and provide assistance</li>
              <li><strong>Marketing:</strong> To send newsletters and promotional content (with your consent)</li>
              <li><strong>Analytics:</strong> To understand how our website is used and improve our services</li>
              <li><strong>Security:</strong> To prevent fraud and protect our platform</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            
            <h3>Service Providers</h3>
            <ul>
              <li><strong>Stripe:</strong> For payment processing (subject to Stripe's privacy policy)</li>
              <li><strong>Resend:</strong> For email delivery (subject to Resend's privacy policy)</li>
              <li><strong>Analytics Providers:</strong> For website analytics (anonymized data)</li>
              <li><strong>Cloud Storage:</strong> For secure file storage and delivery</li>
            </ul>

            <h3>Legal Requirements</h3>
            <p>
              We may disclose your information if required by law or in response to valid legal requests.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information:
            </p>
            <ul>
              <li>SSL encryption for all data transmission</li>
              <li>Secure payment processing through Stripe</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Data backup and recovery procedures</li>
            </ul>

            <h2>5. Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar technologies to:
            </p>
            <ul>
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage</li>
              <li>Improve user experience</li>
              <li>Prevent fraud and enhance security</li>
            </ul>
            <p>
              You can control cookies through your browser settings, but some features may not work properly if cookies are disabled.
            </p>

            <h2>6. Your Rights and Choices</h2>
            
            <h3>Access and Correction</h3>
            <p>
              You have the right to access and correct your personal information. Contact us to request access or make corrections.
            </p>

            <h3>Email Communications</h3>
            <p>
              You can unsubscribe from our newsletter at any time by:
            </p>
            <ul>
              <li>Clicking the unsubscribe link in any email</li>
              <li>Contacting us directly at chris.t@ventarosales.com</li>
            </ul>

            <h3>Data Deletion</h3>
            <p>
              You can request deletion of your personal information, subject to legal and business requirements.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain your information for as long as necessary to:
            </p>
            <ul>
              <li>Provide our services and support</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p>
              Purchase records are typically retained for 7 years for tax and legal purposes.
            </p>

            <h2>8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>10. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.
            </p>

            <h2>11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul>
              <li>Posting the updated policy on our website</li>
              <li>Sending an email notification (for significant changes)</li>
              <li>Updating the "Last updated" date at the top of this policy</li>
            </ul>

            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> chris.t@ventarosales.com</li>
              <li><strong>Support:</strong> chris.t@ventarosales.com</li>
              <li><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact Page</Link></li>
            </ul>

            <h2>13. GDPR Compliance (EU Residents)</h2>
            <p>
              If you are a resident of the European Union, you have additional rights under the General Data Protection Regulation (GDPR):
            </p>
            <ul>
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided above.
            </p>

            <h2>14. California Privacy Rights (CCPA)</h2>
            <p>
              If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul>
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>
            <p>
              Note: We do not sell personal information to third parties.
            </p>

            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-0">
                <strong>Note:</strong> This privacy policy is provided as a template. Please consult with a legal professional to ensure it meets your specific business needs and complies with applicable privacy laws in your jurisdiction.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="outline" size="lg">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}