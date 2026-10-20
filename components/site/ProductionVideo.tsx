"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./production-video.module.css";

interface ProductionVideoProps {
  label: string;
}

export function ProductionVideo({ label }: ProductionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const manuallyPaused = useRef(false);
  const videoId = useId();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let inView = false;

    const updatePlayback = () => {
      if (inView && !document.hidden && !reducedMotion.matches && !manuallyPaused.current) {
        if (!video.getAttribute("src")) video.src = "/images/siteaplic2.mp4";
        void video.play().catch(() => setIsPlaying(!video.paused));
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      updatePlayback();
    }, { threshold: 0.1 });
    observer.observe(video);

    const handleReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) video.pause();
    };

    reducedMotion.addEventListener("change", handleReducedMotion);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", handleReducedMotion);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      manuallyPaused.current = false;
      if (!video.getAttribute("src")) video.src = "/images/siteaplic2.mp4";
      void video.play().catch(() => setIsPlaying(!video.paused));
    } else {
      manuallyPaused.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        id={videoId}
        poster="/images/producao-aplic.webp"
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        className={styles.control}
        aria-controls={videoId}
        onClick={togglePlayback}
      >
        {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}</span>
      </button>
    </>
  );
}
