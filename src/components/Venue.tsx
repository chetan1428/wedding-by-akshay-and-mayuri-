'use client';
import { motion } from 'framer-motion';

export default function Venue() {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-[#FFD700] gold-glow mb-4"
        >
          The Venue
        </motion.h2>
        <div className="ornament-divider mb-12">
          <span className="text-[#E6C78B] text-xl">❧</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass p-6 md:p-10 rounded-[2rem] relative overflow-hidden group"
        >
          <h3 className="text-3xl md:text-4xl font-heading text-[#FFD700] mb-2 tracking-wide">
            SUKHAKARTA LAWNS
          </h3>
          <p className="text-[#F5F5DC] font-body text-lg md:text-xl italic mb-8 max-w-2xl mx-auto">
            Bypass Chk, Nagar, Kalyan Rd, Nepti, Ahilyanagar, Maharashtra 414005
          </p>

          <div className="relative w-full h-[260px] md:h-[400px] rounded-2xl overflow-hidden border-2 border-[#E6C78B]/30 mb-8 gold-border-glow">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.123!2d74.7!3d19.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzQ4LjAiTiA3NMKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.google.com/maps/dir/?api=1&destination=SUKHAKARTA+LAWNS+Ahilyanagar+Maharashtra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#E6C78B] via-[#FFD700] to-[#E6C78B] text-[#0d0015] font-sans font-semibold tracking-widest uppercase text-xs md:text-sm px-6 md:px-10 py-3 md:py-4 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.5)] transition-shadow duration-300"
          >
            Get Directions
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
