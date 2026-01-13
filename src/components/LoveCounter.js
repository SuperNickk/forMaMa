import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoveCounter = ({ startDate = "2025-12-19" }) => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const start = new Date(startDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - start;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="py-8 md:py-12 text-center relative w-full px-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-12 md:mb-16 font-elegant font-bold drop-shadow-[0_0_20px_rgba(244,114,182,0.8)] leading-tight pt-4 md:pt-8"
      >
        We have been together for:
      </motion.h2>
      
      <div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-8 max-w-5xl mx-auto px-4">
        <TimeUnit value={time.days} label="Days" delay={0} />
        <TimeUnit value={time.hours} label="Hours" delay={0.1} />
        <TimeUnit value={time.minutes} label="Minutes" delay={0.2} />
        <TimeUnit value={time.seconds} label="Seconds" delay={0.3} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={{ 
          scale: [1, 1.05, 1],
          filter: ["drop-shadow(0 0 10px rgba(239,68,68,0.5))", "drop-shadow(0 0 25px rgba(236,72,153,0.8))", "drop-shadow(0 0 10px rgba(239,68,68,0.5))"]
        }}
        transition={{ 
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
          opacity: { duration: 0.8 }
        }}
        className="mt-12 md:mt-16 lg:mt-20 text-2xl md:text-4xl lg:text-5xl font-bold font-handwriting bg-gradient-to-r from-red-400 via-pink-400 to-red-400 text-transparent bg-clip-text px-4 leading-tight"
      >
        ❤️ Endless Memories
      </motion.div>
    </div>
  );
};

const TimeUnit = ({ value, label, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    whileHover={{ y: -10, scale: 1.08 }}
    className="flex flex-col items-center bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 p-4 md:p-8 rounded-3xl w-full md:min-w-[180px] shadow-[0_8px_32px_0_rgba(236,72,153,0.25)] relative overflow-hidden group"
  >
    {/* Animated gradient background */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ backgroundSize: '200% 200%' }}
    />
    
    {/* Shine effect */}
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    
    <span className="text-5xl md:text-7xl font-bold text-white mb-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] font-display tracking-tight relative z-10">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-sm md:text-lg text-pink-200 uppercase tracking-[0.2em] font-semibold relative z-10">
      {label}
    </span>
  </motion.div>
);

export default LoveCounter;
