import Image from 'next/image';
import { TransitionLink } from '../TransitionLink';
import { Rule } from '../Rule';
import { SplitReveal } from '../SplitReveal';

export type FeaturedItem = {
  slug: string;
  title: string;
  meta: string;
  src: string;
  blur: string;
  alt: string;
};

/** Ocho proyectos destacados (cuatro por trayectoria, intercalados). */
export function FeaturedGrid({ items }: { items: FeaturedItem[] }) {
  return (
    <section className="bg-bone py-[clamp(4.5rem,9vw,8rem)]">
      <div className="shell">
        <Rule />
        <div className="grid-12 mt-10 gap-y-6 sm:mt-14">
          <p className="label text-stone col-span-12 lg:col-span-3">03 / Proyectos destacados</p>
          <h2 className="display t-h2 col-span-12 max-w-[14ch] lg:col-span-9">
            <SplitReveal as="span" className="block">
              Arquitectura que genera valor.
            </SplitReveal>
          </h2>
        </div>
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.slug}>
              <TransitionLink
                href={`/proyectos/${p.slug}`}
                data-cursor="ver"
                className="group block"
              >
                <div className="bg-bone-2 relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw"
                    placeholder="blur"
                    blurDataURL={p.blur}
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </div>
                <p className="label text-stone mt-4">{p.meta}</p>
                <h3 className="display mt-2 text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-tight">
                  {p.title}
                </h3>
              </TransitionLink>
            </li>
          ))}
        </ul>
        <TransitionLink
          href="/proyectos"
          data-cursor="link"
          className="label bg-ink text-bone hover:bg-graphite mt-14 inline-flex items-center rounded-full px-8 py-5 transition-colors duration-500"
        >
          Ver portafolio completo
        </TransitionLink>
      </div>
    </section>
  );
}
