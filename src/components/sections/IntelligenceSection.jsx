import React from 'react';
import { specs } from '../../data/specs';

export function IntelligenceSection() {
  const { eyebrow, title, body, features } = specs.intelligence;

  return (
    <section
      id="intelligence"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 py-24 select-none pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left Column: Apple Intelligence Highlights */}
        <div className="md:col-span-5 space-y-6 pointer-events-auto bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#f5f5f7]">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f5f5f7] whitespace-pre-line leading-tight">
            {title}
          </h2>

          <p className="text-[#a1a1a6] text-base leading-relaxed">
            {body}
          </p>
        </div>

        {/* Right Column: 4 Feature Grid Cards */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto md:pl-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-[#1c1c20]/70 backdrop-blur-2xl p-6 rounded-2xl border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-white/20 hover:bg-[#222228]/80 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[#f5f5f7] tracking-tight mb-2">
                {f.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default IntelligenceSection;

