import { FaCheck } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';

const audiences = [
  'Executives and founders',
  'Families and households',
  'Expats and returning residents',
  'High-performing professionals',
  'Individuals managing multiple devices and subscriptions',
  'Clients who prefer discreet, high-touch service',
];

function WhoItsFor() {
  const gridRef = useScrollAnimation(0.15);

  return (
    <section id="who-its-for" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left block */}
        <div className="lg:sticky lg:top-24">
          <p className="text-blue-600 text-xs font-semibold uppercase tracking-widest mb-4">
            Who It's For
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            Built for people who value trust, convenience, and digital peace of mind
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Whether you're managing a household, running a business, or simply want better digital
            support — ServiceIS is built for you.
          </p>
        </div>

        {/* Right block — 2-column card grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {audiences.map((title) => (
            <div
              key={title}
              role="article"
              className="border border-gray-200 rounded-xl p-5 bg-white
                         hover:border-blue-300 hover:bg-blue-50 transition-all duration-300
                         flex items-start gap-3"
            >
              <FaCheck className="text-blue-500 mt-1 shrink-0" />
              <span className="text-gray-800 font-medium text-sm leading-snug">{title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhoItsFor;
