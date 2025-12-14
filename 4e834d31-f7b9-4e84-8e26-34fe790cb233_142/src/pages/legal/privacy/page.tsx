import { motion } from 'framer-motion';

export default function Privacy() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-slate-600">
            <p className="text-xl mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Introduction</h2>
              <p className="mb-4">
                New Life ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                website or use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Information We Collect</h2>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Register for our services</li>
                <li>Fill out forms on our website</li>
                <li>Contact us for support or inquiries</li>
                <li>Subscribe to our communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">Automatically Collected Information</h3>
              <p className="mb-4">
                When you visit our website, we may automatically collect certain information about your 
                device and usage patterns, including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent</li>
                <li>Referring website information</li>
                <li>Device and operating system information</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process transactions and communications</li>
                <li>Improve our website and services</li>
                <li>Send administrative information and updates</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Information Sharing and Disclosure</h2>
              <p className="mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>With service providers who assist in our operations</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">HIPAA Compliance</h2>
              <p className="mb-4">
                For healthcare-related services, we maintain HIPAA compliance and follow all applicable 
                regulations for protecting health information. Protected Health Information (PHI) is 
                handled according to HIPAA requirements and our Business Associate Agreements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Cookies and Tracking</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> privacy@meldmd.com</p>
                <p className="mb-2"><strong>Phone:</strong> 1-800-NEWLIFE</p>
                <p><strong>Address:</strong> New Life Privacy Office, [Address to be provided]</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}