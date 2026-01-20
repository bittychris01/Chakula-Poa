import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section id="contact" className="bg-primary py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Transform Your Campus Dining?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Join thousands of students who have already made the switch. 
            No more long queues, no more missed meals.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="bg-card text-foreground hover:bg-card/90"
              asChild
            >
              <Link href="/register">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="#plans">View Pricing</Link>
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-primary-foreground/60">
                For Students
              </p>
              <p className="mt-1 text-primary-foreground">
                Download the app or dial *148*93#
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-primary-foreground/60">
                For Universities
              </p>
              <p className="mt-1 text-primary-foreground">
                support-team@chakulapoa.co.tz
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-primary-foreground/60">
                Support
              </p>
              <p className="mt-1 text-primary-foreground">
                +255 620 636 893
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
