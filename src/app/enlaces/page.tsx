import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { site, whatsappUrl } from '@/content/site';
import { slogan } from '@/content/studio';

// Página para el código QR: no se indexa ni aparece en el sitemap.
export const metadata: Metadata = {
  title: 'Enlaces',
  description: `Todos los enlaces de ${site.name}: sitio web, redes sociales, WhatsApp y correo.`,
  alternates: { canonical: '/enlaces' },
  robots: { index: false, follow: false },
};

type IconName = 'web' | 'instagram' | 'facebook' | 'linkedin' | 'whatsapp' | 'mail';
type Link = { label: string; hint: string; href: string; icon: IconName; external?: boolean };

const socialIcon = (label: string): IconName => {
  const l = label.toLowerCase();
  return l.includes('instagram') ? 'instagram' : l.includes('facebook') ? 'facebook' : 'linkedin';
};

const links: Link[] = [
  { label: 'Sitio web', hint: 'mdc-arquitectos.com', href: site.url, icon: 'web', external: true },
  ...site.social.map((s) => ({
    label: s.label,
    hint: `Síguenos en ${s.label}`,
    href: s.href,
    icon: socialIcon(s.label),
    external: true,
  })),
  ...Object.values(site.contacts).map((c) => ({
    label: `WhatsApp · ${c.label}`,
    hint: c.phone.display,
    href: whatsappUrl(undefined, c.phone.number),
    icon: 'whatsapp' as const,
    external: true,
  })),
  { label: 'Correo', hint: site.email, href: `mailto:${site.email}`, icon: 'mail' },
];

/** Iconos de trazo (24×24); WhatsApp usa el relleno oficial del sitio. */
function Icon({ name }: { name: IconName }) {
  if (name === 'whatsapp') return <WhatsAppIcon className="size-5" />;
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'web' && (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </>
      )}
      {name === 'instagram' && (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <path d="M17.5 6.5h.01" />
        </>
      )}
      {name === 'facebook' && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      )}
      {name === 'linkedin' && (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      )}
      {name === 'mail' && (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </>
      )}
    </svg>
  );
}

/** Página tipo "link in bio": se muestra a pantalla completa sobre el cabezal y el pie del sitio. */
export default function EnlacesPage() {
  return (
    <div
      data-theme="dark"
      data-enlaces
      className="bg-ink text-bone fixed inset-0 z-[200] overflow-y-auto overscroll-contain"
    >
      <div className="mx-auto flex min-h-full w-full max-w-md flex-col items-center px-6 py-12 sm:py-16">
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
                className="border-bone/25 hover:bg-bone hover:text-ink focus-visible:bg-bone focus-visible:text-ink group flex items-center justify-between gap-4 rounded-full border py-3 pr-6 pl-3 transition-colors duration-300"
              >
                <span className="bg-bone/10 group-hover:bg-ink/10 group-focus-visible:bg-ink/10 grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300">
                  <Icon name={l.icon} />
                </span>
                <span className="min-w-0 flex-1">
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
      </div>
    </div>
  );
}
