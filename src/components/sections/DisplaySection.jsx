import React from 'react';
import { specs } from '../../data/specs';

export function DisplaySection() {
  const { eyebrow, title, left, right } = specs.display;

  return (
    <section
      id="display"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 py-24 select-none pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16 pointer-events-auto">
          <span className="text-[#2997ff] text-xs font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f5f5f7] mt-2 whitespace-pre-line leading-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-40 items-center">
          <div className="space-y-12 pointer-events-auto">
            {left.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f5f5f7] mb-1">
                  {item.value}
                </div>
                <div className="text-sm sm:text-base text-[#a1a1a6]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-12 md:text-right pointer-events-auto">
            {right.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f5f5f7] mb-1">
                  {item.value}
                </div>
                <div className="text-sm sm:text-base text-[#a1a1a6]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
