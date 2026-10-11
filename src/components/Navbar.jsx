import React, { useEffect, useState } from 'react';
import { specs } from '../data/specs';
import { useStore } from '../state/store';

export function Navbar({ onBuyClick }) {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useStore((s) => s.active);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#131316]/80 backdrop-blur-xl border-b border-white/[0.08] py-2.5 shadow-2xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Apple Logo & Product Name */}
        <div className="flex items-center gap-2.5">
          <img
            src="/photo/logo/apple-logo-transparent.png"
            alt="Apple"
            className="w-4 h-5 sm:w-4.5 sm:h-5.5 object-contain drop-shadow-sm opacity-95 hover:opacity-100 transition-opacity"
            loading="eager"
          />
          <span className="font-semibold text-sm tracking-tight text-[#f5f5f7]">
            {specs.product}
          </span>
        </div>

        {/* Section Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-normal text-[#86868b]">
          <a
            href="#design"
            className={`hover:text-[#f5f5f7] transition-colors ${
              activeSection === 1 ? 'text-[#f5f5f7] font-semibold' : ''
            }`}
          >
            Design
          </a>
          <a
            href="#display"
            className={`hover:text-[#f5f5f7] transition-colors ${
              activeSection === 2 ? 'text-[#f5f5f7] font-semibold' : ''
            }`}
          >
            Display
          </a>
          <a
            href="#camera"
            className={`hover:text-[#f5f5f7] transition-colors ${
              activeSection === 3 ? 'text-[#f5f5f7] font-semibold' : ''
            }`}
          >
            Camera
          </a>
          <a
            href="#chip"
            className={`hover:text-[#f5f5f7] transition-colors ${
              activeSection === 4 ? 'text-[#f5f5f7] font-semibold' : ''
            }`}
          >
            Performance
          </a>
          <a
            href="#intelligence"
            className={`hover:text-[#f5f5f7] transition-colors ${
              activeSection === 5 ? 'text-[#f5f5f7] font-semibold' : ''
            }`}
          >
            Intelligence
          </a>
          <a
            href="#colors"
            className={`hover:text-[#f5f5f7] transition-colors ${
              activeSection === 6 ? 'text-[#f5f5f7] font-semibold' : ''
            }`}
          >
            Finishes
          </a>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs text-[#86868b]">
            From $1,199*
          </span>
          <button
            onClick={onBuyClick}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium px-4 py-1.5 rounded-full transition-all duration-200 active:scale-95 shadow-md shadow-blue-500/25"
          >
            {specs.hero.buy}
          </button>
        </div>
      </div>
    </header>
  );
}
