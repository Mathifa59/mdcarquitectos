'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { FilterBar } from '../FilterBar';
import { ProjectIndex, type IndexItem } from '../ProjectIndex';
import { ProjectGrid } from './ProjectGrid';
const ProjectStrip = dynamic(() => import('./ProjectStrip').then((m) => m.ProjectStrip), {
  ssr: false,
});

type View = 'indice' | 'tira' | 'grilla';
const VIEWS: { id: View; label: string }[] = [
  { id: 'indice', label: 'Índice' },
  { id: 'tira', label: 'Tira' },
  { id: 'grilla', label: 'Grilla' },
];

/** Filtros por categoría + tres vistas (índice numerado, tira arrastrable, grilla). */
export function ProjectsBrowser({
  items,
  categories,
}: {
  items: IndexItem[];
  categories: { slug: string; label: string }[];
}) {
  const params = useSearchParams();
  // Admite enlaces como /proyectos?categoria=retail&vista=grilla (redirecciones del sitio anterior).
  const [filter, setFilter] = useState(() => {
    const c = params.get('categoria');
    return c && categories.some((x) => x.slug === c) ? c : 'all';
  });
  const [view, setView] = useState<View>(() => {
    const v = params.get('vista');
    return v === 'tira' || v === 'grilla' ? v : 'indice';
  });

  const update = (f: string, v: View) => {
    const p = new URLSearchParams(window.location.search);
    if (f === 'all') p.delete('categoria');
    else p.set('categoria', f);
    if (v === 'indice') p.delete('vista');
    else p.set('vista', v);
    const q = p.toString();
    window.history.replaceState(null, '', q ? `?${q}` : window.location.pathname);
  };

  const shown = useMemo(
    () => (filter === 'all' ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6 sm:mb-14">
        <FilterBar
          value={filter}
          onChange={(f) => {
            setFilter(f);
            update(f, view);
          }}
          options={[
            { slug: 'all', label: 'Todos', count: items.length },
            ...categories.map((c) => ({
              slug: c.slug,
              label: c.label,
              count: items.filter((i) => i.category === c.slug).length,
            })),
          ]}
        />
        <div
          role="group"
          aria-label="Vista"
          className="border-ink/20 flex items-center gap-1 rounded-full border p-1"
        >
          {VIEWS.map((v) => (
            <button
              key={v.id}
              aria-pressed={view === v.id}
              data-cursor="link"
              onClick={() => {
                setView(v.id);
                update(filter, v.id);
              }}
              className={`label rounded-full px-4 py-2.5 transition-colors duration-500 ${view === v.id ? 'bg-ink text-bone' : 'hover:text-brand'}`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 && <p className="text-stone">No hay proyectos en esta categoría.</p>}
      {view === 'indice' && <ProjectIndex items={shown} />}
      {view === 'tira' && <ProjectStrip items={shown} />}
      {view === 'grilla' && <ProjectGrid items={shown} />}
    </div>
  );
}
