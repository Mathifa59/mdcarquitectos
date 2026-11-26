import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroDual, type HeroCard } from '@/components/home/HeroDual';
import { StudioIntro } from '@/components/home/StudioIntro';
import { BusinessAreas } from '@/components/home/BusinessAreas';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { Leadership } from '@/components/home/Leadership';
import { clientsPage, heroPair, homeFeaturedSlugs } from '@/content/home';
import { heroPhoto, photo } from '@/content/images';
import { categoryLabel, projectBySlug } from '@/content/projects';
import { jose, mariyoli, renato } from '@/content/team';
import { projectMeta } from '@/lib/format';

const BrandMarquee = dynamic(() =>
  import('@/components/home/BrandMarquee').then((m) => m.BrandMarquee),
);
const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

const alt = (title: string, location?: string) =>
  `${title}, proyecto de MD&C Arquitectos${location ? ` en ${location}` : ''}`;

export const metadata: Metadata = {
  title: {
    absolute: 'MD&C Arquitectos | Arquitectura comercial y desarrollo inmobiliario en Lima',
  },
  alternates: { canonical: '/' },
  description:
    'Firma de arquitectura, consultoría y construcción. Proyectos comerciales, corporativos, residenciales e inmobiliarios desde el concepto hasta la entrega.',
};

export default function Home() {
  const cards: HeroCard[] = heroPair.map(({ area, slug, photoKey }) => {
    const p = projectBySlug(slug)!;
    const ph = heroPhoto(photoKey)!;
    return {
      area,
      title: p.title,
      caption: [p.location?.split(', ').pop(), p.year].filter(Boolean).join(' · '),
      href: `/proyectos/${slug}`,
      src: ph.src,
      blur: ph.blur,
      alt: alt(p.title, p.location),
    };
  });

  const featured = homeFeaturedSlugs.map((slug) => {
    const p = projectBySlug(slug)!;
    const ph = heroPhoto(slug)!;
    return {
      slug,
      title: p.title,
      meta: projectMeta(p, categoryLabel(p.category)),
      src: ph.src,
      blur: ph.blur,
      alt: alt(p.title, p.location),
    };
  });

  const photos = Object.fromEntries(
    [mariyoli, jose, renato].map((m) => {
      const ph = m.photo ? photo(m.photo) : undefined;
      return [m.slug, ph && { src: ph.src, blur: ph.blur }];
    }),
  );

  const clientNames = clientsPage.groups.flatMap((g) => [...g.names]);

  return (
    <>
      <HeroDual cards={cards} />
      <StudioIntro />
      <BusinessAreas />
      <FeaturedGrid items={featured} />
      <Leadership founders={[mariyoli, jose]} team={[renato]} photos={photos} />
      <BrandMarquee brands={clientNames} />
      <Closing />
    </>
  );
}
