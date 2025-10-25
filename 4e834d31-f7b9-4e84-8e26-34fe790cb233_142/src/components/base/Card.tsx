
import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className = '',
  onClick,
  variant = 'default',
  hover = true,
  ...props
}, ref) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white border border-slate-200 shadow-lg',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20',
    gradient: 'bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-xl'
  };

  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  if (onClick) {
    return (
      <motion.div
        ref={ref}
        className={combinedClasses}
        onClick={onClick}
        whileHover={hover ? { y: -8, scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        {...props}
      >
        <div className="p-6 relative overflow-hidden">
          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={combinedClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <div className="p-6 relative overflow-hidden">
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;
