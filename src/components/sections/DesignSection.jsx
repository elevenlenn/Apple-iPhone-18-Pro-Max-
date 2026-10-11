import React from 'react';
import { specs } from '../../data/specs';

export function DesignSection() {
  const { a, b } = specs.design;

  return (
    <section
      id="design"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 py-24 select-none pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Left Column: Titanium & Specs */}
        <div className="space-y-6 pointer-events-auto bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <span className="text-[#2997ff] text-xs font-semibold tracking-wider uppercase">
            {a.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#f5f5f7] whitespace-pre-line leading-tight">
            {a.title}
          </h2>
          <p className="text-[#a1a1a6] text-base sm:text-lg leading-relaxed">
            {a.body}
          </p>

          <div className="flex gap-8 pt-4 border-t border-white/10">
            {a.stats.map((s, idx) => (
              <div key={idx}>
                <div className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs text-[#86868b]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Action Button & Controls */}
        <div className="space-y-6 md:text-right pointer-events-auto bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:ml-auto max-w-lg">
          <span className="text-[#2997ff] text-xs font-semibold tracking-wider uppercase">
            {b.eyebrow}
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f5f5f7] whitespace-pre-line leading-tight">
            {b.title}
          </h3>
          <p className="text-[#a1a1a6] text-base sm:text-lg leading-relaxed">
            {b.body}
          </p>
        </div>
      </div>
    </section>
  );
}
