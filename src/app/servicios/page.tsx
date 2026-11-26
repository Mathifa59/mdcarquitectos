import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { PageHero } from '@/components/PageHero';
import { TransitionLink } from '@/components/TransitionLink';
import { heroPhoto } from '@/content/images';
import { serviceCatalog } from '@/content/services';
import { pageMeta } from '@/lib/seo';

const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

export const metadata: Metadata = pageMeta({
  title: 'Servicios de arquitectura, consultoría y construcción',
  path: '/servicios',
  description:
    'Ocho especialidades: arquitectura comercial y retail, desarrollo inmobiliario y urbanismo, corporativa, residencial, gastronómica, educativa, consultoría y construcción.',
});

export default function ServiciosPage() {
  const hero = heroPhoto('topitop-mega-plaza')!;

  return (
    <>
      <PageHero
        label="02 / Servicios"
        title="Soluciones integrales en arquitectura y construcción."
        lead="Desarrollamos proyectos de distintas escalas, integrando creatividad, rigor técnico y visión de negocio."
        image={{
          src: hero.src,
          blur: hero.blur,
          alt: 'Tienda Topitop en Mega Plaza, proyecto de MD&C Arquitectos',
        }}
      />

      <section className="bg-bone py-[clamp(4.5rem,9vw,8rem)]">
        <div className="shell">
          <ol className="grid gap-x-10 gap-y-2 md:grid-cols-2">
            {serviceCatalog.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                className="border-ink/15 scroll-mt-28 border-t py-8 sm:py-10"
              >
                <p className="label text-stone">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="display mt-4 text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)]">
                  {s.title}
                </h2>
                <p className="text-ink/80 mt-4 max-w-[52ch] leading-relaxed">{s.text}</p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <TransitionLink
                    href={`/contacto?tipo=${encodeURIComponent(s.tipo)}`}
                    data-cursor="link"
                    className="label link-draw pb-1"
                  >
                    Solicitar una consulta ↗
                  </TransitionLink>
                  {s.detail && (
                    <TransitionLink
                      href={`/servicios/${s.detail}`}
                      data-cursor="link"
                      className="label link-draw pb-1"
                    >
                      Ver el servicio en detalle
                    </TransitionLink>
                  )}
                  {s.category && (
                    <TransitionLink
                      href={`/proyectos?categoria=${s.category}`}
                      data-cursor="link"
                      className="label link-draw pb-1"
                    >
                      Proyectos relacionados
                    </TransitionLink>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Closing />
    </>
  );
}
