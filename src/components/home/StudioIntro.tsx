import { TransitionLink } from '../TransitionLink';
import { Rule } from '../Rule';
import { SplitReveal } from '../SplitReveal';
import { studioIntro } from '@/content/home';

/** Presentación breve del estudio; la versión extensa vive en /estudio. */
export function StudioIntro() {
  return (
    <section className="bg-bone relative py-[clamp(4.5rem,9vw,8rem)]">
      <div className="shell">
        <Rule />
        <div className="grid-12 mt-10 gap-y-8 sm:mt-14">
          <p className="label text-stone col-span-12 lg:col-span-3">{studioIntro.label}</p>
          <div className="col-span-12 lg:col-span-8">
            <h2 className="display t-h2 max-w-[16ch]">
              <SplitReveal as="span" className="block">
                {studioIntro.title}
              </SplitReveal>
            </h2>
            <p className="text-ink/85 mt-8 max-w-[58ch] text-[clamp(1.0625rem,0.98rem+0.4vw,1.25rem)] leading-relaxed">
              {studioIntro.text}
            </p>
            <TransitionLink
              href="/estudio"
              data-cursor="link"
              className="label link-draw mt-8 inline-block pb-1"
            >
              Conocer el estudio ↗
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
