import React from "react";
import {
  FaShieldAlt,
  FaUsersCog,
  FaTags,
  FaUserSecret,
  FaClock,
  FaTruck,
  FaExchangeAlt,
} from "react-icons/fa";

export const Values = () => {
  const valuesData = [
    {
      icon: <FaShieldAlt className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "ICT Security Conscious (Data & Privacy)",
      desc: "We take customer data protection seriously. Every device is handled with strict confidentiality to keep your personal information safe.",
    },
    {
      icon: <FaUsersCog className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "Access to Hundreds of Technicians",
      desc: "Our large network of certified technicians ensures fast, expert repairs anytime, anywhere.",
    },
    {
      icon: <FaTags className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "Access to Best Prices at Different Ranges",
      desc: "Enjoy affordable pricing across different service levels without compromising quality.",
    },
    {
      icon: <FaUserSecret className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "Discrete Services",
      desc: "We operate with professionalism and privacy — your details stay confidential always.",
    },
    {
      icon: <FaClock className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "Flexibility (24/7 Service Center)",
      desc: "Round-the-clock support that fits your schedule. We're always available when you need us.",
    },
    {
      icon: <FaTruck className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "Door-to-Door Logistics",
      desc: "We pick up, repair, and return your devices — convenient and reliable doorstep service.",
    },
    {
      icon: <FaExchangeAlt className="text-blue-400 text-3xl flex-shrink-0" />,
      title: "Best Swap Deals",
      desc: "Get the best exchange offers for your old devices, quickly and transparently.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
          Our Values
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-14">
          VALUES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuesData.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {item.icon}
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-white text-sm leading-snug">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
