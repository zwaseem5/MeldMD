
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/base/Button';

export default function Schedule() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="mb-8 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Home
            </Button>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-teal-700 bg-clip-text text-transparent mb-6">
              Schedule Your Consultation
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Book a personalized meeting with our healthcare experts to discuss your needs and explore our comprehensive solutions
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 mb-16">
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-teal-600 text-xl"></i>
                <span className="text-sm font-medium">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-teal-600 text-xl"></i>
                <span className="text-sm font-medium">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-calendar-check-line text-teal-600 text-xl"></i>
                <span className="text-sm font-medium">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-video-line text-teal-600 text-xl"></i>
                <span className="text-sm font-medium">Virtual or In-Person</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calendly Integration */}
      <div className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden border border-white/60"
          >
            <div className="p-2">
              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden">
                <iframe
                  src="https://calendly.com/waseemziadzeid/new-meeting"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Schedule a meeting with New Life"
                  className="w-full"
                  style={{ minHeight: '700px' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-calendar-2-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Flexible Scheduling</h3>
              <p className="text-slate-600">Choose from available time slots that work best for your schedule</p>
            </div>

            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-heart-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Expert Consultation</h3>
              <p className="text-slate-600">Meet with our healthcare technology specialists and industry experts</p>
            </div>

            <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="ri-rocket-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Quick Setup</h3>
              <p className="text-slate-600">Get started with our solutions in as little as 1-2 weeks</p>
            </div>
          </motion.div>

          {/* Contact Alternative */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-slate-800 to-teal-800 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Prefer to Talk Now?</h3>
              <p className="text-slate-200 mb-6">
                Our team is available during business hours for immediate assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'tel:1-800-635-3363'}
                  className="whitespace-nowrap cursor-pointer border-white text-white hover:bg-white hover:text-slate-800"
                >
                  <i className="ri-phone-line mr-2"></i>
                  Call 1-800-NEWLIFE
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/contact')}
                  className="whitespace-nowrap cursor-pointer border-white text-white hover:bg-white hover:text-slate-800"
                >
                  <i className="ri-mail-line mr-2"></i>
                  Send Message
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}