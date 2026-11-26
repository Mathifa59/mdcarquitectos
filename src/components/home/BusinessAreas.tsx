import { TransitionLink } from '../TransitionLink';
import { SplitReveal } from '../SplitReveal';
import { areas } from '@/content/home';

/** Dos áreas de negocio con el mismo peso; debajo, los servicios transversales. */
export function BusinessAreas() {
  return (
    <section data-header-theme="dark" className="bg-ink text-bone py-[clamp(4.5rem,9vw,8rem)]">
      <div className="shell">
        <p className="label text-bone/60">{areas.label}</p>
        <h2 className="display t-h2 mt-6 max-w-[16ch]">
          <SplitReveal as="span" className="block">
            {areas.title}
          </SplitReveal>
        </h2>
        <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 md:gap-8">
          {areas.items.map((a, i) => (
            <article key={a.title} className="border-bone/20 border-t pt-6">
              <p className="label text-bone/50">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="display mt-4 text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)]">{a.title}</h3>
              <p className="text-bone/75 mt-3 max-w-[34ch]">{a.text}</p>
              <TransitionLink
                href={a.href}
                data-cursor="link"
                className="label link-draw mt-6 inline-block pb-1"
              >
                {a.projectsLabel} ↗
              </TransitionLink>
            </article>
          ))}
        </div>
        <div className="border-bone/20 mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <p className="label text-bone/80">{areas.transversal}</p>
          <TransitionLink
            href="/servicios"
            data-cursor="link"
            className="label bg-bone text-ink hover:bg-bone-2 inline-flex items-center rounded-full px-7 py-4 transition-colors duration-500"
          >
            Ver todos los servicios
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
