"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Eye,
  Database,
  Lock,
  Clock,
  UserCheck,
  MessageSquare,
  Users,
  FileText,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const sections = [
  {
    id: "introduction",
    icon: FileText,
    title: "Introduction",
    color: "bg-primary/10 text-primary",
    content: `Chakula Poa ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our university canteen management platform, including our website, mobile application, and USSD services.`,
  },
  {
    id: "information-collect",
    icon: Database,
    title: "Information We Collect",
    color: "bg-blue-500/10 text-blue-600",
    subsections: [
      {
        title: "Personal Information",
        items: [
          "Full name",
          "Phone number",
          "Email address (optional)",
          "University name and registration number",
          "Password (encrypted)",
          "Profile photo (optional)",
        ],
      },
      {
        title: "Transaction Information",
        items: [
          "Payment method (M-Pesa, Airtel Money, bank transfer)",
          "Transaction amounts and dates",
          "Subscription history",
          "Meal order history",
        ],
      },
      {
        title: "Usage Information",
        items: [
          "Device information (type, operating system)",
          "IP address and location data",
          "App usage patterns",
          "QR code scan history",
        ],
      },
    ],
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "How We Use Your Information",
    color: "bg-green-500/10 text-green-600",
    items: [
      "Create and manage your Chakula Poa account",
      "Process meal subscriptions and payments",
      "Verify your identity at canteen collection points",
      "Send SMS notifications about menus, orders, and subscription status",
      "Improve our services and develop new features",
      "Generate anonymized analytics for university canteens",
      "Prevent fraud and ensure platform security",
      "Comply with legal obligations",
    ],
  },
  {
    id: "information-sharing",
    icon: Users,
    title: "Information Sharing",
    color: "bg-purple-500/10 text-purple-600",
    partners: [
      {
        name: "University Canteens",
        description: "To facilitate meal preparation and serving",
      },
      {
        name: "Payment Processors",
        description: "Selcom and mobile money providers to process transactions",
      },
      {
        name: "SMS Providers",
        description: "Beem Africa to send notifications",
      },
      {
        name: "University Administrators",
        description: "Anonymized reports and statistics",
      },
    ],
    note: "We do not sell your personal information to third parties.",
  },
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    color: "bg-red-500/10 text-red-600",
    items: [
      "Encrypted data transmission (SSL/TLS)",
      "Secure password hashing",
      "Regular security audits",
      "Access controls and authentication",
      "Database encryption at rest",
    ],
  },
  {
    id: "data-retention",
    icon: Clock,
    title: "Data Retention",
    color: "bg-amber-500/10 text-amber-600",
    content: `We retain your personal information for as long as your account is active or as needed to provide services. Transaction records are kept for 7 years for accounting and legal purposes. You can request account deletion at any time.`,
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "Your Rights",
    color: "bg-teal-500/10 text-teal-600",
    items: [
      "Access your personal data",
      "Correct inaccurate information",
      "Request deletion of your account",
      "Opt out of marketing communications",
      "Export your data",
    ],
  },
  {
    id: "ussd-sms",
    icon: MessageSquare,
    title: "USSD and SMS",
    color: "bg-indigo-500/10 text-indigo-600",
    content: `When using our USSD service (*148*93#), your phone number is used to identify your account.`,
    items: [
      "Account verification",
      "Payment confirmations",
      "Menu notifications",
      "Subscription reminders",
    ],
    note: "Standard SMS rates may apply based on your mobile network provider.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-background py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Shield className="mr-1 h-3 w-3" />
                Your Privacy Matters
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Last updated: January 2026
              </p>
              <p className="mt-6 text-muted-foreground">
                We are committed to protecting your personal information and being transparent about how we use it.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="border-b bg-card py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {sections.slice(0, 6).map((section) => (
                <Link
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-1 rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <section.icon className="h-3.5 w-3.5" />
                  {section.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              {sections.map((section, index) => (
                <Card
                  key={section.id}
                  id={section.id}
                  className="overflow-hidden border-none shadow-lg transition-shadow hover:shadow-xl"
                >
                  <CardHeader className={`${section.color} border-b`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                        <section.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl">
                        {index + 1}. {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {section.content && (
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    )}

                    {section.subsections && (
                      <div className="space-y-6">
                        {section.subsections.map((sub, subIndex) => (
                          <div key={subIndex}>
                            <h4 className="mb-3 font-semibold text-foreground">
                              {index + 1}.{subIndex + 1} {sub.title}
                            </h4>
                            <ul className="grid gap-2 sm:grid-cols-2">
                              {sub.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-muted-foreground"
                                >
                                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.items && !section.subsections && (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {section.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.partners && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {section.partners.map((partner, i) => (
                          <div
                            key={i}
                            className="rounded-lg border bg-muted/30 p-4"
                          >
                            <h5 className="font-medium text-foreground">
                              {partner.name}
                            </h5>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {partner.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.note && (
                      <p className="mt-4 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-700">
                        <strong>Note:</strong> {section.note}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Additional Sections */}
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-pink-500/10 text-pink-600 border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                      <Users className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">
                      9. Children&apos;s Privacy
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are designed for university students (typically 18+). We do not knowingly collect information from children under 18. If you believe a minor has provided us with personal information, please contact us.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-cyan-500/10 text-cyan-600 border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm">
                      <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">
                      10. Changes to This Policy
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy periodically. We will notify you of significant changes via SMS or app notification. Continued use of our services after changes constitutes acceptance of the updated policy.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                      <Mail className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl">11. Contact Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="mb-6 text-muted-foreground">
                    For questions about this Privacy Policy or your personal data, contact us at:
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Link
                      href="mailto:privacy@chakulapoa.co.tz"
                      className="group flex flex-col items-center rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Mail className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">Email</span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        privacy@chakulapoa.co.tz
                      </span>
                    </Link>
                    <Link
                      href="tel:+255620636893"
                      className="group flex flex-col items-center rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Phone className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">Phone</span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        +255 620 636 893
                      </span>
                    </Link>
                    <div className="group flex flex-col items-center rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium">USSD</span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        *148*93*4#
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
