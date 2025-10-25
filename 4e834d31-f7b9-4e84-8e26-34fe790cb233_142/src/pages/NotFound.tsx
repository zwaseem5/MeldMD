
import { motion } from 'framer-motion';
import Button from '../components/base/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-teal-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Page Not Found</h2>
          <p className="text-lg text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.location.href = '/'}
              className="hover:bg-teal-700 transition-colors duration-150 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <i className="ri-home-line mr-2"></i>
              Go Home
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/contact'}
              className="hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-150 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              <i className="ri-customer-service-line mr-2"></i>
              Contact Support
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a
                href="/meld-health"
                className="text-teal-600 hover:text-teal-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                MeldWell Platform
              </a>
              <a
                href="/providers"
                className="text-teal-600 hover:text-teal-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Provider Solutions
              </a>
              <a
                href="/about"
                className="text-teal-600 hover:text-teal-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="text-teal-600 hover:text-teal-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
