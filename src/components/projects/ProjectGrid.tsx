'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { TransitionLink } from '../TransitionLink';
import type { IndexItem } from '../ProjectIndex';

/** Grilla editorial de 3 columnas con desfase vertical. */
export function ProjectGrid({ items }: { items: IndexItem[] }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '[data-card]',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.05, overwrite: 'auto' },
      );
    },
    { scope: root, dependencies: [items], revertOnUpdate: true },
  );

  return (
    <ul
      ref={root}
      className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20"
    >
      {items.map((p, i) => (
        <li
          key={p.slug}
          data-card
          className={i % 3 === 1 ? 'lg:mt-20' : i % 3 === 2 ? 'lg:mt-8' : ''}
        >
          <TransitionLink href={`/proyectos/${p.slug}`} data-cursor="ver" className="group block">
            <div className="bg-ink-2 relative aspect-[4/5] overflow-hidden">
              <Image
                src={p.thumb.src}
                alt={`${p.title}, proyecto de MD&C Arquitectos`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                placeholder="blur"
                blurDataURL={p.thumb.blur}
                className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
              <span className="label text-bone absolute top-4 left-4 drop-shadow">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <h3 className="t-lead group-hover:text-brand max-w-[18ch] font-medium transition-colors duration-500">
                {p.title}
              </h3>
              <span className="label text-stone mt-1 shrink-0">{p.year}</span>
            </div>
            <p className="text-stone mt-1 text-[0.95rem]">
              {[p.categoryLabel, p.location].filter(Boolean).join(' · ')}
            </p>
          </TransitionLink>
        </li>
      ))}
    </ul>
  );
}
