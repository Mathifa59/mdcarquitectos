'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

type Mode = 'default' | 'link' | 'ver' | 'arrastrar';

const LABELS: Partial<Record<Mode, string>> = { ver: 'Ver', arrastrar: 'Arrastrar' };

/**
 * Cursor personalizado (solo puntero fino). Cualquier elemento puede declarar
 * data-cursor="ver" | "arrastrar" | "link" para cambiar su aspecto.
 */
export function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine) return;
    document.documentElement.classList.add('has-cursor');

    const x = gsap.quickTo(wrap.current, 'x', { duration: reduced ? 0 : 0.35, ease: 'power3.out' });
    const y = gsap.quickTo(wrap.current, 'y', { duration: reduced ? 0 : 0.35, ease: 'power3.out' });
    gsap.set(wrap.current, { xPercent: -50, yPercent: -50, opacity: 0 });
    let shown = false;
    let mode: Mode = 'default';

    const apply = (next: Mode) => {
      if (next === mode) return;
      mode = next;
      const big = next === 'ver' || next === 'arrastrar';
      gsap.set(dot.current, { mixBlendMode: big ? 'normal' : 'difference' });
      gsap.to(dot.current, {
        scale: big ? 1 : next === 'link' ? 0.42 : 0.14,
        backgroundColor: big ? '#990101' : '#ffffff',
        duration: 0.5,
        ease: 'expo.out',
        overwrite: 'auto',
      });
      if (label.current) {
        label.current.textContent = LABELS[next] ?? '';
        gsap.to(label.current, { opacity: big ? 1 : 0, duration: 0.25, overwrite: 'auto' });
      }
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!shown) {
        shown = true;
        gsap.set(wrap.current, { x: e.clientX, y: e.clientY });
        gsap.to(wrap.current, { opacity: 1, duration: 0.3 });
      }
      x(e.clientX);
      y(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest<HTMLElement>('[data-cursor],a,button');
      const v = t?.dataset.cursor;
      apply(v === 'ver' || v === 'arrastrar' ? v : t ? 'link' : 'default');
    };
    const leave = () => {
      shown = false;
      gsap.to(wrap.current, { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="cursor pointer-events-none fixed top-0 left-0 z-[300] place-items-center"
    >
      <div
        ref={dot}
        className="grid size-[5.5rem] scale-[0.14] place-items-center rounded-full bg-white mix-blend-difference will-change-transform"
        style={{ transform: 'scale(0.14)' }}
      >
        <span ref={label} className="label text-bone text-[0.625rem] opacity-0" />
      </div>
    </div>
  );
}
