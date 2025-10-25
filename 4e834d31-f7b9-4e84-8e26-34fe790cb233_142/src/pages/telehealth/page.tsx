import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Telehealth() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const features = [
    {
      title: 'White-Label Platform',
      description: 'Build your own branded telehealth presence with customizable interfaces and patient portals.',
      icon: 'ri-palette-line',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Nationwide Coverage',
      description: 'Secure, compliant telehealth services across all 50 states with proper licensing.',
      icon: 'ri-map-line',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Patient-Centered Tools',
      description: 'Comprehensive tools for ordering, tracking, and engaging in the care journey.',
      icon: 'ri-user-heart-line',
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      title: 'Practice Growth',
      description: 'Analytics and tools designed to streamline workflows and expand your reach.',
      icon: 'ri-line-chart-line',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'HIPAA Compliance',
      description: 'Enterprise-grade security with full HIPAA compliance and data protection.',
      icon: 'ri-shield-check-line',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Integration Ready',
      description: 'Seamless integration with existing EMR systems and practice management tools.',
      icon: 'ri-links-line',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const benefits = [
    {
      title: 'Expand Your Reach',
      description: 'Serve patients beyond geographical boundaries with secure telehealth consultations.',
      icon: 'ri-global-line',
      stats: '300% average patient reach increase'
    },
    {
      title: 'Increase Revenue',
      description: 'Generate additional revenue streams through virtual consultations and follow-ups.',
      icon: 'ri-money-dollar-circle-line',
      stats: '40% average revenue increase'
    },
    {
      title: 'Improve Efficiency',
      description: 'Streamline patient interactions and reduce administrative overhead.',
      icon: 'ri-time-line',
      stats: '60% reduction in admin time'
    },
    {
      title: 'Enhance Patient Care',
      description: 'Provide continuous care and monitoring for better patient outcomes.',
      icon: 'ri-heart-pulse-line',
      stats: '85% patient satisfaction rate'
    }
  ];

  return (
    <div className="pt-16" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20telehealth%20consultation%20setup%20with%20large%20high-resolution%20monitor%20displaying%20patient%20video%20call%20interface%2C%20professional%20medical%20office%20with%20clean%20white%20design%20and%20teal%20accent%20lighting%2C%20advanced%20video%20conferencing%20equipment%2C%20minimalist%20healthcare%20technology%20environment%20with%20glass%20surfaces%20and%20ambient%20lighting&width=1920&height=1200&seq=telehealth-hero&orientation=landscape')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-teal-900/70 to-slate-800/80"></div>
        </motion.div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          ref={heroRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
                MeldWell™
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Telehealth
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Where providers grow and patients thrive through innovative telehealth solutions
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-2xl shadow-teal-500/25 border-0 text-xl px-12 py-6"
            >
              Explore Platform
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 60 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent mb-8">
              Platform Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive telehealth capabilities designed for modern healthcare practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${feature.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={benefitsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent mb-8">
              Transform Your Practice
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Measurable results that drive practice growth and improve patient outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 60 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                      <i className={`${benefit.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-slate-300 mb-4 leading-relaxed">{benefit.description}</p>
                    <div className="text-teal-300 font-semibold text-sm">{benefit.stats}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold bg-gradient-to-r from-slate-800 to-teal-700 bg-clip-text text-transparent mb-8">
                See MeldWell™ in Action
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Experience the power of our telehealth platform with a personalized demo tailored to your practice needs.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-4"></div>
                  <span className="text-slate-700">Live platform walkthrough</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-4"></div>
                  <span className="text-slate-700">Custom integration planning</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-4"></div>
                  <span className="text-slate-700">ROI analysis for your practice</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mr-4"></div>
                  <span className="text-slate-700">Implementation timeline</span>
                </li>
              </ul>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-xl px-10 py-5"
              >
                Schedule Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20telehealth%20consultation%20interface%20on%20modern%20tablet%20device%2C%20clean%20medical%20software%20dashboard%20with%20patient%20video%20call%2C%20healthcare%20technology%20user%20interface%20design%2C%20minimalist%20white%20background%20with%20teal%20accents%2C%20medical%20professional%20using%20digital%20health%20platform&width=800&height=600&seq=telehealth-demo&orientation=landscape"
                  alt="MeldWell Telehealth Platform Demo"
                  className="w-full h-96 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-all duration-300"
                    onClick={() => window.location.href = '/contact'}
                  >
                    <i className="ri-play-fill text-3xl text-teal-600 ml-1"></i>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent mb-8">
              Ready to Launch Your Telehealth Practice?
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Join hundreds of providers who have transformed their practices with MeldWell™
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-xl px-10 py-5"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-xl px-10 py-5" 
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