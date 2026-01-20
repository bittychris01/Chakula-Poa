import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Hash,
  CreditCard,
  Utensils,
  User,
  HelpCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const ussdMenus = [
  {
    code: "*148*93#",
    title: "Main Menu",
    description: "Access the main Chakula Poa menu",
    options: [
      "1. Subscribe for Meals",
      "2. Check Meal Balance",
      "3. View Tomorrow's Menu",
      "4. Help/Contact Support",
      "5. Exit",
    ],
  },
  {
    code: "*148*93*1#",
    title: "Subscribe",
    description: "Direct access to subscription options",
    options: [
      "1. 1 Meal per Day",
      "2. 2 Meals per Day",
      "3. View Meal Plans",
    ],
  },
  {
    code: "*148*93*2#",
    title: "Check Balance",
    description: "View your subscription status",
    options: [
      "Shows your CPS number",
      "Current plan details",
      "Remaining meals",
      "Expiry date",
    ],
  },
  {
    code: "*148*93*3#",
    title: "View Menu",
    description: "See tomorrow's available meals",
    options: [
      "Breakfast options",
      "Lunch options",
      "Dinner options",
      "Select your preference",
    ],
  },
];

const subscriptionCodes = [
  { code: "*148*93*1*1*1#", description: "7 Days - 1 Meal/Day - TSh 14,000" },
  { code: "*148*93*1*1*2#", description: "30 Days - 1 Meal/Day - TSh 50,000" },
  { code: "*148*93*1*1*3#", description: "Full Semester - 1 Meal/Day - TSh 150,000" },
  { code: "*148*93*1*2*1#", description: "7 Days - 2 Meals/Day - TSh 25,000" },
  { code: "*148*93*1*2*2#", description: "30 Days - 2 Meals/Day - TSh 90,000" },
  { code: "*148*93*1*2*3#", description: "Full Semester - 2 Meals/Day - TSh 280,000" },
];

const troubleshooting = [
  {
    issue: "USSD session times out",
    solution: "USSD sessions last 5 minutes. If it times out, dial *148*93# again to start over.",
  },
  {
    issue: "Code not working",
    solution: "Ensure you're dialing the exact code including all asterisks (*) and the hash (#) at the end.",
  },
  {
    issue: "Payment not going through",
    solution: "Ensure you have sufficient balance in your mobile money account. Wait for the M-Pesa/Airtel Money prompt.",
  },
  {
    issue: "Menu not loading",
    solution: "This could be a network issue. Try again after a few minutes or contact your telecom provider.",
  },
];

export default function UssdGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              USSD Guide
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Access Chakula Poa on any phone without internet. Just dial the code and follow the prompts.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold text-primary-foreground">
              <Hash className="h-5 w-5" />
              *148*93#
            </div>
          </div>
        </section>

        {/* Main Menus */}
        <section className="py-16" id="codes">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground">
              USSD Menu Options
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Navigate through these menus to access all Chakula Poa features
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {ussdMenus.map((menu) => (
                <Card key={menu.code}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{menu.title}</CardTitle>
                      <code className="rounded bg-muted px-2 py-1 text-sm font-mono text-primary">
                        {menu.code}
                      </code>
                    </div>
                    <CardDescription>{menu.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {menu.options.map((option, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ArrowRight className="h-3 w-3 text-primary" />
                          {option}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Subscription Codes */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Quick Subscription Codes
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Dial these codes directly to subscribe to a specific plan
            </p>

            <div className="mx-auto mt-12 max-w-3xl">
              <Card>
                <CardContent className="divide-y divide-border p-0">
                  {subscriptionCodes.map((sub) => (
                    <div
                      key={sub.code}
                      className="flex items-center justify-between p-4"
                    >
                      <code className="rounded bg-primary/10 px-2 py-1 text-sm font-mono text-primary">
                        {sub.code}
                      </code>
                      <span className="text-sm text-muted-foreground">
                        {sub.description}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground">
              How to Use USSD
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Follow these simple steps
            </p>

            <div className="mx-auto mt-12 max-w-2xl space-y-6">
              {[
                {
                  step: 1,
                  title: "Dial the Code",
                  description: "Open your phone's dialer and enter *148*93#, then press call.",
                },
                {
                  step: 2,
                  title: "Select an Option",
                  description: "Use your phone's keypad to enter the number corresponding to your choice.",
                },
                {
                  step: 3,
                  title: "Follow the Prompts",
                  description: "The system will guide you through each step. Enter requested information when prompted.",
                },
                {
                  step: 4,
                  title: "Complete Payment",
                  description: "When subscribing, you'll receive an M-Pesa or Airtel Money prompt. Enter your PIN to confirm.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="border-t border-border bg-muted/30 py-16" id="troubleshooting">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold text-foreground">
              Troubleshooting
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Common issues and how to resolve them
            </p>

            <div className="mx-auto mt-12 max-w-3xl space-y-4">
              {troubleshooting.map((item) => (
                <Card key={item.issue}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">{item.issue}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground">Still having issues?</p>
              <Button className="mt-4" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
