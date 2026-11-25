import Image from 'next/image';
import { RevealImage } from '../RevealImage';
import { SplitReveal } from '../SplitReveal';
import { TransitionLink } from '../TransitionLink';

/** Bloque de Mariyoli: retrato, propósito, titular y enlaces a su perfil y su CV. */
export function MariyoliBlock({
  name,
  headline,
  purpose,
  photo,
  cv,
}: {
  name: string;
  headline: string;
  purpose: string;
  photo: { src: string; blur: string };
  cv: { href: string; label: string };
}) {
  return (
    <section className="bg-bone-2 py-[clamp(6rem,12vw,10rem)]">
      <div className="shell grid-12 items-center gap-y-12">
        <div className="col-span-12 md:col-span-5 lg:col-span-4 lg:col-start-2">
          <RevealImage className="aspect-[4/5] w-full" parallax={6}>
            <Image
              src={photo.src}
              alt={`Retrato de ${name}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 90vw"
              placeholder="blur"
              blurDataURL={photo.blur}
              className="object-cover object-top"
            />
          </RevealImage>
        </div>
        <div className="col-span-12 md:col-span-7 md:pl-6 lg:col-span-5 lg:col-start-7 lg:pl-0">
          <p className="label text-stone">05 / Dirección</p>
          <p className="serif text-ink mt-8 text-[clamp(2rem,1.2rem+3vw,4.25rem)] leading-[1.05]">
            <SplitReveal as="span" className="block">
              {`“${purpose}”`}
            </SplitReveal>
          </p>
          <div className="border-ink/20 mt-10 border-t pt-8">
            <h2 className="display text-[clamp(2.25rem,1.2rem+3.4vw,4.5rem)]">{headline}</h2>
            <p className="text-stone mt-3">{name} · Fundadora y Gerente General</p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TransitionLink
                href="/estudio/mariyoli-delgado"
                data-cursor="link"
                className="label bg-ink text-bone hover:bg-brand inline-flex items-center gap-3 rounded-full px-6 py-4 transition-colors duration-500"
              >
                Ver perfil completo
              </TransitionLink>
              <a href={cv.href} download data-cursor="link" className="label link-draw pb-1">
                {cv.label} (PDF) ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
