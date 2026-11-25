import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/PageHero';
import { ServicesSection } from '@/components/home/ServicesSection';
import { heroPhoto, photo } from '@/content/images';
import { projectBySlug } from '@/content/projects';
import { services } from '@/content/services';
import { pageMeta } from '@/lib/seo';

const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

export const metadata: Metadata = pageMeta({
  title: 'Servicios de arquitectura comercial',
  path: '/servicios',
  description:
    'Diseño y conceptualización, Look & Feel, implementación, gerencia de proyectos y remodelación para tiendas, oficinas y restaurantes. Entrega llave en mano.',
});

export default function ServiciosPage() {
  const hero = heroPhoto('topitop-mega-plaza')!;
  const items = services.map((s) => {
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
      alt: `${p.title}, proyecto de MD&C Arquitectos`,
    };
  });

  return (
    <>
      <PageHero
        label="02 / Servicios"
        title="Servicios"
        lead="De la conceptualización a la entrega llave en mano."
        image={{
          src: hero.src,
          blur: hero.blur,
          alt: 'Tienda Topitop en Mega Plaza, proyecto de MD&C Arquitectos',
        }}
      />
      <ServicesSection items={items} heading={false} />
      <Closing />
    </>
  );
}
