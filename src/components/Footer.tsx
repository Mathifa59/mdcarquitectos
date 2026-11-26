'use client';

import { getLenis } from '@/lib/lenis';
import { nav, site, whatsappUrl } from '@/content/site';
import { slogan } from '@/content/studio';
import { Logo } from './Logo';
import { Rule } from './Rule';
import { TransitionLink } from './TransitionLink';
import { WhatsAppIcon } from './WhatsAppIcon';

/** Footer grande con logo, datos, WhatsApp y "Volver arriba" animado. */
export function Footer() {
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.8, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer data-header-theme="dark" className="bg-ink text-bone relative overflow-hidden">
      <div className="shell pt-[clamp(2.5rem,4vw,4rem)] pb-8">
        <Rule className="bg-bone/20" />
        <div className="grid-12 mt-12 gap-y-12 sm:mt-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="w-[min(70vw,17rem)]">
              <Logo tone="onDark" />
            </div>
            <p className="text-bone/70 mt-8 max-w-[28ch]">{slogan}</p>
          </div>

          <div className="col-span-6 lg:col-span-2 lg:col-start-7">
            <p className="label text-bone/50 mb-4">Navegar</p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}>
                  <TransitionLink href={n.href} data-cursor="link" className="link-draw">
                    {n.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 lg:col-span-4">
            <p className="label text-bone/50 mb-4">Contacto</p>
            <address className="text-bone/85 space-y-2 not-italic">
              <p>
                {site.address.street}
                <br />
                {site.address.district}, {site.address.city}, {site.address.country}
              </p>
              {/* TODO-CONFIRMAR: correo */}
              <p>
                <a href={`mailto:${site.email}`} className="link-draw">
                  {site.email}
                </a>
              </p>
              <p>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw inline-flex items-center gap-2"
                >
                  <WhatsAppIcon className="size-4" /> {site.whatsapp.display}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                {site.social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="link-draw"
                  >
                    {s.label}
                  </a>
                ))}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 sm:mt-24 sm:pr-16 lg:pr-20">
          <div className="text-bone/50 max-w-[40ch] text-[0.8125rem] leading-relaxed">
            <p>
              © {new Date().getFullYear()} {site.legalName} · {site.name}. Todos los derechos
              reservados.
            </p>
            <p className="mt-2">
              <TransitionLink
                href="/privacidad"
                data-cursor="link"
                className="link-draw text-bone/80"
              >
                Política de privacidad
              </TransitionLink>
              {' · '}
              Desarrollado por{' '}
              <a
                href="https://www.devhorses.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="link-draw text-bone/80"
              >
                devhorses
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={toTop}
            data-cursor="link"
            className="group label inline-flex items-center gap-4"
            aria-label="Volver arriba"
          >
            Volver arriba
            <span className="border-bone/30 group-hover:border-bone relative grid size-14 place-items-center overflow-hidden rounded-full border transition-colors duration-500">
              <span
                aria-hidden="true"
                className="bg-bone absolute inset-0 translate-y-full rounded-full transition-transform duration-700 ease-[var(--ease-mdc)] group-hover:translate-y-0"
              />
              <span
                aria-hidden="true"
                className="relative grid h-5 w-5 overflow-hidden text-lg leading-none"
              >
                <span className="group-hover:text-ink col-start-1 row-start-1 transition-transform duration-500 ease-[var(--ease-mdc)] group-hover:-translate-y-full">
                  ↑
                </span>
                <span className="text-ink col-start-1 row-start-1 translate-y-full transition-transform duration-500 ease-[var(--ease-mdc)] group-hover:translate-y-0">
                  ↑
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
