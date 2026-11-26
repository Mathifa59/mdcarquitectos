import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Hero, type HeroSlide } from '@/components/home/Hero';
import { Intro } from '@/components/home/Intro';
import { FeaturedStrip } from '@/components/home/FeaturedStrip';
import { MariyoliBlock } from '@/components/home/MariyoliBlock';
import { TransitionLink } from '@/components/TransitionLink';
import { SplitReveal } from '@/components/SplitReveal';
import { brands } from '@/content/brands';
import { heroPhoto, photo } from '@/content/images';
import { categoryLabel, featuredProjects, projectBySlug, sortedProjects } from '@/content/projects';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { mariyoli, mariyoliHeadline, mariyoliPurpose } from '@/content/team';

// Secciones pesadas o bajo el pliegue: se cargan en diferido.
const ServicesSection = dynamic(() =>
  import('@/components/home/ServicesSection').then((m) => m.ServicesSection),
);
const Stats = dynamic(() => import('@/components/home/Stats').then((m) => m.Stats));
const BrandMarquee = dynamic(() =>
  import('@/components/home/BrandMarquee').then((m) => m.BrandMarquee),
);
const ProjectIndex = dynamic(() => import('@/components/ProjectIndex').then((m) => m.ProjectIndex));
const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

const alt = (title: string, location?: string) =>
  `${title}, proyecto de MD&C Arquitectos${location ? ` en ${location}` : ''}`;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  description:
    'MD&C Arquitectos: ideas que construyen espacios extraordinarios. Arquitectura comercial, retail, corporativa y gastronómica en Lima, con presencia en Perú, Colombia, Bolivia y Venezuela.',
};

export default function Home() {
  // Fotos de portada (generadas con scripts/build-hero.mjs): fachadas y locales simples y reconocibles.
  const heroSlides = [
    { key: 'indian-puruchuco', slug: 'indian-chic-real-plaza-puruchuco' },
    { key: 'porta-freedom', slug: 'porta-freedom' },
    { key: 'indian-santa-anita', slug: 'indian-chic-mall-aventura-santa-anita' },
    { key: 'explorer', slug: 'explorer' },
  ];
  const slides: HeroSlide[] = heroSlides.map(({ key, slug }) => {
    const p = projectBySlug(slug)!;
    const ph = heroPhoto(`hero/${key}`)!;
    return {
      src: ph.src,
      blur: ph.blur,
      alt: alt(p.title, p.location),
      caption: p.title,
      href: `/proyectos/${slug}`,
    };
  });

  const featured = featuredProjects.map((p) => {
    const ph = photo(p.slug)!;
    return {
      slug: p.slug,
      title: p.title,
      meta: [p.year, categoryLabel(p.category)].filter(Boolean).join(' · '),
      src: ph.src,
      blur: ph.blur,
      alt: alt(p.title, p.location),
    };
  });

  const serviceItems = services.map((s) => {
    const ph = photo(s.cover.project, s.cover.index)!;
    const p = projectBySlug(s.cover.project)!;
    return {
      slug: s.slug,
      title: s.title,
      label: s.label,
      intro: s.intro.split('. ')[0] + '.',
      subservices: s.subservices.map((x) => x.short),
      src: ph.src,
      blur: ph.blur,
      alt: alt(p.title, p.location),
    };
  });

  const indexItems = sortedProjects.slice(0, 12).map((p) => {
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

  const portrait = photo('team/mariyoli-delgado')!;

  return (
    <>
      <Hero slides={slides} />
      <Intro />
      <FeaturedStrip items={featured} />
      <ServicesSection items={serviceItems} />
      <Stats stats={site.stats.map((s) => ({ ...s }))} countries={[...site.countries]} />
      <MariyoliBlock
        name={mariyoli.name}
        headline={mariyoliHeadline.split(' / ')[0]}
        purpose={mariyoliPurpose.replace(/\.$/, '')}
        photo={{ src: portrait.src, blur: portrait.blur }}
        cv={mariyoli.cv!}
      />
      <BrandMarquee brands={brands} />
      <section className="bg-bone py-[clamp(6rem,12vw,10rem)]">
        <div className="shell">
          <div className="grid-12 mb-12 items-end gap-y-6 sm:mb-16">
            <p className="label text-stone col-span-12 lg:col-span-3">Índice de proyectos</p>
            <h2 className="display t-h2 col-span-12 max-w-[12ch] lg:col-span-9">
              <SplitReveal as="span" className="block">
                Cada proyecto, una historia de marca
              </SplitReveal>
            </h2>
          </div>
          <ProjectIndex items={indexItems} />
          <TransitionLink
            href="/proyectos"
            data-cursor="link"
            className="label link-draw mt-10 inline-block pb-1"
          >
            Ver los {sortedProjects.length} proyectos →
          </TransitionLink>
        </div>
      </section>
      <Closing />
    </>
  );
}
