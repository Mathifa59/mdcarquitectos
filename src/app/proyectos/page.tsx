import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProjectsBrowser } from '@/components/projects/ProjectsBrowser';
import { WordReveal } from '@/components/WordReveal';
import { photo } from '@/content/images';
import { categories, categoryLabel, sortedProjects } from '@/content/projects';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Proyectos de arquitectura',
  path: '/proyectos',
  description:
    'Selección de nuestra trayectoria en arquitectura comercial, inmobiliaria, corporativa, residencial e institucional de MD&C Arquitectos y Canales Arquitectos.',
});

export default function ProyectosPage() {
  const items = sortedProjects.map((p) => {
    const ph = photo(p.slug)!;
    return {
      slug: p.slug,
      title: p.title,
      location: p.location,
      year: p.year,
      category: p.category,
      categoryLabel: categoryLabel(p.category),
      thumb: { src: ph.src, blur: ph.blur },
      studio: p.office ? 'canales' : 'mdc',
    };
  });

  return (
    <>
      <section className="bg-bone pt-[calc(var(--header-h)+clamp(4rem,10vw,9rem))] pb-[clamp(5rem,10vw,9rem)]">
        <div className="shell">
          <p className="label text-stone">03 / Portafolio</p>
          <div className="grid-12 mt-6 items-end gap-y-6">
            <h1 className="display t-h1 col-span-12 max-w-[18ch] lg:col-span-9">
              <WordReveal as="span" className="block">
                Proyectos que construyen valor.
              </WordReveal>
            </h1>
            <p className="text-stone col-span-12 max-w-[44ch] lg:col-span-3 lg:justify-self-end">
              Conozca una selección de nuestra trayectoria en arquitectura comercial, inmobiliaria,
              corporativa, residencial e institucional.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-bone pb-[clamp(6rem,12vw,10rem)]">
        <div className="shell">
          <Suspense fallback={<div className="min-h-[60svh]" />}>
            <ProjectsBrowser
              items={items}
              categories={categories.map((c) => ({ slug: c.slug, label: c.label }))}
            />
          </Suspense>
        </div>
      </section>
    </>
  );
}
