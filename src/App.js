import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroMessage from './components/HeroMessage';
import PhotoGallery from './components/PhotoGallery';
import LoveCounter from './components/LoveCounter';
import LoveStory from './components/LoveStory';
import ReasonsILoveYou from './components/ReasonsILoveYou';
import FinalSurprise from './components/FinalSurprise';
import FloatingHearts from './components/FloatingHearts';
import CursorSparkles from './components/CursorSparkles';
import MusicPlayer from './components/MusicPlayer';
import ScrollReveal from './components/ScrollReveal';

function App() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [, setClickCount] = useState(0);

  const handleHeartClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowEasterEgg(true);
      }
      return newCount;
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0c29] text-white overflow-hidden relative font-sans selection:bg-pink-500 selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse-slow"></div>
        {/* Animated Stars (CSS based or simple divs) */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          ></div>
        ))}
      </div>

      <CursorSparkles />
      <MusicPlayer />
      
      <FloatingHearts onHeartClick={handleHeartClick} />
      
      <main className="relative z-10">
        <section className="min-h-screen flex flex-col justify-center relative">
          <HeroMessage />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 3, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-pink-300 text-sm tracking-widest uppercase"
          >
            Scroll Down ↓
          </motion.div>
        </section>

        <section className="min-h-screen py-20">
          <ScrollReveal>
            <PhotoGallery />
          </ScrollReveal>
        </section>

        <section className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-black/40 via-purple-900/20 to-black/40 backdrop-blur-sm py-24 md:py-32">
          <ScrollReveal>
            <LoveCounter startDate="2025-12-19" /> 
          </ScrollReveal>
        </section>

        <section className="bg-black/30">
          <ScrollReveal>
            <LoveStory />
          </ScrollReveal>
        </section>

        <section className="py-24 md:py-32">
          <ScrollReveal>
            <ReasonsILoveYou />
          </ScrollReveal>
        </section>

        <section className="min-h-screen flex flex-col justify-center pb-20 pt-24 md:pt-32 bg-gradient-to-b from-black/40 via-pink-900/10 to-black/60">
          <ScrollReveal>
            <FinalSurprise />
          </ScrollReveal>
        </section>
      </main>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-gradient-to-br from-pink-900/40 to-purple-900/40 border border-pink-500/30 p-8 rounded-3xl text-center shadow-[0_0_50px_rgba(236,72,153,0.3)]"
            >
              <h3 className="text-3xl font-handwriting text-pink-300 mb-6">A Secret Whisper... 🤫</h3>
              <div className="space-y-4 text-lg text-gray-200 font-light italic">
                <p>"You are the poem I never knew how to write..."</p>
                <p>"In a sea of people, my eyes will always search for you."</p>
              </div>
              <button 
                onClick={() => setShowEasterEgg(false)}
                className="mt-8 bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full transition-all hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]"
              >
                Close Secret
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
