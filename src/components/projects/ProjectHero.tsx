'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { RevealImage } from '../RevealImage';
import { WordReveal } from '../WordReveal';
import { TransitionLink } from '../TransitionLink';

type Props = {
  title: string;
  categoryLabel: string;
  location?: string;
  year?: string;
  photo: { src: string; blur: string; alt: string };
  /** true si la foto aguanta pantalla completa (≥1600 px); si no, se usa composición enmarcada. */
  immersive: boolean;
};

/** Hero del detalle. A sangre con fotos de alta; enmarcado con las de resolución media. */
export function ProjectHero({ title, categoryLabel, location, year, photo, immersive }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        '[data-hero-in]',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, delay: 0.5 },
      );
      if (immersive) {
        gsap.fromTo('[data-kb]', { scale: 1.14 }, { scale: 1.02, duration: 2.6, ease: 'expo.out' });
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => {
            gsap.set('[data-hero-parallax]', { yPercent: self.progress * 16 });
            gsap.set('[data-hero-content]', {
              opacity: 1 - self.progress * 1.5,
              y: -self.progress * 50,
            });
          },
        });
      } else {
        gsap.to('[data-kb]', { scale: 1.07, duration: 14, ease: 'none' });
      }
    },
    { scope: root, dependencies: [immersive] },
  );

  const meta = [categoryLabel, location, year].filter(Boolean);

  if (immersive) {
    return (
      <section
        ref={root}
        data-header-theme="dark"
        className="bg-ink text-bone relative isolate h-[100svh] min-h-[34rem] overflow-hidden"
      >
        <div data-hero-parallax className="absolute inset-0 will-change-transform">
          <div data-kb className="absolute inset-0 will-change-transform">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={photo.blur}
              className="object-cover"
            />
          </div>
        </div>
        <div className="from-ink/85 via-ink/15 to-ink/45 absolute inset-0 bg-gradient-to-t" />
        <div
          data-hero-content
          className="shell relative z-10 flex h-full flex-col justify-end pt-28 pb-[max(2.5rem,7svh)]"
        >
          <TransitionLink
            href="/proyectos"
            data-cursor="link"
            data-hero-in
            className="label link-draw text-bone/80 mb-8 w-fit pb-1"
          >
            ← Proyectos
          </TransitionLink>
          <h1 className="display t-h1 max-w-[14ch]">
            <WordReveal as="span" delay={0.2} className="block">
              {title}
            </WordReveal>
          </h1>
          <p data-hero-in className="label text-bone/80 mt-8">
            {meta.join(' · ')}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={root}
      data-header-theme="dark"
      className="bg-ink text-bone relative overflow-hidden"
    >
      <div className="shell grid-12 min-h-[100svh] items-end gap-y-10 pt-[calc(var(--header-h)+3rem)] pb-[clamp(3rem,7vw,6rem)]">
        <div className="col-span-12 flex flex-col justify-between self-stretch lg:col-span-5">
          <TransitionLink
            href="/proyectos"
            data-cursor="link"
            data-hero-in
            className="label link-draw text-bone/70 w-fit pb-1"
          >
            ← Proyectos
          </TransitionLink>
          <div className="mt-16 lg:mt-0">
            <h1 className="display text-[clamp(2.6rem,1.1rem+6vw,7.25rem)]">
              <WordReveal as="span" delay={0.2} className="block">
                {title}
              </WordReveal>
            </h1>
            <p data-hero-in className="label text-bone/70 mt-8">
              {meta.join(' · ')}
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <RevealImage className="aspect-[4/3] w-full" delay={0.3}>
            <div data-kb className="absolute inset-0 will-change-transform">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1024px) 58vw, 100vw"
                placeholder="blur"
                blurDataURL={photo.blur}
                className="object-cover"
              />
            </div>
          </RevealImage>
        </div>
      </div>
    </section>
  );
}
