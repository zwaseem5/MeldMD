import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Enhanced parallax transforms - images move UP as you scroll DOWN
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Images move UP (negative values) as you scroll DOWN to cover the text
  const image1Y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  const image2Y = useTransform(scrollYProgress, [0, 1], ["80%", "-80%"]);
  const image3Y = useTransform(scrollYProgress, [0, 1], ["120%", "-120%"]);
  const image4Y = useTransform(scrollYProgress, [0, 1], ["60%", "-60%"]);
  const image5Y = useTransform(scrollYProgress, [0, 1], ["90%", "-90%"]);
  const image6Y = useTransform(scrollYProgress, [0, 1], ["110%", "-110%"]);

  // Enhanced opacity transforms to make images more visible as they cover text
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.1, 0.3, 0.6, 0.8, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.5, 0.2]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const features = [
    {
      title: 'Telehealth Platform',
      description: 'MeldWell™ - White-label telehealth with nationwide coverage and patient-centered tools',
      icon: 'ri-video-line',
      link: '/telehealth',
      gradient: 'from-teal-500 to-cyan-600',
      image: 'https://readdy.ai/api/search-image?query=Modern%20telehealth%20consultation%20interface%20on%20tablet%20device%2C%20clean%20medical%20technology%20design%2C%20professional%20healthcare%20video%20call%20setup%2C%20minimalist%20white%20background%20with%20teal%20accents%2C%20futuristic%20medical%20communication%20technology%2C%20high-tech%20healthcare%20environment%20with%20soft%20lighting%20and%20glass%20surfaces&width=600&height=400&seq=telehealth-feature&orientation=landscape'
    },
    {
      title: 'Compounded Medications',
      description: 'FDA-registered facilities with cGMP compliance and tailored therapies for unique needs',
      icon: 'ri-capsule-line',
      link: '/medications',
      gradient: 'from-blue-500 to-indigo-600',
      image: 'https://static.readdy.ai/image/c26c58cf585cdf583dbecd6bbd7d68e5/6aec3731f0bdf9240e720ac73d908dad.png'
    },
    {
      title: 'Wellness Solutions',
      description: 'Comprehensive programs including peptides, hormones, and aesthetic treatments',
      icon: 'ri-leaf-line',
      link: '/wellness',
      gradient: 'from-emerald-500 to-teal-600',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20wellness%20and%20spa%20environment%20with%20natural%20elements%2C%20clean%20minimalist%20design%2C%20soft%20ambient%20lighting%2C%20modern%20medical%20wellness%20center%2C%20professional%20healthcare%20aesthetics%2C%20serene%20atmosphere%20with%20plants%20and%20natural%20materials%2C%20high-end%20wellness%20facility%20interior&width=600&height=400&seq=wellness-feature&orientation=landscape'
    }
  ];

  const stats = [
    { value: '25+', label: 'Years Combined Expertise', icon: 'ri-award-line', gradient: 'from-teal-500 to-cyan-600' },
    { value: '50', label: 'States Covered', icon: 'ri-map-line', gradient: 'from-blue-500 to-indigo-600' },
    { value: '1000+', label: 'Healthcare Providers', icon: 'ri-hospital-line', gradient: 'from-purple-500 to-pink-600' },
    { value: '99.9%', label: 'Uptime Guarantee', icon: 'ri-shield-check-line', gradient: 'from-emerald-500 to-teal-600' }
  ];

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-16" ref={containerRef}>
      {/* Enhanced Pixlspace-Style Parallax Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        {/* Background Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black"
          style={{ y: backgroundY }}
        />

        {/* Floating Medical Images - Behind Text (Lower Z-Index) */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-72 z-10"
          style={{ y: image1Y, opacity: imageOpacity }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20medical%20laboratory%20equipment%2C%20pharmaceutical%20vials%20and%20bottles%2C%20clean%20sterile%20environment%2C%20professional%20healthcare%20setting%2C%20teal%20and%20navy%20color%20scheme%2C%20high-tech%20medical%20facility%2C%20minimalist%20design%20with%20glass%20surfaces%20and%20modern%20lighting%2C%20advanced%20pharmaceutical%20research%20workspace&width=600&height=450&seq=medical-lab-1&orientation=landscape"
            alt="Medical Lab"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-80 h-96 z-10"
          style={{ y: image2Y, opacity: imageOpacity }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=Telehealth%20consultation%20on%20modern%20tablet%20device%2C%20healthcare%20professional%20video%20call%20interface%2C%20clean%20medical%20technology%20design%2C%20professional%20healthcare%20communication%2C%20minimalist%20white%20background%20with%20teal%20accents%20and%20modern%20medical%20equipment%2C%20futuristic%20telemedicine%20setup&width=500&height=600&seq=telehealth-device&orientation=portrait"
            alt="Telehealth Device"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 w-88 h-56 z-10"
          style={{ y: image3Y, opacity: imageOpacity }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=Pharmaceutical%20compounding%20workspace%2C%20medical%20vials%20and%20equipment%2C%20clean%20laboratory%20environment%2C%20professional%20healthcare%20setting%2C%20modern%20medical%20facility%20with%20glass%20surfaces%20and%20clean%20design%2C%20sterile%20pharmaceutical%20preparation%20area%20with%20advanced%20equipment&width=550&height=350&seq=pharma-workspace&orientation=landscape"
            alt="Pharmaceutical Workspace"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Central MELDMD Text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
        >
          <div className="text-center">
            <motion.h1
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold text-white tracking-tight leading-none select-none"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              animate={{
                textShadow: [
                  "0 0 30px rgba(20, 184, 166, 0.3)",
                  "0 0 60px rgba(20, 184, 166, 0.6)",
                  "0 0 30px rgba(20, 184, 166, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent"
                animate={{
                  x: [0, 3, -3, 0],
                  y: [0, -2, 2, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 3
                }}
              >
                MELD
              </motion.span>
              <span className="text-white/90">MD</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/70 mt-8 max-w-4xl mx-auto leading-relaxed px-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Revolutionizing healthcare through innovative compounding, telehealth, and wellness solutions
            </motion.p>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToNextSection}
                className="whitespace-nowrap cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-4 text-xl"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Medical Images - In Front of Text (Higher Z-Index) */}
        <motion.div
          className="absolute top-60 right-10 w-72 h-88 z-30"
          style={{ y: image4Y, opacity: imageOpacity }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=Modern%20wellness%20center%20interior%2C%20elegant%20spa%20environment%20with%20natural%20elements%2C%20clean%20minimalist%20design%2C%20soft%20ambient%20lighting%2C%20professional%20healthcare%20aesthetics%2C%20serene%20atmosphere%20with%20plants%20and%20natural%20materials%2C%20luxury%20wellness%20facility%20with%20modern%20medical%20equipment&width=450&height=550&seq=wellness-center&orientation=portrait"
            alt="Wellness Center"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-32 w-80 h-52 z-30"
          style={{ y: image5Y, opacity: imageOpacity }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=Healthcare%20professional%20using%20advanced%20medical%20technology%2C%20modern%20hospital%20equipment%2C%20clean%20medical%20environment%2C%20professional%20healthcare%20setting%2C%20high-tech%20medical%20devices%20with%20glass%20surfaces%20and%20modern%20design%2C%20futuristic%20medical%20workspace%20with%20teal%20lighting%20accents&width=500&height=325&seq=medical-tech&orientation=landscape"
            alt="Medical Technology"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="absolute top-80 left-32 w-76 h-92 z-30"
          style={{ y: image6Y, opacity: imageOpacity }}
        >
          <img
            src="https://readdy.ai/api/search-image?query=Pharmaceutical%20research%20laboratory%2C%20medical%20vials%20and%20scientific%20equipment%2C%20clean%20sterile%20environment%2C%20professional%20healthcare%20research%20setting%2C%20modern%20laboratory%20with%20glass%20surfaces%20and%20clean%20design%2C%20advanced%20pharmaceutical%20development%20facility%20with%20blue%20and%20teal%20lighting&width=475&height=575&seq=pharma-research&orientation=portrait"
            alt="Pharmaceutical Research"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: textOpacity }}
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <i className="ri-arrow-down-line text-2xl"></i>
          </div>
        </motion.div>

        {/* Enhanced Floating Particles */}
        <div className="absolute inset-0 z-15">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features-section" className="py-32 bg-gradient-to-br from-white via-slate-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 60 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-teal-700 bg-clip-text text-transparent mb-8">
              Why Choose MeldMD?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of healthcare with our comprehensive platform designed for both providers and patients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <i className={`${feature.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{feature.description}</p>
                  </div>
                  
                  {/* Subtle hover background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
          
          {/* Floating Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.05, 0.15, 0.05],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <i className={`ri-${['heart-pulse-line', 'stethoscope-line', 'capsule-line', 'hospital-line', 'user-heart-line', 'microscope-line', 'first-aid-kit-line', 'syringe-line'][i]} text-6xl`}></i>
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-teal-200 bg-clip-text text-transparent mb-8">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join the growing community of healthcare providers and patients transforming care together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <i className={`${stat.icon} text-2xl text-white`}></i>
                  </div>
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <motion.section
        className="relative py-40 bg-gradient-to-br from-white via-slate-50 to-teal-50 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/3 left-1/4 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent mb-8">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-2xl text-slate-600 mb-16 leading-relaxed max-w-4xl mx-auto">
              Join the future of healthcare delivery with MeldMD's comprehensive solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/schedule')}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Schedule Consultation
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/contact')}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Appointment Booking Section */}
      <motion.section
        className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-teal-50 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -10, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              x: [0, -15, 0],
              y: [0, 15, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-50/50 to-blue-50/50 rounded-full blur-3xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent mb-6">
              Schedule Your Consultation
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Book a personalized meeting with our healthcare experts to discuss your needs and explore our comprehensive solutions
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/60 p-2 border border-white/60 hover:shadow-2xl transition-all duration-500"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-inner">
                <iframe
                  src="https://calendly.com/waseemziadzeid/new-meeting"
                  width="100%"
                  height="650"
                  frameBorder="0"
                  title="Schedule a meeting with MeldMD"
                  className="rounded-xl"
                  style={{ minHeight: '650px' }}
                />
              </div>
            </motion.div>

            {/* Enhanced trust indicators */}
            <motion.div
              className="flex items-center justify-center gap-8 mt-12 text-slate-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, color: "#14b8a6" }}
                transition={{ duration: 0.2 }}
              >
                <i className="ri-shield-check-line text-teal-600"></i>
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, color: "#14b8a6" }}
                transition={{ duration: 0.2 }}
              >
                <i className="ri-time-line text-teal-600"></i>
                <span className="text-sm font-medium">Free Consultation</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05, color: "#14b8a6" }}
                transition={{ duration: 0.2 }}
              >
                <i className="ri-calendar-check-line text-teal-600"></i>
                <span className="text-sm font-medium">Flexible Scheduling</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
