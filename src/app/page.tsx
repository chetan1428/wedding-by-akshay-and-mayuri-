'use client';
import { useState, useEffect } from 'react';
import GoldenParticles from '@/components/GoldenParticles';
import Loader from '@/components/Loader';
import OpeningGates from '@/components/OpeningGates';
import AudioPlayer from '@/components/AudioPlayer';
import Welcome from '@/components/Welcome';
import Events from '@/components/Events';
import Countdown from '@/components/Countdown';
import Venue from '@/components/Venue';
import Gallery from '@/components/Gallery';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGates, setShowGates] = useState(true);
  const [gatesOpened, setGatesOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Smooth scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEnter = () => {
    setIsLoading(false);
    setIsPlaying(true);
    // Add a slight delay before gates start opening
    setTimeout(() => {
      setGatesOpened(true);
    }, 500);
  };

  const handleGatesAnimationComplete = () => {
    setShowGates(false);
  };

  return (
    <main className="relative min-h-screen bg-[#0d0015]">
      {/* 3D WebGL Background (Always renders but behind content) */}
      <GoldenParticles />

      {/* Cinematic Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loader onEnter={handleEnter} />
        </div>
      )}

      {/* Palace Gates Overlay */}
      {showGates && !isLoading && (
        <OpeningGates 
          isOpen={gatesOpened} 
          onAnimationComplete={handleGatesAnimationComplete} 
        />
      )}

      {/* Main Content - Only visible after gates open */}
      <div 
        className="relative z-10"
        style={{ 
          opacity: gatesOpened ? 1 : 0, 
          transition: 'opacity 2s ease-in 1s' 
        }}
      >
        <Welcome />
        <Events />
        <Countdown />
        <Venue />
        <Gallery />
        <RSVP />
        <Footer />
      </div>

      {/* Persistent Audio Controls */}
      <AudioPlayer isPlaying={isPlaying} />
    </main>
  );
}
