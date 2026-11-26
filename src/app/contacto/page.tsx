import type { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageHero } from '@/components/PageHero';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { heroPhoto } from '@/content/images';
import { site, whatsappUrl } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contacto',
  path: '/contacto',
  description:
    'Cuéntenos sus objetivos: una nueva tienda, una sede corporativa o una inversión inmobiliaria. Escríbanos por el formulario, correo o WhatsApp. Estudio en Santiago de Surco, Lima.',
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${site.address.geo.lat},${site.address.geo.lon}`;

export default function ContactoPage() {
  const hero = heroPhoto('kfc-tello-42')!;

  return (
    <>
      <PageHero
        label="04 / Contacto"
        title="Hablemos de su proyecto."
        lead="Ya sea una nueva tienda, una sede corporativa o una inversión inmobiliaria, cuéntenos sus objetivos. Le ayudaremos a identificar el alcance y los siguientes pasos."
        image={{
          src: hero.src,
          blur: hero.blur,
          alt: 'Local KFC de Tello 42 en Surquillo de noche, proyecto de MD&C Arquitectos',
        }}
      />

      <section className="bg-bone py-[clamp(5rem,10vw,9rem)]">
        <div className="shell grid-12 gap-y-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="label text-stone mb-10">Escríbanos</p>
            <Suspense fallback={<div className="min-h-[30rem]" />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside
            className="col-span-12 lg:col-span-4 lg:col-start-9"
            aria-label="Datos de contacto"
          >
            <dl className="space-y-8">
              <div className="border-ink/15 border-t pt-5">
                <dt className="label text-stone">Correo general</dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="link-draw">
                    {site.email}
                  </a>
                </dd>
              </div>
              {Object.values(site.contacts).map((c) => (
                <div key={c.email} className="border-ink/15 border-t pt-5">
                  <dt className="label text-stone">{c.label}</dt>
                  <dd className="mt-2 space-y-1">
                    <a href={`mailto:${c.email}`} className="link-draw block w-fit">
                      {c.email}
                    </a>
                    <a
                      href={whatsappUrl(undefined, c.phone.number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="link-draw inline-flex items-center gap-2"
                    >
                      <WhatsAppIcon className="size-4" /> {c.phone.display}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="border-ink/15 border-t pt-5">
                <dt className="label text-stone">Oficina</dt>
                <dd className="mt-2">
                  {/* TODO-CONFIRMAR: vigencia de la dirección */}
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city}, {site.address.country}
                </dd>
              </div>
            </dl>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ver"
              aria-label="Cómo llegar: ver la ubicación del estudio en Google Maps"
              className="group bg-bone-2 relative mt-10 block aspect-[16/10] overflow-hidden"
            >
              <Image
                src="/images/mapa-estudio.jpg"
                alt="Mapa de la ubicación del estudio en Santiago de Surco, Lima"
                fill
                sizes="(min-width: 1024px) 30vw, 92vw"
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="bg-brand/40 absolute inset-0 animate-ping rounded-full" />
                <span className="border-bone bg-brand absolute inset-[3px] rounded-full border-2 shadow" />
              </span>
              <span className="label bg-bone absolute bottom-3 left-3 px-3 py-2">
                Cómo llegar →
              </span>
            </a>
            <p className="text-stone mt-2 text-[0.6875rem]">© colaboradores de OpenStreetMap</p>
          </aside>
        </div>
      </section>
    </>
  );
}
