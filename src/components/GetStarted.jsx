import { Link } from 'react-router-dom';
import { FaWrench, FaShoppingBag } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';

const cards = [
  {
    icon: <FaWrench className="text-4xl text-teal-400" />,
    title: 'Repair & Support',
    description:
      'Something wrong with your device? Register a repair or support request. Our team will reach out and handle everything.',
    badge: 'Repairs · Support · Diagnostics',
    buttonLabel: 'Register a Request',
    buttonTo: '/register-request',
    border: 'border-teal-500/40 hover:border-teal-400',
    glow: 'hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]',
    buttonClass: 'bg-teal-500 hover:bg-teal-400',
  },
  {
    icon: <FaShoppingBag className="text-4xl text-amber-400" />,
    title: 'Buy a Device',
    description:
      "Looking to buy a phone, laptop, or accessory? Tell us exactly what you want and we'll source it for you at the best price.",
    badge: 'Phones · Laptops · Accessories · Audio',
    buttonLabel: 'Make a Buy Request',
    buttonTo: '/buy-request',
    border: 'border-amber-500/40 hover:border-amber-400',
    glow: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    buttonClass: 'bg-amber-500 hover:bg-amber-400',
  },
];

export default function GetStarted() {
  const gridRef = useScrollAnimation(0.15);

  return (
    <section id="get-started" style={{ backgroundColor: '#0F172A' }} className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Get Started
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            What do you need help with today?
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">
            Choose an option below to get started. We'll take it from there.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`bg-[#1A2035] border ${card.border} ${card.glow} rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1`}
            >
              {card.icon}
              <div>
                <h3 className="text-white font-bold text-2xl mb-2">{card.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{card.description}</p>
              </div>
              <span className="self-start bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/50 text-xs">
                {card.badge}
              </span>
              <Link
                to={card.buttonTo}
                className={`${card.buttonClass} w-full rounded-lg text-[#0A0F1E] font-semibold py-3 text-center transition-colors duration-200`}
              >
                {card.buttonLabel}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
