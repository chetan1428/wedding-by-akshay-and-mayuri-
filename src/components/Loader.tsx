'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SHLOKA_VERSES = [
  '|| शुभ विवाह ||',
  '|| मंगलाष्टक ||',
  '|| अक्षय & मयूरी ||',
];

const LOAD_DURATION_MS = 4000;
const VERSE_INTERVAL_MS = 1400;

// ---------------------------------------------------------------------------
// Mandala SVG (ornate golden circular pattern)
// ---------------------------------------------------------------------------

function GoldenMandala() {
  const petals = 12;
  const layers = [
    { r: 40, count: 12, size: 14 },
    { r: 60, count: 16, size: 10 },
    { r: 80, count: 20, size: 8 },
  ];

  return (
    <svg
      viewBox="-100 -100 200 200"
      className="mandala-spin"
      style={{
        width: 'min(50vw, 180px)',
        height: 'min(50vw, 180px)',
        filter: 'drop-shadow(0 0 18px rgba(255,215,0,0.45))',
      }}
    >
      {/* Centre bloom */}
      <circle cx="0" cy="0" r="8" fill="#FFD700" opacity="0.9" />
      <circle
        cx="0"
        cy="0"
        r="15"
        fill="none"
        stroke="#E6C78B"
        strokeWidth="1.2"
        opacity="0.7"
      />

      {/* Inner petal ring */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i / petals) * 360;
        return (
          <g key={`inner-${i}`} transform={`rotate(${angle})`}>
            <ellipse
              cx="0"
              cy="-22"
              rx="5"
              ry="13"
              fill="none"
              stroke="#FFD700"
              strokeWidth="1.3"
              opacity="0.85"
            />
          </g>
        );
      })}

      {/* Ornate layered rings */}
      {layers.map((layer, li) => (
        <g key={`layer-${li}`}>
          <circle
            cx="0"
            cy="0"
            r={layer.r}
            fill="none"
            stroke="#E6C78B"
            strokeWidth="0.6"
            opacity="0.4"
            strokeDasharray={li % 2 === 0 ? '4 3' : 'none'}
          />
          {Array.from({ length: layer.count }).map((_, i) => {
            const angle = ((i / layer.count) * Math.PI * 2) + (li * 0.15);
            const x = +(Math.cos(angle) * layer.r).toFixed(4);
            const y = +(Math.sin(angle) * layer.r).toFixed(4);
            const rot = +((angle * 180) / Math.PI + 90).toFixed(4);
            return (
              <g key={`l${li}-p${i}`}>
                <ellipse
                  cx={x}
                  cy={y}
                  rx={layer.size * 0.35}
                  ry={layer.size * 0.8}
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="1"
                  opacity="0.7"
                  transform={`rotate(${rot} ${x} ${y})`}
                />
                {/* Decorative dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="#FFD700"
                  opacity="0.55"
                />
              </g>
            );
          })}
        </g>
      ))}

      {/* Outer ornamental ring */}
      <circle
        cx="0"
        cy="0"
        r="92"
        fill="none"
        stroke="#FFD700"
        strokeWidth="1.5"
        opacity="0.5"
        strokeDasharray="2 6"
      />
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const x = +(Math.cos(angle) * 92).toFixed(4);
        const y = +(Math.sin(angle) * 92).toFixed(4);
        return (
          <circle
            key={`outer-dot-${i}`}
            cx={x}
            cy={y}
            r="2"
            fill="#FFD700"
            opacity="0.6"
          />
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Loader({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);
  const [verseIdx, setVerseIdx] = useState(0);
  const [loadComplete, setLoadComplete] = useState(false);

  // Progress bar 0→100
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / LOAD_DURATION_MS) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setLoadComplete(true);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cycle shloka verses
  useEffect(() => {
    const interval = setInterval(() => {
      setVerseIdx((prev) => (prev + 1) % SHLOKA_VERSES.length);
    }, VERSE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = useCallback(() => {
    onEnter();
  }, [onEnter]);

  return (
    <>
      {/* Inline keyframes for mandala spin + shimmer */}
      <style jsx global>{`
        @keyframes mandala-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .mandala-spin {
          animation: mandala-rotate 12s linear infinite;
        }
        @keyframes shimmer-bar {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #1a0030 0%, #0a0010 50%, #000000 100%)',
          fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        }}
      >
        {/* Mandala */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <GoldenMandala />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            marginTop: '2.5rem',
            width: 'min(80vw, 260px)',
            height: '4px',
            borderRadius: '4px',
            background: 'rgba(255,215,0,0.12)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Filled portion */}
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: '4px',
              background:
                'linear-gradient(90deg, #B8860B, #FFD700, #FFF8DC, #FFD700, #B8860B)',
              backgroundSize: '200% 100%',
              animation: 'shimmer-bar 2s linear infinite',
              transition: 'width 0.1s linear',
              boxShadow: '0 0 12px rgba(255,215,0,0.5)',
            }}
          />
        </motion.div>

        {/* Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '0.75rem',
            color: '#E6C78B',
            fontSize: '0.8rem',
            letterSpacing: '0.15em',
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {Math.round(progress)}%
        </motion.p>

        {/* Shloka text */}
        <div
          style={{
            marginTop: '2rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={verseIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5 }}
              style={{
                color: '#E6C78B',
                fontSize: '1.25rem',
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: '0.08em',
                textAlign: 'center',
              }}
            >
              {SHLOKA_VERSES[verseIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Enter button (appears after loading) */}
        <AnimatePresence>
          {loadComplete && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              onClick={handleEnter}
              style={{
                marginTop: '2.5rem',
                padding: '0.9rem 2rem',
                background: 'transparent',
                border: '1.5px solid #FFD700',
                borderRadius: '4px',
                color: '#FFD700',
                fontSize: '1rem',
                fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                letterSpacing: '0.18em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden',
                transition: 'box-shadow 0.35s ease, background 0.35s ease, color 0.35s ease',
                boxShadow: '0 0 18px rgba(255,215,0,0.2), inset 0 0 18px rgba(255,215,0,0.05)',
              }}
              whileHover={{
                boxShadow:
                  '0 0 35px rgba(255,215,0,0.45), inset 0 0 35px rgba(255,215,0,0.1)',
                background: 'rgba(255,215,0,0.08)',
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
            >
              Enter the Palace
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
