import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';
import { site, whatsappUrl } from '@/content/site';
import { slogan } from '@/content/studio';

// Página para el código QR: no se indexa ni aparece en el sitemap.
export const metadata: Metadata = {
  title: 'Enlaces',
  description: `Todos los enlaces de ${site.name}: sitio web, redes sociales, WhatsApp y correo.`,
  alternates: { canonical: '/enlaces' },
  robots: { index: false, follow: false },
};

type Link = { label: string; hint: string; href: string; external?: boolean };

const links: Link[] = [
  { label: 'Sitio web', hint: 'mdc-arquitectos.com', href: site.url, external: true },
  ...site.social.map((s) => ({
    label: s.label,
    hint: `Síguenos en ${s.label}`,
    href: s.href,
    external: true,
  })),
  ...Object.values(site.contacts).map((c) => ({
    label: `WhatsApp · ${c.label}`,
    hint: c.phone.display,
    href: whatsappUrl(undefined, c.phone.number),
    external: true,
  })),
  { label: 'Correo', hint: site.email, href: `mailto:${site.email}` },
];

/** Página tipo "link in bio": se muestra a pantalla completa sobre el cabezal y el pie del sitio. */
export default function EnlacesPage() {
  return (
    <div
      data-theme="dark"
      className="bg-ink text-bone fixed inset-0 z-[200] overflow-y-auto overscroll-contain"
    >
      <main className="mx-auto flex min-h-full w-full max-w-md flex-col items-center px-6 py-12 sm:py-16">
        <div className="w-40">
          <Logo tone="onDark" />
        </div>
        <h1 className="sr-only">{site.name}: enlaces</h1>
        <p className="text-bone/75 mt-6 max-w-[26ch] text-center leading-snug">{slogan}</p>

        <ul className="mt-10 flex w-full flex-col gap-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="border-bone/25 hover:bg-bone hover:text-ink focus-visible:bg-bone focus-visible:text-ink group flex items-center justify-between gap-4 rounded-full border px-6 py-4 transition-colors duration-300"
              >
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] leading-tight font-semibold">
                    {l.label}
                  </span>
                  <span className="text-bone/60 group-hover:text-ink/60 group-focus-visible:text-ink/60 block truncate text-[0.8125rem]">
                    {l.hint}
                  </span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-lg">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="text-bone/45 mt-auto pt-12 text-center text-[0.75rem]">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </main>
    </div>
  );
}
