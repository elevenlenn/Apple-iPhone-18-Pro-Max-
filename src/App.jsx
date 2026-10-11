import React, { useState, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { DesignSection } from './components/sections/DesignSection';
import { DisplaySection } from './components/sections/DisplaySection';
import { CameraSection } from './components/sections/CameraSection';
import { ChipSection } from './components/sections/ChipSection';
import { IntelligenceSection } from './components/sections/IntelligenceSection';
import { ColorsSection } from './components/sections/ColorsSection';
import { CTASection } from './components/sections/CTASection';
import { LoadingScreen } from './components/LoadingScreen';
import { SceneErrorBoundary } from './components/SceneErrorBoundary';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { specs } from './data/specs';

import { useStore } from './state/store';
import { getVariant } from './config/phoneConfig';

const LazyScene = lazy(() => import('./components/Scene'));

export function App() {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const activeVariantId = useStore((s) => s.variant);
  const activeSection = useStore((s) => s.active);
  const activeVariant = getVariant(activeVariantId);
  const isColorSection = activeSection === 6;

  useSmoothScroll();

  const handleSceneReady = () => {
    setSceneLoaded(true);

    const staticLoader = document.getElementById('app-static-loader');
    if (staticLoader) {
      staticLoader.classList.add('fade-out');
      setTimeout(() => {
        if (staticLoader.parentNode) {
          staticLoader.parentNode.removeChild(staticLoader);
        }
      }, 500);
    }

    setTimeout(() => {
      setShowOverlay(false);
    }, 400);
  };

  const handleBuyClick = () => {
    setToastMessage(specs.cta.toast);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  return (
    <div className="relative min-h-screen text-[#f5f5f7] overflow-hidden selection:bg-[#0071e3]/40 selection:text-white">
      {/* Dynamic Ambient Studio Glow behind the 3D phone — brightens in Colors section */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-700 ease-out ${
          isColorSection ? 'w-[850px] h-[850px]' : 'w-[700px] h-[700px]'
        }`}
        style={{
          background: `radial-gradient(circle, ${activeVariant.glow} 0%, rgba(30,30,36,0) 70%)`,
          opacity: isColorSection ? 0.32 : 0.16,
        }}
      />

      {/* Loading Screen Overlay */}
      {showOverlay && <LoadingScreen active={!sceneLoaded} progress={sceneLoaded ? 100 : 75} />}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1c1c1f]/90 backdrop-blur-xl border border-white/10 text-white text-xs sm:text-sm px-6 py-3 rounded-full shadow-2xl transition-all duration-300 animate-fade-up">
          {toastMessage}
        </div>
      )}

      {/* 3D WebGL Canvas Layer */}
      <SceneErrorBoundary>
        <Suspense fallback={null}>
          <LazyScene onLoaded={handleSceneReady} />
        </Suspense>
      </SceneErrorBoundary>

      {/* Sticky Navigation Bar */}
      <Navbar onBuyClick={handleBuyClick} />

      {/* Scrollable Content Layer with 8 Sections */}
      <main className="relative z-10">
        <HeroSection onBuyClick={handleBuyClick} />
        <DesignSection />
        <DisplaySection />
        <CameraSection />
        <ChipSection />
        <IntelligenceSection />
        <ColorsSection />
        <CTASection onBuyClick={handleBuyClick} />
      </main>
    </div>
  );
}
export default App;
