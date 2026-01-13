import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import photo1 from '../assets/photos/photo_1_2026-01-13_02-04-50.jpg';
import photo2 from '../assets/photos/photo_2_2026-01-13_02-04-50.jpg';
import photo3 from '../assets/photos/photo_3_2026-01-13_02-04-50.jpg';
import photo4 from '../assets/photos/photo_4_2026-01-13_02-04-50.jpg';
import photo5 from '../assets/photos/photo_5_2026-01-13_02-04-50.jpg';
import photo6 from '../assets/photos/photo_6_2026-01-13_02-04-50.jpg';
import photo7 from '../assets/photos/photo_7_2026-01-13_02-04-50.jpg';
import photo8 from '../assets/photos/photo_8_2026-01-13_02-04-50.jpg';
import photo9 from '../assets/photos/photo_9_2026-01-13_02-04-50.jpg';
import photo10 from '../assets/photos/photo_10_2026-01-13_02-04-50.jpg';

const photos = [
  { id: 1, src: photo1, caption: "Your beautiful smile lights up my world ☀️" },
  { id: 2, src: photo2, caption: "Cherishing every moment with you 💖" },
  { id: 3, src: photo3, caption: "Adventures are better together 🌍" },
  { id: 4, src: photo4, caption: "My favorite person in the universe ✨" },
  { id: 5, src: photo5, caption: "Simply perfect 🌸" },
  { id: 6, src: photo6, caption: "Capturing our memories 📸" },
  { id: 7, src: photo7, caption: "You are magic 🪄" },
  { id: 8, src: photo8, caption: "Love you to the moon and back 🌙" },
  { id: 9, src: photo9, caption: "Forever and always 💍" },
  { id: 10, src: photo10, caption: "My heart belongs to you ❤️" },
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) >= photos.length ? 0 : prev + 3);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3) < 0 ? Math.max(0, photos.length - 3) : prev - 3);
  };

  // Get 3 photos to display
  const displayPhotos = photos.slice(currentIndex, currentIndex + 3);
  if (displayPhotos.length < 3) {
    displayPhotos.push(...photos.slice(0, 3 - displayPhotos.length));
  }

  return (
    <div className="py-16 md:py-20 px-4 flex flex-col items-center justify-center min-h-screen overflow-hidden relative">
      <motion.h2 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl lg:text-7xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-12 md:mb-16 font-display font-bold drop-shadow-[0_0_20px_rgba(244,114,182,0.8)] z-10 leading-tight px-4 pt-8"
      >
        Our Beautiful Memories
      </motion.h2>

      <div className="relative w-full max-w-7xl px-4 md:px-12">
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-30 p-4 md:p-5 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 hover:from-pink-500/40 hover:to-purple-500/40 backdrop-blur-xl text-white transition-all transform hover:scale-110 border border-white/20 shadow-[0_8px_32px_rgba(236,72,153,0.3)] hover:shadow-[0_8px_40px_rgba(236,72,153,0.5)]"
          aria-label="Previous photos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button 
          onClick={nextSlide}
          className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-30 p-4 md:p-5 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 hover:from-pink-500/40 hover:to-purple-500/40 backdrop-blur-xl text-white transition-all transform hover:scale-110 border border-white/20 shadow-[0_8px_32px_rgba(236,72,153,0.3)] hover:shadow-[0_8px_40px_rgba(236,72,153,0.5)]"
          aria-label="Next photos"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 px-8 md:px-16">
          {displayPhotos.map((photo, index) => {
            const actualIndex = (currentIndex + index) % photos.length;
            
            return (
              <motion.div
                key={actualIndex}
                initial={{ opacity: 0, y: 80, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -15,
                  rotateY: index === 1 ? 0 : (index === 0 ? 5 : -5),
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="relative group cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                {/* Magical Glow Effect */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-70 transition-all duration-500"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Card Container */}
                <div className="relative bg-white/95 backdrop-blur-sm p-4 md:p-5 pb-16 md:pb-20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20">
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-pink-400/30 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-purple-400/30 rounded-br-2xl" />
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-[3/4] shadow-inner border border-gray-300/50">
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{
                        x: hoveredIndex === index ? ['-100%', '200%'] : '-100%',
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: hoveredIndex === index ? Infinity : 0,
                        repeatDelay: 0.5
                      }}
                    />
                    
                    <img 
                      src={photo.src} 
                      alt={photo.caption} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105" 
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Caption */}
                  <motion.div 
                    className="absolute bottom-4 md:bottom-6 left-0 right-0 text-center px-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-gray-800 font-handwriting text-lg md:text-2xl font-semibold leading-tight drop-shadow-sm">
                      {photo.caption}
                    </p>
                  </motion.div>
                  
                  {/* Floating Hearts on Hover */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <>
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20, scale: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0], 
                              y: -100, 
                              scale: [0, 1, 0.8],
                              x: Math.sin(i) * 30
                            }}
                            transition={{ 
                              duration: 2, 
                              delay: i * 0.2,
                              repeat: Infinity,
                              repeatDelay: 0.5
                            }}
                            className="absolute bottom-4 left-1/2 text-pink-400"
                            style={{ fontSize: '20px' }}
                          >
                            ❤️
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex gap-3 mt-16 z-10">
        {Array.from({ length: Math.ceil(photos.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={`h-3 rounded-full transition-all duration-500 ${
              Math.floor(currentIndex / 3) === index
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-12 shadow-[0_0_15px_rgba(236,72,153,0.8)]' 
                : 'bg-white/20 w-3 hover:bg-white/40 hover:w-6'
            }`}
            aria-label={`Go to slide group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
