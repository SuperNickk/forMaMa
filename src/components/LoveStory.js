import React from 'react';
import { motion } from 'framer-motion';

const milestones = [
  {
    emoji: '💫',
    title: 'First Meeting',
    description: 'When our eyes met for the first time',
    color: 'from-blue-400 to-purple-400'
  },
  {
    emoji: '💝',
    title: 'First Date',
    description: 'The day that changed everything',
    color: 'from-pink-400 to-rose-400'
  },
  {
    emoji: '❤️',
    title: 'Together',
    description: 'The beginning of our forever',
    color: 'from-red-400 to-pink-400'
  },
  {
    emoji: '🌟',
    title: 'Future',
    description: 'Every day with you is a gift',
    color: 'from-yellow-400 to-orange-400'
  }
];

const LoveStory = () => {
  return (
    <div className="py-20 px-4 min-h-screen relative overflow-hidden flex flex-col justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent"></div>
      
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-20 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-6 drop-shadow-[0_0_30px_rgba(244,114,182,0.6)] px-4">
          Our Love Story
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed px-4">
          Every chapter of our journey together
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/20 via-purple-500/40 to-pink-500/20 transform -translate-x-1/2"></div>

        <div className="space-y-12 md:space-y-24">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                className="w-full md:w-[45%] lg:w-[48%] relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${milestone.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500`}></div>
                
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl">
                  <div className="text-7xl md:text-8xl mb-4 md:mb-6 filter drop-shadow-lg">{milestone.emoji}</div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 md:mb-4">
                    {milestone.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>

              {/* Center dot */}
              <div className="hidden md:flex w-[10%] lg:w-[4%] justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${milestone.color} shadow-lg relative z-10`}
                >
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${milestone.color} animate-ping opacity-75`}></div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block w-[45%] lg:w-[48%]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoveStory;
