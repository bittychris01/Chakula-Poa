import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    id: "registration",
    title: "Registration & Account",
    questions: [
      {
        q: "How do I create a Chakula Poa account?",
        a: "You can register through our website or mobile app. Simply provide your full name, phone number, university, and registration number (optional). You'll receive your unique CPS number immediately after registration.",
      },
      {
        q: "What is a CPS number?",
        a: "CPS stands for Chakula Poa System. Your CPS number (e.g., CPS#9796) is your unique identifier in the system. You'll use it to verify your identity at the canteen and access your account via USSD.",
        id: "cps",
      },
      {
        q: "Can I change my university after registration?",
        a: "Yes, you can change your university from your profile settings. However, your active subscription will be transferred to the new university if they support Chakula Poa.",
        id: "university",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot password?' on the login page. Enter your phone number, and we'll send you a verification code via SMS to reset your password.",
        id: "password",
      },
      {
        q: "How do I update my profile information?",
        a: "Log in to your dashboard and navigate to 'Profile' or 'Settings'. From there, you can update your name, phone number, and other personal information.",
        id: "profile",
      },
    ],
  },
  {
    id: "payments",
    title: "Subscriptions & Payments",
    questions: [
      {
        q: "What meal plans are available?",
        a: "We offer three main plans: Weekly (7 days), Monthly (30 days), and Semester (full semester). Each plan includes 2 meals per day. Prices vary by university.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept M-Pesa, Airtel Money, and bank transfers through our secure payment partner, Selcom. All payments are processed instantly.",
      },
      {
        q: "How do I renew my subscription?",
        a: "You can renew your subscription before it expires through the app, website, or USSD (*148*93*1#). You'll receive SMS reminders 3 days before expiry.",
        id: "renewal",
      },
      {
        q: "What happens when my subscription expires?",
        a: "You'll no longer be able to pre-order meals or collect food at the canteen. Your account remains active, and you can subscribe again at any time.",
      },
      {
        q: "Can I get a refund?",
        a: "Yes, refunds are available under certain conditions. Please refer to our Refund Policy or contact support within 7 days of purchase for unused meal credits.",
      },
    ],
  },
  {
    id: "ordering",
    title: "Ordering & Meals",
    questions: [
      {
        q: "How does meal pre-ordering work?",
        a: "Each day, the canteen admin posts tomorrow's menu by 12 PM. You can select your preferred meals before 6 PM. This helps the kitchen prepare the exact quantities needed.",
      },
      {
        q: "What is the deadline for selecting meals?",
        a: "The deadline is 6 PM the day before. For example, to get lunch on Monday, you must select your meal by 6 PM on Sunday.",
        id: "deadlines",
      },
      {
        q: "What if I don't select a meal before the deadline?",
        a: "If you don't select a meal, you'll receive a default allocation based on availability. We recommend always pre-ordering to ensure you get your preferred dish.",
      },
      {
        q: "How do I collect my meal at the canteen?",
        a: "Simply show your CPS number or scan your QR code at the serving counter. The staff will verify your order and serve your pre-selected meal.",
        id: "collection",
      },
      {
        q: "Can I change my meal selection after submitting?",
        a: "You can modify your selection until the 6 PM deadline. After that, changes are not possible as the kitchen begins preparation based on the orders received.",
      },
    ],
  },
  {
    id: "qr",
    title: "QR Code & Verification",
    questions: [
      {
        q: "How do I access my QR code?",
        a: "Log in to the app or website and go to 'My QR Code' in your dashboard. You can display it on your phone or take a screenshot for offline use.",
      },
      {
        q: "How does verification work at the canteen?",
        a: "The canteen staff will scan your QR code or enter your CPS number into their system. This verifies your subscription status and today's meal selection.",
        id: "verification",
      },
      {
        q: "What if my QR code isn't working?",
        a: "Try refreshing the QR code in the app. If issues persist, you can always use your CPS number instead. Contact support if the problem continues.",
        id: "qr-issues",
      },
      {
        q: "Can someone else use my QR code?",
        a: "No, your QR code is linked to your account and photo ID (if registered). Staff may ask for verification if there's a mismatch. Sharing accounts violates our terms of service.",
      },
    ],
  },
  {
    id: "ussd",
    title: "USSD Access",
    questions: [
      {
        q: "How do I access Chakula Poa via USSD?",
        a: "Dial *148*93# from any phone. You don't need internet or a smartphone. The USSD menu lets you subscribe, check balance, view menus, and more.",
      },
      {
        q: "What can I do via USSD?",
        a: "Via USSD you can: subscribe to meal plans, check your meal balance, view tomorrow's menu, select meals, and contact support.",
      },
      {
        q: "Is USSD available 24/7?",
        a: "Yes, the USSD service is available 24 hours a day, 7 days a week. However, meal selection is only possible before the 6 PM deadline.",
      },
      {
        q: "Which telecom networks support the USSD code?",
        a: "Our USSD service works on Vodacom, Airtel, Tigo, and Halotel networks in Tanzania.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions about Chakula Poa. Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-12">
              {faqCategories.map((category) => (
                <div key={category.id} id={category.id}>
                  <h2 className="mb-6 text-xl font-bold text-foreground">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.id}-${index}`}
                        id={item.id}
                      >
                        <AccordionTrigger className="text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Still have questions?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our support team is ready to help you.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/help">Visit Help Center</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
