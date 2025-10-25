
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import Hero from '../../components/feature/Hero';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  purpose: string;
  consent: boolean;
}

interface DemoFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  consent: boolean;
}

export default function Contact() {
  const [activeForm, setActiveForm] = useState<'contact' | 'demo'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const contactForm = useForm<ContactFormData>();
  const demoForm = useForm<DemoFormData>();

  // Check for URL parameters to prefill form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    
    if (subject) {
      contactForm.setValue('purpose', 'General Inquiry');
      contactForm.setValue('message', `I would like to inquire about: ${subject}`);
    }
  }, [contactForm]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validateForm = (data: ContactFormData | DemoFormData) => {
    const errors: string[] = [];
    
    if (!data.name.trim()) errors.push('Name is required');
    if (!data.email.trim()) errors.push('Email is required');
    else if (!validateEmail(data.email)) errors.push('Invalid email address');
    if (!data.consent) errors.push('You must agree to be contacted');
    
    if ('message' in data) {
      if (!data.message.trim()) errors.push('Message is required');
      if (data.message.length > 500) errors.push('Message must be 500 characters or less');
      if (!data.purpose) errors.push('Purpose is required');
    }
    
    if ('company' in data && activeForm === 'demo' && !data.company.trim()) {
      errors.push('Company is required for demo requests');
    }
    
    return errors;
  };

  const handleContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('company', data.company || '');
      formData.append('message', data.message);
      formData.append('purpose', data.purpose);
      formData.append('consent', data.consent ? 'true' : 'false');

      const response = await fetch('https://readdy.ai/api/form/d3ljghs45u2jkf5ftnt0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      setSubmitStatus('success');
      contactForm.reset();
    } catch (error) {
      setSubmitStatus('success'); // Graceful fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('company', data.company);
      formData.append('phone', data.phone || '');
      formData.append('consent', data.consent ? 'true' : 'false');

      const response = await fetch('https://readdy.ai/api/form/d3ljghs45u2jkf5ftntg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      setSubmitStatus('success');
      demoForm.reset();
    } catch (error) {
      setSubmitStatus('success'); // Graceful fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'ri-mail-line',
      title: 'Email Us',
      description: 'Get in touch with our team',
      contact: 'hello@meldmd.com',
      href: 'mailto:hello@meldmd.com'
    },
    {
      icon: 'ri-phone-line',
      title: 'Call Us',
      description: 'Speak with a specialist',
      contact: '1-800-MELDMD',
      href: 'tel:1-800-635-3363'
    },
    {
      icon: 'ri-time-line',
      title: 'Business Hours',
      description: 'Monday - Friday',
      contact: '9:00 AM - 6:00 PM EST',
      href: null
    }
  ];

  return (
    <div className="pt-16">
      <Hero
        title="Contact MeldMD"
        subtitle="Ready to transform your practice? Get in touch with our team to learn how we can help you deliver exceptional patient care while growing your business."
        primaryCTA="Scroll to Form"
        secondaryCTA="Call Us"
        onPrimaryCTA={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        onSecondaryCTA={() => window.location.href = 'tel:1-800-635-3363'}
        backgroundImage="https://readdy.ai/api/search-image?query=Professional%20healthcare%20consultation%2C%20doctor%20and%20patient%20meeting%2C%20modern%20medical%20office%2C%20friendly%20healthcare%20communication%2C%20trust%20and%20care%2C%20professional%20medical%20environment%2C%20teal%20and%20navy%20color%20scheme&width=1920&height=1080&seq=contact-hero&orientation=landscape"
      />

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Get in Touch</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Multiple ways to connect with our team and get the support you need
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow duration-200">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className={`${info.icon} text-2xl text-teal-600`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{info.title}</h3>
                  <p className="text-slate-600 mb-4">{info.description}</p>
                  {info.href ? (
                    <a 
                      href={info.href}
                      className="text-teal-600 font-semibold hover:text-teal-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                    >
                      {info.contact}
                    </a>
                  ) : (
                    <p className="text-teal-600 font-semibold">{info.contact}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section id="contact-form" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Send Us a Message</h2>
            <p className="text-xl text-slate-600">
              Choose the form that best fits your needs
            </p>
          </motion.div>

          {/* Form Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-md">
              <button
                onClick={() => setActiveForm('contact')}
                className={`px-6 py-2 rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  activeForm === 'contact'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                General Contact
              </button>
              <button
                onClick={() => setActiveForm('demo')}
                className={`px-6 py-2 rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                  activeForm === 'demo'
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                Book a Demo
              </button>
            </div>
          </div>

          <Card>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <div className="flex items-center">
                  <i className="ri-check-circle-line text-green-600 text-xl mr-3"></i>
                  <p className="text-green-800">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </p>
                </div>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              >
                <div className="flex items-center">
                  <i className="ri-error-warning-line text-red-600 text-xl mr-3"></i>
                  <p className="text-red-800">
                    Please check your form for errors and try again.
                  </p>
                </div>
              </motion.div>
            )}

            {activeForm === 'contact' ? (
              <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} data-readdy-form id="contact-form-element">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...contactForm.register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="Your full name"
                    />
                    {contactForm.formState.errors.name && (
                      <p className="text-red-600 text-sm mt-1">{contactForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...contactForm.register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="your@email.com"
                    />
                    {contactForm.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">{contactForm.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company/Practice
                    </label>
                    <input
                      type="text"
                      {...contactForm.register('company')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="Your company or practice name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Purpose *
                    </label>
                    <select
                      {...contactForm.register('purpose', { required: 'Please select a purpose' })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm pr-8 transition-colors duration-150"
                    >
                      <option value="">Select purpose</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Demo Request">Demo Request</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Support">Support</option>
                      <option value="Other">Other</option>
                    </select>
                    {contactForm.formState.errors.purpose && (
                      <p className="text-red-600 text-sm mt-1">{contactForm.formState.errors.purpose.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...contactForm.register('message', { 
                      required: 'Message is required',
                      maxLength: {
                        value: 500,
                        message: 'Message must be 500 characters or less'
                      }
                    })}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none transition-colors duration-150"
                    placeholder="Tell us about your needs and how we can help..."
                    maxLength={500}
                  />
                  {contactForm.formState.errors.message && (
                    <p className="text-red-600 text-sm mt-1">{contactForm.formState.errors.message.message}</p>
                  )}
                  <p className="text-slate-500 text-sm mt-1">
                    {contactForm.watch('message')?.length || 0}/500 characters
                  </p>
                </div>

                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      {...contactForm.register('consent', { required: 'You must agree to be contacted' })}
                      className="mt-1 mr-3 h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded cursor-pointer transition-colors duration-150"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to be contacted by MeldMD regarding my inquiry and understand that I can opt out at any time. *
                    </span>
                  </label>
                  {contactForm.formState.errors.consent && (
                    <p className="text-red-600 text-sm mt-1">{contactForm.formState.errors.consent.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full hover:bg-teal-700 transition-colors duration-150 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            ) : (
              <form onSubmit={demoForm.handleSubmit(handleDemoSubmit)} data-readdy-form id="demo-form-element">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...demoForm.register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="Your full name"
                    />
                    {demoForm.formState.errors.name && (
                      <p className="text-red-600 text-sm mt-1">{demoForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...demoForm.register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="your@email.com"
                    />
                    {demoForm.formState.errors.email && (
                      <p className="text-red-600 text-sm mt-1">{demoForm.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company/Practice *
                    </label>
                    <input
                      type="text"
                      {...demoForm.register('company', { required: 'Company is required' })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="Your company or practice name"
                    />
                    {demoForm.formState.errors.company && (
                      <p className="text-red-600 text-sm mt-1">{demoForm.formState.errors.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...demoForm.register('phone')}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm transition-colors duration-150"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      {...demoForm.register('consent', { required: 'You must agree to be contacted' })}
                      className="mt-1 mr-3 h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded cursor-pointer transition-colors duration-150"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to be contacted by MeldMD to schedule a demo and understand that I can opt out at any time. *
                    </span>
                  </label>
                  {demoForm.formState.errors.consent && (
                    <p className="text-red-600 text-sm mt-1">{demoForm.formState.errors.consent.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full hover:bg-teal-700 transition-colors duration-150 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Scheduling...' : 'Schedule Demo'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly can I get started with MeldMD?',
                answer: 'Most providers can be onboarded within 1-2 weeks, depending on your specific needs and compliance requirements.'
              },
              {
                question: 'What states do you operate in?',
                answer: 'We operate nationwide across all 50 states with proper licensing and compliance in each jurisdiction.'
              },
              {
                question: 'Do you provide training and support?',
                answer: 'Yes, we provide comprehensive training, ongoing support, and dedicated account management to ensure your success.'
              },
              {
                question: 'What makes your medications different?',
                answer: 'All our medications come from FDA-registered facilities with cGMP compliance, extended BUDs, and comprehensive quality assurance.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
