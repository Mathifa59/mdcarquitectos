'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { Rule } from '../Rule';

export type Stat = { value: number; prefix?: string; label: string };

// Separador de miles con espacio fino (formato del brief: +160 000)
const fmt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Cifras oficiales con contadores animados al entrar en pantalla. */
export function Stats({ stats, countries }: { stats: Stat[]; countries: string[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        if (reduced) {
          el.textContent = fmt(end);
          return;
        }
        const o = { v: 0 };
        el.textContent = '0';
        gsap.to(o, {
          v: end,
          duration: end > 1000 ? 2.4 : 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = fmt(o.v);
          },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-header-theme="dark"
      className="bg-ink text-bone py-[clamp(6rem,12vw,10rem)]"
    >
      <div className="shell">
        <p className="label text-bone/60 mb-12 sm:mb-16">04 / En cifras</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="relative">
              <Rule className="bg-bone/25" delay={i * 0.1} />
              <dd className="display mt-6 text-[clamp(2rem,1rem+5vw,4.5rem)] tabular-nums lg:text-[clamp(2.25rem,0.8rem+3.3vw,6rem)]">
                {s.prefix}
                <span data-count={s.value}>{fmt(s.value)}</span>
              </dd>
              <dt className="label text-bone/60 mt-3">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="label text-bone/60 mt-16 sm:mt-24">Presencia en {countries.join(' · ')}</p>
      </div>
    </section>
  );
}
