import path from 'node:path';
import type { NextConfig } from 'next';
import { legacyProjectRedirects } from './src/content/redirects';

const SITE = 'https://mdc-arquitectos.com';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // CSS crítico en línea: elimina la petición de hoja de estilos que bloquea el primer pintado.
  experimental: { inlineCss: true },
  // Hay otro package-lock.json más arriba en el disco; fija la raíz de este proyecto.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ['image/avif', 'image/webp'],
    // 50 para fondos oscurecidos (hero de páginas internas), 75 para el resto.
    qualities: [50, 75],
    deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920, 2400],
    // Las fotos son estáticas: se cachean en el optimizador durante 30 días.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async redirects() {
    const permanent = true;
    return [
      // Dominio anterior (sin guion) → dominio nuevo. Solo actúa si ese dominio apunta a este proyecto.
      {
        source: '/:path*',
        has: [{ type: 'host', value: '(www\\.)?mdcarquitectos\\.com' }],
        destination: `${SITE}/:path*`,
        permanent,
      },
      // Sitio anterior (CodeIgniter, 2021) → rutas nuevas
      { source: '/nosotros', destination: '/estudio', permanent },
      { source: '/clientes', destination: '/estudio#marcas', permanent },
      { source: '/portafolio', destination: '/proyectos', permanent },
      {
        source: '/portafolio/arquitectura-retail',
        destination: '/proyectos?categoria=retail',
        permanent,
      },
      {
        source: '/portafolio/arquitectura-corporativa',
        destination: '/proyectos?categoria=corporativa',
        permanent,
      },
      {
        source: '/portafolio/arquitectura-gastronomica',
        destination: '/proyectos?categoria=gastronomica',
        permanent,
      },
      ...legacyProjectRedirects.map((r) => ({ ...r, permanent })),
      // Proyectos que ya no se publican y cualquier otra ruta de portafolio
      { source: '/portafolio/:path*', destination: '/proyectos', permanent },
      // Subservicios: ahora son bloques de la página de cada línea
      { source: '/servicios/:linea/:subservicio', destination: '/servicios/:linea', permanent },
      // Blog y módulos retirados
      { source: '/arqnews', destination: '/proyectos', permanent },
      { source: '/arqnews/:path*', destination: '/proyectos', permanent },
      { source: '/tienda/:path*', destination: '/', permanent },
      { source: '/admin/:path*', destination: '/', permanent },
    ];
  },

  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
    ];
    const staticCache = [
      { key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' },
    ];
    return [
      { source: '/:path*', headers: security },
      { source: '/images/:path*', headers: staticCache },
      { source: '/brand/:path*', headers: staticCache },
      { source: '/icons/:path*', headers: staticCache },
      { source: '/docs/:path*', headers: staticCache },
    ];
  },
};

export default nextConfig;
