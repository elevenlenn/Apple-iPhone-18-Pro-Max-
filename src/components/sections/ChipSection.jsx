import React from 'react';
import { specs } from '../../data/specs';

export function ChipSection() {
  const { eyebrow, title, body, rings, ringsCaption, battery } = specs.chip;

  return (
    <section
      id="chip"
      className="min-h-screen relative flex flex-col justify-center px-6 md:px-16 py-24 select-none pointer-events-none"
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left Column: A20 Pro Silicon & Circular Metric Rings */}
        <div className="md:col-span-7 space-y-8 pointer-events-auto bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div>
            <span className="text-[#2997ff] text-xs font-semibold tracking-wider uppercase">
              {eyebrow}
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#f5f5f7] mt-2 whitespace-pre-line leading-tight">
              {title}
            </h2>
            <p className="text-[#a1a1a6] text-base sm:text-lg mt-4 max-w-lg leading-relaxed">
              {body}
            </p>
          </div>

          {/* SVG Progress Rings Animation */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {rings.map((r, i) => {
              const radius = 34;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference * (1 - r.fill);

              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke="#2c2c32"
                        strokeWidth="7"
                        fill="none"
                      />
                      <defs>
                        <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={r.colors[0]} />
                          <stop offset="100%" stopColor={r.colors[1]} />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        stroke={`url(#grad-${i})`}
                        strokeWidth="7"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="none"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute text-base sm:text-lg font-bold text-[#f5f5f7] tracking-tight">
                      {r.prefix}{r.value}{r.suffix}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#86868b] mt-2">
                    {r.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-[#86868b] text-center">{ringsCaption}</p>
        </div>

        {/* Right Column: Battery Life Card */}
        <div className="md:col-span-5 pointer-events-auto bg-[#1c1c20]/75 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M16 4h-2V2h-4v2H8C6.9 4 6 4.9 6 6v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H8V6h8v14z" />
              </svg>
              Battery Efficiency
            </div>
            <div className="text-6xl sm:text-7xl font-bold tracking-tighter text-[#f5f5f7]">
              {battery.value}
              <span className="text-3xl text-[#86868b] font-normal">{battery.suffix}</span>
            </div>
            <p className="text-[#a1a1a6] text-base font-medium mt-2">
              {battery.label}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="h-2.5 w-full bg-[#2c2c32] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                style={{ width: `${battery.fill * 100}%` }}
              />
            </div>
            <p className="text-xs text-[#86868b]">{battery.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
