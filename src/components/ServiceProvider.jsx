import React from 'react';
import logos from "../assets/logos.jpg";

const TECH_IMAGE = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80";

const ServiceProvider = () => {
  return (
    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">
            Partners
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Authorized Service Provider
          </h2>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
            ServiceIS Ltd is an authorized service center equipped to repair phones and devices of all models and brands.
            Beyond repairs, we cover every area of ICT — from device sales and accessories to CCTV systems and full ICT infrastructure deployments.
          </p>
          <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto mt-4">
            We partner with top manufacturers and certified technicians to deliver reliable, brand-compliant, and end-to-end ICT solutions every time.
          </p>
        </div>

        {/* Tech image */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-12 max-w-4xl mx-auto">
          <img
            src={TECH_IMAGE}
            alt="Technology and IT infrastructure"
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>

        {/* Brand Logos */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-8 px-6">
          <p className="text-center text-gray-400 text-xs uppercase tracking-widest mb-6">Trusted brands we service</p>
          <img className="w-full max-w-2xl mx-auto object-contain" src={logos} alt="Brand logos" />
        </div>

      </div>
    </section>
  );
};

export default ServiceProvider;
