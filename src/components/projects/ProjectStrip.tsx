'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { gsap, useGSAP } from '@/lib/gsap';

// Solo esta vista usa Draggable + Inertia: se registran aquí para no cargarlos en el resto del sitio.
if (typeof window !== 'undefined') gsap.registerPlugin(Draggable, InertiaPlugin);
import { TransitionLink } from '../TransitionLink';
import type { IndexItem } from '../ProjectIndex';

/**
 * Tira horizontal arrastrable con inercia (GSAP Draggable + InertiaPlugin).
 * Funciona con mouse (arrastrar), trackpad (scroll horizontal) y touch.
 */
export function ProjectStrip({ items }: { items: IndexItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  useGSAP(
    () => {
      const el = track.current!;
      const box = wrap.current!;
      gsap.set(el, { x: 0 });
      const bar = box.parentElement!.querySelector<HTMLElement>('[data-bar]');
      const limit = () => Math.min(0, box.clientWidth - el.scrollWidth);
      const sync = () => {
        const min = limit();
        const p = min === 0 ? 0 : (gsap.getProperty(el, 'x') as number) / min;
        gsap.set(bar, { scaleX: Math.max(0.04, Math.min(1, 0.04 + p * 0.96)) });
      };

      const [drag] = Draggable.create(el, {
        type: 'x',
        bounds: box,
        inertia: true,
        edgeResistance: 0.85,
        dragClickable: true,
        allowContextMenu: true,
        onPress() {
          dragged.current = false;
          gsap.to(el, { scale: 0.995, duration: 0.4, overwrite: 'auto' });
        },
        onDrag() {
          if (Math.abs(this.x - this.startX) > 6) dragged.current = true;
          sync();
        },
        onThrowUpdate: sync,
        onRelease() {
          gsap.to(el, { scale: 1, duration: 0.6 });
          // Evita que el clic final de un arrastre abra el proyecto.
          window.setTimeout(() => (dragged.current = false), 60);
        },
      });

      // Trackpad: scroll horizontal mueve la tira con suavizado.
      const onWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        const next = gsap.utils.clamp(limit(), 0, (gsap.getProperty(el, 'x') as number) - e.deltaX);
        gsap.to(el, {
          x: next,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
          onUpdate: () => {
            drag.update();
            sync();
          },
        });
      };
      box.addEventListener('wheel', onWheel, { passive: false });

      const ro = new ResizeObserver(() => {
        drag.applyBounds(box);
        sync();
      });
      ro.observe(box);
      sync();

      return () => {
        box.removeEventListener('wheel', onWheel);
        ro.disconnect();
        drag.kill();
      };
    },
    { scope: wrap, dependencies: [items], revertOnUpdate: true },
  );

  return (
    <div>
      <div
        ref={wrap}
        data-cursor="arrastrar"
        className="relative -mx-[var(--gutter)] overflow-hidden px-[var(--gutter)]"
      >
        <div
          ref={track}
          className="flex w-max cursor-grab gap-4 pb-2 active:cursor-grabbing sm:gap-6"
        >
          {items.map((p, i) => (
            <TransitionLink
              key={p.slug}
              href={`/proyectos/${p.slug}`}
              data-cursor="arrastrar"
              draggable={false}
              onClick={(e) => {
                if (dragged.current) e.preventDefault();
              }}
              className="group block w-[min(72vw,22rem)] shrink-0 select-none sm:w-[24rem]"
            >
              <div className="bg-ink-2 relative aspect-[4/5] overflow-hidden">
                <Image
                  src={p.thumb.src}
                  alt={`${p.title}, proyecto de MD&C Arquitectos`}
                  fill
                  draggable={false}
                  sizes="(min-width: 640px) 24rem, 72vw"
                  placeholder="blur"
                  blurDataURL={p.thumb.blur}
                  className="pointer-events-none object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
                <span className="label text-bone absolute top-4 left-4 drop-shadow">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="t-lead max-w-[16ch] font-medium">{p.title}</h3>
                <span className="label text-stone mt-1 shrink-0 text-right">{p.year}</span>
              </div>
              <p className="text-stone mt-1 text-[0.95rem]">{p.location ?? p.categoryLabel}</p>
            </TransitionLink>
          ))}
        </div>
      </div>
      <div className="mt-8 flex items-center gap-5">
        <p className="label text-stone">Arrastra para ver más proyectos</p>
        <span className="bg-ink/15 relative block h-px flex-1">
          <span
            data-bar
            className="bg-ink absolute inset-0 origin-left"
            style={{ transform: 'scaleX(0.04)' }}
          />
        </span>
      </div>
    </div>
  );
}
