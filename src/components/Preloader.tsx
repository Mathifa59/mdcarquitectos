'use client';

import { useRef } from 'react';
import { gsap, useGSAP, EASE, prefersReducedMotion } from '@/lib/gsap';
import { finishPreloader, preloaderActive } from '@/lib/preload';
import { Logo } from './Logo';

/**
 * Preloader con el logo: solo primera visita de la sesión y solo en el home.
 * Se pinta por CSS (html[data-preload="1"]) antes de hidratar; no retrasa el LCP porque la
 * página ya está renderizada debajo. Dura ~1,1 s.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!preloaderActive()) return;
      const el = root.current!;
      const done = () => {
        gsap.set(el, { display: 'none' });
        finishPreloader();
      };
      if (prefersReducedMotion()) {
        gsap.to(el, { opacity: 0, duration: 0.3, delay: 0.2, onComplete: done });
        return;
      }
      gsap
        .timeline({ onComplete: done })
        .fromTo(
          '[data-pre-logo]',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: EASE.inOut },
        )
        .fromTo(
          '[data-pre-line]',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: EASE.inOut },
          0.05,
        )
        .to(
          '[data-pre-logo], [data-pre-line]',
          { opacity: 0, duration: 0.2, ease: 'power2.in' },
          '+=0.08',
        )
        .to(el, { yPercent: -100, duration: 0.55, ease: EASE.inOut }, '-=0.05');
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader bg-ink pointer-events-none fixed inset-0 z-[500] hidden place-items-center"
    >
      <div className="relative w-[min(58vw,15rem)]">
        <div data-pre-logo>
          <Logo tone="onDark" />
        </div>
        <span data-pre-line className="bg-topo absolute -bottom-5 left-0 h-px w-full origin-left" />
      </div>
    </div>
  );
}
