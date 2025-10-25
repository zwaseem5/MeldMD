
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Providers() {
  const [categoriesRef, categoriesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const medicationCategories = [
    {
      title: 'Weight Management',
      icon: 'ri-scales-line',
      description: 'Advanced GLP-1 medications with personalized dosing protocols and comprehensive patient monitoring.',
      medications: ['Semaglutide', 'Tirzepatide', 'Liraglutide', 'Custom formulations'],
      benefits: ['FDA-approved compounds', 'Proven efficacy', 'Patient monitoring support'],
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      stats: '94% Success Rate'
    },
    {
      title: 'Peptide Therapy',
      icon: 'ri-dna-line',
      description: 'Cutting-edge peptide compounds for healing, recovery, and cellular health optimization.',
      medications: ['BPC-157', 'NAD+', 'Sermorelin', 'TB-500'],
      benefits: ['Research-backed formulations', 'Quality assurance', 'Dosing guidance'],
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      stats: '98% Purity'
    },
    {
      title: 'Hormone Optimization',
      icon: 'ri-heart-pulse-line',
      description: 'Comprehensive hormone replacement therapy with bioidentical compounds and precision dosing.',
      medications: ['Testosterone', 'Estrogen', 'Progesterone', 'DHEA'],
      benefits: ['Bioidentical hormones', 'Regular monitoring', 'Lifestyle integration'],
      gradient: 'from-rose-400 via-pink-500 to-red-600',
      stats: '92% Satisfaction'
    },
    {
      title: 'Wellness & Aesthetics',
      icon: 'ri-leaf-line',
      description: 'Premium IV vitamin therapy and aesthetic treatments for comprehensive wellness programs.',
      medications: ['IV vitamin blends', 'B12 injections', 'Glutathione', 'Custom formulations'],
      benefits: ['Premium ingredients', 'Customizable blends', 'Patient education materials'],
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      stats: '96% Retention'
    }
  ];

  const providerSolutions = [
    {
      icon: 'ri-hospital-line',
      title: 'Seamless Integration',
      description: 'AI-powered integration with existing practice management systems and automated workflows',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Compliance Automation',
      description: 'Automated regulatory compliance with real-time documentation and reporting systems',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: 'ri-truck-line',
      title: 'Smart Supply Chain',
      description: 'Predictive inventory management with AI-optimized supply chain and backup protocols',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      icon: 'ri-customer-service-line',
      title: '24/7 AI Support',
      description: 'Round-the-clock clinical support with AI-assisted consultation and expert guidance',
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Growth Analytics',
      description: 'Advanced analytics and AI-driven patient acquisition strategies for practice expansion',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: 'ri-graduation-cap-line',
      title: 'Continuous Learning',
      description: 'AI-personalized education platform with latest treatments and best practice updates',
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Active Providers', icon: 'ri-hospital-line', gradient: 'from-blue-500 to-cyan-600' },
    { number: '50', label: 'States Covered', icon: 'ri-map-line', gradient: 'from-emerald-500 to-teal-600' },
    { number: '99.9%', label: 'Uptime Guarantee', icon: 'ri-shield-check-line', gradient: 'from-purple-500 to-indigo-600' },
    { number: '24/7', label: 'Support Available', icon: 'ri-customer-service-line', gradient: 'from-rose-500 to-pink-600' }
  ];

  return (
    <div className="pt-16">
      {/* Dynamic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Floating Medical Icons */}
        <div className="absolute inset-0">
          {[
            { icon: 'ri-capsule-line', delay: 0 },
            { icon: 'ri-heart-pulse-line', delay: 1 },
            { icon: 'ri-dna-line', delay: 2 },
            { icon: 'ri-microscope-line', delay: 3 },
            { icon: 'ri-test-tube-line', delay: 4 }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="absolute text-white/20 text-4xl"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: item.delay,
              }}
            >
              <i className={item.icon}></i>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8"
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
              Provider Excellence
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Empowering healthcare providers with advanced medications, AI-driven insights, and comprehensive support systems
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:via-purple-600 hover:to-cyan-600 shadow-2xl shadow-indigo-500/25 border-0 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
              >
                Explore Solutions
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 text-xl px-12 py-6 backdrop-blur-sm"
                onClick={() => window.location.href = '/contact'}
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Medication Categories with Enhanced Design */}
      <section id="categories" className="py-32 bg-gradient-to-br from-white via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={categoriesRef}
            initial={{ opacity: 0, y: 60 }}
            animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-8">
              Medication Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive range of high-quality medications with proven results and advanced formulations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {medicationCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 60 }}
                animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <i className={`${category.icon} text-2xl text-white`}></i>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">{category.title}</h3>
                          <div className={`text-lg font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                            {category.stats}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">{category.description}</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Available Medications:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.medications.map((med, medIndex) => (
                            <span
                              key={medIndex}
                              className={`bg-gradient-to-r ${category.gradient} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md`}
                            >
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {category.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="flex items-start">
                              <div className={`w-2 h-2 bg-gradient-to-r ${category.gradient} rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                              <span className="text-slate-600 text-sm">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Solutions with Modern Grid */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={solutionsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-indigo-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              Complete Provider Support
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced technology and comprehensive support to help your practice thrive in the digital age
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providerSolutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 60 }}
                animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                  <div className="p-8 text-center">
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-br ${solution.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${solution.icon} text-3xl text-white`}></i>
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-200 transition-colors duration-300">{solution.title}</h3>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">{solution.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-br from-white via-purple-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-indigo-700 bg-clip-text text-transparent mb-8">
              Trusted by Providers
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of healthcare providers who trust our platform for their medication and technology needs
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group text-center"
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                  <i className={`${stat.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-5xl md:text-6xl font-bold text-slate-800 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                  {stat.number}
                </h3>
                <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 text-lg font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance with Visual Impact */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-8">
                Uncompromising Quality
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Every medication we provide meets the highest standards of quality and safety with advanced manufacturing processes and rigorous testing protocols.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  'FDA-registered 503A and 503B pharmacies',
                  'cGMP manufacturing standards',
                  'AI-powered quality control systems',
                  'Extended Beyond Use Dating (BUD)',
                  'Real-time batch tracking and verification',
                  'Comprehensive chain of custody documentation'
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 mr-4 flex-shrink-0 shadow-lg"></div>
                    <span className="text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://readdy.ai/api/search-image?query=Advanced%20pharmaceutical%20quality%20control%20laboratory%20with%20AI-powered%20testing%20equipment%2C%20scientists%20in%20lab%20coats%20working%20with%20futuristic%20technology%2C%20clean%20sterile%20environment%20with%20purple%20and%20blue%20accent%20lighting%2C%20high-tech%20pharmaceutical%20manufacturing%20center&width=600&height=400&seq=quality-future-lab&orientation=landscape"
                  alt="Advanced Quality Assurance Laboratory"
                  className="w-full h-96 object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA with Dynamic Design */}
      <section className="py-32 bg-gradient-to-br from-white via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent mb-8">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of providers who trust us for their medication and technology needs. Experience the future of healthcare delivery today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:via-purple-600 hover:to-cyan-600 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-500 hover:text-white text-xl px-12 py-6 transition-all duration-300"
                onClick={() => window.location.href = '/contact'}
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
