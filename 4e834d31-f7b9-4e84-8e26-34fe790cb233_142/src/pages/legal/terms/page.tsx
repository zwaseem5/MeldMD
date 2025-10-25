import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-slate-600">
            <p className="text-xl mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Agreement to Terms</h2>
              <p className="mb-4">
                By accessing and using MELDMD's website and services, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Description of Service</h2>
              <p className="mb-4">
                MELDMD provides pharmaceutical and telehealth solutions including:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Compounded medications from FDA-registered facilities</li>
                <li>Telehealth platform services (MeldWell™)</li>
                <li>Healthcare provider support and consultation</li>
                <li>Creative and marketing services for healthcare practices</li>
                <li>Educational resources and training</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">User Responsibilities</h2>
              <p className="mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use our services in compliance with all applicable laws</li>
                <li>Not misuse or abuse our services or systems</li>
                <li>Respect intellectual property rights</li>
                <li>Follow all healthcare regulations and professional standards</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Healthcare Disclaimer</h2>
              <p className="mb-4">
                MELDMD provides pharmaceutical products and technology services to licensed healthcare 
                providers. We do not provide medical advice, diagnosis, or treatment directly to patients. 
                All medical decisions should be made by qualified healthcare professionals.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Intellectual Property</h2>
              <p className="mb-4">
                The content, organization, graphics, design, compilation, magnetic translation, digital 
                conversion, and other matters related to the MELDMD website are protected under applicable 
                copyrights, trademarks, and other proprietary rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Privacy and Data Protection</h2>
              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed 
                by our Privacy Policy, which is incorporated into these Terms of Service by reference.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                MELDMD shall not be liable for any direct, indirect, incidental, special, or consequential 
                damages resulting from the use or inability to use our services, even if MELDMD has been 
                advised of the possibility of such damages.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Service Availability</h2>
              <p className="mb-4">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. 
                We reserve the right to modify, suspend, or discontinue services with appropriate notice 
                to users.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Regulatory Compliance</h2>
              <p className="mb-4">
                All pharmaceutical products and services are provided in compliance with FDA regulations, 
                state pharmacy laws, and other applicable healthcare regulations. Users must ensure their 
                own compliance with all relevant laws and regulations.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Termination</h2>
              <p className="mb-4">
                Either party may terminate this agreement at any time with appropriate notice. Upon 
                termination, your right to use our services will cease immediately, though certain 
                provisions will survive termination.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Governing Law</h2>
              <p className="mb-4">
                These Terms of Service shall be governed by and construed in accordance with the laws 
                of [State/Jurisdiction], without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to our website. Your continued use of our services constitutes 
                acceptance of any changes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> legal@meldmd.com</p>
                <p className="mb-2"><strong>Phone:</strong> 1-800-MELDMD</p>
                <p><strong>Address:</strong> MELDMD Legal Department, [Address to be provided]</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}