import type { Metadata, Viewport } from 'next';
import { Inter_Tight, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { jsonLd, organizationLd } from '@/lib/seo';
import { UIProvider } from '@/components/UIProvider';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Header } from '@/components/Header';
import { MenuOverlay } from '@/components/MenuOverlay';
import { LazyCursor } from '@/components/LazyCursor';
import { heroPhoto, photo } from '@/content/images';
import { Footer } from '@/components/Footer';
import { Preloader } from '@/components/Preloader';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Arquitectura comercial en Lima`,
    template: `%s | ${site.name}`,
  },
  description:
    'Estudio limeño de arquitectura comercial: retail, corporativa y gastronómica. Más de 30 años creando espacios para experiencias únicas en Perú, Colombia, Bolivia y Venezuela.',
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  keywords: [
    'arquitectura comercial',
    'arquitectura retail',
    'arquitectura corporativa',
    'arquitectura gastronómica',
    'diseño de tiendas',
    'estudio de arquitectura Lima',
    'MD&C Arquitectos',
  ],
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: site.name,
    url: site.url,
    title: `${site.name} | Arquitectura comercial en Lima`,
    description:
      'Ideas que construyen espacios extraordinarios. Arquitectura retail, corporativa y gastronómica.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Arquitectura comercial en Lima`,
    description:
      'Ideas que construyen espacios extraordinarios. Arquitectura retail, corporativa y gastronómica.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F3F1EC',
  width: 'device-width',
  initialScale: 1,
};

const pv = (p: ReturnType<typeof photo>, alt: string) => ({ src: p!.src, blur: p!.blur, alt });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca la primera visita del home antes de pintar, para que el preloader no parpadee. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(location.pathname==='/'&&!sessionStorage.getItem('mdc-pre'))document.documentElement.setAttribute('data-preload','1')}catch(e){}",
          }}
        />
        <noscript>
          <style>{'.split-init{opacity:1!important}.preloader{display:none!important}'}</style>
        </noscript>
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationLd())} />
        <UIProvider>
          <SmoothScroll />
          <a
            href="#site-main"
            className="label bg-ink text-bone fixed top-4 left-4 z-[400] -translate-y-20 rounded px-4 py-3 focus:translate-y-0"
          >
            Saltar al contenido
          </a>
          <Header />
          <MenuOverlay
            previews={[
              pv(heroPhoto('topitop-mega-plaza'), 'Tienda Topitop en Mega Plaza'),
              pv(
                heroPhoto('indian-chic-real-plaza-puruchuco'),
                'Tienda Indian Chic en Real Plaza Puruchuco',
              ),
              pv(photo('team/mariyoli-delgado'), 'Mariyoli Delgado de Rivero'),
              pv(photo('oficinas-porta'), 'Oficinas Porta'),
            ]}
          />
          <main id="site-main">{children}</main>
          <Footer />
          <Preloader />
          <WhatsAppButton />
          <LazyCursor />
        </UIProvider>
      </body>
    </html>
  );
}
