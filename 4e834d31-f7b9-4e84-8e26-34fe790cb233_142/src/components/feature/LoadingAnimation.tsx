
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);

  const stages = [
    { text: 'Initializing Healthcare Platform', icon: 'ri-pulse-line', color: 'from-emerald-400 to-blue-400' },
    { text: 'Loading Medical Systems', icon: 'ri-hospital-line', color: 'from-blue-400 to-purple-400' },
    { text: 'Preparing AI Diagnostics', icon: 'ri-brain-line', color: 'from-purple-400 to-pink-400' },
    { text: 'Activating Telehealth Network', icon: 'ri-video-line', color: 'from-pink-400 to-emerald-400' },
    { text: 'Welcome to New Life', icon: 'ri-check-line', color: 'from-emerald-500 to-blue-500' }
  ];

  useEffect(() => {
    const totalDuration = 5000;
    const stageInterval = totalDuration / stages.length;
    
    // Enable interactivity after 1 second
    const interactiveTimer = setTimeout(() => {
      setIsInteractive(true);
    }, 1000);
    
    const timer = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < stages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, stageInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 1.5;
        }
        return prev;
      });
    }, totalDuration / 67);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDuration + 800);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
      clearTimeout(interactiveTimer);
    };
  }, [onComplete, stages.length]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Interactive Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            className="w-full h-full" 
            style={{
              backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
            animate={{ 
              backgroundPosition: ['0px 0px', '80px 80px'],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>
        
        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: `linear-gradient(45deg, rgba(16, 185, 129, ${Math.random() * 0.8 + 0.2}), rgba(59, 130, 246, ${Math.random() * 0.8 + 0.2}))`
              }}
              animate={{
                y: [-30, -80, -30],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, Math.random() * 2 + 1, 1]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Interactive Pulse Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-emerald-400/20 rounded-full"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Skip Button */}
      <AnimatePresence>
        {isInteractive && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={handleSkip}
            className="absolute top-8 right-8 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip Loading
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Enhanced Logo with Interactive Elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.h1 
            className="text-7xl font-light tracking-tight text-white mb-6" 
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            animate={{
              textShadow: [
                "0 0 20px rgba(16, 185, 129, 0.3)",
                "0 0 40px rgba(16, 185, 129, 0.6)",
                "0 0 20px rgba(16, 185, 129, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span 
              className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ backgroundSize: '200% 200%' }}
              >
              New Life
            </motion.span>
          </motion.h1>
          <motion.div 
            className="w-20 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto"
            animate={{ 
              scaleX: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Enhanced Stage Indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <motion.div 
              className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${stages[currentStage].color} rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden`}
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: 'skewX(-20deg)' }}
              />
              <i className={`${stages[currentStage].icon} text-4xl text-white relative z-10`}></i>
            </motion.div>
            <motion.h2 
              className="text-2xl font-light text-white/90 mb-3"
              animate={{ 
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {stages[currentStage].text}
            </motion.h2>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Progress Bar */}
        <div className="relative mb-12">
          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Animated shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 200] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: 'skewX(-20deg)' }}
              />
            </motion.div>
          </div>
          <div className="flex justify-between mt-4 text-sm text-slate-400 font-light">
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Loading Healthcare Platform...
            </motion.span>
            <motion.span
              className="font-medium"
              animate={{ 
                color: ['#94a3b8', '#10b981', '#94a3b8']
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </div>

        {/* Enhanced Loading Dots */}
        <div className="flex items-center justify-center space-x-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Interactive Hint */}
        <AnimatePresence>
          {isInteractive && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 text-slate-400 text-sm"
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Click anywhere to interact
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Click Handler */}
      {isInteractive && (
        <motion.div
          className="absolute inset-0 cursor-pointer"
          onClick={handleSkip}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

export default LoadingAnimation;
