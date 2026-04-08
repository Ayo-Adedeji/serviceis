import useScrollAnimation from '../hooks/useScrollAnimation';

function WhyServiceIS() {
  const cardRef = useScrollAnimation(0.15, { single: true });

  return (
    <section className="bg-gray-50 py-24 px-6">
      <div
        ref={cardRef}
        className="scale-card max-w-3xl mx-auto rounded-2xl shadow-xl bg-white p-12 border-l-4 border-blue-600"
      >
        {/* Decorative quote mark */}
        <span className="block text-blue-200 text-7xl font-serif leading-none mb-2 select-none" aria-hidden="true">
          "
        </span>

        <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">
          Why ServiceIS
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
          Because your digital life deserves more than random fixes.
        </h2>

        <p className="text-gray-600 text-lg leading-relaxed">
          We bring structure, security, responsiveness, and trusted support to the technology
          that now shapes everyday living, work, learning, and communication.
        </p>
      </div>
    </section>
  );
}

export default WhyServiceIS;
