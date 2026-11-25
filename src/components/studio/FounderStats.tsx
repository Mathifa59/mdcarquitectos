'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { Rule } from '../Rule';

type Stat = { value: number | string; prefix?: string; label: string };

const fmt = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** Cifras del fundador: los números cuentan al entrar en pantalla; el texto (p. ej. un periodo) se muestra tal cual. */
export function FounderStats({ stats }: { stats: Stat[] }) {
  const root = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const o = { v: 0 };
        el.textContent = '0';
        gsap.to(o, {
          v: end,
          duration: end > 1000 ? 2.2 : 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = fmt(o.v);
          },
          scrollTrigger: { trigger: el, start: 'top 92%', once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <dl ref={root} className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-5">
      {stats.map((s, i) => (
        <div key={s.label}>
          <Rule className="bg-bone/25" delay={i * 0.08} />
          <dd className="display mt-5 text-[clamp(1.9rem,0.9rem+3.6vw,4.25rem)] tabular-nums">
            {typeof s.value === 'number' ? (
              <>
                {s.prefix}
                <span data-count={s.value}>{fmt(s.value)}</span>
              </>
            ) : (
              s.value
            )}
          </dd>
          <dt className="label text-bone/65 mt-3 max-w-[22ch]">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
