
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../base/Button';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

const SiteHeader = () => {
  // State declarations
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth();

  // Scroll effect for header styling (kept from original)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Providers', path: '/providers' },
    { name: 'Medications', path: '/medications' },
    { name: 'MedGame', path: '/medgame' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Simple navigation handler – includes basic error handling
  const handleNavClick = (path: string) => {
    try {
      setIsMobileMenuOpen(false);
      navigate(path);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Navigation error:', err);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-shadow ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('/')}
              className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hover:from-teal-700 hover:to-blue-700 transition-all duration-300 cursor-pointer"
              style={{ fontFamily: 'Pacifico, serif' }}
            >
              MeldMD
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-700 hover:text-teal-600 hover:border-b-2 hover:border-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <span className="text-sm text-gray-500">Loading…</span>
            ) : user ? (
              <UserMenu />
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="whitespace-nowrap cursor-pointer"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
            >
              <i className={`${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 cursor-pointer ${
                    location.pathname === item.path
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200/50 space-y-2">
                {loading ? (
                  <span className="text-sm text-gray-500 block pl-3">Loading…</span>
                ) : user ? (
                  <div className="px-3">
                    <UserMenu />
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full whitespace-nowrap cursor-pointer"
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full whitespace-nowrap cursor-pointer"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default SiteHeader;
