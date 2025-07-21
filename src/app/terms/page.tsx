import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-slate-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-slate max-w-none p-8">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By purchasing and downloading "AI Reality Check: What You Aren't Doing, What You Can Do, What You Will Be Able to Do" (the "Product"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not purchase or use the Product.
            </p>

            <h2>2. Product Description</h2>
            <p>
              The Product is a digital eBook that provides guidance on artificial intelligence implementation and strategy. The Product includes:
            </p>
            <ul>
              <li>Main eBook in PDF format</li>
              <li>AI Tools Checklist (bonus material)</li>
              <li>Quick Start Guide (bonus material)</li>
              <li>Future updates (when available)</li>
            </ul>

            <h2>3. License and Usage Rights</h2>
            <p>
              Upon purchase, you are granted a non-exclusive, non-transferable license to:
            </p>
            <ul>
              <li>Download and read the Product for personal or business use</li>
              <li>Print one copy for personal use</li>
              <li>Access future updates at no additional cost</li>
            </ul>
            <p>
              You may NOT:
            </p>
            <ul>
              <li>Redistribute, resell, or share the Product</li>
              <li>Create derivative works based on the Product</li>
              <li>Remove copyright notices or attribution</li>
              <li>Use the Product for any illegal purposes</li>
            </ul>

            <h2>4. Payment and Pricing</h2>
            <p>
              The current price of the Product is $3.00 USD. This is an introductory price and may change at any time. Payment is processed securely through Stripe. All sales are final, as stated in our No Refunds Policy.
            </p>

            <h2>5. Download and Access</h2>
            <p>
              After successful payment:
            </p>
            <ul>
              <li>You will receive an email with download instructions</li>
              <li>Download links are valid for 30 days from purchase</li>
              <li>You may download the Product up to 3 times</li>
              <li>We recommend downloading and saving the Product immediately</li>
              <li>No additional downloads will be provided after the limit is reached</li>
            </ul>

            <h2>6. No Refunds Policy</h2>
            <p>
              <strong>ALL SALES ARE FINAL.</strong> Due to the digital nature of the Product and immediate access upon purchase, we do not offer refunds, returns, or exchanges under any circumstances. By purchasing the Product, you acknowledge and agree that:
            </p>
            <ul>
              <li>You have read and understood the product description</li>
              <li>The Product will be immediately available for download</li>
              <li>No refunds will be provided for any reason</li>
              <li>This policy applies regardless of whether you download or access the Product</li>
            </ul>
            <p>
              If you experience technical issues with downloading the Product, please contact our support team at chris.t@ventarosales.com for assistance.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              The Product and all content therein are protected by copyright and other intellectual property laws. All rights, title, and interest in the Product remain with the author and publisher.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              The Product is provided "as is" without any warranties, express or implied. We do not guarantee that the information in the Product will meet your specific needs or that it will be error-free.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by Australian law, our total liability to you for any claims arising out of or relating to these Terms or the Product shall not exceed the amount you paid for the Product. In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Product, even if we have been advised of the possibility of such damages.
            </p>
            <p>
              Nothing in these Terms excludes, restricts or modifies any guarantee, condition, warranty, right or remedy which you may have under the Competition and Consumer Act 2010 (Cth) or any similar state or territory legislation and which cannot be excluded, restricted or modified ("Non-excludable Rights"). To the maximum extent permitted by law, our liability is limited, at our option, to:
            </p>
            <ul>
              <li>The re-supply of the Product; or</li>
              <li>The payment of the cost of having the Product re-supplied</li>
            </ul>

            <h2>10. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Product, to understand our practices.
            </p>

            <h2>11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Product after any changes constitutes acceptance of the new Terms.
            </p>

            <h2>12. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Victoria, Australia. Any disputes arising out of or relating to these Terms or the Product shall be subject to the exclusive jurisdiction of the courts of Melbourne, Victoria, Australia.
            </p>
            <p>
              If you are accessing this Product from outside Australia, you agree that any legal action or proceeding must be brought in the courts of Melbourne, Victoria, Australia, and you consent to the jurisdiction of such courts.
            </p>

            <h2>13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>Email: chris.t@ventarosales.com</li>
              <li>Contact Form: <Link href="/contact" className="text-blue-600 hover:text-blue-800">Contact Page</Link></li>
            </ul>

            <h2>14. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
            </p>

            <div className="mt-8 p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-600 mb-0">
                <strong>Note:</strong> These terms are provided as a template. Please consult with a legal professional to ensure they meet your specific business needs and comply with applicable laws in your jurisdiction.
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