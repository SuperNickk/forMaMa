import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const Typewriter = ({ text, delay = 50 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const FinalSurprise = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6b6b', '#f472b6', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6b6b', '#f472b6', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4 md:p-8">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 font-handwriting mb-8 md:mb-12 drop-shadow-[0_0_20px_rgba(244,114,182,0.8)] px-4 leading-tight pt-4 md:pt-8"
      >
        One Last Surprise...
      </motion.h2>

      <div className="relative w-full max-w-2xl px-4">
        {!isOpen ? (
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-40 group-hover:opacity-70 animate-pulse-slow rounded-full"></div>
            <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
              <span className="text-5xl md:text-6xl filter drop-shadow-lg">💌</span>
              <p className="mt-4 text-white font-handwriting text-xl md:text-2xl">Click to Open</p>
            </div>
          </motion.button>
        ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-white/10 backdrop-blur-xl border border-white/30 p-6 md:p-12 rounded-2xl w-full shadow-[0_0_60px_rgba(236,72,153,0.4)]"
            >
              <p className="text-xl md:text-3xl font-light leading-relaxed text-white mb-6 md:mb-8 min-h-[120px]">
                <Typewriter 
                  text="Every love story is beautiful, but ours is my favorite. Thank you for being the most amazing person in my life. I love you more than words can say." 
                  delay={50}
                />
              </p>
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl md:text-7xl"
              >
                ❤️
              </motion.div>
              
              <motion.button 
                onClick={triggerConfetti}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 md:mt-8 px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white text-lg font-semibold shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 transition-all border border-white/20"
              >
                Celebrate Again 🎉
              </motion.button>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default FinalSurprise;
