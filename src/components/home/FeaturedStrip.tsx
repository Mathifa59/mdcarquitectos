'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { TransitionLink } from '../TransitionLink';

export type FeaturedItem = {
  slug: string;
  title: string;
  meta: string;
  src: string;
  blur: string;
  alt: string;
};

/**
 * Proyectos destacados: la sección se fija y las tarjetas avanzan de lado con el scroll vertical.
 * Cada imagen lleva parallax interno. En móvil o con movimiento reducido es un carrusel nativo.
 */
export function FeaturedStrip({ items }: { items: FeaturedItem[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current!;
        const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
        const tween = gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: true,
            start: 'top top',
            end: () => `+=${dist()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              gsap.set('[data-progress]', { scaleX: self.progress });
              const n = Math.min(
                items.length,
                Math.max(1, Math.round(self.progress * (items.length - 1)) + 1),
              );
              const c = root.current?.querySelector('[data-counter]');
              if (c) c.textContent = String(n).padStart(2, '0');
            },
          },
        });
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -9 },
            {
              xPercent: 9,
              ease: 'none',
              scrollTrigger: {
                trigger: img.closest('[data-card]'),
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });
        return () => {
          gsap.set(el, { clearProps: 'transform' });
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [items.length] },
  );

  return (
    <section
      ref={root}
      data-header-theme="dark"
      className="bg-ink text-bone relative overflow-hidden md:h-[100svh]"
      aria-label="Proyectos destacados"
    >
      <div
        ref={track}
        className="flex h-full snap-x snap-mandatory [scrollbar-width:none] items-stretch gap-4 overflow-x-auto px-[var(--gutter)] py-24 md:snap-none md:gap-8 md:overflow-visible md:py-0 md:pr-[8vw] [&::-webkit-scrollbar]:hidden"
      >
        {/* Panel de apertura */}
        <div className="flex w-[62vw] shrink-0 snap-start flex-col justify-between py-0 md:w-[34vw] md:py-[14vh]">
          <div>
            <p className="label text-bone/60">02 / Proyectos destacados</p>
            <h2 className="display t-h2 mt-6 max-w-[8ch]">Obra reciente y de siempre</h2>
          </div>
          <div>
            <p className="label text-bone/60 hidden items-center gap-3 md:flex">
              <span className="bg-bone/40 block h-px w-10" /> Siga desplazando
            </p>
            <p className="label text-bone/60 md:hidden">Deslice para ver más →</p>
          </div>
        </div>

        {items.map((it, i) => (
          <article
            key={it.slug}
            data-card
            className="group relative flex w-[78vw] shrink-0 snap-start flex-col justify-center md:w-[34vw] md:max-w-[34rem]"
          >
            <TransitionLink href={`/proyectos/${it.slug}`} data-cursor="ver" className="block">
              <div className="bg-ink-2 relative aspect-[4/5] overflow-hidden md:aspect-auto md:h-[62svh]">
                <div
                  data-parallax
                  className="absolute -inset-x-[11%] inset-y-0 will-change-transform"
                >
                  <Image
                    src={it.src}
                    alt={it.alt}
                    fill
                    sizes="(min-width: 900px) 48vw, 90vw"
                    placeholder="blur"
                    blurDataURL={it.blur}
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </div>
                <span className="label text-bone absolute top-4 left-4 drop-shadow">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="t-lead max-w-[18ch] font-medium">{it.title}</h3>
                <span className="label text-bone/55 mt-1 text-right">{it.meta}</span>
              </div>
            </TransitionLink>
          </article>
        ))}
      </div>

      {/* Progreso (solo desktop) */}
      <div className="shell pointer-events-none absolute inset-x-0 bottom-8 hidden items-center gap-5 md:flex md:pr-[calc(var(--gutter)+4.5rem)]">
        <span className="label text-bone/70 tabular-nums">
          <span data-counter>01</span> / {String(items.length).padStart(2, '0')}
        </span>
        <span className="bg-bone/20 relative block h-px flex-1">
          <span data-progress className="bg-bone absolute inset-0 origin-left scale-x-0" />
        </span>
        <TransitionLink
          href="/proyectos"
          data-cursor="link"
          className="label link-draw pointer-events-auto pb-1"
        >
          Ver todos →
        </TransitionLink>
      </div>
    </section>
  );
}
