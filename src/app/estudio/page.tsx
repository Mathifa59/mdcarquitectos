import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/PageHero';
import { Rule } from '@/components/Rule';
import { SplitReveal } from '@/components/SplitReveal';
import { PartnerCard } from '@/components/studio/PartnerCard';
import { brands } from '@/content/brands';
import { heroPhoto, photo } from '@/content/images';
import { site } from '@/content/site';
import { about, founders, intro } from '@/content/studio';
import { mariyoli, publishedTeam } from '@/content/team';
import { pageMeta } from '@/lib/seo';

const Stats = dynamic(() => import('@/components/home/Stats').then((m) => m.Stats));
const BrandMarquee = dynamic(() =>
  import('@/components/home/BrandMarquee').then((m) => m.BrandMarquee),
);
const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

export const metadata: Metadata = pageMeta({
  title: 'Estudio y fundadores',
  path: '/estudio',
  description:
    'MD&C Arquitectos reúne dos trayectorias: arquitectura comercial y retail con Mariyoli Delgado y desarrollo inmobiliario con José Canales. Estudio en Lima, Perú.',
});

export default function EstudioPage() {
  const hero = heroPhoto('oficinas-porta')!;
  const [lead, ...rest] = about.paragraphs;

  return (
    <>
      <PageHero
        label="01 / El estudio"
        title={about.title}
        lead={about.lead}
        image={{
          src: hero.src,
          blur: hero.blur,
          alt: 'Oficinas Porta, proyecto de MD&C Arquitectos',
        }}
        tall
      />

      {/* Texto institucional */}
      <section className="bg-bone py-[clamp(6rem,12vw,11rem)]">
        <div className="shell grid-12 gap-y-12">
          <p className="label text-stone col-span-12 lg:col-span-3">Nuestro enfoque</p>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <p className="t-lead max-w-[30ch]">
              <SplitReveal as="span" className="block">
                {lead}
              </SplitReveal>
            </p>
            <div className="text-ink/80 mt-14 max-w-[58ch] space-y-6 text-[1.0625rem] leading-relaxed">
              {rest.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="border-ink/15 mt-16 border-t pt-8">
              <p className="label">{about.signature}</p>
              <p className="serif text-brand mt-4 text-[clamp(1.75rem,1.1rem+2.2vw,3.25rem)] leading-tight">
                {about.slogan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestros fundadores */}
      <section className="bg-bone-2 py-[clamp(6rem,12vw,11rem)]">
        <div className="shell">
          <Rule />
          <div className="grid-12 mt-10 gap-y-8 sm:mt-14">
            <p className="label text-stone col-span-12 lg:col-span-3">02 / Fundadores</p>
            <div className="col-span-12 lg:col-span-9">
              <h2 className="display t-h2 max-w-[10ch]">
                <SplitReveal as="span" className="block">
                  {founders.title}
                </SplitReveal>
              </h2>
              <p className="serif text-brand mt-8 text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] leading-tight">
                {founders.tagline}
              </p>
            </div>
          </div>

          <p className="t-lead text-ink/85 mt-12 max-w-[40ch] sm:mt-16 lg:ml-[calc(25%+1rem)]">
            {founders.lead}
          </p>

          <div className="grid-12 mt-16 gap-y-14 sm:mt-24">
            {publishedTeam.map((m, i) => (
              <div
                key={m.slug}
                className={`col-span-12 md:col-span-6 ${i === 1 ? 'md:mt-24' : ''}`}
              >
                <PartnerCard member={m} photo={m.photo ? photo(m.photo) : undefined} index={i} />
              </div>
            ))}
          </div>

          {mariyoli.cv && (
            <a
              href={mariyoli.cv.href}
              download
              data-cursor="link"
              className="label border-ink/30 hover:border-ink hover:bg-ink hover:text-bone mt-16 inline-flex items-center gap-3 rounded-full border px-7 py-4 transition-colors duration-500"
            >
              {mariyoli.cv.label} · Mariyoli Delgado (PDF) ↓
            </a>
          )}

          <div className="border-ink/15 mt-20 border-t pt-10 sm:mt-28">
            <p className="label text-stone">{founders.shared.title}</p>
            <div className="grid-12 mt-8 gap-y-8">
              {founders.shared.paragraphs.map((p, i) => (
                <p
                  key={p.slice(0, 20)}
                  className={`t-lead text-ink/85 col-span-12 max-w-[34ch] lg:col-span-5 ${i === 1 ? 'lg:col-start-7' : ''}`}
                >
                  {p}
                </p>
              ))}
            </div>
            <p className="label mt-14">{founders.shared.signature}</p>
            <p className="serif text-brand mt-3 text-[clamp(1.5rem,1rem+1.8vw,2.75rem)]">
              {founders.shared.slogan}
            </p>
          </div>
        </div>
      </section>

      {/* Líneas de negocio */}
      <section className="bg-bone py-[clamp(6rem,12vw,11rem)]">
        <div className="shell grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <p className="label text-stone">03 / Líneas de negocio</p>
            <p className="t-lead mt-8 max-w-[18ch]">{intro.linesTitle.replace(/:$/, '')}</p>
          </div>
          <ol className="col-span-12 lg:col-span-7 lg:col-start-6">
            {intro.lines.map((l, i) => (
              <li
                key={l}
                className="border-ink/15 flex items-baseline gap-6 border-t py-5 sm:gap-10 sm:py-6"
              >
                <span className="label text-stone w-8">{String(i + 1).padStart(2, '0')}</span>
                <span className="display text-[clamp(1.5rem,1rem+1.8vw,2.75rem)] tracking-[-0.03em]">
                  {l.replace(/\.$/, '')}
                </span>
              </li>
            ))}
            <li className="border-ink/15 border-t" />
          </ol>
          <div className="col-span-12 mt-8 lg:col-span-7 lg:col-start-6">
            <p className="text-ink/80 max-w-[48ch] text-[1.0625rem] leading-relaxed">
              {intro.closingParagraph}
            </p>
            <p className="serif mt-10 text-[clamp(1.75rem,1.1rem+2.4vw,3.5rem)] leading-tight">
              {intro.closingLine}
            </p>
          </div>
        </div>
      </section>

      <Stats stats={site.stats.map((s) => ({ ...s }))} countries={[...site.countries]} />
      <BrandMarquee brands={brands} />
      <Closing />
    </>
  );
}
