import { UserPlus, CreditCard, Utensils, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Register",
    description: "Sign up with your phone number and university registration number. Get your unique CPS number instantly.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: CreditCard,
    title: "2. Subscribe",
    description: "Choose a meal plan that fits your needs. Pay securely via M-Pesa, Airtel Money, or bank transfer.",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    icon: Utensils,
    title: "3. Pre-order",
    description: "Select your preferred meals from tomorrow's menu before 6 PM. Choose breakfast, lunch, or dinner.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: CheckCircle2,
    title: "4. Collect",
    description: "Show your CPS number or scan QR code at the canteen. Get your meal quickly without waiting in line.",
    color: "bg-accent/10 text-accent-foreground",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How <span className="text-primary">Chakula Poa</span> Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in minutes. Four simple steps to hassle-free university meals.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center text-center"
            >
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-border lg:block" />
              )}
              
              {/* Icon */}
              <div className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full ${step.color}`}>
                <step.icon className="h-10 w-10" />
              </div>
              
              {/* Content */}
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* USSD Info Box */}
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">
            No smartphone? No problem!
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            Dial <span className="text-primary">*148*93#</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Access Chakula Poa via USSD on any phone. Subscribe, check balance, and view menus without internet.
          </p>
        </div>
      </div>
    </section>
  );
}
