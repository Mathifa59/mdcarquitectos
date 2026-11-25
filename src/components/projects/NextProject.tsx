'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { TransitionLink } from '../TransitionLink';

type Props = {
  slug: string;
  title: string;
  meta: string;
  photo: { src: string; blur: string; alt: string };
  /** Si la foto aguanta pantalla completa, crece hasta cubrirla; si no, queda enmarcada. */
  full: boolean;
};

/**
 * "Siguiente proyecto" a pantalla completa: al llegar aquí la sección se fija y la imagen crece
 * (clip-path + scale) hasta ocupar la pantalla; al completarse invita a continuar.
 */
export function NextProject({ slug, title, meta, photo, full }: Props) {
  const root = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useGSAP(
    () => {
      const end = full ? 'inset(0% 0% 0% 0%)' : 'inset(7% 9% 7% 9%)';
      if (prefersReducedMotion()) {
        gsap.set('[data-frame]', { clipPath: end });
        setReady(true);
        return;
      }
      gsap.set('[data-frame]', { clipPath: 'inset(22% 30% 22% 30%)' });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: true,
            start: 'top top',
            end: '+=90%',
            anticipatePin: 1,
            onUpdate: (self) => setReady(self.progress > 0.96),
          },
        })
        .to('[data-frame]', { clipPath: end, ease: 'none', duration: 1 }, 0)
        .fromTo('[data-img]', { scale: 1.35 }, { scale: 1.02, ease: 'none', duration: 1 }, 0)
        .to('[data-label]', { opacity: 0, y: -30, ease: 'none', duration: 0.5 }, 0.05)
        .fromTo('[data-title]', { yPercent: 40 }, { yPercent: 0, ease: 'none', duration: 1 }, 0);
    },
    { scope: root, dependencies: [full] },
  );

  return (
    <section
      ref={root}
      data-header-theme="dark"
      aria-label="Siguiente proyecto"
      className="bg-ink text-bone relative h-[100svh] overflow-hidden"
    >
      <p data-label className="label text-bone/70 absolute inset-x-0 top-[18svh] z-10 text-center">
        Siguiente proyecto
      </p>
      <div data-frame className="absolute inset-0 overflow-hidden will-change-[clip-path]">
        <div data-img className="absolute inset-0 will-change-transform">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={photo.blur}
            className="object-cover"
          />
        </div>
        <div className="from-ink/80 via-ink/10 to-ink/30 absolute inset-0 bg-gradient-to-t" />
      </div>

      <div data-title className="shell absolute inset-x-0 bottom-0 z-10 pb-[max(2.5rem,8svh)]">
        <p className="label text-bone/75 mb-4">{meta}</p>
        <h2 className="display max-w-[14ch] text-[clamp(3rem,1rem+8vw,10rem)]">{title}</h2>
        <p
          className={`label mt-8 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
        >
          Continuar →
        </p>
      </div>

      <TransitionLink
        href={`/proyectos/${slug}`}
        data-cursor="ver"
        aria-label={`Ir al siguiente proyecto: ${title}`}
        className="absolute inset-0 z-20"
      />
    </section>
  );
}
