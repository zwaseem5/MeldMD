import { motion, AnimatePresence, type Variants, type Transition } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

// Use keys `initial` / `enter` / `exit` to align with AnimatePresence semantics.
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(10px)',
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    } as Transition,
  },
};

const pageTransition: Transition = {
  type: 'tween',
  duration: 0.5,
  ease: [0.34, 1.56, 0.64, 1],
};

const particleVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } as Transition,
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className="relative"
      >
        {/* Disintegration particles overlay */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3 } as Transition}
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
          transition={{ duration: 0.2 } as Transition}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform skew-x-12 animate-pulse" />
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-emerald-500/10 to-transparent transform -skew-x-12 animate-pulse"
            style={{ animationDelay: '0.1s' }}
          />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
