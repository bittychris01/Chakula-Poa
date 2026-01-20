import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, QrCode, Clock } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Now Available in Tanzania
            </div>
            
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              University Meals,{" "}
              <span className="text-primary">Made Simple</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
              Subscribe to meal plans, pre-order your meals 24 hours in advance, 
              and collect food using your CPS number or QR code. No more queues, 
              no more waste.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">24hr Advance</p>
                  <p className="text-xs text-muted-foreground">Pre-order meals</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                  <QrCode className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">QR Verified</p>
                  <p className="text-xs text-muted-foreground">Quick collection</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">USSD Access</p>
                  <p className="text-xs text-muted-foreground">Works on any phone</p>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <p className="mt-6 text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">5,000+</span> students across Tanzania
            </p>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-2xl">
              <Image
                src="/images/hero-students.jpg"
                alt="Students enjoying meals at university canteen"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-card p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">30%</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Less Food Waste</p>
                  <p className="text-xs text-muted-foreground">With demand-based prep</p>
                </div>
              </div>
            </div>
            
            {/* Another Floating Element */}
            <div className="absolute -right-4 top-8 rounded-xl border border-border bg-card p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  CPS
                </div>
                <span className="text-sm font-medium text-foreground">#9796</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
