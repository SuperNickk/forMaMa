import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = ({ onHeartClick }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100,
          scale: Math.random() * 0.5 + 0.5,
          duration: Math.random() * 5 + 5,
        };
        // Keep only last 20 hearts to avoid performance issues
        return [...prev, newHeart].slice(-20);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 0] }}
          transition={{ duration: heart.duration, ease: 'linear' }}
          onClick={(e) => {
            // e.stopPropagation(); // Might not be needed if container is pointer-events-none, but hearts need pointer-events-auto
            onHeartClick && onHeartClick();
            // Optional: visual feedback on click
          }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            fontSize: `${heart.scale * 2}rem`,
          }}
          className="text-pink-400 opacity-50 cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
