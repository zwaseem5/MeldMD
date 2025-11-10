
import Button from '../base/Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about#team' },
      { name: 'Careers', href: '/contact' },
      { name: 'Contact', href: '/contact' }
    ],
    solutions: [
      { name: 'MeldWell Platform', href: '/meld-health' },
      { name: 'Provider Solutions', href: '/providers' },
      { name: 'Meld Creative', href: '/meld-creative' },
      { name: 'Book a Demo', href: '/contact' }
    ],
    resources: [
      { name: 'FAQ', href: '/contact#faq' },
      { name: 'Support', href: '/contact' },
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' }
    ]
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'ri-linkedin-fill', href: '#' },
    { name: 'Twitter', icon: 'ri-twitter-x-fill', href: '#' },
    { name: 'Facebook', icon: 'ri-facebook-fill', href: '#' }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Get the latest updates on new medications, platform features, and industry insights delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-150"
              />
              <Button
                variant="primary"
                className="hover:bg-teal-700 transition-colors duration-150 focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Pacifico", serif' }}>
                MeldMD
              </h2>
              <p className="text-slate-300 mb-6 max-w-md">
                Pharma & telehealth solutions that help clinics scale care—reliably, compliantly, and affordably.
              </p>
            </div>
            
            <div className="space-y-3 text-slate-300">
              <div className="flex items-center">
                <i className="ri-mail-line mr-3 text-teal-400"></i>
                <a 
                  href="mailto:hello@meldmd.com"
                  className="hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                >
                  Melanie@MeldMD.com
                </a>
              </div>
              <div className="flex items-center">
                <i className="ri-phone-line mr-3 text-teal-400"></i>
                <a 
                  href="tel:1-800-635-3363"
                  className="hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                >
                  805-709-2105
                </a>
              </div>
              <div className="flex items-center">
                <i className="ri-time-line mr-3 text-teal-400"></i>
                <span>Mon-Fri: 9:00 AM - 6:00 PM EST</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-slate-300 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-slate-300 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-slate-300 hover:text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} MeldMD. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="https://readdy.ai/?origin=logo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Website Builder
              </a>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => handleLinkClick('/legal/privacy')}
                className="text-slate-400 hover:text-white text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Privacy
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => handleLinkClick('/legal/terms')}
                className="text-slate-400 hover:text-white text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded"
              >
                Terms
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
