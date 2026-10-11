import React from 'react';
import { specs } from '../../data/specs';
import { VARIANTS, getVariant } from '../../config/phoneConfig';
import { useStore, store } from '../../state/store';

export function ColorsSection() {
  const currentVariantId = useStore((s) => s.variant);
  const activeVariant = getVariant(currentVariantId);

  const handleSelect = (id) => {
    store.set({ variant: id });
  };

  return (
    <section
      id="colors"
      className="min-h-screen relative flex flex-col justify-between items-center px-6 py-24 select-none pointer-events-none"
    >
      {/* Header Headline */}
      <div className="text-center z-10 max-w-xl mx-auto pointer-events-none">
        <span className="text-[#2997ff] text-xs font-semibold tracking-wider uppercase">
          {specs.colors.eyebrow}
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mt-2">
          {specs.colors.title}
        </h2>
        <div className="mt-3 flex justify-center">
          <p className="text-xs sm:text-sm text-[#a1a1a6] bg-white/[0.06] backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center justify-center gap-2 shadow-sm">
            <svg className="w-4 h-4 stroke-[#2997ff] fill-none" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            {specs.colors.hint}
          </p>
        </div>
      </div>

      {/* Floating Interactive Color Palette Bar in Apple Store Illuminated Style */}
      <div className="z-20 pointer-events-auto bg-[#222227]/90 backdrop-blur-2xl border border-white/20 px-8 py-4 rounded-full flex flex-col sm:flex-row items-center gap-4 sm:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-2.5">
          <span
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: activeVariant.swatch }}
          />
          <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
            {activeVariant.name}
          </span>
        </div>

        {/* Color Swatch Circles */}
        <div className="flex items-center gap-4">
          {VARIANTS.map((v) => {
            const isSelected = v.id === currentVariantId;
            return (
              <button
                key={v.id}
                onClick={() => handleSelect(v.id)}
                aria-label={`Select ${v.name} finish`}
                className={`relative w-9 h-9 rounded-full transition-all duration-300 transform active:scale-90 border border-white/30 shadow-md cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-[#2997ff] ring-offset-2 ring-offset-[#222227] scale-110 shadow-lg shadow-blue-500/20'
                    : 'opacity-85 hover:opacity-100 hover:scale-105'
                }`}
                style={{ backgroundColor: v.swatch }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
