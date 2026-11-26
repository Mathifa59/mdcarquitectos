import { SplitReveal } from '../SplitReveal';
import { TransitionLink } from '../TransitionLink';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { whatsappUrl } from '@/content/site';
import { closing } from '@/content/home';

/** Cierre antes del footer: invitación a conversar, con CTA a contacto y WhatsApp. */
export function Closing() {
  return (
    <section
      data-header-theme="dark"
      className="bg-ink text-bone relative py-[clamp(4.5rem,9vw,8rem)]"
    >
      <div className="shell">
        <p className="label text-bone/60 mb-8">{closing.label}</p>
        <h2 className="display t-h2 max-w-[16ch]">
          <SplitReveal as="span" className="block">
            {closing.title}
          </SplitReveal>
        </h2>
        <p className="text-bone/75 mt-6 max-w-[48ch] text-[clamp(1.0625rem,0.98rem+0.4vw,1.25rem)] leading-relaxed">
          {closing.text}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <TransitionLink
            href="/contacto"
            data-cursor="link"
            className="label group bg-bone text-ink hover:bg-bone-2 inline-flex items-center gap-4 rounded-full px-8 py-5 transition-colors duration-500"
          >
            Iniciar una consulta
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            >
              →
            </span>
          </TransitionLink>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="label border-bone/30 hover:border-bone hover:bg-bone hover:text-ink inline-flex items-center gap-3 rounded-full border px-8 py-5 transition-colors duration-500"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
