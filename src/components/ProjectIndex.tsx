'use client';

import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { FilterBar } from './FilterBar';
import { TransitionLink } from './TransitionLink';

export type IndexItem = {
  slug: string;
  title: string;
  location?: string;
  year?: string;
  category: string;
  categoryLabel: string;
  thumb: { src: string; blur: string };
};

/**
 * Índice numerado de proyectos. En desktop, una vista previa sigue al cursor al hacer hover.
 * Con `filters`, permite filtrar por categoría.
 */
export function ProjectIndex({
  items,
  filters = false,
  className = '',
  dark = false,
}: {
  items: IndexItem[];
  filters?: boolean;
  className?: string;
  dark?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [hover, setHover] = useState<IndexItem | null>(null);

  const cats = useMemo(() => {
    const seen = new Map<string, string>();
    items.forEach((i) => seen.set(i.category, i.categoryLabel));
    return [...seen.entries()];
  }, [items]);
  const shown = filter === 'all' ? items : items.filter((i) => i.category === filter);
  const line = dark ? 'bg-bone/15' : 'bg-ink/15';
  const muted = dark ? 'text-bone/55' : 'text-stone';

  // Vista previa que sigue al cursor (solo puntero fino).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(hover: hover) and (pointer: fine)', () => {
        const el = preview.current!;
        gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.85, opacity: 0 });
        const x = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
        const y = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });
        const rot = gsap.quickTo(el, 'rotation', { duration: 0.6, ease: 'power3.out' });
        let lastX = 0;
        const move = (e: PointerEvent) => {
          x(e.clientX + 40);
          y(e.clientY);
          rot(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.25));
          lastX = e.clientX;
        };
        const list = root.current!.querySelector('[data-list]')!;
        const enter = () => gsap.to(el, { scale: 1, opacity: 1, duration: 0.5, overwrite: 'auto' });
        const leave = () => {
          gsap.to(el, { scale: 0.85, opacity: 0, duration: 0.35, overwrite: 'auto' });
          setHover(null);
        };
        // Si la página se desplaza bajo un cursor quieto, el navegador no avisa del pointerleave.
        const onScroll = () => {
          if (!list.matches(':hover')) leave();
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        list.addEventListener('pointermove', move as EventListener);
        list.addEventListener('pointerenter', enter);
        list.addEventListener('pointerleave', leave);
        return () => {
          window.removeEventListener('scroll', onScroll);
          list.removeEventListener('pointermove', move as EventListener);
          list.removeEventListener('pointerenter', enter);
          list.removeEventListener('pointerleave', leave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Animación al cambiar de filtro
  useGSAP(
    () => {
      gsap.fromTo(
        '[data-row]',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.03, overwrite: 'auto' },
      );
    },
    { scope: root, dependencies: [filter, items], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={className}>
      {filters && (
        <FilterBar
          className="mb-10 sm:mb-14"
          dark={dark}
          value={filter}
          onChange={setFilter}
          options={[
            { slug: 'all', label: 'Todos', count: items.length },
            ...cats.map(([slug, label]) => ({
              slug,
              label,
              count: items.filter((i) => i.category === slug).length,
            })),
          ]}
        />
      )}

      <ol data-list>
        {shown.map((p, i) => (
          <li key={p.slug} data-row className="relative">
            <span aria-hidden="true" className={`block h-px w-full ${line}`} />
            <TransitionLink
              href={`/proyectos/${p.slug}`}
              data-cursor="ver"
              onPointerEnter={() => setHover(p)}
              onFocus={() => setHover(p)}
              className="group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-4 gap-y-1 py-5 transition-[padding,opacity] duration-500 ease-[var(--ease-out-expo)] hover:pl-3 sm:grid-cols-[4rem_minmax(0,1.4fr)_minmax(0,1fr)_5rem_2rem] sm:gap-x-6 sm:py-7"
            >
              <span className={`label tabular-nums ${muted}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="display group-hover:text-brand-bright text-[clamp(1.5rem,1rem+1.8vw,2.75rem)] leading-[1.05] tracking-[-0.03em] transition-colors duration-500">
                {p.title}
              </span>
              <span
                className={`col-start-2 col-end-4 text-[0.95rem] sm:col-start-auto sm:col-end-auto ${muted}`}
              >
                {p.location ?? p.categoryLabel}
              </span>
              <span className={`label hidden text-right tabular-nums sm:block ${muted}`}>
                {p.year ?? ''}
              </span>
              <span
                aria-hidden="true"
                className="hidden justify-self-end transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 sm:block"
              >
                →
              </span>
            </TransitionLink>
          </li>
        ))}
        <li>
          <span aria-hidden="true" className={`block h-px w-full ${line}`} />
        </li>
      </ol>

      {/* Vista previa flotante (solo desktop) */}
      <div
        ref={preview}
        aria-hidden="true"
        className="bg-ink-2 pointer-events-none fixed top-0 left-0 z-[70] hidden aspect-[4/3] w-[22rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] [@media(hover:hover)_and_(pointer:fine)]:block"
      >
        {hover && (
          <Image
            key={hover.slug}
            src={hover.thumb.src}
            alt=""
            fill
            sizes="22rem"
            placeholder="blur"
            blurDataURL={hover.thumb.blur}
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
