import { TransitionLink } from '../TransitionLink';
import { Rule } from '../Rule';
import { SplitReveal } from '../SplitReveal';
import { about } from '@/content/studio';

/** Intro del estudio con los textos institucionales de la clienta. */
export function Intro() {
  return (
    <section className="bg-bone relative py-[clamp(6rem,14vw,12rem)]">
      <div className="shell">
        <Rule />
        <div className="grid-12 mt-10 gap-y-10 sm:mt-14">
          <p className="label text-stone col-span-12 lg:col-span-3">01 / El estudio</p>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="display t-h2 max-w-[15ch]">
              <SplitReveal as="span" className="block">
                Ideas que construyen espacios extraordinarios
              </SplitReveal>
            </h2>
            <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2">
              <p className="t-lead text-ink/85 max-w-[30ch]">{about.lead}</p>
              <div>
                <div className="text-stone max-w-[46ch] space-y-5">
                  <p>{about.paragraphs[2]}</p>
                  <p>{about.paragraphs[3]}</p>
                </div>
                <TransitionLink
                  href="/estudio"
                  data-cursor="link"
                  className="label link-draw mt-8 inline-block pb-1"
                >
                  Conocer el estudio →
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
