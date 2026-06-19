'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Target Date: July 4, 2026, 11:45 IST
    // IST is UTC+5:30. 11:45 IST = 06:15 UTC
    const targetDate = new Date('2026-07-04T06:15:00Z').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-[#FFD700] gold-glow mb-6"
        >
          Counting Every Moment
        </motion.h2>
        <div className="ornament-divider mb-16">
          <span className="text-[#E6C78B] text-xl">✧</span>
        </div>

        <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-[#E6C78B]/30 to-transparent mx-auto max-w-3xl">
          <div className="bg-[#0d0015]/80 backdrop-blur-xl rounded-[2.4rem] p-5 sm:p-8 md:p-16 relative overflow-hidden">
            
            {/* Inner Decorative Border */}
            <div className="absolute inset-4 border border-[#E6C78B]/20 rounded-[1.8rem] pointer-events-none" />
            <div className="absolute inset-6 border border-[#FFD700]/10 rounded-[1.4rem] pointer-events-none" />

            {isClient && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10">
                {timeUnits.map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <motion.div
                      key={unit.value}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl sm:text-5xl md:text-7xl font-heading text-[#FFD700] gold-glow mb-2 w-full tabular-nums"
                    >
                      {unit.value.toString().padStart(2, '0')}
                    </motion.div>
                    <div className="text-[#E6C78B] font-sans uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs md:text-sm">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-[#F5F5DC] font-body italic text-xl md:text-2xl"
        >
          "Until we celebrate the union of Akshay & Mayuri"
        </motion.p>
      </div>
    </section>
  );
}
