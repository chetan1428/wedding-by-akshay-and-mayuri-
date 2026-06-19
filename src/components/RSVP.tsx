'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: 'accept',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setError('');
    setIsSubmitted(true);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#E6C78B', '#4B0082', '#FF6B8A']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#E6C78B', '#4B0082', '#FF6B8A']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-[#FFD700] gold-glow mb-4"
          >
            Join Our Celebration
          </motion.h2>
          <div className="ornament-divider">
            <span className="text-[#E6C78B] text-xl">💌</span>
          </div>
        </div>

        <div className="glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 relative z-10"
              >
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#E6C78B] font-sans tracking-widest text-sm uppercase">Name(s)</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                    className="bg-transparent border-b border-[#E6C78B]/30 pb-2 text-[#FFD700] text-xl font-body focus:outline-none focus:border-[#FFD700] transition-colors placeholder-[#F5F5DC]/30"
                  />
                  {error && <span className="text-red-400 text-sm">{error}</span>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Guests */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#E6C78B] font-sans tracking-widest text-sm uppercase">Number of Guests</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="bg-[#1a0030] border-b border-[#E6C78B]/30 pb-2 text-[#FFD700] text-xl font-body focus:outline-none focus:border-[#FFD700] transition-colors"
                    >
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>

                  {/* Attendance */}
                  <div className="flex flex-col gap-4">
                    <label className="text-[#E6C78B] font-sans tracking-widest text-sm uppercase">Will you attend?</label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="attendance" 
                          value="accept"
                          checked={formData.attendance === 'accept'}
                          onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                          className="accent-[#FFD700] w-5 h-5"
                        />
                        <span className="text-[#F5F5DC] font-body text-lg group-hover:text-[#FFD700] transition-colors">Joyfully Accept</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input 
                          type="radio" 
                          name="attendance" 
                          value="decline"
                          checked={formData.attendance === 'decline'}
                          onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                          className="accent-[#FFD700] w-5 h-5"
                        />
                        <span className="text-[#F5F5DC] font-body text-lg group-hover:text-[#FFD700] transition-colors">Respectfully Decline</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#E6C78B] font-sans tracking-widest text-sm uppercase">Message for the Couple (Optional)</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Leave your wishes..."
                    rows={3}
                    className="bg-transparent border-b border-[#E6C78B]/30 pb-2 text-[#FFD700] text-xl font-body focus:outline-none focus:border-[#FFD700] transition-colors resize-none placeholder-[#F5F5DC]/30"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-4 w-full bg-gradient-to-r from-[#E6C78B] via-[#FFD700] to-[#E6C78B] text-[#0d0015] font-sans font-bold tracking-widest uppercase text-sm py-5 rounded-xl shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] transition-all overflow-hidden relative group"
                >
                  <span className="relative z-10">Send RSVP</span>
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 relative z-10"
              >
                <div className="text-6xl mb-6">🎉</div>
                <h3 className="text-3xl font-heading text-[#FFD700] mb-4">Thank you, {formData.name.split(' ')[0]}!</h3>
                <p className="text-[#F5F5DC] text-xl font-body italic">
                  {formData.attendance === 'accept' 
                    ? "We are thrilled and look forward to celebrating with you!" 
                    : "You will be dearly missed, thank you for your wishes."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
