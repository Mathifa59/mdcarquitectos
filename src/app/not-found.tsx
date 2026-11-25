import type { Metadata } from 'next';
import Image from 'next/image';
import { TransitionLink } from '@/components/TransitionLink';
import { WhatsAppIcon } from '@/components/WhatsAppIcon';
import { heroPhoto } from '@/content/images';
import { featuredProjects } from '@/content/projects';
import { whatsappUrl } from '@/content/site';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description:
    'La página que busca no existe o se ha movido. Explore nuestros proyectos o escríbanos.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const bg = heroPhoto('indian-chic-real-plaza-puruchuco')!;
  const picks = featuredProjects.slice(0, 3);

  return (
    <section
      data-header-theme="dark"
      className="bg-ink text-bone relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <Image
        src={bg.src}
        alt=""
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={bg.blur}
        className="object-cover opacity-30"
      />
      <div className="from-ink via-ink/70 to-ink/90 absolute inset-0 bg-gradient-to-t" />

      <div className="shell relative z-10 pt-[calc(var(--header-h)+4rem)] pb-[clamp(3rem,7vw,6rem)]">
        <p className="label text-bone/70 mb-6">Error 404</p>
        <h1 className="display text-bone text-[clamp(7rem,2rem+28vw,26rem)] leading-[0.8]">
          4<span className="text-brand-bright">0</span>4
        </h1>
        <p className="t-lead mt-10 max-w-[28ch]">Esta página no existe o ha cambiado de lugar.</p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <TransitionLink
            href="/"
            data-cursor="link"
            className="label group bg-bone text-ink hover:bg-brand hover:text-bone inline-flex items-center gap-4 rounded-full px-8 py-5 transition-colors duration-500"
          >
            Volver al inicio <span aria-hidden="true">→</span>
          </TransitionLink>
          <TransitionLink
            href="/proyectos"
            data-cursor="link"
            className="label border-bone/30 hover:border-bone hover:bg-bone hover:text-ink inline-flex items-center rounded-full border px-8 py-5 transition-colors duration-500"
          >
            Ver proyectos
          </TransitionLink>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="label border-bone/30 hover:border-bone hover:bg-bone hover:text-ink inline-flex items-center gap-3 rounded-full border px-8 py-5 transition-colors duration-500"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </div>

        <div className="border-bone/20 mt-16 border-t pt-6">
          <p className="label text-bone/60 mb-4">Quizá le interese</p>
          <ul className="flex flex-wrap gap-x-10 gap-y-3">
            {picks.map((p) => (
              <li key={p.slug}>
                <TransitionLink
                  href={`/proyectos/${p.slug}`}
                  data-cursor="ver"
                  className="link-draw text-[1.05rem]"
                >
                  {p.title}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
