'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const images = [
  { src: '/images/groom.png', caption: 'The Groom - Akshay' },
  { src: '/images/couple.png', caption: 'Together Forever' },
  { src: '/images/Bride.png', caption: 'The Bride - Mayuri' }
];

export default function Gallery() {
  const [rotation, setRotation] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) {
        setRotation(prev => prev - 0.5);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    setRotation(prev => prev + deltaX * 0.5);
    startX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-[#FFD700] gold-glow mb-4"
        >
          Moments to Cherish
        </motion.h2>
        <div className="ornament-divider mb-20">
          <span className="text-[#E6C78B] text-xl">✧</span>
        </div>

        <div className="relative h-[420px] md:h-[500px] flex items-center justify-center perspective-[900px] md:perspective-[1200px]">
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing preserve-3d"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              transition: isDragging.current ? 'none' : 'transform 0.1s linear',
              touchAction: 'pan-y',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {images.map((img, i) => {
              const angle = (i * 360) / images.length;
              const translateZ = isDesktop ? 300 : 190;
              return (
                <div
                  key={i}
                  className="absolute w-[220px] md:w-[350px] h-[320px] md:h-[450px] origin-center select-none"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="w-full h-full rounded-2xl border-2 border-[#E6C78B]/40 overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)] bg-[#1a0030] relative group pointer-events-none">
                    <Image
                      src={img.src}
                      alt={img.caption}
                      fill
                      sizes="(max-width: 768px) 220px, 350px"
                      style={{ objectFit: 'cover' }}
                      draggable={false}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#0d0015] via-[#0d0015]/80 to-transparent">
                      <p className="text-[#FFD700] font-heading text-xl">{img.caption}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
