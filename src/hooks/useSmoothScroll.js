import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { store, frameState } from '../state/store';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      frameState.mouse.x = nx;
      frameState.mouse.y = ny;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 8 Seksi Halaman
    const triggers = [];
    const sectionIds = ['hero', 'design', 'display', 'camera', 'chip', 'intelligence', 'colors', 'cta'];

    sectionIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          frameState.progress[idx] = self.progress;
          if (self.isActive && self.progress > 0.25 && self.progress < 0.75) {
            store.set({ active: idx });
          }
        },
      });
      triggers.push(st);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(tickerCallback);
      triggers.forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);
}
