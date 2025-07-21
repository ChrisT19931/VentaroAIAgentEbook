import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, Mail, AlertCircle } from 'lucide-react'

export default function RefundPage() {
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
            No Refunds Policy
          </h1>
          <p className="text-slate-300">
            All Sales Are Final
          </p>
        </div>

        {/* No Refunds Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-red-100 text-red-800 px-6 py-3 rounded-full">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">All Digital Sales Are Final</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">No Refunds</h3>
              <p className="text-sm text-slate-600">All sales are final upon purchase</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Technical Support</h3>
              <p className="text-sm text-slate-600">We help with download issues only</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Instant Access</h3>
              <p className="text-sm text-slate-600">Immediate download after payment</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="prose prose-slate max-w-none p-8">
            <h2>No Refunds Policy</h2>
            <p>
              <strong>ALL SALES ARE FINAL.</strong> Due to the digital nature of "AI Reality Check: What You Aren't Doing, What You Can Do, What You Will Be Able to Do," we do not offer refunds, returns, or exchanges under any circumstances.
            </p>

            <h2>Why No Refunds?</h2>
            <p>
              Digital products are delivered instantly and cannot be "returned" like physical goods. Once you have access to the content, the value has been delivered. This policy ensures:
            </p>
            <ul>
              <li>Fair pricing for all customers</li>
              <li>Protection against digital piracy</li>
              <li>Sustainable business operations</li>
              <li>Clear expectations before purchase</li>
            </ul>

            <h2>Before You Purchase</h2>
            <p>
              Please carefully consider your purchase before completing payment:
            </p>
            <ol>
              <li><strong>Read the product description</strong> thoroughly</li>
              <li><strong>Understand what you're getting:</strong>
                <ul>
                  <li>Digital eBook in PDF format</li>
                  <li>Immediate download access</li>
                  <li>30-day download window</li>
                  <li>Maximum 3 downloads</li>
                </ul>
              </li>
              <li><strong>Accept that all sales are final</strong> before clicking "Purchase"</li>
            </ol>

            <div className="bg-red-50 p-4 rounded-lg my-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">Important Notice</h4>
                  <p className="text-sm text-red-700 mb-0">
                    By completing your purchase, you acknowledge and agree to this no-refunds policy. Please ensure you understand what you're purchasing before proceeding.
                  </p>
                </div>
              </div>
            </div>

            <h2>Technical Support Available</h2>
            <p>
              While we don't offer refunds, we do provide technical support for:
            </p>
            <ul>
              <li><strong>Download Issues:</strong> If you can't access your download link</li>
              <li><strong>File Problems:</strong> If the PDF file is corrupted or won't open</li>
              <li><strong>Email Delivery:</strong> If you didn't receive your purchase confirmation</li>
              <li><strong>Account Access:</strong> If you need help accessing your purchase</li>
            </ul>

            <h2>What You Get With Your Purchase</h2>
            <p>
              Your purchase includes:
            </p>
            <ul>
              <li>Immediate access to the complete eBook</li>
              <li>Email confirmation with download instructions</li>
              <li>30 days to download your files</li>
              <li>Up to 3 download attempts</li>
              <li>Technical support for download issues</li>
            </ul>

            <h2>Legal Compliance</h2>
            
            <h3>Australian Consumer Law</h3>
            <p>
              This no-refunds policy is subject to Australian Consumer Law. Under the Competition and Consumer Act 2010 (Cth), you may still have rights to a remedy if the digital product:
            </p>
            <ul>
              <li>Is not of acceptable quality</li>
              <li>Does not match the description provided</li>
              <li>Is not fit for the purpose disclosed</li>
            </ul>

            <h3>Fraudulent Purchases</h3>
            <p>
              We reserve the right to investigate and take action against purchases that appear fraudulent or violate our terms of service.
            </p>

            <h3>Chargebacks</h3>
            <p>
              If you initiate a chargeback through your bank or credit card company, please contact us first at chris.t@ventarosales.com. We prefer to resolve any technical issues directly rather than through the chargeback process.
            </p>

            <h2>Our Commitment to Quality</h2>
            <p>
              While we don't offer refunds, we are committed to providing:
            </p>
            <ul>
              <li>High-quality, valuable content</li>
              <li>Accurate product descriptions</li>
              <li>Reliable download delivery</li>
              <li>Responsive technical support</li>
            </ul>

            <h2>Contact Information</h2>
            <p>
              For technical support or questions about this policy:
            </p>
            <ul>
              <li><strong>Technical Support:</strong> <a href="mailto:chris.t@ventarosales.com" className="text-blue-600 hover:text-blue-800">chris.t@ventarosales.com</a></li>
              <li><strong>Contact Form:</strong> <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact Page</Link></li>
            </ul>

            <h2>Policy Updates</h2>
            <p>
              This no-refunds policy may be updated from time to time. Any changes will be posted on this page with an updated date. The policy in effect at the time of your purchase will apply to your transaction.
            </p>

            <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-amber-800 font-semibold mb-3">Before You Buy</h3>
              <p className="text-amber-700 mb-0">
                Please carefully review the product description and this policy before purchasing. All sales are final, and we want to ensure you understand exactly what you're getting before you buy.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <div className="space-y-4">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Mail className="w-4 h-4 mr-2" />
                Get Technical Support
              </Button>
            </Link>
            <div>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}