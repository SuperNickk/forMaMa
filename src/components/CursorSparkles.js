import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorSparkles = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create a sparkle at mouse position with some randomness
      createSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      // Create sparkle at touch position
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
      }
    };

    const createSparkle = (x, y) => {
      const newSparkle = {
        id: Date.now(),
        x,
        y,
      };
      setSparkles(prev => [...prev, newSparkle].slice(-20));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <Sparkle key={sparkle.id} x={sparkle.x} y={sparkle.y} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const Sparkle = ({ x, y }) => {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.5, x, y }}
      animate={{ opacity: 0, scale: 0, y: y + 20 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute text-yellow-200"
      style={{ left: 0, top: 0, fontSize: '10px' }}
    >
      ✨
    </motion.div>
  );
};

export default CursorSparkles;
