import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Weekly",
    description: "Perfect for trying out",
    price: "50,000",
    duration: "7 days",
    mealsPerDay: 2,
    features: [
      "2 meals per day",
      "Breakfast & Lunch OR Lunch & Dinner",
      "Pre-order 24 hours ahead",
      "QR code verification",
      "SMS notifications",
    ],
    popular: false,
  },
  {
    name: "Monthly",
    description: "Most popular choice",
    price: "150,000",
    duration: "30 days",
    mealsPerDay: 2,
    features: [
      "2 meals per day",
      "All meal times available",
      "Pre-order 24 hours ahead",
      "QR code verification",
      "SMS notifications",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Semester",
    description: "Best value for money",
    price: "400,000",
    duration: "Full semester",
    mealsPerDay: 2,
    features: [
      "2 meals per day",
      "All meal times available",
      "Pre-order 24 hours ahead",
      "QR code verification",
      "SMS notifications",
      "Priority support",
      "10% discount applied",
    ],
    popular: false,
  },
];

export function PlansSection() {
  return (
    <section id="plans" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose a plan that works for you. All prices in Tanzanian Shillings (TZS).
          </p>
        </div>

        {/* Plans Grid */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg ring-1 ring-primary"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="text-center">
                  <span className="text-4xl font-bold text-foreground">
                    TSh {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.duration}</span>
                </div>
                
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Secure payments via
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <span className="font-semibold text-primary">M-Pesa</span>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <span className="font-semibold text-foreground">Airtel Money</span>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <span className="font-semibold text-muted-foreground">Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
