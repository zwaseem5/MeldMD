import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function Wellness() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [programsRef, programsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const services = [
    {
      title: 'Vitamin IV Therapy',
      description: 'Customized IV nutrient therapy for optimal health and wellness',
      treatments: [
        'B12 energy blends',
        'Immune system boosters',
        'Hydration therapy',
        'Custom vitamin cocktails'
      ],
      icon: 'ri-drop-line',
      gradient: 'from-emerald-500 to-teal-600',
      image: 'https://readdy.ai/api/search-image?query=Modern%20IV%20therapy%20treatment%20room%20with%20comfortable%20reclining%20chairs%2C%20clean%20medical%20environment%20with%20natural%20lighting%2C%20professional%20wellness%20center%20interior%2C%20minimalist%20design%20with%20plants%20and%20calming%20colors%2C%20high-end%20medical%20spa%20atmosphere&width=800&height=600&seq=iv-therapy&orientation=landscape'
    },
    {
      title: 'Aesthetic Treatments',
      description: 'Advanced aesthetic solutions for enhanced appearance and confidence',
      treatments: [
        'Anti-aging formulations',
        'Skin rejuvenation therapy',
        'Hair restoration treatments',
        'Body contouring solutions'
      ],
      icon: 'ri-heart-line',
      gradient: 'from-pink-500 to-rose-600',
      image: 'https://readdy.ai/api/search-image?query=Elegant%20aesthetic%20treatment%20room%20with%20modern%20medical%20equipment%2C%20luxurious%20spa-like%20environment%2C%20clean%20white%20design%20with%20soft%20pink%20accent%20lighting%2C%20professional%20aesthetic%20medicine%20clinic%2C%20minimalist%20beauty%20treatment%20center%20interior&width=800&height=600&seq=aesthetic-treatments&orientation=landscape'
    },
    {
      title: 'Wellness Programs',
      description: 'Comprehensive wellness programs for long-term health optimization',
      treatments: [
        'Personalized nutrition plans',
        'Hormone optimization',
        'Stress management protocols',
        'Longevity enhancement'
      ],
      icon: 'ri-leaf-line',
      gradient: 'from-green-500 to-emerald-600',
      image: 'https://readdy.ai/api/search-image?query=Serene%20wellness%20consultation%20room%20with%20natural%20elements%2C%20modern%20medical%20facility%20with%20plants%20and%20natural%20lighting%2C%20holistic%20health%20center%20interior%2C%20clean%20minimalist%20design%20with%20green%20accents%2C%20professional%20wellness%20coaching%20environment&width=800&height=600&seq=wellness-programs&orientation=landscape'
    }
  ];

  const programs = [
    {
      title: 'Executive Wellness',
      description: 'Comprehensive health optimization for busy professionals',
      features: [
        'Comprehensive health assessments',
        'Personalized treatment plans',
        'Concierge-level service',
        'Flexible scheduling options'
      ],
      icon: 'ri-briefcase-line',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Anti-Aging Protocol',
      description: 'Advanced therapies to slow aging and enhance vitality',
      features: [
        'Hormone replacement therapy',
        'NAD+ infusion therapy',
        'Peptide treatments',
        'Cellular regeneration support'
      ],
      icon: 'ri-time-line',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Athletic Performance',
      description: 'Optimization programs for peak physical performance',
      features: [
        'Performance enhancement protocols',
        'Recovery acceleration',
        'Injury prevention strategies',
        'Nutritional optimization'
      ],
      icon: 'ri-run-line',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      title: 'Weight Management',
      description: 'Comprehensive weight loss and metabolic optimization',
      features: [
        'GLP-1 therapy options',
        'Metabolic testing',
        'Nutritional counseling',
        'Lifestyle modification support'
      ],
      icon: 'ri-scales-line',
      gradient: 'from-teal-500 to-cyan-600'
    }
  ];

  const benefits = [
    { number: '95%', label: 'Patient Satisfaction', icon: 'ri-heart-line' },
    { number: '30+', label: 'Treatment Options', icon: 'ri-medicine-bottle-line' },
    { number: '24/7', label: 'Support Available', icon: 'ri-customer-service-line' },
    { number: '100%', label: 'Personalized Care', icon: 'ri-user-heart-line' }
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
              backgroundImage: `url('https://readdy.ai/api/search-image?query=Luxurious%20wellness%20and%20spa%20center%20with%20modern%20medical%20equipment%2C%20serene%20environment%20with%20natural%20elements%20and%20soft%20lighting%2C%20professional%20wellness%20facility%20interior%2C%20clean%20minimalist%20design%20with%20plants%20and%20calming%20colors%2C%20high-end%20medical%20spa%20atmosphere%20with%20glass%20surfaces&width=1920&height=1200&seq=wellness-hero&orientation=landscape')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-slate-800/80"></div>
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
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent mb-8">
              Wellness Solutions
            </h1>
            <p className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive wellness and aesthetic programs for long-term health optimization and enhanced quality of life
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-2xl shadow-emerald-500/25 border-0 text-xl px-12 py-6"
            >
              Explore Services
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={servicesRef}
            initial={{ opacity: 0, y: 60 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent mb-8">
              Wellness Services
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive wellness treatments designed to optimize your health and enhance your quality of life
            </p>
          </motion.div>

          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative overflow-hidden rounded-3xl shadow-2xl"
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-96 object-cover object-top"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-20`}></div>
                  </motion.div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <i className={`${service.icon} text-2xl text-white`}></i>
                  </div>
                  <h3 className="text-4xl font-bold text-slate-800 mb-6">{service.title}</h3>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-4 mb-8">
                    {service.treatments.map((treatment, treatmentIndex) => (
                      <li key={treatmentIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mr-4"></div>
                        <span className="text-slate-700">{treatment}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="primary" 
                    onClick={() => window.location.href = '/contact'}
                    className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300`}
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={programsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={programsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent mb-8">
              Wellness Programs
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive programs tailored to your specific health and wellness goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 60 }}
                animate={programsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${program.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${program.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{program.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">{program.description}</p>
                    
                    <ul className="space-y-3">
                      {program.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-slate-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 bg-gradient-to-br from-white via-slate-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-emerald-700 bg-clip-text text-transparent mb-8">
              Proven Results
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our wellness programs deliver measurable improvements in health and quality of life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <i className={`${benefit.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">{benefit.number}</h3>
                <p className="text-slate-600">{benefit.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent mb-8">
              Start Your Wellness Journey
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Take the first step towards optimal health and enhanced quality of life
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => window.location.href = '/contact'}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-xl px-10 py-5"
              >
                Schedule Consultation
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