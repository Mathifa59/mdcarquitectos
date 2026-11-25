import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { Rule } from '@/components/Rule';
import { SplitReveal } from '@/components/SplitReveal';
import { TransitionLink } from '@/components/TransitionLink';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { photo } from '@/content/images';
import { categoryLabel, projectBySlug, sortedProjects } from '@/content/projects';
import { serviceBySlug, services } from '@/content/services';
import { site } from '@/content/site';
import { breadcrumbLd, jsonLd as ld, pageMeta } from '@/lib/seo';

const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return pageMeta({
    title: s.title,
    description: s.intro.split('. ')[0] + '.',
    path: `/servicios/${slug}`,
  });
}

export default async function ServicioPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();

  const cover = photo(s.cover.project, s.cover.index)!;
  const coverProject = projectBySlug(s.cover.project)!;
  const idx = services.findIndex((x) => x.slug === slug);
  const next = services[(idx + 1) % services.length];

  const related = sortedProjects
    .filter((p) => p.category === s.category && !p.office)
    .slice(0, 6)
    .map((p) => {
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.intro,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: ['PE', 'CO', 'BO', 'VE'],
    url: `${site.url}/servicios/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ld(
          breadcrumbLd([
            { name: 'Inicio', path: '/' },
            { name: 'Servicios', path: '/servicios' },
            { name: s.title, path: `/servicios/${slug}` },
          ]),
        )}
      />
      <PageHero
        label={`02 / Servicios · ${s.label}`}
        title={s.title}
        image={{
          src: cover.src,
          blur: cover.blur,
          alt: `${coverProject.title}, proyecto de MD&C Arquitectos`,
        }}
      />

      <section className="bg-bone py-[clamp(6rem,12vw,10rem)]">
        <div className="shell grid-12 gap-y-10">
          <p className="label text-stone col-span-12 lg:col-span-3">La línea</p>
          <p className="t-lead col-span-12 max-w-[34ch] lg:col-span-8 lg:col-start-5">
            <SplitReveal as="span" className="block">
              {s.intro}
            </SplitReveal>
          </p>
        </div>
      </section>

      <section className="bg-bone pb-[clamp(6rem,12vw,10rem)]" aria-label="Subservicios">
        <div className="shell">
          {s.subservices.map((sub, i) => (
            <div key={sub.id} className="relative">
              <Rule />
              <div className="grid-12 gap-y-6 py-12 sm:py-16">
                <p className="label text-stone col-span-2 pt-3 lg:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="display col-span-10 text-[clamp(2rem,1.2rem+3.2vw,4.5rem)] lg:col-span-5">
                  {sub.title}
                </h2>
                <p className="text-ink/80 col-span-12 max-w-[52ch] text-[1.0625rem] leading-relaxed lg:col-span-5 lg:col-start-8 lg:pt-3">
                  {sub.text}
                </p>
              </div>
            </div>
          ))}
          <Rule />
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-bone-2 py-[clamp(5rem,10vw,9rem)]">
          <div className="shell">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
              <h2 className="display t-h3 max-w-[16ch]">Proyectos de esta línea</h2>
              <TransitionLink
                href={`/proyectos?categoria=${s.category}`}
                data-cursor="link"
                className="label link-draw pb-1"
              >
                Ver todos →
              </TransitionLink>
            </div>
            <ProjectGrid items={related} />
          </div>
        </section>
      )}

      <section data-header-theme="dark" className="bg-ink text-bone py-[clamp(4rem,8vw,7rem)]">
        <div className="shell">
          <p className="label text-bone/60">Siguiente línea</p>
          <TransitionLink
            href={`/servicios/${next.slug}`}
            data-cursor="ver"
            className="display link-draw mt-4 inline-block text-[clamp(2.25rem,1.2rem+4.4vw,6rem)]"
          >
            {next.title} →
          </TransitionLink>
        </div>
      </section>
      <Closing />
    </>
  );
}
