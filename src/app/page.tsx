import { LandingClient } from "@/components/landing/landing-client";

export default function Home() {
  const demoVideoUrl = process.env.DEMO_VIDEO_URL || "/demo-video-placeholder.mp4";

  return <LandingClient demoVideoUrl={demoVideoUrl} />;
}
