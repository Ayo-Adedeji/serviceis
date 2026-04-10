import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/SIS-TRT-B-.png';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: "Who It's For", href: '#who-its-for' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0A0F1E] shadow-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo block */}
        <div className="flex items-center">
          <img src={logo} alt="ServiceIS" className="h-10 w-auto" />
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="text-white text-sm tracking-wide uppercase hover:text-blue-400 transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-[#0A0F1E] border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={handleLinkClick}
                className="text-white text-sm tracking-wide uppercase hover:text-blue-400 transition-colors duration-200 block"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
