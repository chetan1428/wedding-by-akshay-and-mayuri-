'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BUTTON_SIZE = 56;
const TARGET_VOLUME = 0.45;
const FADE_MS = 1500;
const AUDIO_SRC = '/audio/marathi-weddingn.mp3';

function SoundwaveBars() {
  const barCount = 4;
  const barColors = ['#FFD700', '#E6C78B', '#FFD700', '#E6C78B'];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: '22px',
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: ['6px', '18px', '10px', '20px', '6px'] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.15,
          }}
          style={{
            width: '3px',
            borderRadius: '2px',
            background: barColors[i],
          }}
        />
      ))}
    </div>
  );
}

function MutedIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export default function AudioPlayer({
  isPlaying: initialPlaying,
}: {
  isPlaying: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  const cancelFade = () => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  };

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    cancelFade();
    const start = el.volume;
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / FADE_MS);
      el.volume = start + (target - start) * t;
      if (t < 1) {
        fadeRafRef.current = requestAnimationFrame(step);
      } else {
        fadeRafRef.current = null;
        onDone?.();
      }
    };

    fadeRafRef.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0;
    el.play()
      .then(() => {
        setPlaying(true);
        fadeTo(TARGET_VOLUME);
      })
      .catch(() => {
        // Autoplay blocked or other error – stay muted.
        setPlaying(false);
      });
  }, [fadeTo]);

  const pause = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    fadeTo(0, () => el.pause());
    setPlaying(false);
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  // Attempt auto-start once parent signals isPlaying (after user clicked Enter)
  useEffect(() => {
    if (initialPlaying && !playing) {
      play();
    }
  }, [initialPlaying, playing, play]);

  useEffect(() => {
    return () => {
      cancelFade();
      audioRef.current?.pause();
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" />

      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          bottom: 'max(env(safe-area-inset-bottom), 1.25rem)',
          right: '1.25rem',
          zIndex: 50,
        }}
      >
        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: BUTTON_SIZE,
            height: BUTTON_SIZE,
            borderRadius: '50%',
            border: '1.5px solid #FFD700',
            background: 'rgba(75, 0, 130, 0.6)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow:
              '0 0 20px rgba(255,215,0,0.15), inset 0 0 20px rgba(255,215,0,0.05)',
            transition: 'box-shadow 0.3s ease',
            outline: 'none',
            padding: 0,
          }}
          aria-label={playing ? 'Mute music' : 'Play music'}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <SoundwaveBars />
              </motion.div>
            ) : (
              <motion.div
                key="muted"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25 }}
              >
                <MutedIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );
}
