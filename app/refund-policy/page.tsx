import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Refund Policy
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                <CardContent className="p-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <h3 className="mt-4 font-semibold text-green-900 dark:text-green-100">
                    Eligible for Refund
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>Technical errors causing double payment</li>
                    <li>Service unavailable at your university</li>
                    <li>Account created in error (within 24 hours)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
                <CardContent className="p-6">
                  <AlertCircle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  <h3 className="mt-4 font-semibold text-yellow-900 dark:text-yellow-100">
                    Partial Refund
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>Unused meals (pro-rated)</li>
                    <li>University withdrawal (with proof)</li>
                    <li>Medical emergencies (with documentation)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                <CardContent className="p-6">
                  <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  <h3 className="mt-4 font-semibold text-red-900 dark:text-red-100">
                    Not Eligible
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-red-700 dark:text-red-300">
                    <li>Meals already ordered or consumed</li>
                    <li>Change of mind after 7 days</li>
                    <li>Account violations or fraud</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="border-t border-border py-16">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
              <h2>1. Overview</h2>
              <p>
                At Chakula Poa, we strive to provide reliable meal subscription services to university students. This Refund Policy outlines the conditions under which refunds may be granted for subscription payments.
              </p>

              <h2>2. Refund Eligibility</h2>
              <h3>2.1 Full Refund</h3>
              <p>You may be eligible for a full refund in the following cases:</p>
              <ul>
                <li>
                  <strong>Technical Errors:</strong> If you were charged multiple times for the same subscription due to a system error.
                </li>
                <li>
                  <strong>Service Unavailability:</strong> If Chakula Poa services are not available at your university at the time of purchase.
                </li>
                <li>
                  <strong>Account Error:</strong> If you accidentally created an account and subscribed within 24 hours without using any services.
                </li>
              </ul>

              <h3>2.2 Partial Refund (Pro-rated)</h3>
              <p>You may be eligible for a partial refund based on unused meal credits:</p>
              <ul>
                <li>
                  <strong>University Withdrawal:</strong> If you withdraw from your university with official documentation, unused meals may be refunded.
                </li>
                <li>
                  <strong>Medical Emergency:</strong> Extended illness or hospitalization with medical documentation may qualify for a pro-rated refund.
                </li>
                <li>
                  <strong>Relocation:</strong> If you transfer to a university where Chakula Poa is not available.
                </li>
              </ul>

              <h3>2.3 Non-Refundable</h3>
              <p>Refunds will NOT be granted for:</p>
              <ul>
                <li>Meals that have been ordered or served</li>
                <li>Meals that were not collected due to user absence</li>
                <li>Change of mind after 7 days of subscription</li>
                <li>Accounts terminated due to policy violations</li>
                <li>Promotional or discounted subscriptions (unless otherwise stated)</li>
              </ul>

              <h2>3. Refund Request Process</h2>
              <h3>3.1 How to Request</h3>
              <p>To request a refund:</p>
              <ol>
                <li>Contact our support team via email at support-team@chakulapoa.co.tz</li>
                <li>Include your CPS number and phone number</li>
                <li>Provide the transaction reference/receipt</li>
                <li>Explain the reason for your refund request</li>
                <li>Attach any supporting documentation (if applicable)</li>
              </ol>

              <h3>3.2 Processing Time</h3>
              <ul>
                <li>Refund requests are reviewed within 3-5 business days</li>
                <li>Approved refunds are processed within 7-14 business days</li>
                <li>Refunds are issued to the original payment method (M-Pesa, Airtel Money, or bank account)</li>
              </ul>

              <h3>3.3 Refund Amount</h3>
              <p>
                The refund amount is calculated based on:
              </p>
              <ul>
                <li>Original subscription amount</li>
                <li>Number of meals already used or ordered</li>
                <li>Daily rate of your subscription plan</li>
                <li>Processing fee (if applicable, maximum TSh 5,000)</li>
              </ul>

              <h2>4. Cancellation Policy</h2>
              <h3>4.1 Cancellation Window</h3>
              <p>
                You may cancel your subscription within 7 days of purchase for a full refund, provided no meals have been ordered or consumed.
              </p>

              <h3>4.2 How to Cancel</h3>
              <p>
                To cancel your subscription, contact support with your CPS number and reason for cancellation. Note that cancellation does not automatically trigger a refund; you must separately request one.
              </p>

              <h2>5. Disputes</h2>
              <p>
                If you disagree with a refund decision, you may:
              </p>
              <ol>
                <li>Request a review by emailing appeals@chakulapoa.co.tz</li>
                <li>Provide additional documentation supporting your case</li>
                <li>Our team will review and respond within 10 business days</li>
              </ol>

              <h2>6. Special Circumstances</h2>
              <p>
                We understand that exceptional circumstances may arise. In cases of:
              </p>
              <ul>
                <li>Natural disasters affecting university operations</li>
                <li>University closures or strikes</li>
                <li>Pandemic-related disruptions</li>
              </ul>
              <p>
                We will evaluate refund requests on a case-by-case basis and communicate any special policies via SMS and our website.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                For refund inquiries, please contact:
              </p>
              <ul>
                <li>Email: support-team@chakulapoa.co.tz</li>
                <li>Phone: +255 620 636 893</li>
                <li>Response time: Within 24-48 hours</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-foreground">
              Need to request a refund?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our support team is here to help you.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
