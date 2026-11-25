'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';

/**
 * Revela una imagen con clip-path: inset() y un scale de 1.15 a 1.
 * `parallax` añade un desplazamiento interno suave (yPercent) mientras se hace scroll.
 */
export function RevealImage({
  children,
  className = '',
  parallax = 0,
  delay = 0,
  aspect,
}: {
  children: React.ReactNode;
  className?: string;
  /** Amplitud del parallax en % (0 = sin parallax). */
  parallax?: number;
  delay?: number;
  /** Relación de aspecto del contenedor, p. ej. "770 / 594". */
  aspect?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.fromTo(
          wrap.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            scrollTrigger: { trigger: wrap.current, start: 'top 90%', once: true },
          },
        );
        return;
      }
      gsap.fromTo(
        wrap.current,
        { clipPath: 'inset(12% 12% 12% 12%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: wrap.current, start: 'top 88%', once: true },
        },
      );
      gsap.fromTo(
        inner.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.8,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: wrap.current, start: 'top 88%', once: true },
        },
      );
      if (parallax) {
        gsap.fromTo(
          inner.current,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: 'none',
            scrollTrigger: {
              trigger: wrap.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      }
      ScrollTrigger.refresh();
    },
    { scope: wrap },
  );

  return (
    <div
      ref={wrap}
      className={`relative overflow-hidden ${className}`}
      style={{ clipPath: 'inset(12% 12% 12% 12%)', aspectRatio: aspect }}
    >
      <div
        ref={inner}
        className="absolute inset-0 will-change-transform"
        style={parallax ? { height: `${100 + parallax * 2}%`, top: `-${parallax}%` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
