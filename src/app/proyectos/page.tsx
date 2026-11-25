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
    'Portafolio de proyectos de arquitectura retail, corporativa, gastronómica, residencial y educativa de MD&C Arquitectos y Canales Arquitectos.',
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
    };
  });

  return (
    <>
      <section className="bg-bone pt-[calc(var(--header-h)+clamp(4rem,10vw,9rem))] pb-[clamp(5rem,10vw,9rem)]">
        <div className="shell">
          <p className="label text-stone">03 / Portafolio</p>
          <div className="grid-12 mt-6 items-end gap-y-6">
            <h1 className="display t-h1 col-span-12 lg:col-span-9">
              <WordReveal as="span" className="block">
                Proyectos
              </WordReveal>
            </h1>
            <p className="label text-stone col-span-12 lg:col-span-3 lg:text-right">
              {String(items.length).padStart(2, '0')} proyectos
              <br />
              Retail · Corporativa · Gastronómica
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
