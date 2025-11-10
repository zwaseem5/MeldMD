import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function About() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [networkRef, networkInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [journeyRef, journeyInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Patient Journey Presentation State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const journeySlides = [
    {
      title: "A Patient's Journey",
      subtitle: "Feeling Alone on the Journey",
      content: [
        "You've probably felt it before: being alone on your health journey.",
        "Unsure of where to start, who to trust, or what's even wrong. You're dealing with symptoms, side effects, and lingering concerns — but there's no one connecting the dots."
      ],
      background: "from-rose-500 to-pink-600",
      icon: "ri-user-heart-line",
      image: "https://readdy.ai/api/search-image?query=Lonely%20patient%20sitting%20in%20hospital%20waiting%20room%2C%20looking%20concerned%20and%20isolated%2C%20soft%20natural%20lighting%2C%20emotional%20healthcare%20moment%2C%20person%20holding%20medical%20documents%20with%20worried%20expression%2C%20clean%20modern%20medical%20facility%20background&width=800&height=600&seq=journey-1&orientation=landscape"
    },
    {
      title: "The Problem With Today's Telehealth",
      subtitle: "Cold and Disconnected",
      content: [
        "Telehealth was supposed to help, but too often it feels cold and disconnected.",
        "• You rarely see the same doctor twice",
        "• Referrals are almost nonexistent",
        "• Your whole health story is never factored in",
        "• You're just another quick appointment, another chart"
      ],
      background: "from-slate-600 to-gray-700",
      icon: "ri-stethoscope-line",
      image: "https://readdy.ai/api/search-image?query=Impersonal%20telehealth%20video%20call%20on%20laptop%20screen%2C%20distant%20doctor%20on%20screen%2C%20cold%20clinical%20setting%2C%20patient%20looking%20disconnected%20and%20frustrated%2C%20sterile%20medical%20environment%20technology%20barrier%20in%20healthcare&width=800&height=600&seq=journey-2&orientation=landscape"
    },
    {
      title: "What If It Could Be Different?",
      subtitle: "A New Vision for Healthcare",
      content: [
        "What if your entire health journey mattered?",
        "What if there were doctors who could look at your platform — not just your labs or prescriptions, but your nutrition, your routines, your story?",
        "What if care wasn't limited to weight loss, but included hormones, peptides, vitamins, lifestyle, and long-term health?"
      ],
      background: "from-emerald-500 to-teal-600",
      icon: "ri-lightbulb-line",
      image: "https://readdy.ai/api/search-image?query=Bright%20hopeful%20healthcare%20future%20concept%2C%20patient%20and%20doctor%20collaborating%20together%2C%20holistic%20health%20approach%20modern%20bright%20medical%20office%20personalized%20care%20discussion%20warm%20and%20welcoming%20healthcare%20environment&width=800&height=600&seq=journey-3&orientation=landscape"
    },
    {
      title: "A Patient's Telehealth Platform",
      subtitle: "MeldWell: Patient-Centered Care",
      content: [
        "MeldWell isn't just another doctor-first telehealth service, it's a patient-centered platform built around real health journeys.",
        "For Patients:",
        "• Own your health record and decide what to share",
        "• Connect with doctors and experts who resonate with your story",
        "• Access referrals, prescriptions, and lifestyle support in one place",
        "• Join a supportive health community like Instagram, Reddit, TikTok — but built for care"
      ],
      background: "from-blue-500 to-indigo-600",
      icon: "ri-heart-pulse-line",
      image: "https://readdy.ai/api/search-image?query=Patient%20using%20modern%20healthcare%20app%20on%20tablet%2C%20personalized%20health%20dashboard%20comfortable%20home%20setting%20empowered%20patient%20managing%20their%20own%20health%20data%20user-friendly%20medical%20technology%20interface&width=800&height=600&seq=journey-4&orientation=landscape"
    },
    {
      title: "For Practitioners",
      subtitle: "Tools That Empower",
      content: [
        "Access patients who want care aligned with your expertise",
        "Tools to prescribe, refer, and coordinate care seamlessly",
        "Everything from consult to prescription to delivery in one system"
      ],
      background: "from-purple-500 to-violet-600",
      icon: "ri-user-star-line",
      image: "https://readdy.ai/api/search-image?query=Healthcare%20practitioner%20using%20advanced%20medical%20technology%2C%20modern%20clinic%20setting%20doctor%20working%20with%20comprehensive%20patient%20management%20system%20professional%20medical%20environment%20with%20cutting-edge%20tools&width=800&height=600&seq=journey-5&orientation=landscape"
    },
    {
      title: "The MeldWell Experience",
      subtitle: "Four Pillars of Care",
      content: [
        "Your Story at the Center: You own your health record. Share what you want, keep what you don't.",
        "True Personalization: Doctors and experts connect with you based on your unique story.",
        "Referrals at the Heart: Your care network expands with trusted experts.",
        "Choice & Control: You decide what to pay for — medications, care, timely appointments."
      ],
      background: "from-teal-500 to-cyan-600",
      icon: "ri-compass-3-line",
      image: "https://readdy.ai/api/search-image?query=Four%20pillars%20of%20healthcare%20concept%20visualization%2C%20balanced%20and%20comprehensive%20care%20approach%2C%20modern%20medical%20facility%20with%20multiple%20care%20areas%20holistic%20health%20environment%20patient-centered%20care%20design&width=800&height=600&seq=journey-6&orientation=landscape"
    },
    {
      title: "A Community That Feels Like Home",
      subtitle: "Familiar Platforms, Healthcare Focus",
      content: [
        "Like Instagram/Facebook: connect with friends & local communities",
        "Like Reddit: share questions, concerns, and expert opinions",
        "Like TikTok: explore creative solutions and helpful ideas",
        "Like Healthgrades: discover real-life referrals to trusted experts",
        "Like Roblox: help build the world — communities shaped by patients and practitioners together"
      ],
      background: "from-orange-500 to-red-600",
      icon: "ri-community-line",
      image: "https://readdy.ai/api/search-image?query=Diverse%20healthcare%20community%20connecting%20online%20and%20offline%2C%20people%20supporting%20each%20other%20in%20health%20journeys%20modern%20community%20center%20with%20medical%20focus%20warm%20and%20welcoming%20social%20healthcare%20environment&width=800&height=600&seq=journey-7&orientation=landscape"
    },
    {
      title: "The Future of Care",
      subtitle: "Where Your Story Leads, and Care Follows",
      content: [
        "Patients get control, connection, and choice.",
        "Doctors get access to patients who resonate with their expertise.",
        "Tools to prescribe, refer, and coordinate care in one place.",
        "From appointment to prescription to delivery — everything in one platform.",
        "MeldWell: A place to connect, to heal, and to truly meld well."
      ],
      background: "from-indigo-500 to-purple-600",
      icon: "ri-rocket-line",
      image: "https://readdy.ai/api/search-image?query=Futuristic%20healthcare%20landscape%2C%20advanced%20medical%20technology%2C%20seamless%20patient%20care%20journey%20bright%20hopeful%20medical%20future%20integrated%20healthcare%20ecosystem%20innovation%20in%20medicine%20and%20patient%20care&width=800&height=600&seq=journey-8&orientation=landscape"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + journeySlides.length) % journeySlides.length);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < journeySlides.length) setCurrentSlide(index);
  };

  const toggleAutoPlay = () => setIsAutoPlaying((p) => !p);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // ===== Leadership / Team roster =====
  // Put headshots in /public/images/team using these exact filenames.
  const teamMembers = [
    {
      name: 'Melanie Darrohn',
      role: 'Managing Partner / Owner',
      image: '/images/team/melanie-darrohn.jpg',
      bio: 'Founder of The Meld Group. Bridges telehealth, pharmacy, and patient-centered care to expand access, reduce costs, and improve outcomes.'
    },
    {
      name: 'Nick Mauro',
      role: 'Managing Partner',
      image: '/images/team/nick-mauro.jpg',
      bio: 'Pharma sales leader for cost-effective 503A/503B solutions. Former EOD technician, Navy Diver & Naval Parachutist — disciplined and mission-driven.'
    },
    {
      name: 'Cheryl Simonton',
      role: 'Sales Representative',
      image: '/images/team/cheryl-simonton.jpg',
      bio: '20+ years in healthcare leadership and digital adoption. Builds strategic partnerships and white-glove experiences that expand telehealth & wellness.'
    },
    {
      name: 'Carson Bayless',
      role: 'Regional Sales Manager',
      image: '/images/team/carson-bayless.jpg',
      bio: 'Business analytics & compliance background. Relationship-builder delivering high-service support across California’s Central Coast.'
    },
    {
      name: 'Bryanna Ojeda',
      role: 'Sales Representative',
      image: '/images/team/bryanna-ojeda.jpg',
      bio: 'Operations pro (ex-Teladoc) who streamlines processes and launches compliant, profitable GLP-1 programs with a warm, consultative approach.'
    },
    {
      name: 'Frank DiNitto',
      role: 'Business Administrator',
      image: '/images/team/frank-dinitto.jpg',
      bio: '15+ years in med-device (spine/neuro). Now leading integrated telehealth solutions spanning white-label, branding, and medication management.'
    },
    {
      name: 'Rachel Rivers',
      role: 'Sales Representative',
      image: '/images/team/rachel-rivers.jpg',
      bio: 'Wellness & fitness pro (Exercise Science, D-I Tennis). Helps pros integrate peptide & performance therapies for sustainable, evidence-based results.'
    },
    {
      name: 'Emily Battersby',
      role: 'Sales Representative',
      image: '/images/team/emily-battersby.jpg',
      bio: '17 years in nursing (12 in ER). Clear communicator and relationship-builder with a passion for active living and patient-first solutions.'
    },
    {
      name: 'Sarah Rees',
      role: 'Sales Representative',
      image: '/images/team/sarah-rees.jpg',
      bio: 'Specialist in GLP-1 and peptide therapies. Guides clinics with deep product knowledge and a results-driven, education-first mindset.'
    },
    {
      name: 'Greg Smith',
      role: 'Telehealth Manager',
      image: '/images/team/greg-smith.jpg',
      bio: 'U.S. Army Sergeant & former Major Crimes/Cold Case Detective. Brings technical and leadership expertise to drive success at MeldMD.'
    },
    {
      name: 'Lori Smith',
      role: 'Administrative Assistant',
      image: '/images/team/lori-smith.jpg',
      bio: 'Operations & customer-service ace who strengthens daily processes and keeps execution smooth and efficient.'
    },
    {
      name: 'Nancy Coveleskie',
      role: 'Business Administrator',
      image: '/images/team/nancy-coveleskie.jpg',
      bio: 'Financial strategist with deep healthcare experience; passionate about helping people gain choice and control over health & wealth.'
    },
    {
      name: 'Browder Morrisey',
      role: 'Business Administrator',
      image: '/images/team/browder-morrisey.jpg',
      bio: 'Leads business development & marketing. Background in psychology, real estate, and solar; content creator focused on performance & coherence.'
    },
    {
      name: 'Karsten Fettinger',
      role: 'Business Administrator',
      image: '/images/team/karsten-fettinger.jpg',
      bio: 'Central Coast-based administrator supporting operations and client success across MeldMD initiatives.'
    },
    {
      name: 'Karl Jepson',
      role: 'Sales Representative',
      image: '/images/team/karl-jepson.jpg',
      bio: 'Delivers tailored solutions that raise efficiency, profitability, and outcomes for clinics, wellness providers, and pharmacies.'
    },
    {
      name: 'Ari Mazaheri',
      role: 'Business Administrator',
      image: '/images/team/ari-mazaheri.jpg',
      bio: 'Administrator supporting organizational excellence and high-touch service for partners and providers.'
    },
    {
      name: 'Katie Cave',
      role: 'Sales Representative',
      image: '/images/team/katie-cave.jpg',
      bio: 'Provider-focused sales rep dedicated to building relationships and connecting clinics with modern wellness solutions.'
    }
  ];

  const coreValues = [
    {
      icon: 'ri-heart-line',
      title: 'Patient-First Care',
      description: 'Every decision we make prioritizes patient outcomes and well-being above all else.',
      gradient: 'from-rose-400 to-pink-500'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Uncompromising Quality',
      description: 'FDA compliance, cGMP standards, and rigorous quality assurance in everything we do.',
      gradient: 'from-emerald-400 to-teal-500'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation',
      description: 'Continuously advancing healthcare through technology and pharmaceutical excellence.',
      gradient: 'from-amber-400 to-orange-500'
    },
    {
      icon: 'ri-team-line',
      title: 'Partnership',
      description: 'Building lasting relationships with providers to grow stronger practices together.',
      gradient: 'from-blue-400 to-indigo-500'
    }
  ];

  const networkBrands = [
    {
      name: 'MeldWell',
      url: 'https://meldwell.com',
      description: 'Our flagship telehealth platform providing nationwide coverage with patient-centered tools and white-label options for providers.',
      category: 'Telehealth Platform',
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      name: 'NewLife Rx',
      url: 'https://newliferx.com',
      description: 'FDA-registered 503A & 503B pharmacy specializing in compounded medications with cGMP compliance.',
      category: 'Pharmacy Services',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'TruLife Telehealth',
      url: '#',
      description: 'Comprehensive telehealth solutions designed for practice growth and patient engagement.',
      category: 'Telehealth Solutions',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      name: 'MeldMD Rx',
      url: 'https://meldmdrx.com',
      description: 'Specialized pharmaceutical solutions for healthcare providers with bulk ordering and compliance support.',
      category: 'Pharmaceutical Solutions',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      name: 'Meld-MD',
      url: 'https://meld-md.com',
      description: 'Provider-focused platform for medication management and practice optimization tools.',
      category: 'Practice Management',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      name: 'Meld-Rx',
      url: 'https://meld-rx.com',
      description: 'Direct-to-provider pharmaceutical services with competitive pricing and flexible ordering.',
      category: 'Pharmaceutical Services',
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  return (
    <div className="pt-16">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-purple-200 to-teal-200 bg-clip-text text-transparent mb-8"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              About MeldMD
            </motion.h1>
            <motion.p
              className="text-2xl md:text-3xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Transforming healthcare through innovation, compassion, and unwavering commitment to excellence
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 shadow-2xl shadow-purple-500/25 border-0 text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-compass-3-line mr-3"></i>
                Discover Our Story
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xl px-12 py-6 transform hover:scale-105 transition-all duration-300"
              >
                <i className="ri-heart-line mr-3"></i>
                Our Mission
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Patient Journey Interactive Presentation */}
      <section
        id="journey"
        className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={journeyRef}
            initial={{ opacity: 0, y: 60 }}
            animate={journeyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-8">
              The Patient Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
              Discover how MeldWell is revolutionizing healthcare by putting patients at the
              center of their journey
            </p>

            {/* Auto-play Controls */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <Button
                onClick={toggleAutoPlay}
                className={`${isAutoPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white px-6 py-3 transition-all duration-300`}
              >
                <i className={`${isAutoPlaying ? 'ri-pause-line' : 'ri-play-line'} mr-2`}></i>
                {isAutoPlaying ? 'Pause' : 'Auto Play'}
              </Button>
              <span className="text-slate-500 text-sm">
                {isAutoPlaying ? 'Auto-advancing every 5 seconds' : 'Manual control'}
              </span>
            </div>
          </motion.div>

          {/* Enhanced Presentation Slide */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-16"
          >
            <Card
              className={`min-h-[700px] bg-gradient-to-br ${journeySlides[currentSlide].background} text-white border-0 shadow-2xl relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  opacity: 0.2,
                }}
              />
              <div className="relative z-10 p-8 lg:p-12 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                  {/* Content Side */}
                  <div className="space-y-8">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <i className={`${journeySlides[currentSlide].icon} text-3xl text-white`}></i>
                    </div>

                    <div>
                      <h3 className="text-4xl lg:text-5xl font-bold mb-4">
                        {journeySlides[currentSlide].title}
                      </h3>

                      <h4 className="text-xl lg:text-2xl font-semibold mb-8 text-white/90">
                        {journeySlides[currentSlide].subtitle}
                      </h4>

                      <div className="space-y-4">
                        {journeySlides[currentSlide].content.map((paragraph, index) => (
                          <motion.p
                            key={index}
                            className="text-lg leading-relaxed text-white/95"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="relative rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <img
                        src={journeySlides[currentSlide].image}
                        alt={journeySlides[currentSlide].title}
                        className="w-full h-80 lg:h-96 object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </motion.div>

                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <i className={`${journeySlides[currentSlide].icon} text-xl text-white`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Enhanced Navigation Controls */}
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-8">
              <Button
                onClick={prevSlide}
                className="bg-white/90 hover:bg-white border-0 text-slate-700 hover:text-slate-900 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Previous
              </Button>

              <div className="text-center">
                <span className="text-slate-600 font-semibold text-lg block">
                  {currentSlide + 1} of {journeySlides.length}
                </span>
                <div className="w-32 bg-slate-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / journeySlides.length) * 100}%` }}
                  />
                </div>
              </div>

              <Button
                onClick={nextSlide}
                className="bg-white/90 hover:bg-white border-0 text-slate-700 hover:text-slate-900 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Next
                <i className="ri-arrow-right-line ml-2"></i>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {journeySlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-8 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
                      : 'w-4 h-4 bg-slate-300 hover:bg-slate-400 rounded-full'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl w-full">
              {journeySlides.map((slide, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                      : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow-md hover:scale-102'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className={`${slide.icon} text-lg mb-2 block`}></i>
                  {slide.title}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section
        id="mission"
        className="py-32 bg-gradient-to-br from-white via-purple-50 to-teal-50 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-200/20 rounded-full blur-pulse animate-pulse" />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-200/20 rounded-full blur-pulse animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 60 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-teal-700 bg-clip-text text-transparent mb-8"
              whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
              transition={{ duration: 0.6 }}
            >
              Our Mission
            </motion.h2>
            <div className="max-w-5xl mx-auto space-y-8">
              <motion.p
                className="text-2xl text-slate-700 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Every breakthrough in healthcare begins with a belief:{' '}
                <span className="font-semibold text-purple-700 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                  patients deserve better.
                </span>
              </motion.p>
              <motion.p
                className="text-xl text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                At MeldMD, that belief drives everything we do. For too long, providers and
                patients have faced shortages, inflated costs, and complex regulations. We built
                MeldMD to be different—an accessible, affordable, and patient-focused solution
                that empowers providers and transforms lives.
              </motion.p>
              <motion.p
                className="text-xl text-slate-600 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                With over 25 years of combined expertise in pharmaceuticals, telehealth, and
                wellness, we unite cGMP manufacturers, FDA-registered 503A &amp; 503B
                pharmacies, and healthcare innovators under one umbrella.
              </motion.p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Innovation',
                description: 'Cutting-edge technology and pharmaceutical solutions that reshape healthcare delivery',
                icon: 'ri-lightbulb-line',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Quality',
                description: 'FDA compliance and cGMP standards ensuring the highest level of patient safety',
                icon: 'ri-shield-check-line',
                gradient: 'from-teal-500 to-cyan-500',
              },
              {
                title: 'Care',
                description: 'Patient-first approach that prioritizes outcomes and compassionate service',
                icon: 'ri-heart-line',
                gradient: 'from-rose-500 to-orange-500',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group"
              >
                <Card className="h-full text-center bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="p-8">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <i className={`${item.icon} text-3xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values with Unique Design */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 60 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-teal-200 bg-clip-text text-transparent mb-8">
              Our Values
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The principles that guide every decision and drive our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group text-center"
              >
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${value.gradient} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500`}
                >
                  <i className={`${value.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-purple-200 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Creative Layout */}
      <section className="py-32 bg-gradient-to-br from-white via-teal-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={teamRef}
            initial={{ opacity: 0, y: 60 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-teal-700 to-purple-700 bg-clip-text text-transparent mb-8">
              Leadership Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced healthcare professionals dedicated to transforming patient care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="text-center h-full bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="pt-8 px-8 pb-10">
                    <div className="relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        width={320}
                        height={320}
                        className="w-40 h-40 rounded-full mx-auto mb-6 object-cover object-center shadow-lg group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-teal-700 font-semibold mb-4">{member.role}</p>
                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Brands with Modern Grid */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={networkRef}
            initial={{ opacity: 0, y: 60 }}
            animate={networkInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-teal-200 bg-clip-text text-transparent mb-8">
              Our Network
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              A comprehensive ecosystem of healthcare solutions working together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networkBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 60 }}
                animate={networkInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                  <div className="p-8">
                    <div className="mb-6">
                      <span className={`inline-block bg-gradient-to-r ${brand.gradient} text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg`}>
                        {brand.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-slate-300 mb-8 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {brand.description}
                    </p>
                    {brand.url !== '#' ? (
                      <a
                        href={brand.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center bg-gradient-to-r ${brand.gradient} text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                      >
                        Visit Site
                        <i className="ri-external-link-line ml-2"></i>
                      </a>
                    ) : (
                      <span className="text-slate-400 font-semibold">Coming Soon</span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section with Unique Design */}
      <section className="py-32 bg-gradient-to-br from-white via-purple-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-teal-700 bg-clip-text text-transparent mb-8">
              Our Promise
            </h2>
            <div className="text-xl text-slate-700 mb-12 space-y-6 max-w-4xl mx-auto">
              <p className="leading-relaxed">
                Healthcare isn't just about prescriptions—it's about changing lives. We are
                committed to helping providers grow stronger practices, giving patients access
                to modern solutions, and creating a healthier tomorrow through innovation,
                compassion, and trust.
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                MeldMD: Where better care begins, and better outcomes last.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/contact')}
                className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl px-10 py-5"
              >
                Partner With Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white transition-all duration-300 text-xl px-10 py-5"
                onClick={() => (window.location.href = '/solutions')}
              >
                Explore Solutions
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
