import React from 'react';
import { specs } from '../../data/specs';
import { useStore } from '../../state/store';
import { getVariant } from '../../config/phoneConfig';

export function HeroSection({ onBuyClick }) {
  const variantId = useStore((s) => s.variant);
  const variant = getVariant(variantId);

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-between pt-28 pb-16 px-6 text-center select-none"
    >
      <div className="flex flex-col items-center z-10 max-w-4xl mx-auto mt-6">
        <h2 className="text-[#86868b] text-base sm:text-xl font-semibold tracking-wide uppercase mb-2">
          {specs.hero.tagline}
        </h2>
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent drop-shadow-sm"
          style={{ backgroundImage: variant.textGradient }}
        >
          {specs.hero.title}
        </h1>
        <p className="text-[#a1a1a6] text-lg sm:text-2xl font-normal mt-4 max-w-xl">
          {specs.hero.subheadline}
        </p>

        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={onBuyClick}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-sm sm:text-base px-7 py-3 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25"
          >
            {specs.hero.buy}
          </button>
          <a
            href="#design"
            className="text-[#2997ff] hover:text-[#70baff] text-sm sm:text-base font-normal flex items-center gap-1 group transition-colors"
          >
            {specs.hero.explore}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="z-10 flex flex-col items-center gap-4">
        <p className="text-[#86868b] text-xs sm:text-sm font-normal">
          {specs.hero.priceLine}
        </p>
        <div className="flex items-center gap-2 text-[#86868b] text-xs animate-bob">
          <span>{specs.hero.scrollPrompt}</span>
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M10 14l-6-6h12l-6 6z" />
          </svg>
        </div>
      </div>
    </section>
  );
}
