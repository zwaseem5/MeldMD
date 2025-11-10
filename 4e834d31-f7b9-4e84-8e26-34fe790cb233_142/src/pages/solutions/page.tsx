import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import ScrollVelocityText from '../../components/ScrollVelocityText';

export default function Solutions() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // 👇 helper to smoothly scroll and offset for the fixed header
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80; // adjust if your header is taller
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // add lightweight anchors for each solution card
  const solutions = [
    {
      id: 'telehealth', // 👈 anchor used by the hero button
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
      id: 'pharmacy', // 👈 anchor used by the hero button
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
      id: 'practice', // optional third anchor
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

  const benefits = [/* ...unchanged... */];

  return (
    <div className="pt-16" ref={containerRef}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* ...background, marquee, etc (unchanged)... */}

        {/* Buttons → now call the helper */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={heroRef}>
          {/* ...headline... */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToId('telehealth')}
              className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 shadow-2xl shadow-teal-500/25 border-0 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
            >
              <i className="ri-smartphone-line mr-3" />
              Explore Telehealth
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToId('pharmacy')}
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
            >
              <i className="ri-capsule-line mr-3" />
              Pharmacy Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Solutions grid */}
      <section id="solutions" className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        {/* ...bg... */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div /* ...heading... */ />
          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                id={solution.id}                           // 👈 anchor target
                className={`scroll-mt-24 ${                // 👈 offset when using native anchor jumps
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                } grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}
                initial={{ opacity: 0, y: 80 }}
                animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: index * 0.3 }}
              >
                {/* ...card/image/content (unchanged)... */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + CTA ... unchanged */}
    </div>
  );
}
