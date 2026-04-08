import { FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import useScrollAnimation from '../hooks/useScrollAnimation';

const contactDetails = [
  { icon: FaEnvelope, label: 'ictweare.support@ictweare.com' },
  { icon: FaPhone, label: '09133706582' },
  { icon: FaClock, label: 'By appointment' },
];

function ContactSection() {
  const leftRef = useScrollAnimation(0.15, { single: true });
  const rightRef = useScrollAnimation(0.15, { single: true });

  return (
    <section id="contact" className="bg-[#0A0F1E] text-white py-20 pb-0 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Left column */}
        <div ref={leftRef} className="slide-from-left transition-all duration-700">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
            CONTACT
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Book your initial digital review
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            Start with a private conversation about your home, devices, digital accounts, and support needs.
            We'll help you understand what needs attention and what better support can look like.
          </p>

          <ul className="space-y-5">
            {contactDetails.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-4">
                <Icon className="text-blue-400 text-lg flex-shrink-0" />
                <span className="text-white/80 text-sm">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — form */}
        <div ref={rightRef} className="slide-from-right transition-all duration-700">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <form
              action="https://formsubmit.co/ictweare.support@ictweare.com"
              method="POST"
            >
              <input type="hidden" name="_captcha" value="false" />

              <div className="flex flex-col gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us a bit about what you need..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                  />
                </div>

                {/* Newsletter checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    className="mt-0.5 accent-blue-400 w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-white/70 text-sm">
                    Keep me updated with tips and service news
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-white text-[#0A0F1E] font-semibold py-3 rounded-lg hover:bg-white/90 transition mt-2"
                >
                  Enquire Now
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
