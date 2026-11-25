import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'MD&C',
    description: 'Estudio de arquitectura comercial en Lima: retail, corporativa y gastronómica.',
    lang: 'es-PE',
    start_url: '/',
    display: 'standalone',
    background_color: '#F3F1EC',
    theme_color: '#990101',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
