'use client';
import { motion, AnimatePresence } from 'framer-motion';

export default function OpeningGates({ 
  isOpen, 
  onAnimationComplete 
}: { 
  isOpen: boolean;
  onAnimationComplete?: () => void;
}) {
  return (
    <AnimatePresence onExitComplete={onAnimationComplete}>
      {!isOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="fixed inset-0 z-40 pointer-events-none flex"
        >
          {/* Left Gate */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
            className="w-1/2 h-full bg-[#0d0015] border-r-2 border-[#E6C78B] relative overflow-hidden flex justify-end"
          >
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FFD700]/20 to-transparent" />
            
            {/* Gate Pattern (Left) */}
            <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute opacity-20 text-[#E6C78B]">
              <pattern id="gate-pattern-left" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#gate-pattern-left)" />
            </svg>

            {/* Handle Left */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-32 rounded-full border-2 border-[#E6C78B] bg-[#1a0030] shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center justify-center">
              <div className="w-2 h-20 rounded-full bg-[#FFD700]" />
            </div>
          </motion.div>

          {/* Right Gate */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
            className="w-1/2 h-full bg-[#0d0015] border-l-2 border-[#E6C78B] relative overflow-hidden flex justify-start"
          >
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FFD700]/20 to-transparent" />
            
            {/* Gate Pattern (Right) */}
            <svg width="100%" height="100%" preserveAspectRatio="none" className="absolute opacity-20 text-[#E6C78B]">
              <pattern id="gate-pattern-right" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 L50 0 L100 50 L50 100 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#gate-pattern-right)" />
            </svg>

            {/* Handle Right */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 w-6 h-32 rounded-full border-2 border-[#E6C78B] bg-[#1a0030] shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center justify-center">
              <div className="w-2 h-20 rounded-full bg-[#FFD700]" />
            </div>
          </motion.div>

          {/* Center Light Burst */}
          <motion.div
            exit={{ scale: [1, 20], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, ease: "easeIn" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#FFD700] rounded-full blur-[100px] pointer-events-none opacity-0"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
