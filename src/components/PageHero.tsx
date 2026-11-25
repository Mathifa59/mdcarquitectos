import Image from 'next/image';
import { WordReveal } from './WordReveal';

/** Hero oscuro para páginas internas: etiqueta, H1 que se revela por líneas, bajada y foto opcional. */
export function PageHero({
  label,
  title,
  lead,
  image,
  tall = false,
}: {
  label: string;
  title: string;
  lead?: string;
  image?: { src: string; blur: string; alt: string };
  tall?: boolean;
}) {
  return (
    <section
      data-header-theme="dark"
      className={`bg-ink text-bone relative isolate overflow-hidden ${tall ? 'min-h-[100svh]' : 'min-h-[78svh]'}`}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            fetchPriority="high"
            quality={50}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={image.blur}
            className="object-cover opacity-55"
          />
          <div className="from-ink via-ink/40 to-ink/70 absolute inset-0 bg-gradient-to-t" />
        </>
      )}
      <div
        className={`shell relative z-10 flex flex-col justify-end pt-[calc(var(--header-h)+4rem)] pb-[clamp(3rem,7vw,6rem)] ${tall ? 'min-h-[100svh]' : 'min-h-[78svh]'}`}
      >
        <p className="label text-bone/70 mb-8">{label}</p>
        <h1 className="display t-h1 max-w-[12ch]">
          <WordReveal as="span" delay={0.15} className="block">
            {title}
          </WordReveal>
        </h1>
        {lead && <p className="t-lead text-bone/85 mt-10 max-w-[34ch]">{lead}</p>}
      </div>
    </section>
  );
}
