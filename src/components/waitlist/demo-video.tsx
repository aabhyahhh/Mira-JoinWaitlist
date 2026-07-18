"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Play } from "lucide-react";

import { cn } from "@/lib/utils";

export function DemoVideo({
  src,
  poster,
  onPlayStateChange,
}: {
  src: string;
  poster: string;
  onPlayStateChange?: (playing: boolean) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  function handlePlayClick() {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }

  if (hasError) {
    return (
      <div className="flex aspect-[9/16] w-full max-w-xs flex-col items-center justify-center gap-4 rounded-3xl bg-ink-900">
        <Image
          src="/logo.png"
          alt=""
          width={64}
          height={64}
          className="h-16 w-16 opacity-90"
        />
        <p className="text-sm text-parchment-100/60">Demo video coming soon</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-xs overflow-hidden rounded-3xl bg-ink-900 shadow-lg">
      <video
        ref={videoRef}
        className="aspect-[9/16] w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop={false}
        playsInline
        onError={() => setHasError(true)}
        onPlay={() => {
          setIsPlaying(true);
          onPlayStateChange?.(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          onPlayStateChange?.(false);
        }}
        onEnded={() => onPlayStateChange?.(false)}
      />

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
      >
        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label="Play video"
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity"
          )}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-ink-900">
            <Play className="ml-1 h-7 w-7" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}
