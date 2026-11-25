import type { Metadata } from 'next';
import Image from 'next/image';
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
    'Cuéntenos su proyecto: escríbanos por el formulario o por WhatsApp (+51 986 622 055). Estudio en Santiago de Surco, Lima.',
});

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${site.address.geo.lat},${site.address.geo.lon}`;

export default function ContactoPage() {
  const hero = heroPhoto('kfc-tello-42')!;

  return (
    <>
      <PageHero
        label="04 / Contacto"
        title="Hablemos de su proyecto"
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
            <ContactForm />
          </div>

          <aside
            className="col-span-12 lg:col-span-4 lg:col-start-9"
            aria-label="Datos de contacto"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="group bg-ink text-bone hover:bg-brand flex items-center justify-between gap-4 rounded-full px-8 py-6 transition-colors duration-500"
            >
              <span className="label inline-flex items-center gap-3">
                <WhatsAppIcon className="size-5" /> WhatsApp
              </span>
              <span className="text-[0.95rem] whitespace-nowrap">{site.whatsapp.display}</span>
            </a>

            <dl className="mt-10 space-y-8">
              <div className="border-ink/15 border-t pt-5">
                <dt className="label text-stone">Estudio</dt>
                <dd className="mt-2">
                  {/* TODO-CONFIRMAR: dirección referencial */}
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city}, {site.address.country}
                </dd>
              </div>
              <div className="border-ink/15 border-t pt-5">
                <dt className="label text-stone">Correo</dt>
                <dd className="mt-2">
                  {/* TODO-CONFIRMAR: correo */}
                  <a href={`mailto:${site.email}`} className="link-draw">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="border-ink/15 border-t pt-5">
                <dt className="label text-stone">Presencia</dt>
                <dd className="mt-2">{site.countries.join(' · ')}</dd>
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
