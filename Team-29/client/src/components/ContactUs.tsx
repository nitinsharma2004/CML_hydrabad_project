import React, { useState } from 'react';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 min-h-screen bg-green-50 w-full">
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-0">
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-lg overflow-hidden w-full">
          {/* Left Side - Organization Info */}
          <div className="w-full md:w-1/2 contact-info-panel p-8 flex flex-col items-center text-center">
            <img
              src="/logo_new2018.jpg"
              alt="Logo"
              className="w-24 h-24 mb-4 object-cover rounded-full border border-gray-300"
            />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              CENTRE FOR MICROFINANCE & LIVELIHOOD
            </h2>
            <p className="italic text-sm text-gray-700 mb-6">An Initiative of TATA TRUSTS</p>
            
            <div className="text-left w-full max-w-sm space-y-2">
              <p className="text-sm leading-relaxed mb-4">
                5th Floor, Divine Plaza, Dispur Super Market,<br />
                G.S Road, Guwahati-781005, Assam
              </p>
              <p className="text-sm mb-2">📞 Phone: 0361-2229367</p>
              <p className="text-sm mb-2">
                ✉️ Email: <a href="mailto:cmladmin@tatatrusts.org" className="text-indigo-600 hover:text-indigo-800">cmladmin@tatatrusts.org</a>
              </p>
              <p className="text-sm mb-6">
                🌐 Website: <a href="http://www.cmlnortheast.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">www.cmlnortheast.com</a>
              </p>
            </div>

            <div className="flex space-x-4 mt-4">
              <a href="https://www.facebook.com/CMLNortheast/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.89h-2.32v6.99C18.34 21.13 22 17 22 12z" />
                </svg>
              </a>
              <a href="https://x.com/CMLnortheast" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition-colors">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.23 4.23 0 001.86-2.34 8.5 8.5 0 01-2.7 1.03A4.21 4.21 0 0016.5 4a4.23 4.23 0 00-4.2 4.2c0 .33.04.66.11.98C8.09 8.95 5.18 7.3 3.19 4.74a4.2 4.2 0 00-.57 2.11 4.2 4.2 0 001.87 3.5 4.22 4.22 0 01-1.9-.52v.05a4.22 4.22 0 003.38 4.13 4.23 4.23 0 01-1.89.07 4.23 4.23 0 003.95 2.93A8.46 8.46 0 012 19.55a11.92 11.92 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0022.46 6z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/cmlnortheast/" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition-colors">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12 2.2c3.18 0 3.56.01 4.81.07 1.17.06 1.96.24 2.42.4a4.9 4.9 0 011.76 1.14 4.9 4.9 0 011.14 1.76c.16.46.34 1.25.4 2.42.06 1.25.07 1.63.07 4.81s-.01 3.56-.07 4.81c-.06 1.17-.24 1.96-.4 2.42a4.9 4.9 0 01-1.14 1.76 4.9 4.9 0 01-1.76 1.14c-.46.16-1.25.34-2.42.4-1.25.06-1.63.07-4.81.07s-3.56-.01-4.81-.07c-1.17-.06-1.96-.24-2.42-.4a4.9 4.9 0 01-1.76-1.14 4.9 4.9 0 01-1.14-1.76c-.16-.46-.34-1.25-.4-2.42C2.21 15.56 2.2 15.18 2.2 12s.01-3.56.07-4.81c.06-1.17.24-1.96.4-2.42a4.9 4.9 0 011.14-1.76A4.9 4.9 0 015.6 2.67c.46-.16 1.25-.34 2.42-.4C8.44 2.21 8.82 2.2 12 2.2zm0 1.8c-3.14 0-3.5.01-4.74.07-1.02.05-1.57.22-1.94.36a3.1 3.1 0 00-1.14.74 3.1 3.1 0 00-.74 1.14c-.14.37-.31.92-.36 1.94C3.21 9.5 3.2 9.86 3.2 13s.01 3.5.07 4.74c.05 1.02.22 1.57.36 1.94.2.5.46.87.74 1.14.27.27.64.54 1.14.74.37.14.92.31 1.94.36 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.02-.05 1.57-.22 1.94-.36a3.1 3.1 0 001.14-.74 3.1 3.1 0 00.74-1.14c.14-.37.31-.92.36-1.94.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.02-.22-1.57-.36-1.94a3.1 3.1 0 00-.74-1.14 3.1 3.1 0 00-1.14-.74c-.37-.14-.92-.31-1.94-.36C15.5 4.01 15.14 4 12 4zm0 3.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 1.8a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-colors">
                <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M19.615 3.184C20.403 3.444 21.022 4.063 21.282 4.851 21.735 6.177 21.735 12 21.735 12s0 5.823-.453 7.149c-.26.788-.879 1.407-1.667 1.667C18.288 21.735 12 21.735 12 21.735s-6.288 0-7.615-.453c-.788-.26-1.407-.879-1.667-1.667C2.265 17.823 2.265 12 2.265 12s0-5.823.453-7.149C2.978 4.063 3.597 3.444 4.385 3.184 5.711 2.735 12 2.735 12 2.735s6.288 0 7.615.449zM10 16l5.2-4L10 8v8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full md:w-1/2 p-8 contact-form-panel">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white outline-none text-gray-700 py-3 px-4 transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white outline-none text-gray-700 py-3 px-4 transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:bg-white outline-none text-gray-700 py-3 px-4 resize-none transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;