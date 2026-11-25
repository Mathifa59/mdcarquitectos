import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextProject } from '@/components/projects/NextProject';
import { ProjectFacts } from '@/components/projects/ProjectFacts';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectIndex } from '@/components/ProjectIndex';
import { SplitReveal } from '@/components/SplitReveal';
import { heroPhoto, photo, photos } from '@/content/images';
import {
  categoryLabel,
  categoryPhrase,
  nextProject,
  projectBySlug,
  projects,
  sortedProjects,
} from '@/content/projects';
import { site } from '@/content/site';
import { buildBlocks } from '@/lib/gallery';
import { breadcrumbLd, jsonLd as ld, pageMeta } from '@/lib/seo';

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  const where = p.location ? ` en ${p.location}` : '';
  const description = `${p.title}: proyecto de ${categoryPhrase(p.category)}${where}${p.year ? ` (${p.year})` : ''} por ${p.office ?? 'MD&C Arquitectos'}.`;
  return pageMeta({ title: p.title, description, path: `/proyectos/${slug}`, type: 'article' });
}

export default async function ProyectoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const list = photos(slug);
  const heroP = heroPhoto(slug)!;
  const heroIdx = Math.max(0, list.indexOf(heroP));
  const immersive = heroP.hero;
  const label = categoryLabel(project.category);
  const alt = (i: number) => `Vista ${i + 1} de ${project.title}, proyecto de MD&C Arquitectos`;

  const blocks = buildBlocks(list, heroIdx);
  const all = list.map((p, i) => ({ src: p.src, blur: p.blur, alt: alt(i) }));

  const next = nextProject(slug);
  const nextPhoto = heroPhoto(next.slug)!;

  const indexItems = sortedProjects.map((p) => {
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
    '@type': 'CreativeWork',
    name: project.title,
    url: `${site.url}/proyectos/${slug}`,
    image: list.slice(0, 3).map((p) => `${site.url}${p.src}`),
    creator: { '@type': 'Organization', name: site.name, url: site.url },
    ...(project.year ? { dateCreated: project.year.slice(0, 4) } : {}),
    ...(project.location ? { locationCreated: { '@type': 'Place', name: project.location } } : {}),
    genre: categoryPhrase(project.category),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ld(
          breadcrumbLd([
            { name: 'Inicio', path: '/' },
            { name: 'Proyectos', path: '/proyectos' },
            { name: project.title, path: `/proyectos/${slug}` },
          ]),
        )}
      />
      <ProjectHero
        title={project.title}
        categoryLabel={label}
        location={project.location}
        year={project.year}
        photo={{ src: heroP.src, blur: heroP.blur, alt: alt(heroIdx) }}
        immersive={immersive}
      />
      <ProjectFacts
        project={project}
        categoryLabel={label}
        phrase={categoryPhrase(project.category)}
      />
      {blocks.length > 0 && <ProjectGallery blocks={blocks} all={all} title={project.title} />}
      <NextProject
        slug={next.slug}
        title={next.title}
        meta={[categoryLabel(next.category), next.location, next.year].filter(Boolean).join(' · ')}
        photo={{
          src: nextPhoto.src,
          blur: nextPhoto.blur,
          alt: `${next.title}, proyecto de MD&C Arquitectos`,
        }}
        full={nextPhoto.hero}
      />
      <section className="bg-bone py-[clamp(6rem,12vw,10rem)]">
        <div className="shell">
          <div className="grid-12 mb-12 items-end gap-y-6 sm:mb-16">
            <p className="label text-stone col-span-12 lg:col-span-3">Seguir navegando</p>
            <h2 className="display t-h2 col-span-12 max-w-[12ch] lg:col-span-9">
              <SplitReveal as="span" className="block">
                Más proyectos
              </SplitReveal>
            </h2>
          </div>
          <ProjectIndex items={indexItems} filters />
        </div>
      </section>
    </>
  );
}
