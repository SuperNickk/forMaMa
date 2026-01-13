import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundMusic from '../assets/music/background_music.mp3';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Try auto-play immediately
    const startAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = volume;
          await audioRef.current.play();
          setIsPlaying(true);
          setShowOverlay(false); // If auto-play works, hide overlay
        } catch (err) {
          // Auto-play blocked, keep overlay to force interaction
        }
      }
    };

    startAudio();

    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setShowOverlay(false);
          })
          .catch(() => {});
      }
    };

    // Add listeners for various interactions to trigger audio
    const events = ['click', 'scroll', 'keydown', 'touchstart', 'mousemove'];
    events.forEach(event => window.addEventListener(event, handleInteraction));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleInteraction));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowOverlay(false);
        })
        .catch(err => console.error("Play failed", err));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer"
            onClick={handleStart}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl text-pink-300 font-handwriting mb-8">For You ❤️</h1>
              <p className="text-white/70 text-lg">Tap anywhere to start</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <audio ref={audioRef} src={backgroundMusic} loop preload="auto" />
      
      {/* Minimal Volume/Mute Control (No explicit Play button as requested) */}
      <div 
        className={`bg-black/30 backdrop-blur-sm border border-white/5 rounded-full p-2 flex items-center gap-2 transition-all duration-300 ${isHovered ? 'pr-4 bg-black/60' : 'opacity-50 hover:opacity-100'}`}
      >
        <button 
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors relative"
          aria-label={isMuted ? "Unmute music" : "Mute music"}
        >
           {/* Visualizer animation when playing */}
           {!isMuted && isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center gap-0.5 opacity-50 pointer-events-none">
               <div className="w-0.5 h-2 bg-pink-400 animate-pulse"></div>
               <div className="w-0.5 h-3 bg-pink-400 animate-pulse delay-75"></div>
               <div className="w-0.5 h-2 bg-pink-400 animate-pulse delay-150"></div>
            </div>
           )}

          {isMuted || volume === 0 ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="z-10">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4l-6.81 5H4.01a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4.9l6.36 4.67"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="z-10">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          )}
        </button>

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden pl-2"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </>
  );
};

export default MusicPlayer;
