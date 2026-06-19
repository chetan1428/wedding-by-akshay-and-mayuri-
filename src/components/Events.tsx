'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type EventCardProps = {
  title: string;
  icon: string;
  date: string;
  time: string;
  description: string;
  bgGradient: string;
  venueName: string;
  address: string;
};

const eventsData: EventCardProps[] = [
  {
    title: 'Haldi Ceremony',
    icon: '🌼',
    date: '3rd July 2026',
    time: '6:00 PM',
    description: 'A beautiful ceremony of turmeric blessings, love, and joy as we begin the celebrations.',
    bgGradient: 'from-[#FFD700]/15 to-[#E6A800]/15',
    venueName: 'SUKHAKARTA LAWNS',
    address: 'Bypass Chk, Nagar, Kalyan Rd, Nepti, Ahilyanagar, Maharashtra 414005'
  },
  {
    title: 'Wedding Ceremony',
    icon: '🪔',
    date: '4th July 2026',
    time: '11:45 AM',
    description: 'The sacred union of two souls in the presence of loved ones, bound by eternal promises.',
    bgGradient: 'from-[#4B0082]/30 to-[#2d0060]/30',
    venueName: 'SUKHAKARTA LAWNS',
    address: 'Bypass Chk, Nagar, Kalyan Rd, Nepti, Ahilyanagar, Maharashtra 414005'
  }
];

export default function Events() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading text-[#FFD700] gold-glow mb-4"
          >
            Wedding Celebrations
          </motion.h2>
          <div className="ornament-divider">
            <span className="text-[#E6C78B] text-xl">✤</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
          {eventsData.map((event, index) => {
            const isExpanded = expandedId === index;
            return (
              <motion.div
                key={index}
                layoutId={`card-${index}`}
                onClick={() => setExpandedId(isExpanded ? null : index)}
                className={`cursor-pointer rounded-3xl p-1 bg-gradient-to-b from-[#E6C78B]/40 to-transparent hover:from-[#FFD700]/60 transition-colors duration-500 ${isExpanded ? 'md:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className={`h-full rounded-[23px] bg-gradient-to-br ${event.bgGradient} backdrop-blur-md p-8 md:p-12 relative overflow-hidden group`}>
                  
                  {/* Background Ornamentation */}
                  <div className="absolute -top-10 -right-10 opacity-10 text-[150px] pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out">
                    {event.icon}
                  </div>

                  <motion.div layoutId={`icon-${index}`} className="text-5xl mb-6">
                    {event.icon}
                  </motion.div>
                  
                  <motion.h3 layoutId={`title-${index}`} className="text-3xl md:text-4xl font-heading text-[#FFD700] mb-2">
                    {event.title}
                  </motion.h3>
                  
                  <motion.div layoutId={`datetime-${index}`} className="flex flex-wrap gap-4 mb-6">
                    <span className="text-[#E6C78B] font-sans uppercase tracking-widest text-sm bg-[#0d0015]/40 px-4 py-1.5 rounded-full border border-[#E6C78B]/20">
                      {event.date}
                    </span>
                    <span className="text-[#FFF8E7] font-sans uppercase tracking-widest text-sm bg-[#0d0015]/40 px-4 py-1.5 rounded-full border border-[#FFF8E7]/20">
                      {event.time}
                    </span>
                  </motion.div>

                  <motion.p layoutId={`desc-${index}`} className="text-[#F5F5DC] text-lg font-body leading-relaxed max-w-md">
                    {event.description}
                  </motion.p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="border-t border-[#E6C78B]/20 pt-8"
                      >
                        <h4 className="text-xl font-heading text-[#FFD700] mb-2">Venue</h4>
                        <p className="text-[#FFF8E7] font-sans tracking-wide mb-1">{event.venueName}</p>
                        <p className="text-[#E6C78B]/80 font-body italic mb-6">{event.address}</p>
                        
                        <a 
                          href="https://www.google.com/maps/dir/?api=1&destination=SUKHAKARTA+LAWNS+Ahilyanagar+Maharashtra" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E6C78B] to-[#FFD700] text-[#0d0015] px-6 py-3 rounded-full font-sans font-medium hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                        >
                          Get Directions
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-8 flex items-center gap-2 text-[#E6C78B] text-sm font-sans uppercase tracking-widest group-hover:text-[#FFD700] transition-colors"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
