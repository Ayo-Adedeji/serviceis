import React from 'react';
import {
  FaShieldAlt,
  FaQuestionCircle,
  FaFileContract,
  FaTruck,
  FaHandshake,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const legalLinks = [
  { icon: FaShieldAlt, label: 'Privacy Policy' },
  { icon: FaHandshake, label: 'Responsible Business Policy' },
  { icon: FaQuestionCircle, label: 'Frequently Asked Questions' },
  { icon: FaTruck, label: 'Transportation Conditions' },
  { icon: FaFileContract, label: 'Terms & Conditions' },
];

const Footer = () => {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/10">

      {/* Main footer body */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-bold text-2xl tracking-wide">ServiceIS</span>
          <p className="text-white/50 text-sm leading-relaxed">
            Private IT department for modern homes and individuals. Premium, discreet, and trusted digital support.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <a href="mailto:ictweare.support@ictweare.com" className="flex items-center gap-3 text-white/60 hover:text-blue-400 transition-colors text-sm">
              <FaEnvelope className="text-blue-400 flex-shrink-0" />
              ictweare.support@ictweare.com
            </a>
            <a href="tel:09133706582" className="flex items-center gap-3 text-white/60 hover:text-blue-400 transition-colors text-sm">
              <FaPhone className="text-blue-400 flex-shrink-0" />
              09133706582
            </a>
            <span className="flex items-center gap-3 text-white/60 text-sm">
              <FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />
              Computer Village, Ikeja, Lagos
            </span>
          </div>
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Services</h3>
          <ul className="flex flex-col gap-3">
            {['Initial Digital Review', 'Home IT Setup & Optimization', 'Personal Device Management', 'Family Digital Safety', 'Ongoing IT Concierge', 'Digital Audit Reports'].map((s) => (
              <li key={s}>
                <a href="#services" className="text-white/50 hover:text-white transition-colors text-sm">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Legal &amp; Info</h3>
          <ul className="flex flex-col gap-3">
            {legalLinks.map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  className="flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm group"
                >
                  <Icon className="text-blue-400/60 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-white/40 text-xs">
          © 2025 ServiceIS. All rights reserved.
        </p>
        <p className="text-white/30 text-xs text-center sm:text-right">
          Your opinion matters — share your experience with us.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
