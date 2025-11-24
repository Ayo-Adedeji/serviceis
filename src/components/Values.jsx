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
      icon: <FaShieldAlt className="text-blue-600 text-5xl" />,
      title: "ICT Security Conscious (Data & Privacy)",
      desc: "We take customer data protection seriously. Every device is handled with strict confidentiality to keep your personal information safe.",
    },
    {
      icon: <FaUsersCog className="text-green-600 text-5xl" />,
      title: "Access to Hundreds of Technicians",
      desc: "Our large network of certified technicians ensures fast, expert repairs anytime, anywhere.",
    },
    {
      icon: <FaTags className="text-orange-600 text-5xl" />,
      title: "Access to Best Prices at Different Ranges",
      desc: "Enjoy affordable pricing across different service levels without compromising quality.",
    },
    {
      icon: <FaUserSecret className="text-purple-600 text-5xl" />,
      title: "Discrete Services",
      desc: "We operate with professionalism and privacy — your details stay confidential always.",
    },
    {
      icon: <FaClock className="text-yellow-500 text-5xl" />,
      title: "Flexibility (24/7 Service Center)",
      desc: "Round-the-clock support that fits your schedule. We’re always available when you need us.",
    },
    {
      icon: <FaTruck className="text-red-500 text-5xl" />,
      title: "Door-to-Door Logistics",
      desc: "We pick up, repair, and return your devices — convenient and reliable doorstep service.",
    },
    {
      icon: <FaExchangeAlt className="text-cyan-600 text-5xl" />,
      title: "Best Swap Deals",
      desc: "Get the best exchange offers for your old devices, quickly and transparently.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold text-center mb-12">VALUES</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {valuesData.map((item, index) => (
          <div key={index} className="flex flex-row items-start gap-5">
            {item.icon}
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
