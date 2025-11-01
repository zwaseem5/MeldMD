import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import ScrollVelocityText from '../../components/ScrollVelocityText'; // ← your location

export default function Solutions() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const solutions = [
    {
      title: 'MeldWell™ Telehealth Platform',
      description:
        'Revolutionary telehealth solution with AI-powered diagnostics, white-label options, and comprehensive patient engagement tools.',
      features: [
        'AI-enhanced diagnostic support',
        'Nationwide telehealth coverage',
        'White-labeled platform options',
        'Advanced patient analytics',
        'Secure, HIPAA-compliant infrastructure',
      ],
      icon: 'ri-video-line',
      link: '/telehealth',
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      image:
        'https://readdy.ai/api/search-image?query=Futuristic%20telehealth%20consultation%20interface%20with%20holographic%20displays%2C%20advanced%20medical%20technology%2C%20clean%20white%20environment%20with%20cyan%20and%20blue%20lighting%2C%20next-generation%20healthcare%20communication%20center%2C%20AI-powered%20medical%20diagnostics%20visualization&width=800&height=600&seq=telehealth-future&orientation=landscape',
    },
    {
      title: 'Advanced Compounding Solutions',
      description:
        'Next-generation pharmaceutical compounding with precision robotics, AI quality control, and personalized medicine capabilities.',
      features: [
        'Robotic precision compounding',
        'AI-powered quality assurance',
        'Personalized medicine protocols',
        'Extended stability formulations',
        'Real-time batch tracking',
      ],
      icon: 'ri-flask-line',
      link: '/medications',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      image:
        'https://readdy.ai/api/search-image?query=Advanced%20pharmaceutical%20laboratory%20with%20robotic%20compounding%20equipment%2C%20AI-controlled%20quality%20systems%2C%20clean%20futuristic%20environment%20with%20emerald%20and%20teal%20lighting%2C%20precision%20medicine%20manufacturing%20center%2C%20high-tech%20pharmaceutical%20automation&width=800&height=600&seq=compounding-future&orientation=landscape',
    },
    {
      title: 'Intelligent Practice Management',
      description:
        'AI-driven practice optimization with predictive analytics, automated workflows, and comprehensive business intelligence.',
      features: [
        'Predictive patient analytics',
        'Automated workflow optimization',
        'Real-time performance insights',
        'Intelligent resource allocation',
        'Comprehensive business intelligence',
      ],
      icon: 'ri-brain-line',
      link: '/contact',
      gradient: 'from-violet-400 via-purple-500 to-pink-600',
      image:
        'https://readdy.ai/api/search-image?query=Intelligent%20medical%20practice%20management%20center%20with%20AI%20dashboards%2C%20holographic%20data%20visualization%2C%20modern%20healthcare%20analytics%2C%20purple%20and%20pink%20ambient%20lighting%2C%20futuristic%20medical%20business%20intelligence%20interface&width=800&height=600&seq=practice-ai&orientation=landscape',
    },
  ];

  const benefits = [
    {
      title: 'AI-Powered Excellence',
      description:
        'Machine learning algorithms optimize every aspect of healthcare delivery for superior outcomes.',
      icon: 'ri-robot-line',
      gradient: 'from-blue-400 via-cyan-500 to-teal-600',
      stats: '99.7% Accuracy',
    },
    {
      title: 'Quantum Security',
      description:
        'Next-generation encryption and quantum-resistant security protocols protect all data.',
      icon: 'ri-shield-keyhole-line',
      gradient: 'from-purple-400 via-violet-500 to-indigo-600',
      stats: 'Zero Breaches',
    },
    {
      title: 'Global Scalability',
      description:
        'Cloud-native architecture enables instant scaling across multiple regions and jurisdictions.',
      icon: 'ri-global-line',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      stats: '50+ Countries',
    },
    {
      title: 'Predictive Analytics',
      description:
        'Advanced algorithms predict patient needs and optimize treatment protocols proactively.',
      icon: 'ri-line-chart-line',
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      stats: '85% Improvement',
    },
  ];

  return (
    <div className="pt-16" ref={containerRef}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-teal-900 to-purple-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.1&quot;%3E%3Cpath d=&quot;m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>

        {/* Animated blobs/icons */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
            style={{ y: backgroundY }}
          />
          <div
            className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-spin"
            style={{ animationDuration: '20s' }}
          />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -25, 0], opacity: [0.1, 0.3, 0.1], rotate: [0, 180, 360] }}
              transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
            >
              <i
                className={`ri-${
                  ['hospital-line', 'capsule-line', 'smartphone-line', 'shield-check-line', 'user-heart-line', 'microscope-line'][i]
                } text-5xl`}
              />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={heroRef}>
          <h1 className="sr-only">Healthcare Solutions</h1>

          {/* ReactBits-like marquee headline */}
          <div className="mb-6">
            <ScrollVelocityText
              text="Healthcare Solutions"
              className="text-[12vw] md:text-9xl font-extrabold tracking-tight bg-clip-text text-transparent
                         bg-gradient-to-b from-white to-white/70 leading-none"
              baseVelocity={-14}
              repeat={6}
              separator="•"
            />
          </div>

          <div className="-mt-2 opacity-80">
            <ScrollVelocityText
              text="Comprehensive telehealth and pharmaceutical solutions"
              className="text-lg md:text-2xl font-medium text-white/80"
              baseVelocity={10}
              repeat={10}
            />
          </div>

          <motion.p
            className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Comprehensive telehealth and pharmaceutical solutions designed to transform patient care and practice
            growth
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('telehealth')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 shadow-2xl shadow-teal-500/25 border-0 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
            >
              <i className="ri-smartphone-line mr-3" />
              Explore Telehealth
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('pharmacy')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
            >
              <i className="ri-capsule-line mr-3" />
              Pharmacy Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Solutions grid */}
      <section
        id="solutions"
        className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-spin"
            style={{ animationDuration: '20s' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={solutionsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
              Revolutionary Solutions
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the future of healthcare with our cutting-edge technology platform
            </p>
          </motion.div>

          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 80 }}
                animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.3 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    className="relative overflow-hidden rounded-3xl shadow-2xl"
                    style={{ perspective: '1000px' }}
                  >
                    <img src={solution.image} alt={solution.title} className="w-full h-96 object-cover object-top" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${solution.gradient} opacity-30`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <motion.div
                      className="absolute top-6 right-6"
                      animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${solution.gradient} rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm`}
                      >
                        <i className={`${solution.icon} text-3xl text-white`} />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={solutionsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.3 + 0.2 }}
                  >
                    <h3 className="text-5xl font-bold text-white mb-6">{solution.title}</h3>
                    <p className="text-xl text-slate-300 mb-8 leading-relaxed">{solution.description}</p>

                    <div className="space-y-4 mb-8">
                      {solution.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={solutionsInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.3 + featureIndex * 0.1 + 0.5 }}
                        >
                          <div className={`w-3 h-3 bg-gradient-to-r ${solution.gradient} rounded-full mr-4 shadow-lg`} />
                          <span className="text-slate-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      variant="primary"
                      onClick={() => (window.location.href = solution.link)}
                      className={`bg-gradient-to-r ${solution.gradient} hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4`}
                    >
                      Explore Technology
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative py-32 bg-gradient-to-br from-white via-cyan-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={benefitsRef}
            initial={{ opacity: 0, y: 60 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-8">
              Why Choose Our Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built on cutting-edge technology with measurable results and proven performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 60 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group text-center"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="p-8">
                    <motion.div
                      className={`w-24 h-24 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${benefit.icon} text-3xl text-white`} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{benefit.description}</p>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent`}>
                      {benefit.stats}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-8">
              Ready for the Future?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join the healthcare revolution with our next-generation platform and transform patient care forever
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                onClick={() => (window.location.href = '/contact')}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 text-xl px-12 py-6 backdrop-blur-sm"
                onClick={() => (window.location.href = '/about')}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
