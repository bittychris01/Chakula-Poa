import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Last updated: January 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  By accessing or using Chakula Poa services, including our website, mobile application, and USSD platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Description of Service</h2>
                <p className="leading-relaxed text-muted-foreground">
                  Chakula Poa is a university canteen management platform that enables students to:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Subscribe to meal plans</li>
                  <li>Pre-order meals 24 hours in advance</li>
                  <li>Make payments via mobile money (M-Pesa, Airtel Money) or bank transfer</li>
                  <li>Collect meals using QR codes or CPS numbers</li>
                  <li>Access services via USSD for non-smartphone users</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">3.1 Registration</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    To use Chakula Poa, you must create an account by providing accurate information including your name, phone number, and university details. You are responsible for maintaining the confidentiality of your account credentials.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">3.2 Account Security</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    You are responsible for all activities that occur under your account. Notify us immediately if you suspect unauthorized access. Do not share your account credentials, QR code, or CPS number with others.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">3.3 One Account Policy</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Each student may have only one active Chakula Poa account. Creating multiple accounts to abuse promotions or discounts is prohibited and may result in account termination.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Subscriptions and Payments</h2>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">4.1 Meal Plans</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    We offer various subscription plans (Weekly, Monthly, Semester). Plan details, pricing, and availability may vary by university. All prices are displayed in Tanzanian Shillings (TZS).
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">4.2 Payment Processing</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Payments are processed through Selcom, our authorized payment gateway. We accept M-Pesa, Airtel Money, and bank transfers. Transactions are subject to the terms of your mobile money or banking provider.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">4.3 Subscription Activation</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Subscriptions are activated immediately upon successful payment. You will receive an SMS confirmation with your subscription details.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">4.4 No Automatic Renewal</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Subscriptions do not automatically renew. You will receive reminders before expiry and must manually renew to continue service.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Meal Ordering</h2>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">5.1 Pre-ordering</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Meals must be pre-ordered before 6:00 PM the day before. Orders placed after this deadline cannot be guaranteed.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">5.2 Meal Collection</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Present your QR code or CPS number at the designated canteen during meal service hours. Meals not collected are forfeited and cannot be transferred to another day.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-foreground">5.3 Menu Changes</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Canteens reserve the right to modify menus based on availability. In case of significant changes, alternative options will be provided.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">6. User Conduct</h2>
                <p className="leading-relaxed text-muted-foreground">You agree not to:</p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Share, sell, or transfer your account or meal credits</li>
                  <li>Use the service for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the platform</li>
                  <li>Misrepresent your identity or university affiliation</li>
                  <li>Abuse staff or other users</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
                <p className="leading-relaxed text-muted-foreground">
                  All content, trademarks, and intellectual property on Chakula Poa are owned by us or our licensors. You may not copy, modify, distribute, or create derivative works without our written permission.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
                <p className="leading-relaxed text-muted-foreground">
                  To the maximum extent permitted by law, Chakula Poa shall not be liable for:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of data or unauthorized access</li>
                  <li>Service interruptions or technical failures</li>
                  <li>Actions of third-party payment processors</li>
                  <li>Food quality issues (responsibility lies with the canteen)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">9. Indemnification</h2>
                <p className="leading-relaxed text-muted-foreground">
                  You agree to indemnify and hold Chakula Poa harmless from any claims, damages, or expenses arising from your use of the service or violation of these terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">10. Service Availability</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We strive to maintain 24/7 service availability but do not guarantee uninterrupted access. We may suspend services for maintenance, updates, or circumstances beyond our control.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">11. Termination</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We reserve the right to suspend or terminate your account for violation of these terms, fraudulent activity, or at our discretion. Upon termination, your access to the service will cease, and unused meal credits may be forfeited.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">12. Modifications to Terms</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We may modify these terms at any time. Significant changes will be communicated via SMS or app notification. Continued use after modifications constitutes acceptance of the new terms.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">13. Governing Law</h2>
                <p className="leading-relaxed text-muted-foreground">
                  These terms are governed by the laws of the United Republic of Tanzania. Any disputes shall be resolved in the courts of Dar es Salaam.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">14. Contact Information</h2>
                <p className="leading-relaxed text-muted-foreground">
                  For questions about these Terms of Service, contact us at:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>Email: legal@chakulapoa.co.tz</li>
                  <li>Phone: +255 620 636 893</li>
                  <li>Address: Dar es Salaam, Tanzania</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
