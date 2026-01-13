import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingPetals = () => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Create initial batch
    const createPetals = () => {
      const newPetals = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        rotation: Math.random() * 360,
      }));
      setPetals(newPetals);
    };

    createPetals();
    
    // Add more periodically
    const interval = setInterval(() => {
        setPetals(prev => {
            const newPetal = {
                id: Date.now(),
                left: Math.random() * 100,
                delay: 0,
                duration: Math.random() * 10 + 10,
                rotation: Math.random() * 360,
            };
            return [...prev.slice(-30), newPetal];
        });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: '-10vh', opacity: 0, rotate: petal.rotation }}
          animate={{ 
            y: '110vh', 
            opacity: [0, 1, 1, 0],
            rotate: petal.rotation + 360,
            x: [0, 20, -20, 0] // Swaying motion
          }}
          transition={{ 
            duration: petal.duration, 
            delay: petal.delay,
            ease: 'linear',
            x: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
            }
          }}
          style={{
            position: 'absolute',
            left: `${petal.left}%`,
          }}
          className="text-2xl opacity-60"
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
};

export default FallingPetals;
