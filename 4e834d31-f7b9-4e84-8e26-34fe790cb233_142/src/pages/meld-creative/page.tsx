import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../../components/feature/Hero';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function MeldCreative() {
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const services = [
    {
      icon: 'ri-palette-line',
      title: 'Brand Identity',
      description: 'Complete brand development including logo design, color schemes, and brand guidelines tailored for healthcare providers.',
      features: ['Logo & visual identity', 'Brand guidelines', 'Marketing materials', 'Professional imagery']
    },
    {
      icon: 'ri-computer-line',
      title: 'Web Design & Development',
      description: 'Modern, responsive websites that convert visitors into patients while maintaining HIPAA compliance.',
      features: ['Responsive design', 'HIPAA compliance', 'SEO optimization', 'Patient portals']
    },
    {
      icon: 'ri-megaphone-line',
      title: 'Social Media & Marketing',
      description: 'Strategic social media management and digital marketing campaigns designed for healthcare practices.',
      features: ['Content creation', 'Social media management', 'Digital advertising', 'Analytics & reporting']
    }
  ];

  const benefits = [
    {
      title: 'Healthcare Expertise',
      description: 'Deep understanding of healthcare marketing regulations and patient communication best practices'
    },
    {
      title: 'Compliance First',
      description: 'All creative work adheres to HIPAA, FDA, and other relevant healthcare marketing guidelines'
    },
    {
      title: 'Patient-Focused Design',
      description: 'Designs that build trust and encourage patient engagement while maintaining professionalism'
    },
    {
      title: 'Integrated Solutions',
      description: 'Seamless integration with your telehealth platform and existing practice management systems'
    }
  ];

  return (
    <div className="pt-16">
      <Hero
        title="Meld Creative"
        subtitle="Complete branding, web design, and social media solutions specifically crafted for healthcare providers who want to stand out and grow their practice."
        primaryCTA="Get Started"
        secondaryCTA="View Portfolio"
        backgroundImage="https://readdy.ai/api/search-image?query=Creative%20design%20studio%20workspace%20with%20modern%20computers%2C%20design%20mockups%20on%20screens%2C%20healthcare%20branding%20materials%2C%20clean%20minimalist%20office%20environment%2C%20teal%20and%20navy%20color%20palette%2C%20professional%20creative%20atmosphere%2C%20design%20tools%20and%20sketches&width=1920&height=1080&seq=creative-hero&orientation=landscape"
      />

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Creative Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From brand identity to digital marketing, we provide comprehensive creative solutions 
              that help healthcare providers build trust and attract more patients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <i className={`${service.icon} text-2xl text-teal-600`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={benefitsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Why Choose Meld Creative</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We understand the unique challenges and opportunities in healthcare marketing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Work</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how we've helped healthcare providers transform their brand and grow their practice
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <div className="bg-slate-100 rounded-lg aspect-video flex items-center justify-center">
                  <img
                    src={`https://readdy.ai/api/search-image?query=Healthcare%20website%20design%20mockup%20on%20computer%20screen%2C%20modern%20medical%20practice%20branding%2C%20clean%20professional%20layout%2C%20teal%20accent%20colors%2C%20patient-friendly%20interface%2C%20medical%20website%20portfolio%20example&width=400&height=300&seq=portfolio-${item}&orientation=landscape`}
                    alt={`Portfolio Example ${item}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Process</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A streamlined approach that delivers results while keeping you involved every step of the way
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your practice, goals, and target patients' },
              { step: '02', title: 'Strategy', description: 'Developing a comprehensive creative strategy and timeline' },
              { step: '03', title: 'Design', description: 'Creating and refining designs based on your feedback' },
              { step: '04', title: 'Launch', description: 'Implementing and optimizing your new brand presence' }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {phase.step}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{phase.title}</h3>
                <p className="text-slate-600">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's create a brand that reflects the quality of care you provide and attracts the patients you want to serve
            </p>
            <Button variant="primary" size="lg" onClick={() => window.location.href = '/contact'}>
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}