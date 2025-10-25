
import { motion } from 'framer-motion';
import Button from '../base/Button';

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
  backgroundImage?: string;
  enableParallax?: boolean;
}

const Hero = ({ 
  title, 
  subtitle, 
  primaryCTA = "Get Started", 
  secondaryCTA = "Watch Demo",
  onPrimaryCTA,
  onSecondaryCTA,
  backgroundImage,
  enableParallax = false 
}: HeroProps) => {
  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrimaryCTA = () => {
    if (onPrimaryCTA) {
      onPrimaryCTA();
    } else {
      scrollToNextSection();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full animate-pulse" style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.2) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            animation: 'gridFloat 20s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Enhanced Floating Medical Elements */}
        <div className="absolute top-20 left-10 w-12 h-12 text-emerald-400/40 animate-bounce">
          <i className="ri-heart-pulse-line text-3xl"></i>
        </div>
        <div className="absolute top-32 right-20 w-12 h-12 text-blue-400/40 animate-pulse" style={{ animationDelay: '1s' }}>
          <i className="ri-stethoscope-line text-3xl"></i>
        </div>
        <div className="absolute bottom-40 left-16 w-12 h-12 text-purple-400/40 animate-bounce" style={{ animationDelay: '2s' }}>
          <i className="ri-capsule-line text-3xl"></i>
        </div>
        <div className="absolute bottom-24 right-12 w-12 h-12 text-cyan-400/40 animate-pulse" style={{ animationDelay: '3s' }}>
          <i className="ri-microscope-line text-3xl"></i>
        </div>
        <div className="absolute top-1/2 left-20 w-12 h-12 text-pink-400/40 animate-bounce" style={{ animationDelay: '4s' }}>
          <i className="ri-dna-line text-3xl"></i>
        </div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 text-yellow-400/40 animate-pulse" style={{ animationDelay: '5s' }}>
          <i className="ri-medicine-bottle-line text-3xl"></i>
        </div>
        
        {/* Enhanced Light Effects with Animation */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-r from-emerald-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/8 via-blue-500/8 to-emerald-500/8 rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400/30 to-blue-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Enhanced Logo with Shake Animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-light tracking-tight text-white mb-4 shake-animation" 
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '100' }}
              animate={{ 
                x: [0, -2, 2, -1, 1, 0],
                y: [0, -1, 1, -0.5, 0.5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title?.split('MD')[0] || 'Meld'}
              </span>
              <span className="text-white/90">{title?.includes('MD') ? 'MD' : 'MD'}</span>
            </motion.h1>
            <motion.div 
              className="w-32 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Enhanced Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-light text-white/95 leading-tight tracking-tight">
              {subtitle ? (
                <span className="block">{subtitle}</span>
              ) : (
                <>
                  The Future of
                  <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent font-normal">
                    Healthcare Technology
                  </span>
                </>
              )}
            </h2>
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Experience seamless healthcare through our advanced platform combining 
              <span className="text-emerald-400 font-medium"> telehealth</span>, 
              <span className="text-blue-400 font-medium"> intelligent diagnostics</span>, and 
              <span className="text-purple-400 font-medium"> personalized care</span>
            </motion.p>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="primary"
                size="lg"
                onClick={handlePrimaryCTA}
                className="min-w-[220px] bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white shadow-2xl hover:shadow-emerald-500/25 border-0 font-medium tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                <motion.i 
                  className="ri-arrow-down-line mr-3 text-xl"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                {primaryCTA}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline"
                size="lg"
                onClick={onSecondaryCTA}
                className="min-w-[220px] border border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500 hover:text-white transition-all duration-300 font-medium tracking-wide cursor-pointer whitespace-nowrap"
              >
                <i className="ri-play-circle-line mr-3 text-xl"></i>
                {secondaryCTA}
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 pt-16 border-t border-slate-700/50"
          >
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-emerald-400 text-2xl group-hover:scale-110 transition-all duration-500 border border-emerald-500/20"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="ri-user-heart-line"></i>
              </motion.div>
              <div className="text-4xl font-light text-white mb-2 tracking-tight">50,000+</div>
              <div className="text-slate-400 font-light text-lg">Patients Served</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-blue-400 text-2xl group-hover:scale-110 transition-all duration-500 border border-blue-500/20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="ri-shield-check-line"></i>
              </motion.div>
              <div className="text-4xl font-light text-white mb-2 tracking-tight">99.9%</div>
              <div className="text-slate-400 font-light text-lg">Uptime Guarantee</div>
            </motion.div>
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-purple-400 text-2xl group-hover:scale-110 transition-all duration-500 border border-purple-500/20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="ri-time-line"></i>
              </motion.div>
              <div className="text-4xl font-light text-white mb-2 tracking-tight">24/7</div>
              <div className="text-slate-400 font-light text-lg">Expert Support</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Background Image Overlay */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat mix-blend-overlay"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 cursor-pointer"
        onClick={scrollToNextSection}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, color: "#10b981" }}
      >
        <i className="ri-arrow-down-double-line text-2xl"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
