import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { profileTeam } from '@/content/team';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly',
  ) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page('/', 1, 'weekly'),
    page('/proyectos', 0.9, 'weekly'),
    ...projects.map((p) => page(`/proyectos/${p.slug}`, 0.7)),
    page('/servicios', 0.8),
    ...services.map((s) => page(`/servicios/${s.slug}`, 0.8)),
    page('/estudio', 0.8),
    ...profileTeam.map((m) => page(`/estudio/${m.slug}`, 0.6)),
    page('/contacto', 0.8, 'yearly'),
    page('/privacidad', 0.3, 'yearly'),
  ];
}
