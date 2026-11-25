'use client';

import { useRef, type ElementType } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { whenReady } from '@/lib/preload';

type Props = {
  as?: ElementType;
  children: string;
  className?: string;
  /** 'scroll' dispara al entrar en pantalla; 'load' al montar (espera al preloader). */
  on?: 'scroll' | 'load';
  delay?: number;
  stagger?: number;
};

/**
 * Titular que se revela línea por línea: máscara de overflow + translateY.
 * El texto parte invisible por CSS (.split-init) para evitar parpadeos.
 */
export function SplitReveal({
  as: Tag = 'div',
  children,
  className = '',
  on = 'scroll',
  delay = 0,
  stagger = 0.09,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.to(el, { opacity: 1, duration: 0.4 });
        return;
      }
      let cancelled = false;
      let off = () => {};
      document.fonts.ready.then(() => {
        if (cancelled) return;
        off = whenReady(
          contextSafe!(() => {
            SplitText.create(el, {
              type: 'lines',
              aria: 'none',
              mask: 'lines',
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { opacity: 1 });
                return gsap.from(self.lines, {
                  yPercent: 115,
                  duration: 1.15,
                  stagger,
                  delay,
                  ease: 'expo.out',
                  scrollTrigger:
                    on === 'scroll' ? { trigger: el, start: 'top 88%', once: true } : undefined,
                });
              },
            });
          }),
        );
      });
      return () => {
        cancelled = true;
        off();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`split-init ${className}`}>
      {children}
    </Tag>
  );
}
