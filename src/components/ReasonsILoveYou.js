import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loveReasons = [
  {
    id: 1,
    reason: "Your beautiful smile that lights up my entire world",
    emoji: "😊",
    gradient: "from-yellow-400 to-orange-400"
  },
  {
    id: 2,
    reason: "The way you make me laugh even on the hardest days",
    emoji: "😄",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    id: 3,
    reason: "Your kind heart and gentle soul",
    emoji: "💖",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    id: 4,
    reason: "How you understand me without words",
    emoji: "🤗",
    gradient: "from-purple-400 to-indigo-400"
  },
  {
    id: 5,
    reason: "Every moment spent with you is a treasure",
    emoji: "✨",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    id: 6,
    reason: "You make me want to be a better person",
    emoji: "🌟",
    gradient: "from-red-400 to-pink-400"
  }
];

const ReasonsILoveYou = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="py-8 md:py-12 px-4 min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20 text-4xl"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -50,
              rotate: 0 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16 relative z-10 pt-8"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-handwriting font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 mb-6 drop-shadow-[0_0_30px_rgba(244,114,182,0.6)] px-4 leading-tight">
          Reasons I Love You
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto px-4">
          Just a few of the infinite reasons...
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {loveReasons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setActiveCard(item.id)}
              onHoverEnd={() => setActiveCard(null)}
              className="relative group cursor-pointer w-full max-w-md mx-auto"
            >
              {/* Glow effect */}
              <motion.div 
                className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500`}
                animate={activeCard === item.id ? {
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.7, 0.5]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 min-h-[340px] md:min-h-[380px] flex flex-col justify-between shadow-2xl overflow-visible w-full">
                {/* Sparkle effect on hover */}
                <AnimatePresence>
                  {activeCard === item.id && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, x: '50%', y: '50%' }}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 1,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 0.5
                          }}
                          className="absolute text-2xl pointer-events-none"
                        >
                          ✨
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Number badge */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center font-bold text-white text-base shadow-lg z-10`}>
                  {item.id}
                </div>

                {/* Emoji */}
                <motion.div 
                  className="text-7xl md:text-8xl mb-4 filter drop-shadow-lg flex-shrink-0"
                  animate={activeCard === item.id ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {item.emoji}
                </motion.div>

                {/* Text */}
                <div className="flex-grow flex items-center justify-center">
                  <p className="text-xl md:text-2xl text-white font-light leading-relaxed text-center">
                    {item.reason}
                  </p>
                </div>

                {/* Decorative line */}
                <motion.div 
                  className={`h-1 mt-6 rounded-full bg-gradient-to-r ${item.gradient} flex-shrink-0`}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-20 text-center px-4"
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 leading-tight">
            And a million more reasons every single day... 💕
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReasonsILoveYou;
