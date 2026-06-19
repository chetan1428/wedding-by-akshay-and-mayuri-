'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Welcome() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 z-10 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#0d0015]/50 to-[#0d0015] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Floating Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-10 animate-float"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-2 gold-border-glow bg-[#1a0030]/80 backdrop-blur-md relative overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden border border-[#E6C78B]/30 relative">
              <Image
                src="/images/couple.png"
                alt="Akshay and Mayuri"
                fill
                sizes="(max-width: 768px) 192px, 256px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-xs flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent flex-1" />
          <span className="text-[#FFD700] text-2xl">✧</span>
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent flex-1" />
        </motion.div>

        {/* Names */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading text-[#FFD700] mb-6 gold-glow tracking-wider break-words"
        >
          Akshay & Mayuri
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg md:text-2xl font-body text-[#E6C78B] italic mb-8"
        >
          Request the honour of your presence at their wedding celebration
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="text-2xl md:text-3xl font-body text-[#FFF8E7] mb-12 tracking-[0.2em] uppercase"
        >
          4<sup className="text-sm">th</sup> July 2026
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 1, delay: 1.8 }}
          className="w-full max-w-xs flex items-center justify-center gap-4"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent flex-1" />
          <span className="text-[#FFD700] text-2xl">✧</span>
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6C78B] to-transparent flex-1" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-sm font-sans tracking-widest text-[#E6C78B] uppercase text-xs">Scroll to Explore</span>
        <svg 
          className="w-6 h-6 text-[#FFD700] bounce-chevron" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}
