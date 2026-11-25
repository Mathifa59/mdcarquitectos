'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';

export type LightboxPhoto = { src: string; blur: string; alt: string };

/**
 * Lightbox a pantalla completa: teclado (← → Esc), swipe en táctil, foco atrapado
 * y precarga de las fotos vecinas.
 */
export function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: LightboxPhoto[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);
  const dir = useRef(1);
  const n = photos.length;

  const go = (d: number) => {
    dir.current = d;
    onIndex((index + d + n) % n);
  };

  // Entrada, bloqueo del scroll y restauración del foco.
  useEffect(() => {
    prevFocus.current = document.activeElement as HTMLElement;
    getLenis()?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.getElementById('site-main')?.setAttribute('inert', '');
    gsap.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      getLenis()?.start();
      document.documentElement.style.overflow = '';
      document.getElementById('site-main')?.removeAttribute('inert');
      prevFocus.current?.focus?.({ preventScroll: true });
    };
  }, []);

  // Transición entre fotos.
  useEffect(() => {
    gsap.fromTo(
      stage.current,
      { opacity: 0, x: 60 * dir.current },
      { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out' },
    );
  }, [index]);

  // Teclado + trampa de foco.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const items = root.current?.querySelectorAll<HTMLElement>('button');
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  // Swipe (táctil y mouse): arrastre horizontal > 50 px cambia de foto.
  const start = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1);
  };

  const around = [(index - 1 + n) % n, (index + 1) % n];

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Galería de fotos"
      data-theme="dark"
      className="bg-ink/95 text-bone fixed inset-0 z-[150] flex flex-col backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-[var(--gutter)] py-5">
        <p className="label tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
        <button
          ref={closeBtn}
          onClick={onClose}
          data-cursor="link"
          className="label border-bone/30 hover:border-brand hover:bg-brand rounded-full border px-5 py-3 transition-colors duration-500"
        >
          Cerrar ✕
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y select-none"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div ref={stage} className="absolute inset-x-[var(--gutter)] inset-y-0">
          <Image
            key={photos[index].src}
            src={photos[index].src}
            alt={photos[index].alt}
            fill
            sizes="100vw"
            priority
            placeholder="blur"
            blurDataURL={photos[index].blur}
            draggable={false}
            className="object-contain"
          />
        </div>
        {/* Precarga de vecinas */}
        <div
          className="pointer-events-none invisible absolute h-0 w-0 overflow-hidden"
          aria-hidden="true"
        >
          {around.map((i) => (
            <Image
              key={photos[i].src}
              src={photos[i].src}
              alt=""
              width={1200}
              height={800}
              sizes="100vw"
              loading="eager"
            />
          ))}
        </div>

        {n > 1 && (
          <>
            <button
              aria-label="Foto anterior"
              data-cursor="link"
              onClick={() => go(-1)}
              className="label border-bone/30 bg-ink/40 hover:border-bone hover:bg-bone hover:text-ink absolute top-1/2 left-3 hidden size-14 -translate-y-1/2 place-items-center rounded-full border text-lg backdrop-blur transition-colors duration-500 sm:grid"
            >
              ←
            </button>
            <button
              aria-label="Foto siguiente"
              data-cursor="link"
              onClick={() => go(1)}
              className="label border-bone/30 bg-ink/40 hover:border-bone hover:bg-bone hover:text-ink absolute top-1/2 right-3 hidden size-14 -translate-y-1/2 place-items-center rounded-full border text-lg backdrop-blur transition-colors duration-500 sm:grid"
            >
              →
            </button>
          </>
        )}
      </div>
      <p className="label text-bone/50 px-[var(--gutter)] py-4 sm:hidden">
        Desliza para cambiar de foto
      </p>
    </div>
  );
}
