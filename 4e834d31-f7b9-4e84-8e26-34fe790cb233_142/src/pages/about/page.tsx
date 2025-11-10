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

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % journeySlides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + journeySlides.length) % journeySlides.length);
  const goToSlide = (index: number) => { if (index >= 0 && index < journeySlides.length) setCurrentSlide(index); };
  const toggleAutoPlay = () => setIsAutoPlaying(prev => !prev);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // ======= NEW: Real Team =======
  // Place images in /public/images/team using the filenames listed above.
  const teamMembers = [
    {
      name: 'Melanie Darrohn',
      role: 'Managing Partner / Owner',
      image: '/images/team/melanie-darrohn.jpg',
      bio: 'Founder of The Meld Group. Passionate about bridging telehealth, pharmacy, and patient-centered care to expand access, lower costs, and improve outcomes.'
    },
    {
      name: 'Nick Mauro',
      role: 'Managing Partner',
      image: '/images/team/nick-mauro.jpg',
      bio: 'Pharma sales leader focused on cost-effective 503A/503B solutions. Former EOD technician, Navy Diver & Naval Parachutist — disciplined, adaptable, mission-driven.'
    },
    {
      name: 'Cheryl Simonton',
      role: 'Sales Representative',
      image: '/images/team/cheryl-simonton.jpg',
      bio: '20+ years in healthcare leadership and digital health adoption. Known for white-glove service and strategic partnerships that expand telehealth and wellness solutions.'
    },
    {
      name: 'Carson Bayless',
      role: 'Regional Sales Manager',
      image: '/images/team/carson-bayless.jpg',
      bio: 'Business analytics & compliance background. Builds lasting relationships and delivers data-driven, high-service support across California’s Central Coast.'
    },
    {
      name: 'Bryanna Ojeda',
      role: 'Sales Representative',
      image: '/images/team/bryanna-ojeda.jpg',
      bio: 'Operations pro (ex-Teladoc) who streamlines processes and helps clinics launch compliant, profitable GLP-1 programs with a warm, consultative approach.'
    },
    {
      name: 'Frank DiNitto',
      role: 'Business Administrator',
      image: '/images/team/frank-dinitto.jpg',
      bio: '15+ years in med-device (spine/neuro). Now pioneering integrated telehealth solutions spanning branding, white-label, and medication management.'
    },
    {
      name: 'Rachel Rivers',
      role: 'Sales Representative',
      image: '/images/team/rachel-rivers.jpg',
      bio: 'Wellness & fitness professional (Exercise Science, D-I Tennis). Educates clients to integrate peptide & performance therapies for sustainable, evidence-based results.'
    },
    {
      name: 'Emily Battersby',
      role: 'Sales Representative',
      image: '/images/team/emily-battersby.jpg',
      bio: '17 years in nursing (12 in ER). Communicator and relationship-builder with a passion for active living and patient-first solutions in medical sales.'
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
      bio: 'U.S. Army Sergeant and former Major Crimes & Cold Case Detective. Brings technical, investigative, and leadership expertise to drive success at MeldMD.'
    },
    {
      name: 'Lori Smith',
      role: 'Administrative Assistant',
      image: '/images/team/lori-smith.jpg',
      bio: 'Operations and customer-service ace who strengthens daily business processes and ensures smooth, efficient execution across the team.'
    },
    {
      name: 'Nancy Coveleskie',
      role: 'Business Administrator',
      image: '/images/team/nancy-coveleskie.jpg',
      bio: 'Financial strategist with deep experience across healthcare and non-profits; passionate about helping people gain choice and control over health & wealth.'
    },
    {
      name: 'Browder Morrisey',
      role: 'Business Administrator',
      image: '/images/team/browder-morrisey.jpg',
      bio: 'Business development & marketing lead. Background in psychology, real estate and solar; content creator focused on neuroscience and performance.'
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
    { icon: 'ri-heart-line', title: 'Patient-First Care', description: 'Every decision we make prioritizes patient outcomes and well-being above all else.', gradient: 'from-rose-400 to-pink-500' },
    { icon: 'ri-shield-check-line', title: 'Uncompromising Quality', description: 'FDA compliance, cGMP standards, and rigorous quality assurance in everything we do.', gradient: 'from-emerald-400 to-teal-500' },
    { icon: 'ri-lightbulb-line', title: 'Innovation', description: 'Continuously advancing healthcare through technology and pharmaceutical excellence.', gradient: 'from-amber-400 to-orange-500' },
    { icon: 'ri-team-line', title: 'Partnership', description: 'Building lasting relationships with providers to grow stronger practices together.', gradient: 'from-blue-400 to-indigo-500' }
  ];

  const networkBrands = [
    { name: 'MeldWell', url: 'https://meldwell.com', description: 'Our flagship telehealth platform providing nationwide coverage with patient-centered tools and white-label options for providers.', category: 'Telehealth Platform', gradient: 'from-teal-500 to-cyan-600' },
    { name: 'NewLife Rx', url: 'https://newliferx.com', description: 'FDA-registered 503A & 503B pharmacy specializing in compounded medications with cGMP compliance.', category: 'Pharmacy Services', gradient: 'from-blue-500 to-indigo-600' },
    { name: 'TruLife Telehealth', url: '#', description: 'Comprehensive telehealth solutions designed for practice growth and patient engagement.', category: 'Telehealth Solutions', gradient: 'from-purple-500 to-pink-600' },
    { name: 'MeldMD Rx', url: 'https://meldmdrx.com', description: 'Specialized pharmaceutical solutions for healthcare providers with bulk ordering and compliance support.', category: 'Pharmaceutical Solutions', gradient: 'from-emerald-500 to-teal-600' },
    { name: 'Meld-MD', url: 'https://meld-md.com', description: 'Provider-focused platform for medication management and practice optimization tools.', category: 'Practice Management', gradient: 'from-orange-500 to-red-600' },
    { name: 'Meld-Rx', url: 'https://meld-rx.com', description: 'Direct-to-provider pharmaceutical services with competitive pricing and flexible ordering.', category: 'Pharmaceutical Services', gradient: 'from-violet-500 to-purple-600' }
  ];

  return (
    <div className="pt-16">
      {/* --- (everything above and below your journey/mission/values/network/promise sections stays the same) --- */}
      {/* I’ve only changed the Team section + teamMembers array */}

      {/* ... Hero, Journey, Mission, Values sections unchanged ... */}

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
              Leadership & Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to transforming patient care
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
                        className="w-40 h-40 rounded-full mx-auto mb-6 object-cover object-center shadow-lg group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <span className="sr-only">{member.name}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-1">{member.name}</h3>
                    <p className="text-teal-700 font-semibold mb-4">{member.role}</p>
                    <p className="text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Network + Promise sections remain the same as your file */}
      {/* ... Network ... */}
      {/* ... Promise ... */}
    </div>
  );
}

