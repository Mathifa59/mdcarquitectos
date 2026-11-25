'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import type { Block, GPhoto } from '@/lib/gallery';
import { RevealImage } from '../RevealImage';
import type { LightboxPhoto } from './Lightbox';

const Lightbox = dynamic(() => import('./Lightbox').then((m) => m.Lightbox), { ssr: false });

/**
 * Galería inmersiva: alterna fotos a sangre, pares en dos columnas, fotos sueltas y un tramo
 * de scroll horizontal pinneado. Cualquier foto abre el lightbox.
 */
export function ProjectGallery({
  blocks,
  all,
  title,
}: {
  blocks: Block[];
  all: LightboxPhoto[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const alt = (p: GPhoto) => `Vista ${p.idx + 1} de ${title}, proyecto de MD&C Arquitectos`;

  const tile = (p: GPhoto, sizes: string, className = '', cover = true) => (
    <button
      type="button"
      onClick={() => setOpen(p.idx)}
      data-cursor="ver"
      aria-label={`Ampliar foto ${p.idx + 1} de ${all.length}`}
      className={`group bg-ink-2 relative block w-full overflow-hidden ${className}`}
      style={cover ? undefined : { aspectRatio: `${p.w} / ${p.h}` }}
    >
      <Image
        src={p.src}
        alt={alt(p)}
        fill
        sizes={sizes}
        placeholder="blur"
        blurDataURL={p.blur}
        className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
    </button>
  );

  // Tramo horizontal pinneado (desktop). En móvil: carrusel nativo.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-hscroll]').forEach((sec) => {
          const track = sec.querySelector<HTMLElement>('[data-htrack]')!;
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
          gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              pin: true,
              scrub: true,
              start: 'top top',
              end: () => `+=${dist()}`,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
        });
        return () => gsap.set('[data-htrack]', { clearProps: 'transform' });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [blocks] },
  );

  return (
    <div ref={root} className="bg-bone pb-[clamp(5rem,10vw,9rem)]">
      <div className="space-y-[clamp(2.5rem,6vw,6rem)]">
        {blocks.map((b, i) => {
          if (b.type === 'wide') {
            return (
              <RevealImage key={i} parallax={7} className="h-[min(92svh,60vw)] w-full">
                <button
                  type="button"
                  onClick={() => setOpen(b.photo.idx)}
                  data-cursor="ver"
                  aria-label={`Ampliar foto ${b.photo.idx + 1} de ${all.length}`}
                  className="absolute inset-0"
                >
                  <Image
                    src={b.photo.src}
                    alt={alt(b.photo)}
                    fill
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={b.photo.blur}
                    className="object-cover"
                  />
                </button>
              </RevealImage>
            );
          }
          if (b.type === 'single') {
            const place =
              b.align === 'left' ? 'mr-auto' : b.align === 'right' ? 'ml-auto' : 'mx-auto';
            return (
              <div key={i} className="shell">
                <div className={`w-full ${place}`} style={{ maxWidth: Math.min(b.photo.w, 1100) }}>
                  <RevealImage className="w-full" aspect={`${b.photo.w} / ${b.photo.h}`}>
                    <div className="absolute inset-0">
                      {tile(b.photo, '(min-width: 1100px) 1100px, 92vw', 'h-full')}
                    </div>
                  </RevealImage>
                </div>
              </div>
            );
          }
          if (b.type === 'pair') {
            return (
              <div key={i} className="shell grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                <RevealImage className="w-full" delay={0} aspect={`${b.a.w} / ${b.a.h}`}>
                  <div className="absolute inset-0">
                    {tile(b.a, '(min-width: 768px) 46vw, 92vw', 'h-full')}
                  </div>
                </RevealImage>
                <RevealImage
                  className="w-full md:mt-[12vw]"
                  delay={0.12}
                  aspect={`${b.b.w} / ${b.b.h}`}
                >
                  <div className="absolute inset-0">
                    {tile(b.b, '(min-width: 768px) 46vw, 92vw', 'h-full')}
                  </div>
                </RevealImage>
              </div>
            );
          }
          return (
            <section
              key={i}
              data-hscroll
              className="bg-ink text-bone relative overflow-hidden py-10 md:flex md:h-[100svh] md:items-center md:py-0"
              aria-label="Galería horizontal"
              data-header-theme="dark"
            >
              <div
                data-htrack
                className="flex [scrollbar-width:none] gap-4 overflow-x-auto px-[var(--gutter)] md:w-max md:gap-8 md:overflow-visible md:pr-[10vw] [&::-webkit-scrollbar]:hidden"
              >
                {b.photos.map((p) => (
                  <div
                    key={p.idx}
                    className="w-[78vw] shrink-0 md:h-[68svh] md:w-auto"
                    style={{ aspectRatio: `${p.w} / ${p.h}` }}
                  >
                    {tile(p, '(min-width: 900px) 70svh, 78vw', 'h-full')}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {open !== null && (
        <Lightbox photos={all} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
