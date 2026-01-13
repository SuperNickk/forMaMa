import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroMessage = () => {
  const message = [
    "To My Dearest Love... 💌",
    "This isn't just a website.",
    "It's a digital universe,",
    "created from my heart,",
    "just for you.",
    "Every pixel holds a memory,",
    "Every line of code whispers...",
    "I Love You. ❤️"
  ];

  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < message.length - 1) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [currentLine, message.length]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-8 z-10 relative">
      <div className="max-w-4xl relative">
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-pink-500 blur-[120px] opacity-20 animate-pulse-slow rounded-full"></div>
        
        {message.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ 
              opacity: index <= currentLine ? 1 : 0, 
              y: index <= currentLine ? 0 : 30,
              filter: index <= currentLine ? 'blur(0px)' : 'blur(10px)'
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <p className={`my-4 leading-relaxed tracking-wide ${
              index === 0 
                ? 'text-4xl md:text-7xl text-pink-400 font-bold font-handwriting drop-shadow-[0_0_30px_rgba(244,114,182,0.7)] mb-8' 
                : index === message.length - 1
                  ? 'text-3xl md:text-6xl text-red-400 font-bold font-handwriting mt-8 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                  : 'text-xl md:text-3xl text-gray-200 font-light drop-shadow-lg'
            }`}>
              {line}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroMessage;
