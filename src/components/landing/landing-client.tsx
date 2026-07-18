"use client";

import { SiteHeader } from "@/components/landing/site-header";
import { WaitlistWizard } from "@/components/waitlist/waitlist-wizard";
import { MorphTrack } from "@/components/story/morph-track";
import { WaitlistReveal } from "@/components/story/waitlist-reveal";
import { BeatRinging } from "@/components/story/beat-ringing";
import { BeatCallInterface } from "@/components/story/beat-call-interface";
import { BeatConversation } from "@/components/story/beat-conversation";
import { BeatQualifiedLead } from "@/components/story/beat-qualified-lead";
import { BeatDashboard } from "@/components/story/beat-dashboard";
import { BeatMorning } from "@/components/story/beat-morning";

export function LandingClient({ demoVideoUrl }: { demoVideoUrl: string }) {
  return (
    <main>
      <SiteHeader />

      <MorphTrack>
        <BeatRinging index={0} />
        <BeatCallInterface index={1} />
        <BeatConversation index={2} />
        <BeatQualifiedLead index={3} />
        <BeatDashboard index={4} />
        <BeatMorning index={5} />
      </MorphTrack>

      <WaitlistReveal>
        <WaitlistWizard demoVideoUrl={demoVideoUrl} />
      </WaitlistReveal>

      <footer className="px-4 py-10 text-center text-xs text-ink-400">
        © {new Date().getFullYear()} Mira. All rights reserved.
      </footer>
    </main>
  );
}
