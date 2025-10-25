import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Hero from '../../components/feature/Hero';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function MeldHealth() {
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [platformRef, platformInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: 'ri-shield-check-line',
      title: 'Secure & Compliant',
      description: 'HIPAA-compliant platform with end-to-end encryption and secure patient data management'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Patient-Friendly Tools',
      description: 'Intuitive patient portal with appointment scheduling, medication tracking, and communication tools'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Growth Features',
      description: 'Analytics dashboard, automated workflows, and marketing tools to help your practice grow'
    },
    {
      icon: 'ri-palette-line',
      title: 'White-Label Solution',
      description: 'Fully customizable platform that matches your brand and integrates seamlessly with your practice'
    },
    {
      icon: 'ri-global-line',
      title: 'Nationwide Coverage',
      description: 'Licensed to operate across all 50 states with comprehensive telehealth capabilities'
    },
    {
      icon: 'ri-customer-service-line',
      title: '24/7 Support',
      description: 'Dedicated support team available around the clock to ensure smooth operations'
    }
  ];

  const platformBenefits = [
    'Streamlined patient onboarding and verification',
    'Integrated prescription management system',
    'Real-time consultation capabilities',
    'Automated billing and insurance processing',
    'Comprehensive reporting and analytics',
    'Mobile-responsive design for all devices'
  ];

  return (
    <div className="pt-16">
      <Hero
        title="MeldWell™ Telehealth Platform"
        subtitle="White-label telehealth solution designed to help healthcare providers deliver exceptional patient care while scaling their practice efficiently."
        primaryCTA="Book a Demo"
        secondaryCTA="Learn More"
        backgroundImage="https://readdy.ai/api/search-image?query=Modern%20telehealth%20consultation%20setup%20with%20doctor%20using%20tablet%20and%20computer%2C%20clean%20medical%20office%20with%20technology%20integration%2C%20professional%20healthcare%20environment%2C%20soft%20lighting%2C%20teal%20and%20navy%20color%20scheme%2C%20digital%20health%20innovation%2C%20patient%20care%20technology&width=1920&height=1080&seq=meld-health-hero&orientation=landscape"
      />

      {/* Platform Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
                Complete Telehealth Solution
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                MeldWell™ provides everything you need to deliver world-class telehealth services. 
                Our platform combines cutting-edge technology with intuitive design to create 
                seamless experiences for both providers and patients.
              </p>
              <div className="space-y-4 mb-8">
                {platformBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button variant="primary" size="lg" onClick={() => window.location.href = '/contact'}>
                Schedule Demo
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://readdy.ai/api/search-image?query=Healthcare%20provider%20using%20modern%20telehealth%20platform%20on%20computer%20screen%2C%20clean%20interface%20design%2C%20patient%20consultation%20dashboard%2C%20medical%20technology%2C%20professional%20setting%2C%20teal%20accent%20colors%2C%20user-friendly%20interface&width=600&height=400&seq=platform-demo&orientation=landscape"
                alt="MeldWell Platform Demo"
                className="rounded-lg shadow-xl object-cover w-full h-96"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Platform Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive tools designed to enhance patient care and streamline practice operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${feature.icon} text-2xl text-teal-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Active Platform Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={platformRef}
            initial={{ opacity: 0, y: 30 }}
            animate={platformInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="ri-rocket-line text-3xl text-teal-600"></i>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                Powered by More Active Platform
              </h2>
              <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
                Our telehealth solution is built on the robust More Active platform, providing 
                enterprise-grade reliability, security, and scalability. This proven foundation 
                ensures your practice can grow without limitations while maintaining the highest 
                standards of patient care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.open('https://moreactive.com', '_blank')}
                >
                  Learn About More Active
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.location.href = '/#categories'}
                >
                  Explore Medications
                </Button>
              </div>
            </Card>
          </motion.div>
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
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join the growing network of providers using MeldWell™ to deliver exceptional telehealth services
            </p>
            <Button variant="primary" size="lg" onClick={() => window.location.href = '/contact'}>
              Book Your Demo Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}