import type { Metadata } from 'next';
import { site } from '@/content/site';
import { jose, mariyoli } from '@/content/team';

export const absoluteUrl = (path = '/') => `${site.url}${path.startsWith('/') ? path : `/${path}`}`;

/** Datos estructurados de la empresa (Organization + LocalBusiness) con WhatsApp y dirección. */
export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: absoluteUrl('/icons/icon-512.png'),
  image: absoluteUrl('/opengraph-image'),
  slogan: 'Ideas que construyen espacios extraordinarios.',
  description:
    'Estudio de arquitectura comercial con sede en Lima: retail, corporativa, gastronómica y desarrollo inmobiliario. Presencia en Perú, Colombia, Bolivia y Venezuela.',
  telephone: `+${site.whatsapp.number}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: 'Santiago de Surco',
    addressRegion: 'Lima',
    addressCountry: 'PE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: site.address.geo.lat,
    longitude: site.address.geo.lon,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: `+${site.whatsapp.number}`,
      url: `https://wa.me/${site.whatsapp.number}`,
      availableLanguage: ['es'],
    },
  ],
  areaServed: ['PE', 'CO', 'BO', 'VE'].map((c) => ({ '@type': 'Country', name: c })),
  founder: [mariyoli, jose].map((m) => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    url: absoluteUrl(`/estudio/${m.slug}`),
  })),
  knowsAbout: [
    'Arquitectura comercial',
    'Retail',
    'Arquitectura corporativa',
    'Arquitectura gastronómica',
    'Desarrollo inmobiliario',
  ],
});

/** Migas de pan para resultados enriquecidos. */
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const jsonLd = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, '\\u003c'),
});

/** Metadatos de página completos: título, descripción, canonical, Open Graph y Twitter (con url y título propios). */
export function pageMeta({
  title,
  description,
  path,
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article' | 'profile';
}): Metadata {
  const full = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: absoluteUrl(path),
      type,
      locale: 'es_PE',
      siteName: site.name,
    },
    twitter: { card: 'summary_large_image', title: full, description },
  };
}
