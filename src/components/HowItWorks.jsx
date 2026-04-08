import useScrollAnimation from '../hooks/useScrollAnimation';

const steps = [
  {
    number: '01',
    title: 'Review',
    description:
      'We start with an initial conversation and digital review to understand your current setup, concerns, and priorities.',
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'You receive practical recommendations, clear next steps, and a structured path to improvement.',
  },
  {
    number: '03',
    title: 'Support',
    description:
      'We implement, optimize, and remain available as your trusted IT partner for ongoing needs.',
  },
];

function HowItWorks() {
  const gridRef = useScrollAnimation(0.15);

  return (
    <section id="how-it-works" className="bg-[#0A0F1E] py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Label + Heading */}
        <div className="text-center mb-14">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-snug">
            A premium process designed to feel clear and effortless
          </h2>
        </div>

        {/* Step cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              role="article"
              className="bg-white/5 border border-white/10 border-t-2 border-t-blue-500/50
                         rounded-2xl p-8
                         hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <span className="block text-6xl font-bold text-white/20 leading-none mb-4">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
