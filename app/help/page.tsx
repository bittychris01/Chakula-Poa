import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Smartphone,
  CreditCard,
  Utensils,
  UserPlus,
  QrCode,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const helpCategories = [
  {
    icon: UserPlus,
    title: "Getting Started",
    description: "Learn how to register and set up your account",
    links: [
      { label: "How to create an account", href: "/faq#registration" },
      { label: "Getting your CPS number", href: "/faq#cps" },
      { label: "Setting up your profile", href: "/faq#profile" },
    ],
  },
  {
    icon: CreditCard,
    title: "Subscriptions & Payments",
    description: "Everything about meal plans and payments",
    links: [
      { label: "Available meal plans", href: "/#plans" },
      { label: "Payment methods", href: "/faq#payments" },
      { label: "Renewing subscriptions", href: "/faq#renewal" },
    ],
  },
  {
    icon: Utensils,
    title: "Ordering Meals",
    description: "How to pre-order and collect your meals",
    links: [
      { label: "Pre-ordering process", href: "/faq#ordering" },
      { label: "Meal selection deadlines", href: "/faq#deadlines" },
      { label: "Collecting your meal", href: "/faq#collection" },
    ],
  },
  {
    icon: Smartphone,
    title: "USSD Access",
    description: "Using Chakula Poa on any phone",
    links: [
      { label: "Complete USSD guide", href: "/ussd-guide" },
      { label: "USSD codes reference", href: "/ussd-guide#codes" },
      { label: "Troubleshooting USSD", href: "/ussd-guide#troubleshooting" },
    ],
  },
  {
    icon: QrCode,
    title: "QR Code & Verification",
    description: "Using your QR code at the canteen",
    links: [
      { label: "Accessing your QR code", href: "/faq#qr" },
      { label: "Verification process", href: "/faq#verification" },
      { label: "QR code not working", href: "/faq#qr-issues" },
    ],
  },
  {
    icon: HelpCircle,
    title: "Account & Settings",
    description: "Managing your Chakula Poa account",
    links: [
      { label: "Updating your profile", href: "/faq#profile" },
      { label: "Changing university", href: "/faq#university" },
      { label: "Password reset", href: "/faq#password" },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Help Center
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Find answers to common questions and learn how to get the most out of Chakula Poa.
            </p>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {helpCategories.map((category) => (
                <Card key={category.title} className="flex flex-col">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {category.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Quick Links
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link href="/faq">
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <HelpCircle className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">FAQ</p>
                      <p className="text-sm text-muted-foreground">
                        Frequently asked questions
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/ussd-guide">
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Smartphone className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">USSD Guide</p>
                      <p className="text-sm text-muted-foreground">
                        Access without internet
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/contact">
                <Card className="cursor-pointer transition-shadow hover:shadow-md">
                  <CardContent className="flex items-center gap-4 p-6">
                    <MessageCircle className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">Contact Us</p>
                      <p className="text-sm text-muted-foreground">
                        Get in touch with support
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Still need help?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Our support team is ready to assist you.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                or call <span className="font-semibold text-foreground">+255 620 636 893</span>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
