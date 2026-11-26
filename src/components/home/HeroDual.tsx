import Image from 'next/image';
import { TransitionLink } from '../TransitionLink';
import { WordReveal } from '../WordReveal';
import { hero } from '@/content/home';

export type HeroCard = {
  area: string;
  title: string;
  caption: string;
  href: string;
  src: string;
  blur: string;
  alt: string;
};

/** Portada: titular y dos imágenes de igual peso (arquitectura comercial y desarrollo inmobiliario). */
export function HeroDual({ cards }: { cards: HeroCard[] }) {
  return (
    <section data-header-theme="dark" className="bg-ink text-bone relative">
      <div className="shell pt-[calc(var(--header-h)+clamp(2rem,5vw,4rem))] pb-[clamp(3rem,6vw,5.5rem)]">
        <p className="label text-bone/70 mb-6">{hero.eyebrow}</p>
        <h1 className="display t-h1 max-w-[18ch]">
          <WordReveal as="span" delay={0.2} className="block">
            {hero.title}
          </WordReveal>
        </h1>
        <p className="text-bone/80 mt-6 max-w-[40ch] text-[clamp(1.0625rem,0.95rem+0.5vw,1.25rem)] leading-snug">
          {hero.lead}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TransitionLink
            href="/proyectos"
            data-cursor="link"
            className="label bg-bone text-ink hover:bg-bone-2 inline-flex items-center gap-3 rounded-full px-7 py-4 transition-colors duration-500"
          >
            Explorar proyectos <span aria-hidden="true">↗</span>
          </TransitionLink>
          <TransitionLink
            href="/contacto"
            data-cursor="link"
            className="label border-bone/40 hover:border-bone hover:bg-bone hover:text-ink inline-flex items-center rounded-full border px-7 py-4 transition-colors duration-500"
          >
            Conversemos
          </TransitionLink>
        </div>

        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 md:gap-8">
          {cards.map((c, i) => (
            <TransitionLink key={c.href} href={c.href} data-cursor="ver" className="group block">
              <div className="bg-ink-2 relative aspect-[16/10] overflow-hidden">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  sizes="(min-width: 1400px) 640px, (min-width: 768px) 46vw, 92vw"
                  placeholder="blur"
                  blurDataURL={c.blur}
                  className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
              </div>
              <p className="label text-bone/60 mt-5">{c.area}</p>
              <h2 className="display mt-2 text-[clamp(1.375rem,1rem+1vw,1.875rem)]">{c.title}</h2>
              <p className="text-bone/65 mt-1 text-[0.9375rem]">{c.caption}</p>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
