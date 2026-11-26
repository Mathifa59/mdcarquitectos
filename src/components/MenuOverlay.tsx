'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, EASE, prefersReducedMotion } from '@/lib/gsap';
import { getLenis } from '@/lib/lenis';
import { nav, site, whatsappUrl } from '@/content/site';
import { TransitionLink } from './TransitionLink';
import { useUI } from './UIProvider';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Overlay a pantalla completa: cortina clip-path, links enormes en stagger y vista previa al hover. */
export type MenuPreview = { src: string; blur: string; alt: string };

export function MenuOverlay({ previews }: { previews: MenuPreview[] }) {
  const { menuOpen, setMenuOpen } = useUI();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(menuOpen);
  useEffect(() => {
    openRef.current = menuOpen;
  }, [menuOpen]);
  const opener = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const t = gsap.timeline({
        paused: true,
        defaults: { ease: EASE.out },
        onReverseComplete: () => {
          if (!openRef.current && root.current) root.current.style.visibility = 'hidden';
        },
      });
      if (prefersReducedMotion()) {
        t.fromTo(root.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'none' });
      } else {
        t.fromTo(
          root.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.85, ease: EASE.inOut },
        )
          .fromTo(
            '[data-line] > span',
            { yPercent: 115 },
            { yPercent: 0, duration: 1, stagger: 0.08 },
            0.35,
          )
          .fromTo(
            '[data-fade]',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
            0.55,
          )
          .fromTo(
            '[data-rule]',
            { scaleX: 0 },
            { scaleX: 1, duration: 1, stagger: 0.08, transformOrigin: 'left center' },
            0.4,
          );
      }
      tl.current = t;
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    const el = root.current;
    if (!t || !el) return;
    const main = document.getElementById('site-main');
    if (menuOpen) {
      opener.current = document.activeElement as HTMLElement;
      el.style.visibility = 'visible';
      t.timeScale(1).play();
      getLenis()?.stop();
      document.documentElement.style.overflow = 'hidden';
      main?.setAttribute('inert', '');
      const id = window.setTimeout(
        () => el.querySelector<HTMLElement>('nav a')?.focus({ preventScroll: true }),
        80,
      );
      return () => window.clearTimeout(id);
    }
    if (t.progress() > 0) {
      t.timeScale(1.4).reverse();
      opener.current?.focus?.({ preventScroll: true });
    }
    getLenis()?.start();
    document.documentElement.style.overflow = '';
    main?.removeAttribute('inert');
  }, [menuOpen]);

  // Esc para cerrar + trampa de foco (header + menú).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const sel = 'a[href],button:not([disabled])';
      const items = [
        ...document.querySelectorAll<HTMLElement>(`#site-header ${sel}`),
        ...(root.current?.querySelectorAll<HTMLElement>(sel) ?? []),
      ].filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const cur = document.activeElement;
      if (e.shiftKey && cur === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && cur === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <div
      ref={root}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      data-theme="dark"
      style={{ visibility: 'hidden' }}
      className="bg-ink text-bone fixed inset-0 z-[90] flex flex-col"
    >
      <div className="shell grid flex-1 grid-rows-[1fr_auto] pt-[calc(var(--header-h)+1rem)] pb-6 sm:pb-8">
        <div className="grid-12 items-center">
          <nav aria-label="Principal" className="col-span-12 lg:col-span-7">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href} className="relative">
                  <span data-rule className="bg-bone/15 absolute inset-x-0 top-0 block h-px" />
                  <TransitionLink
                    href={item.href}
                    data-cursor="ver"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-baseline gap-4 py-[clamp(0.6rem,1.6vh,1.4rem)] sm:gap-8"
                  >
                    <span
                      data-fade
                      className="label text-bone/50 group-hover:text-brand-bright w-8 shrink-0 transition-colors duration-500 sm:w-12"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span data-line className="line-mask">
                      <span className="display block text-[clamp(2.4rem,1rem+6.4vw,7rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-focus-visible:translate-x-3">
                        {item.label}
                      </span>
                    </span>
                  </TransitionLink>
                </li>
              ))}
              <li className="relative h-px">
                <span data-rule className="bg-bone/15 absolute inset-x-0 top-0 block h-px" />
              </li>
            </ul>
          </nav>

          {/* Vista previa de cada sección */}
          <div
            aria-hidden="true"
            className="relative col-span-5 col-start-8 hidden aspect-[4/5] max-h-[58vh] w-full self-center justify-self-end lg:block"
          >
            {nav.map((item, i) => (
              <div
                key={item.href}
                className={`bg-ink-2 absolute inset-0 overflow-hidden transition-[clip-path,opacity] duration-700 ease-[var(--ease-mdc)] ${i === active ? 'opacity-100 [clip-path:inset(0)]' : 'opacity-0 [clip-path:inset(0_0_100%_0)]'}`}
              >
                {previews[i] && (
                  <Image
                    src={previews[i].src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, 0px"
                    placeholder="blur"
                    blurDataURL={previews[i].blur}
                    className="object-cover"
                  />
                )}
                <div className="from-ink/80 to-ink/20 absolute inset-0 bg-gradient-to-t via-transparent" />
                <span className="label text-bone/80 absolute top-5 left-5">
                  {String(i + 1).padStart(2, '0')} / {String(nav.length).padStart(2, '0')}
                </span>
                <span className="t-lead text-bone absolute right-5 bottom-5 left-5 max-w-[18ch]">
                  {item.caption}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div data-fade className="grid-12 border-bone/15 gap-y-6 border-t pt-6 sm:pt-8">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <p className="label text-bone/50 mb-2">Estudio</p>
            <p className="text-bone/85 text-[0.95rem] leading-snug">
              {site.address.street}
              <br />
              {site.address.district}, {site.address.city}, {site.address.country}
            </p>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <p className="label text-bone/50 mb-2">Escríbanos</p>
            {/* TODO-CONFIRMAR: correo */}
            <a
              href={`mailto:${site.email}`}
              className="link-draw text-bone/85 block w-fit text-[0.95rem]"
            >
              {site.email}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-bone/85 mt-1 flex w-fit items-center gap-2 text-[0.95rem]"
            >
              <WhatsAppIcon className="size-4" /> {site.whatsapp.display}
            </a>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <p className="label text-bone/50 mb-2">Presencia</p>
            <p className="text-bone/85 text-[0.95rem]">{site.countries.join(' · ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
