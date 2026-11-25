import { SplitReveal } from '../SplitReveal';
import { TransitionLink } from '../TransitionLink';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { closingPhrases, whatsappUrl } from '@/content/site';

/** Frase de cierre antes del footer, con CTA a contacto y WhatsApp. */
export function Closing() {
  return (
    <section
      data-header-theme="dark"
      className="bg-ink text-bone relative pt-[clamp(7rem,16vw,14rem)] pb-[clamp(4rem,8vw,7rem)]"
    >
      <div className="shell">
        <p className="label text-bone/60 mb-10">06 / Hablemos</p>
        <h2 className="display max-w-[14ch] text-[clamp(3rem,1rem+8.6vw,10.5rem)]">
          <SplitReveal as="span" className="block">
            {closingPhrases[0]}
          </SplitReveal>
        </h2>
        <div className="mt-14 flex flex-wrap items-center gap-4 sm:mt-20">
          <TransitionLink
            href="/contacto"
            data-cursor="link"
            className="label group bg-bone text-ink hover:bg-brand hover:text-bone inline-flex items-center gap-4 rounded-full px-8 py-5 transition-colors duration-500"
          >
            Iniciar un proyecto
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
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
