import React from 'react';

/**
 * LoadingScreen murni CSS/HTML tanpa dependensi three/drei atau WebGL chunk.
 * Fade out dengan transisi mulus saat active = false.
 */
export function LoadingScreen({ active = true, progress = 100 }) {
  return (
    <div
      className={`fixed inset-0 z-50 bg-[#141416] flex flex-col items-center justify-center select-none transition-opacity duration-700 ease-out pointer-events-none ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Apple Silver Icon High-Res */}
      <img
        src="/photo/logo/apple-logo-transparent.png"
        alt="Apple"
        className="w-12 h-14 sm:w-14 sm:h-16 object-contain mb-8 animate-pulse drop-shadow-2xl"
      />

      <span className="text-sm font-semibold tracking-wide text-apple-text mb-6">
        iPhone 18 Pro Max
      </span>

      {/* Sleek loading bar */}
      <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out rounded-full"
          style={{ width: `${Math.min(Math.max(progress, 10), 100)}%` }}
        />
      </div>
    </div>
  );
}
export default LoadingScreen;
