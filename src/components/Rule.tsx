'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

/** Línea divisoria de 1 px que se dibuja al entrar en pantalla. */
export function Rule({
  className = 'bg-ink/20',
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        delay,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 95%', once: true },
      },
    );
  });
  return (
    <span ref={ref} aria-hidden="true" className={`block h-px w-full origin-left ${className}`} />
  );
}
