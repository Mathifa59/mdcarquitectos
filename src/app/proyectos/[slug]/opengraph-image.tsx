import { heroPhoto } from '@/content/images';
import { categoryLabel, projectBySlug, projects } from '@/content/projects';
import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'Proyecto de arquitectura de MD&C Arquitectos';
export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug)!;
  return renderOg({
    title: p.title,
    label: `${categoryLabel(p.category)} · ${p.office ?? 'MD&C Arquitectos'}`,
    photo: heroPhoto(slug)?.src,
    meta: [p.location, p.year].filter(Boolean).join(' · '),
  });
}
