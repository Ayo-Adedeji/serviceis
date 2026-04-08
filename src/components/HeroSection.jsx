import React, { useEffect, useRef } from "react";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1600&q=80";

const cards = [
  {
    label: "For Homes",
    title: "Secure, seamless living",
    body: "Wi-Fi, devices, smart home systems, subscriptions, family digital safety, and ongoing support.",
  },
  {
    label: "For Individuals",
    title: "Private tech concierge",
    body: "Personal laptops, phones, cloud accounts, backups, migrations, and digital organization.",
  },
  {
    label: "For Families",
    title: "Protection with convenience",
    body: "Child-safe device setup, parental guidance, account hygiene, and awareness support for the household.",
  },
  {
    label: "For Executives",
    title: "Discreet, trusted support",
    body: "White-glove support for busy professionals who need secure, dependable digital continuity.",
  },
];

const HeroSection = () => {
  const leftRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Left column animation
    const left = leftRef.current;
    if (left) {
      left.style.opacity = "0";
      left.style.transform = "translateX(-40px)";
      const t = setTimeout(() => {
        left.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        left.style.opacity = "1";
        left.style.transform = "translateX(0)";
      }, 100);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    // Right cards staggered animation
    const timers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      card.style.opacity = "0";
      card.style.transform = "translateX(40px)";
      return setTimeout(() => {
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateX(0)";
      }, 200 + i * 150);
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
        aria-hidden="true"
      />

      {/* Dark navy overlay */}
      <div
        className="absolute inset-0 bg-[#0A0F1E]"
        style={{ opacity: 0.75 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left column */}
        <div ref={leftRef} className="flex flex-col gap-6">
          {/* Badge pill */}
          <span className="self-start px-4 py-1.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-400 text-xs font-semibold uppercase tracking-widest shadow-[0_0_12px_rgba(96,165,250,0.2)]">
            Premium home and personal IT support
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your digital life,<br className="hidden sm:block" /> professionally managed.
          </h1>

          {/* Body paragraphs */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            ServiceIS is a private IT department for households, executives, founders, expats, and families who want secure, convenient, and trusted support across devices, connectivity, digital accounts, subscriptions, and home technology.
          </p>
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            We replace the stress of fragmented technicians and reactive fixes with a reliable, discreet, high-touch service designed around peace of mind.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg bg-white text-[#0A0F1E] font-semibold text-sm tracking-wide hover:bg-white/90 transition-colors duration-200 shadow-lg"
            >
              Book Initial Digital Review
            </a>
            <a
              href="#services"
              className="px-6 py-3 rounded-lg border border-white/60 text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors duration-200"
            >
              Explore Services
            </a>
          </div>
        </div>

        {/* Right column — 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <div
              key={card.label}
              ref={(el) => (cardRefs.current[i] = el)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex flex-col gap-2 hover:bg-white/20 transition-colors duration-200 cursor-default"
            >
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">
                {card.label}
              </span>
              <h3 className="text-white font-semibold text-base leading-snug">
                {card.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
