import React from 'react';
import { specs } from '../../data/specs';
import { useStore } from '../../state/store';
import { getVariant } from '../../config/phoneConfig';

export function CTASection({ onBuyClick }) {
  const variantId = useStore((s) => s.variant);
  const variant = getVariant(variantId);

  return (
    <footer
      id="cta"
      className="min-h-screen relative flex flex-col justify-between items-center pt-24 pb-12 px-6 text-center select-none"
    >
      {/* Central CTA Offer Block */}
      <div className="z-10 max-w-2xl mx-auto flex flex-col items-center mt-12">
        <h2
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent drop-shadow-sm"
          style={{ backgroundImage: variant.textGradient }}
        >
          {specs.cta.title}
        </h2>
        <p className="text-xl sm:text-2xl text-[#86868b] font-medium mt-2">
          {specs.cta.subtitle}
        </p>
        <p className="text-base sm:text-lg text-[#f5f5f7] font-semibold mt-4">
          {specs.cta.price}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <button
            onClick={onBuyClick}
            className="bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-base px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/25"
          >
            {specs.cta.buy}
          </button>
          <a
            href="#hero"
            className="bg-[#242428] hover:bg-[#2c2c32] text-[#f5f5f7] font-medium text-base px-8 py-3.5 rounded-full transition-all duration-200 active:scale-95 border border-white/10"
          >
            {specs.cta.learn}
          </a>
        </div>
      </div>

      {/* Minimal Apple-style Footer & Footnotes */}
      <div className="z-10 max-w-5xl mx-auto w-full pt-16 border-t border-white/10 text-left space-y-4">
        {/* Footnotes list */}
        <div className="space-y-1.5 text-xs text-[#86868b] leading-relaxed">
          {specs.footnotes.map((fn, idx) => (
            <p key={idx}>{fn}</p>
          ))}
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] pt-4 border-t border-white/5">
          <div>
            Copyright © 2026 Apple Inc. Concept Prototype Demo. All rights reserved.
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-[#f5f5f7] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#f5f5f7] cursor-pointer">Terms of Use</span>
            <span className="hover:text-[#f5f5f7] cursor-pointer">Sales Policy</span>
            <span className="hover:text-[#f5f5f7] cursor-pointer">Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
