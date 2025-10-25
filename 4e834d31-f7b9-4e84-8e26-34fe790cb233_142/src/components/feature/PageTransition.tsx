
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
    },
    in: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
    },
    out: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(10px)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  // Particle disintegration effect
  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0, 1, 0], 
      scale: [0, 1, 0],
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative"
      >
        {/* Disintegration particles overlay */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={particleVariants}
              initial="initial"
              exit="animate"
            />
          ))}
        </motion.div>

        {/* Glitch effect overlay */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-40"
          initial={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-500/10 to-transparent transform -skew-x-12 animate-pulse" style={{ animationDelay: '0.1s' }} />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
