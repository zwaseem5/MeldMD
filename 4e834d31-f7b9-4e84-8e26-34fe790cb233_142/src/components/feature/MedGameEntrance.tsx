
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MedGameEntranceProps {
  onComplete: () => void;
}

export default function MedGameEntrance({ onComplete }: MedGameEntranceProps) {
  const [stage, setStage] = useState(0);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1500);
    const timer3 = setTimeout(() => setStage(3), 2500);
    const timer4 = setTimeout(() => setShowParticles(true), 1000);
    const timer5 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        
        {/* Floating Medical Icons */}
        {showParticles && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-white/20 text-2xl"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: -50,
                  rotate: 360,
                  scale: [0, 1, 0],
                  x: Math.random() * window.innerWidth
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                {['🩺', '💊', '🏥', '❤️', '🧬', '⚕️', '🔬', '💉'][Math.floor(Math.random() * 8)]}
              </motion.div>
            ))}
          </>
        )}

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/30 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border-2 border-pink-400/40 rotate-45"
          animate={{ rotate: [45, 405], scale: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-lg"
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center">
          {/* Stage 0: Initial fade in */}
          <AnimatePresence>
            {stage >= 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <div className="relative">
                  <motion.div
                    className="text-8xl mb-4"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🏥
                  </motion.div>
                  
                  {/* Pulsing Ring */}
                  <motion.div
                    className="absolute inset-0 border-4 border-white/30 rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 1: Title appears */}
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6"
              >
                <h1 className="text-6xl font-bold text-white mb-4">
                  <motion.span
                    className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    MedWorld
                  </motion.span>
                </h1>
                <motion.div
                  className="h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-auto"
                  initial={{ width: 0 }}
                  animate={{ width: '200px' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 2: Subtitle appears */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <p className="text-2xl text-white/90 font-light">
                  Entering the Medical Universe...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stage 3: Loading animation */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                {/* DNA Helix Loading */}
                <div className="relative w-24 h-24 mb-6">
                  <motion.div
                    className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-blue-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 border-4 border-transparent border-b-purple-400 border-l-pink-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-4 border-4 border-transparent border-t-white border-b-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Progress Dots */}
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-white/60 rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </div>

                <motion.p
                  className="text-white/70 mt-4 text-lg"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Preparing your medical adventure...
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 left-8 text-4xl text-white/20"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        ⚕️
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-4xl text-white/20"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        🔬
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-8 text-4xl text-white/20"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        💊
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-8 text-4xl text-white/20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🩺
      </motion.div>
    </div>
  );
}
