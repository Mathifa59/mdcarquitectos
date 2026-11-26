import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/PageHero';
import { Rule } from '@/components/Rule';
import { SplitReveal } from '@/components/SplitReveal';
import { PartnerCard } from '@/components/studio/PartnerCard';
import { heroPhoto, photo } from '@/content/images';
import { about, team as teamText } from '@/content/studio';
import { jose, mariyoli, renato } from '@/content/team';
import { pageMeta } from '@/lib/seo';

const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

export const metadata: Metadata = pageMeta({
  title: 'El estudio',
  path: '/estudio',
  description:
    'MD&C Arquitectos nace de la unión de MDC Arquitectos y Canales Arquitectos: arquitectura comercial y corporativa, urbanismo y desarrollo inmobiliario. Conozca a Mariyoli Delgado, José Canales y Renato Canales Delgado.',
});

export default function EstudioPage() {
  const hero = heroPhoto('oficinas-porta')!;
  const [lead, ...rest] = about.paragraphs;
  const ph = (key?: string) => {
    const p = key ? photo(key) : undefined;
    return p ? { src: p.src, blur: p.blur } : undefined;
  };

  return (
    <>
      <PageHero
        label={about.label}
        title={about.title}
        image={{
          src: hero.src,
          blur: hero.blur,
          alt: 'Oficinas Porta, proyecto de MD&C Arquitectos',
        }}
      />

      {/* Texto institucional */}
      <section className="bg-bone py-[clamp(4.5rem,9vw,8rem)]">
        <div className="shell grid-12 gap-y-12">
          <p className="label text-stone col-span-12 lg:col-span-3">Nuestro enfoque</p>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <p className="t-lead max-w-[34ch]">
              <SplitReveal as="span" className="block">
                {lead}
              </SplitReveal>
            </p>
            <div className="text-ink/80 mt-12 max-w-[58ch] space-y-6 text-[1.0625rem] leading-relaxed">
              {rest.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="border-ink/15 mt-14 border-t pt-8">
              <p className="label">{about.signature}</p>
              <p className="serif text-graphite mt-4 text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-tight">
                {about.slogan}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fundadores (mismo tamaño y jerarquía) y equipo */}
      <section className="bg-bone-2 py-[clamp(4.5rem,9vw,8rem)]">
        <div className="shell">
          <Rule />
          <div className="grid-12 mt-10 gap-y-8 sm:mt-14">
            <p className="label text-stone col-span-12 lg:col-span-3">{teamText.label}</p>
            <h2 className="display t-h2 col-span-12 max-w-[14ch] lg:col-span-9">
              <SplitReveal as="span" className="block">
                {teamText.title}
              </SplitReveal>
            </h2>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {[mariyoli, jose].map((m, i) => (
              <PartnerCard key={m.slug} member={m} photo={ph(m.photo)} index={i} />
            ))}
          </div>

          <div className="border-ink/15 mt-16 border-t pt-8 sm:mt-20">
            <p className="label text-stone mb-8">Equipo profesional</p>
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
              <div className="max-w-[24rem]">
                <PartnerCard member={renato} photo={ph(renato.photo)} index={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
