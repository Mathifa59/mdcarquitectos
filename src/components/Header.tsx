'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, EASE } from '@/lib/gsap';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { TransitionLink } from './TransitionLink';
import { useUI } from './UIProvider';
import { nav } from '@/content/site';

/** Header mínimo: logo, Menú y WhatsApp. Se oculta al bajar y reaparece al subir. */
export function Header() {
  const { menuOpen, setMenuOpen } = useUI();
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(menuOpen);
  useEffect(() => {
    menuRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const dy = y - last;
      if (!menuRef.current) {
        if (dy > 6 && y > 140 && !hidden) {
          hidden = true;
          gsap.to(ref.current, {
            yPercent: -110,
            duration: 0.6,
            ease: EASE.soft,
            overwrite: 'auto',
          });
        } else if ((dy < -6 || y < 80) && hidden) {
          hidden = false;
          gsap.to(ref.current, { yPercent: 0, duration: 0.6, ease: EASE.soft, overwrite: 'auto' });
        }
      }
      if (Math.abs(dy) > 0.5) last = y;
      // Tema según el fondo que hay bajo el header.
      // Fondo bajo el header: se ignora el propio header (el menú ocupa el centro).
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 40)
        .find((el) => !el.closest('#site-header'))
        ?.closest<HTMLElement>('[data-header-theme]');
      setDark(under?.dataset.headerTheme === 'dark');
      setScrolled(y > 90);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // Tras cada transición de página el contenido cambia sin scroll: re-evaluar.
    const poll = window.setInterval(onScroll, 900);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearInterval(poll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) gsap.to(ref.current, { yPercent: 0, duration: 0.4, overwrite: 'auto' });
  }, [menuOpen]);

  const light = dark || menuOpen;
  const border = light ? 'border-bone/30' : 'border-ink/20';

  return (
    <header
      ref={ref}
      id="site-header"
      className={`pointer-events-none fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${light ? 'text-bone' : 'text-ink'}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 -z-10 backdrop-blur-md transition-opacity duration-500 ${scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'} ${light ? 'bg-ink/75' : 'bg-bone/85'}`}
      />
      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
        <TransitionLink
          href="/"
          aria-label="MD&C Arquitectos, inicio"
          data-cursor="link"
          className="pointer-events-auto block w-[7rem] sm:w-[9.5rem]"
        >
          <Logo tone={light ? 'onDark' : 'color'} compact />
        </TransitionLink>

        <nav
          aria-label="Principal"
          className="pointer-events-auto hidden items-center gap-7 lg:flex"
        >
          {nav.map((n) => {
            const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href);
            return (
              <TransitionLink
                key={n.href}
                href={n.href}
                data-cursor="link"
                aria-current={active ? 'page' : undefined}
                className={`text-[0.875rem] font-medium tracking-[-0.005em] transition-opacity duration-300 hover:opacity-100 ${active ? 'decoration-1 underline-offset-[10px] opacity-100 [text-decoration:underline]' : 'opacity-75'}`}
              >
                {n.label}
              </TransitionLink>
            );
          })}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <TransitionLink
            href="/contacto"
            data-cursor="link"
            className={`label hover:border-graphite hover:bg-graphite hover:text-bone hidden items-center gap-2 rounded-full border px-5 py-3 transition-colors duration-500 lg:inline-flex ${border}`}
          >
            Conversemos <span aria-hidden="true">↗</span>
          </TransitionLink>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            data-cursor="link"
            className={`label hover:border-graphite hover:bg-graphite hover:text-bone inline-flex h-11 min-w-[6.5rem] items-center justify-center gap-3 overflow-hidden rounded-full border px-5 transition-colors duration-500 lg:hidden ${border}`}
          >
            <span className="grid h-[1.4em] overflow-hidden text-center">
              <span
                className={`col-start-1 row-start-1 block transition-transform duration-500 ease-[var(--ease-mdc)] ${menuOpen ? '-translate-y-full' : ''}`}
              >
                Menú
              </span>
              <span
                className={`col-start-1 row-start-1 block transition-transform duration-500 ease-[var(--ease-mdc)] ${menuOpen ? '' : 'translate-y-full'}`}
              >
                Cerrar
              </span>
            </span>
            <span aria-hidden="true" className="relative block size-3">
              <span
                className={`absolute top-[3px] left-0 h-px w-3 bg-current transition-transform duration-500 ease-[var(--ease-mdc)] ${menuOpen ? 'translate-y-[2px] rotate-45' : ''}`}
              />
              <span
                className={`absolute top-[8px] left-0 h-px w-3 bg-current transition-transform duration-500 ease-[var(--ease-mdc)] ${menuOpen ? '-translate-y-[3px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
