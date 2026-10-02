"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const VIDEO_SOURCES = [
  "/videos/boat-local.mp4",
  // Drop more clips into public/videos and list them here to crossfade.
];

type Props = {
  className?: string;
  overlay?: "hero" | "section" | "soft";
  /** Slow Ken Burns zoom for Notion-like cinematic feel */
  kenBurns?: boolean;
};

export function VideoBackground({
  className = "",
  overlay = "hero",
  kenBurns = true,
}: Props) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const play = async () => {
      try {
        await el.play();
        setReady(true);
      } catch {
        // Autoplay blocked — still show poster frame
        setReady(true);
      }
    };
    play();
  }, [index]);

  const onEnded = () => {
    if (VIDEO_SOURCES.length < 2) {
      videoRef.current?.play();
      return;
    }
    setIndex((i) => (i + 1) % VIDEO_SOURCES.length);
  };

  const overlayClass =
    overlay === "hero"
      ? "video-overlay video-overlay--hero"
      : overlay === "section"
        ? "video-overlay video-overlay--section"
        : "video-overlay video-overlay--soft";

  return (
    <div className={`video-bg ${className}`} aria-hidden>
      <motion.div
        className={`video-bg__frame${kenBurns && !reduce ? " video-bg__frame--burn" : ""}`}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: ready ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          ref={videoRef}
          key={VIDEO_SOURCES[index]}
          className="video-bg__media"
          src={VIDEO_SOURCES[index]}
          muted
          playsInline
          autoPlay
          loop={VIDEO_SOURCES.length < 2}
          preload="auto"
          onEnded={onEnded}
        />
      </motion.div>
      <div className={overlayClass} />
      <div className="video-bg__grain" />
    </div>
  );
}
