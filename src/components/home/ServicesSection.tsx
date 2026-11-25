'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP, EASE } from '@/lib/gsap';
import { Rule } from '../Rule';
import { SplitReveal } from '../SplitReveal';
import { TransitionLink } from '../TransitionLink';

export type ServiceItem = {
  slug: string;
  title: string;
  label: string;
  intro: string;
  subservices: string[];
  src: string;
  blur: string;
  alt: string;
};

/**
 * Tres bloques grandes. Con puntero fino, al pasar el cursor la imagen se revela con clip-path
 * y aparecen los 5 subservicios. En táctil, todo queda visible.
 */
export function ServicesSection({
  items,
  heading = true,
}: {
  items: ServiceItem[];
  heading?: boolean;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (pointer: fine) and (min-width: 1024px)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('[data-row]');
        rows.forEach((row) => {
          const img = row.querySelector('[data-img]');
          const imgInner = row.querySelector('[data-img-inner]');
          const subs = row.querySelectorAll('[data-sub]');
          const title = row.querySelector('[data-title]');
          gsap.set(img, { clipPath: 'inset(100% 0% 0% 0%)' });
          gsap.set(subs, { opacity: 0, x: -18 });
          const tl = gsap
            .timeline({ paused: true, defaults: { ease: EASE.out } })
            .to(img, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: EASE.inOut }, 0)
            .fromTo(imgInner, { scale: 1.2 }, { scale: 1, duration: 1.2 }, 0)
            .to(subs, { opacity: 1, x: 0, duration: 0.7, stagger: 0.05 }, 0.2)
            .to(title, { x: 18, duration: 0.8 }, 0);
          const enter = () => tl.timeScale(1).play();
          const leave = () => tl.timeScale(1.6).reverse();
          row.addEventListener('pointerenter', enter);
          row.addEventListener('pointerleave', leave);
          row.addEventListener('focusin', enter);
          row.addEventListener('focusout', leave);
        });
        return () => {
          rows.forEach((row) => {
            gsap.set(row.querySelectorAll('[data-img],[data-sub],[data-title]'), {
              clearProps: 'all',
            });
          });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="servicios" className="bg-bone relative py-[clamp(6rem,12vw,10rem)]">
      <div className="shell">
        {heading && (
          <div className="grid-12 mb-14 gap-y-6 sm:mb-20">
            <p className="label text-stone col-span-12 lg:col-span-3">03 / Servicios</p>
            <h2 className="display t-h2 col-span-12 max-w-[14ch] lg:col-span-9">
              <SplitReveal as="span" className="block">
                Tres líneas, una sola mirada integral
              </SplitReveal>
            </h2>
          </div>
        )}

        <ul>
          {items.map((s, i) => (
            <li key={s.slug} data-row className="group relative">
              <Rule />
              <TransitionLink
                href={`/servicios/${s.slug}`}
                data-cursor="ver"
                className="relative block py-8 sm:py-12 lg:min-h-[24rem]"
              >
                <div className="grid-12 items-start gap-y-6">
                  <span className="label text-stone col-span-2 pt-3 lg:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-10 lg:col-span-5">
                    <p className="label text-stone">{s.label}</p>
                    <h3
                      data-title
                      className="display mt-4 text-[clamp(2.5rem,1.2rem+3.6vw,5.5rem)]"
                    >
                      {s.title}
                    </h3>
                    <p className="text-stone mt-6 hidden max-w-[40ch] lg:block">{s.intro}</p>
                  </div>

                  {/* Subservicios: visibles siempre en táctil; revelados al hover en desktop */}
                  <ul className="col-span-10 col-start-3 flex flex-col gap-2 lg:col-span-3 lg:col-start-10 lg:pt-3">
                    {s.subservices.map((sub, k) => (
                      <li
                        key={sub}
                        data-sub
                        className="border-ink/10 flex items-baseline gap-4 border-b pb-2"
                      >
                        <span className="label text-stone w-6">
                          {String(k + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[1.05rem]">{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Imagen: bloque estático en móvil/tablet; panel con clip-path en desktop */}
                <div
                  data-img
                  className="bg-ink-2 relative mt-8 aspect-[16/9] overflow-hidden lg:pointer-events-none lg:absolute lg:inset-y-4 lg:right-[26%] lg:z-0 lg:mt-0 lg:aspect-auto lg:w-[23%]"
                >
                  <div data-img-inner className="absolute inset-0">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, 90vw"
                      placeholder="blur"
                      blurDataURL={s.blur}
                      className="object-cover"
                    />
                  </div>
                </div>
              </TransitionLink>
            </li>
          ))}
          <li>
            <Rule />
          </li>
        </ul>
      </div>
    </section>
  );
}
