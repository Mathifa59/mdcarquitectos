'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { whenReady } from '@/lib/preload';
import { WordReveal } from '../WordReveal';
import { TransitionLink } from '../TransitionLink';

export type HeroSlide = {
  src: string;
  blur: string;
  alt: string;
  caption: string;
  href: string;
};

const HOLD = 5.2; // segundos por foto

/** Hero a pantalla completa: crossfade + Ken Burns, titular por líneas, etiqueta y scroll. */
export function Hero({ slides }: { slides: HeroSlide[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const imgs = gsap.utils.toArray<HTMLElement>('[data-slide]');
      gsap.set(imgs, { opacity: 0 });
      gsap.set(imgs[0], { opacity: 1 });

      // Entrada del resto de elementos (espera al preloader).
      const off = whenReady(() => {
        if (reduced) {
          gsap.set('[data-hero-in]', { opacity: 1 });
          return;
        }
        gsap.fromTo(
          '[data-hero-in]',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.55 },
        );
        gsap.fromTo(
          '[data-hero-rule]',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, delay: 0.7, transformOrigin: 'left center' },
        );
        gsap.fromTo(imgs[0], { scale: 1.12 }, { scale: 1.02, duration: 2.4, ease: 'expo.out' });
      });

      if (reduced || imgs.length < 2) return off;

      // Ciclo de fotos con crossfade y Ken Burns lento sobre la activa.
      let i = 0;
      let paused = false;
      const kenburns = (el: HTMLElement) =>
        gsap.fromTo(el, { scale: 1.02 }, { scale: 1.1, duration: HOLD + 1.6, ease: 'none' });
      let kb = kenburns(imgs[0]);
      const next = () => {
        if (paused) return;
        const from = imgs[i];
        i = (i + 1) % imgs.length;
        const to = imgs[i];
        gsap.set(to, { zIndex: 2 });
        gsap.set(from, { zIndex: 1 });
        gsap.to(to, { opacity: 1, duration: 1.4, ease: 'power2.inOut' });
        gsap.to(from, { opacity: 0, duration: 1.4, ease: 'power2.inOut', delay: 0.2 });
        kb = kenburns(to);
        setActive(i);
      };
      // El ciclo arranca tras el preloader.
      let timer: gsap.core.Tween | null = null;
      const start = () => {
        timer = gsap.delayedCall(HOLD + 1, function loop() {
          next();
          timer = gsap.delayedCall(HOLD, loop);
        });
      };
      const off2 = whenReady(start);

      // Parallax de salida y pausa cuando el hero no se ve (rendimiento).
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onToggle: (self) => {
          paused = !self.isActive;
          if (paused) kb.pause();
          else kb.resume();
        },
        onUpdate: (self) => {
          gsap.set('[data-hero-parallax]', { yPercent: self.progress * 18 });
          gsap.set('[data-hero-content]', {
            opacity: 1 - self.progress * 1.4,
            y: -self.progress * 60,
          });
        },
      });

      return () => {
        off();
        off2();
        timer?.kill();
        st.kill();
      };
    },
    { scope: root },
  );

  const current = slides[active];

  return (
    <section
      ref={root}
      data-header-theme="dark"
      className="bg-ink text-bone relative isolate h-[100svh] min-h-[34rem] overflow-hidden"
    >
      <div data-hero-parallax className="absolute inset-0 will-change-transform">
        {slides.map((s, i) => (
          <div key={s.src} data-slide className="absolute inset-0 will-change-transform">
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={s.blur}
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* Velos para legibilidad */}
      <div className="from-ink/85 via-ink/20 to-ink/45 absolute inset-0 bg-gradient-to-t" />
      <div className="bg-ink/20 absolute inset-0" />

      <div
        data-hero-content
        className="shell relative z-10 flex h-full flex-col justify-end pt-28 pb-[max(2.5rem,7svh)]"
      >
        <p data-hero-in className="label text-bone/80 mb-6 max-w-[30rem] sm:mb-8 sm:max-w-none">
          Arquitectura comercial · Retail · Corporativa · Gastronómica
        </p>
        <h1 className="display t-h1-hero max-w-[13ch]">
          <WordReveal as="span" delay={0.25} className="block">
            Diseñamos espacios para experiencias únicas
          </WordReveal>
        </h1>

        <div className="relative mt-10 sm:mt-14">
          <span data-hero-rule className="bg-bone/25 absolute -top-5 left-0 block h-px w-full" />
          <div data-hero-in className="flex items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <span
                className="bg-bone/25 relative block h-12 w-px overflow-hidden"
                aria-hidden="true"
              >
                <span className="bg-bone absolute inset-x-0 top-0 h-1/2 animate-[scrolldot_2s_var(--ease-mdc)_infinite]" />
              </span>
              <span className="label text-bone/80">Scroll</span>
            </div>
            <TransitionLink
              href={current.href}
              data-cursor="ver"
              className="group hidden text-right sm:mr-14 sm:block lg:mr-16"
            >
              <span className="label text-bone/55 block">
                {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <span className="link-draw mt-1 inline-block text-[0.95rem]">{current.caption}</span>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
