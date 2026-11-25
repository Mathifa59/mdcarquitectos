'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';

type UI = {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  /** Navega con cortina: cubre, cambia ruta y la plantilla destapa. */
  navigate: (href: string) => void;
  /** Lo llama template.tsx al montar la página nueva. Devuelve true si venía de una transición. */
  reveal: () => boolean;
};

const Ctx = createContext<UI | null>(null);
export const useUI = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useUI fuera de UIProvider');
  return c;
};

/** Contiene el estado del menú y la cortina de transición entre páginas. */
export function UIProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const overlay = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const safety = useRef<number | null>(null);
  const current = useRef(pathname);
  useEffect(() => {
    current.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const el = overlay.current!;
    gsap.set(el.querySelector('[data-panel]'), { yPercent: 100 });
    gsap.set(el.querySelector('[data-line]'), { scaleX: 0 });
  }, []);

  const reveal = useCallback(() => {
    if (!covering.current) return false;
    covering.current = false;
    if (safety.current) window.clearTimeout(safety.current);
    const el = overlay.current!;
    const panel = el.querySelector('[data-panel]');
    const line = el.querySelector('[data-line]');
    getLenis()?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(el, { visibility: 'hidden' });
          gsap.set(panel, { yPercent: 100 });
          gsap.set(line, { scaleX: 0, transformOrigin: 'left center' });
        },
      })
      .set(line, { transformOrigin: 'right center' })
      .to(line, { scaleX: 0, duration: 0.3, ease: 'power3.in' })
      .to(panel, { yPercent: -100, duration: 0.6, ease: EASE.inOut }, '-=0.1');
    return true;
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname === current.current && !url.hash) {
        setMenuOpen(false);
        return;
      }
      if (covering.current) return;
      setMenuOpen(false);
      if (prefersReducedMotion()) {
        router.push(href);
        return;
      }
      covering.current = true;
      const el = overlay.current!;
      const panel = el.querySelector('[data-panel]');
      const line = el.querySelector('[data-line]');
      gsap.set(el, { visibility: 'visible' });
      gsap.set(line, { transformOrigin: 'left center' });
      gsap
        .timeline({ onComplete: () => router.push(href) })
        .fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: EASE.inOut })
        .to(line, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, '-=0.15');
      // Si la ruta nueva no monta (error o misma página), no dejar la cortina puesta.
      safety.current = window.setTimeout(() => reveal(), 3500);
    },
    [router, reveal],
  );

  const value = useMemo(
    () => ({ menuOpen, setMenuOpen, navigate, reveal }),
    [menuOpen, navigate, reveal],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div
        ref={overlay}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
        style={{ visibility: 'hidden' }}
      >
        <div data-panel className="bg-ink absolute inset-0 will-change-transform" />
        <div data-line className="bg-brand absolute top-1/2 left-0 h-px w-full" />
      </div>
    </Ctx.Provider>
  );
}
