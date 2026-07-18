"use client";

import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { SocialProof } from "@/components/landing/social-proof";
import { Faq } from "@/components/landing/faq";
import { WaitlistWizard } from "@/components/waitlist/waitlist-wizard";

export function LandingClient({ demoVideoUrl }: { demoVideoUrl: string }) {
  function scrollToWaitlist() {
    document
      .getElementById("waitlist")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <Hero onCtaClick={scrollToWaitlist} />

      <div className="px-4 pb-16">
        <WaitlistWizard demoVideoUrl={demoVideoUrl} />
      </div>

      <HowItWorks />
      <SocialProof />
      <Faq />

      <footer className="px-4 py-10 text-center text-xs text-charcoal-400">
        © {new Date().getFullYear()} Mira. All rights reserved.
      </footer>
    </main>
  );
}
