'use client';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-b from-transparent to-[#05000a] pt-12 pb-8 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#E6C78B]/50 to-transparent mb-10" />

        <h2 className="text-3xl md:text-4xl font-heading text-[#FFD700] mb-4 gold-glow">
          Akshay & Mayuri
        </h2>

        <p className="text-[#E6C78B] font-sans tracking-[0.3em] uppercase text-sm mb-6">
          4th July 2026
        </p>

        <div className="flex flex-col items-center justify-center gap-2 mb-12">
          <span className="text-2xl heart-pulse">❤️</span>
          <p className="text-[#F5F5DC]/60 font-body italic text-sm">
            Made with love
          </p>
        </div>

        <p className="text-[#F5F5DC]/30 font-sans text-xs uppercase tracking-widest">
          © {new Date().getFullYear()} Akshay & Mayuri. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
