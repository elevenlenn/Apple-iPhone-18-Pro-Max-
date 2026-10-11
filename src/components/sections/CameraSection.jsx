import React from 'react';
import { specs } from '../../data/specs';

export function CameraSection() {
  const { eyebrow, title, body, cards } = specs.camera;

  return (
    <section
      id="camera"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 py-24 select-none pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Pro Camera System Headline */}
        <div className="md:col-span-5 space-y-6 pointer-events-auto bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <span className="text-[#2997ff] text-xs font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#f5f5f7] whitespace-pre-line leading-tight">
            {title}
          </h2>
          <p className="text-[#a1a1a6] text-base leading-relaxed">
            {body}
          </p>
        </div>

        {/* Right Column: 48MP Specs Cards */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto md:pl-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-[#1c1c20]/70 backdrop-blur-2xl p-6 rounded-2xl border border-white/[0.08] shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-white/20 hover:bg-[#222228]/80 transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] tracking-tight mb-1">
                {c.value}
              </div>
              <div className="text-sm font-semibold text-[#f5f5f7]">
                {c.label}
              </div>
              <div className="text-xs text-[#86868b] mt-1 leading-snug">
                {c.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
