import { FaSearch, FaHome, FaMobileAlt, FaShieldAlt, FaHeadset, FaFileAlt } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';

const services = [
  {
    icon: FaSearch,
    iconColor: 'text-blue-600',
    title: 'Initial Digital Review',
    description:
      'A one-off assessment of devices, connectivity, subscriptions, digital accounts, and key risks with practical recommendations.',
  },
  {
    icon: FaHome,
    iconColor: 'text-indigo-600',
    title: 'Home IT Setup & Optimization',
    description:
      'Wi-Fi improvement, device setup, printer and accessory configuration, smart home support, and structured digital organization.',
  },
  {
    icon: FaMobileAlt,
    iconColor: 'text-violet-600',
    title: 'Personal Device & Account Management',
    description:
      'Phone, laptop, tablet, email, cloud storage, backups, recovery methods, and account hygiene support.',
  },
  {
    icon: FaShieldAlt,
    iconColor: 'text-sky-600',
    title: 'Family Digital Safety Support',
    description:
      'Guidance for homes with children, safe setup, practical awareness, and household-level digital protection measures.',
  },
  {
    icon: FaHeadset,
    iconColor: 'text-blue-700',
    title: 'Ongoing IT Concierge',
    description:
      'Retained support for clients who want a trusted team to call on for regular issues, changes, and proactive help.',
  },
  {
    icon: FaFileAlt,
    iconColor: 'text-indigo-500',
    title: 'Digital Audit Reports',
    description:
      'Clear premium reports showing what exists, what needs attention, and what improvements are recommended next.',
  },
];

function WhatWeDo() {
  const gridRef = useScrollAnimation(0.15);

  return (
    <section id="services" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-center text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">
          What We Do
        </p>

        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Premium support across your entire digital environment
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-500 text-lg max-w-2xl mx-auto mb-14">
          ServiceIS helps clients move from scattered tech issues to a structured, secure, and
          better-managed digital life.
        </p>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(({ icon: Icon, iconColor, title, description }) => (
            <div
              key={title}
              role="article"
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm
                         hover:shadow-xl hover:-translate-y-1 hover:border-blue-500
                         transition-all duration-300"
            >
              <Icon className={`${iconColor} text-3xl mb-4`} />
              <h3 className="text-gray-900 font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
