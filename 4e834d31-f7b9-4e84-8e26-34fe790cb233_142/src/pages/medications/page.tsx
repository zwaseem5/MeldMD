
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Medications() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [qualityRef, qualityInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const categories = [
    {
      title: 'GLP-1 Medications',
      description: 'Revolutionary weight management and diabetes control with personalized dosing protocols',
      medications: [
        'Semaglutide for weight management',
        'Tirzepatide for diabetes control',
        'FDA-approved formulations',
        'Proven clinical results'
      ],
      icon: 'ri-heart-pulse-line',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      image: 'https://static.readdy.ai/image/c26c58cf585cdf583dbecd6bbd7d68e5/6aec3731f0bdf9240e720ac73d908dad.png',
      stats: '94% Success Rate'
    },
    {
      title: 'Peptide Therapy',
      description: 'Advanced peptides for healing, recovery, and cellular health optimization',
      medications: [
        'BPC-157 for healing and recovery',
        'NAD+ for cellular health and longevity',
        'Custom peptide compounds',
        'Research-backed formulations'
      ],
      icon: 'ri-dna-line',
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      image: 'https://readdy.ai/api/search-image?query=Advanced%20peptide%20therapy%20laboratory%20with%20molecular%20visualization%20displays%2C%20futuristic%20pharmaceutical%20research%20facility%2C%20clean%20white%20environment%20with%20violet%20and%20purple%20accent%20lighting%2C%20high-tech%20peptide%20synthesis%20equipment%2C%20molecular%20structure%20holograms&width=800&height=600&seq=peptide-future&orientation=landscape',
      stats: '98% Purity'
    },
    {
      title: 'Hormone Therapy',
      description: 'Comprehensive hormone replacement and optimization with precision medicine',
      medications: [
        'Testosterone replacement therapy',
        'Sermorelin for growth hormone',
        'Personalized hormone panels',
        'Comprehensive monitoring'
      ],
      icon: 'ri-user-line',
      gradient: 'from-rose-400 via-pink-500 to-red-600',
      image: 'https://readdy.ai/api/search-image?query=Modern%20hormone%20therapy%20consultation%20center%20with%20advanced%20diagnostic%20equipment%2C%20personalized%20medicine%20displays%2C%20clean%20medical%20environment%20with%20rose%20and%20pink%20accent%20lighting%2C%20precision%20hormone%20testing%20laboratory%2C%20futuristic%20medical%20consultation%20room&width=800&height=600&seq=hormone-future&orientation=landscape',
      stats: '92% Satisfaction'
    },
    {
      title: 'Wellness & Aesthetics',
      description: 'Comprehensive wellness and aesthetic treatment options with premium formulations',
      medications: [
        'Vitamin IV therapy and B12 blends',
        'Aesthetic enhancement solutions',
        'Wellness optimization programs',
        'Long-term health improvement'
      ],
      icon: 'ri-leaf-line',
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      image: 'https://readdy.ai/api/search-image?query=Luxury%20wellness%20and%20aesthetic%20treatment%20center%20with%20premium%20IV%20therapy%20stations%2C%20elegant%20spa-like%20medical%20environment%2C%20warm%20amber%20and%20orange%20lighting%2C%20high-end%20wellness%20facility%20with%20natural%20elements%2C%20sophisticated%20aesthetic%20medicine%20clinic&width=800&height=600&seq=wellness-luxury&orientation=landscape',
      stats: '96% Retention'
    }
  ];

  const qualityFeatures = [
    {
      title: 'FDA-Registered Facilities',
      description: 'All medications produced in FDA-registered 503A & 503B pharmacies with full compliance',
      icon: 'ri-government-line',
      gradient: 'from-blue-500 to-indigo-600',
      metric: '100% Compliant'
    },
    {
      title: 'AI Quality Control',
      description: 'Advanced AI-powered quality assurance systems ensure consistent purity and potency',
      icon: 'ri-robot-line',
      gradient: 'from-cyan-500 to-blue-600',
      metric: '99.9% Accuracy'
    },
    {
      title: 'Extended Stability',
      description: 'Extended Beyond Use Dates through advanced formulation and stability testing',
      icon: 'ri-time-line',
      gradient: 'from-purple-500 to-pink-600',
      metric: '2x Longer BUD'
    },
    {
      title: 'Real-time Analytics',
      description: 'Complete batch tracking with real-time analytics and comprehensive documentation',
      icon: 'ri-line-chart-line',
      gradient: 'from-emerald-500 to-teal-600',
      metric: 'Live Tracking'
    },
    {
      title: 'Precision Compounding',
      description: 'Robotic precision compounding for exact dosing and personalized formulations',
      icon: 'ri-flask-line',
      gradient: 'from-orange-500 to-red-600',
      metric: '±0.1% Accuracy'
    },
    {
      title: 'Smart Pricing',
      description: 'AI-optimized pricing with flexible ordering from single units to bulk quantities',
      icon: 'ri-money-dollar-circle-line',
      gradient: 'from-violet-500 to-purple-600',
      metric: '30% Savings'
    }
  ];

  return (
    <div className="pt-16" ref={containerRef}>
      {/* Futuristic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20pharmaceutical%20compounding%20laboratory%20with%20holographic%20molecular%20displays%2C%20advanced%20robotic%20equipment%2C%20neon%20blue%20and%20purple%20lighting%2C%20next-generation%20medical%20facility%20interior%2C%20AI-powered%20pharmaceutical%20manufacturing%20center%2C%20glass%20surfaces%20with%20ambient%20lighting&width=1920&height=1200&seq=medications-future-hero&orientation=landscape')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-blue-900/90"></div>
        </motion.div>

        {/* Floating Molecular Structures */}
        <div className="absolute inset-0 z-5">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                rotate: [0, 360],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full shadow-lg" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          ref={heroRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Advanced Medications
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Next-generation compounded medications with AI-powered quality control and precision formulations
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 shadow-2xl shadow-purple-500/25 border-0 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
              >
                Explore Medications
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Section with Enhanced Visuals */}
      <section id="categories" className="relative py-32 bg-gradient-to-br from-white via-purple-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={categoriesRef}
            initial={{ opacity: 0, y: 60 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-blue-700 bg-clip-text text-transparent mb-8">
              Medication Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive medication solutions with proven results and advanced formulation technology
            </p>
          </motion.div>

          <div className="space-y-24">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 80 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.3 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="relative overflow-hidden rounded-3xl shadow-2xl group"
                    style={{ perspective: '1000px' }}
                  >
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-96 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Floating Stats */}
                    <motion.div 
                      className="absolute top-6 right-6"
                      animate={{ 
                        y: [0, -10, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className={`bg-gradient-to-r ${category.gradient} text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl backdrop-blur-sm`}>
                        {category.stats}
                      </div>
                    </motion.div>

                    {/* Floating Icon */}
                    <motion.div 
                      className="absolute bottom-6 left-6"
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm`}>
                        <i className={`${category.icon} text-3xl text-white`}></i>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={categoriesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.2 }}
                  >
                    <h3 className="text-5xl font-bold text-slate-800 mb-6">{category.title}</h3>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">{category.description}</p>
                    
                    <div className="space-y-4 mb-8">
                      {category.medications.map((medication, medIndex) => (
                        <motion.div 
                          key={medIndex}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={categoriesInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.3 + medIndex * 0.1 + 0.5 }}
                        >
                          <div className={`w-3 h-3 bg-gradient-to-r ${category.gradient} rounded-full mr-4 shadow-lg`}></div>
                          <span className="text-slate-700 font-medium">{medication}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button 
                      variant="primary" 
                      onClick={() => window.location.href = '/contact'}
                      className={`bg-gradient-to-r ${category.gradient} hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Features with Advanced Design */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={qualityRef}
            initial={{ opacity: 0, y: 60 }}
            animate={qualityInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Quality Standards
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Every medication meets the highest standards with advanced technology and rigorous testing protocols
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qualityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                animate={qualityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 overflow-hidden">
                  <div className="p-8">
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300 mx-auto`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${feature.icon} text-3xl text-white`}></i>
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 text-center group-hover:text-purple-200 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-slate-300 leading-relaxed mb-6 text-center group-hover:text-slate-200 transition-colors duration-300">{feature.description}</p>
                    <div className={`text-center text-lg font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                      {feature.metric}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section with Timeline */}
      <section className="relative py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-8">
              Our Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From consultation to delivery, every step is optimized with advanced technology and quality assurance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'AI Consultation', description: 'AI-powered consultation to determine optimal formulation and dosing', icon: 'ri-robot-line', gradient: 'from-blue-500 to-cyan-600' },
              { step: '02', title: 'Precision Compounding', description: 'Robotic precision compounding in FDA-registered facilities', icon: 'ri-flask-line', gradient: 'from-purple-500 to-indigo-600' },
              { step: '03', title: 'Quality Verification', description: 'AI-powered testing with comprehensive analytics and documentation', icon: 'ri-test-tube-line', gradient: 'from-emerald-500 to-teal-600' },
              { step: '04', title: 'Smart Delivery', description: 'Intelligent delivery with real-time tracking and storage optimization', icon: 'ri-truck-line', gradient: 'from-orange-500 to-red-600' }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative mb-8">
                  <motion.div 
                    className={`w-24 h-24 bg-gradient-to-br ${process.gradient} rounded-full flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`${process.icon} text-3xl text-white`}></i>
                  </motion.div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">{process.title}</h3>
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Dynamic Design */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-300 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Ready to Order?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of compounded medications with our advanced formulations and quality assurance
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-600 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Request Information
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 text-xl px-12 py-6 backdrop-blur-sm" 
                onClick={() => window.location.href = '/solutions'}
              >
                View All Solutions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
