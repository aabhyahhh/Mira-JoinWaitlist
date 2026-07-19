"use client";

import { WaitlistWizard } from "@/components/waitlist/waitlist-wizard";
import { MorphTrack } from "@/components/story/morph-track";
import { RoomEnvironment } from "@/components/story/room-environment";
import { WaitlistReveal } from "@/components/story/waitlist-reveal";
import { BeatApartment } from "@/components/story/beat-apartment";
import { BeatOverwhelm } from "@/components/story/beat-overwhelm";
import { BeatMiraAnswers } from "@/components/story/beat-mira-answers";
import { BeatScaling } from "@/components/story/beat-scaling";
import { BeatWorkflow } from "@/components/story/beat-workflow";
import { BeatMorning } from "@/components/story/beat-morning";

export function LandingClient({ demoVideoUrl }: { demoVideoUrl: string }) {
  return (
    <main>
      <MorphTrack>
        <RoomEnvironment />
        <BeatApartment index={0} />
        <BeatOverwhelm index={1} />
        <BeatMiraAnswers index={2} />
        <BeatScaling index={3} />
        <BeatWorkflow index={4} />
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
