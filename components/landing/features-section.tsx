import Image from "next/image";
import {
  Clock,
  QrCode,
  Smartphone,
  Bell,
  BarChart3,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24-Hour Pre-ordering",
    description:
      "Select your meals the day before. Never miss your preferred dish again.",
  },
  {
    icon: QrCode,
    title: "Quick QR Verification",
    description:
      "Show your QR code or CPS number. Get verified and served in seconds.",
  },
  {
    icon: Smartphone,
    title: "USSD for All Phones",
    description:
      "Access everything via USSD. Works on any phone, no internet needed.",
  },
  {
    icon: Bell,
    title: "SMS Notifications",
    description:
      "Get reminded about menu updates, subscription expiry, and more.",
  },
  {
    icon: BarChart3,
    title: "Demand-Based Cooking",
    description:
      "Canteens prepare exact quantities, reducing food waste by up to 40%.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description:
      "Pay safely via M-Pesa, Airtel Money, or bank transfer. Your money is protected.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-muted/30 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-xl">
              <Image
                src="/images/meals-preview.jpg"
                alt="Delicious university meals"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -right-6 rounded-xl border border-border bg-card p-4 shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">5K+</p>
                  <p className="text-xs text-muted-foreground">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">40%</p>
                  <p className="text-xs text-muted-foreground">Less Waste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Students Love{" "}
              <span className="text-primary">Chakula Poa</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built for Tanzanian university students. Modern features that make
              campus dining effortless.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
