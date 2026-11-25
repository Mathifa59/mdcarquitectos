import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { RevealImage } from '@/components/RevealImage';
import { Rule } from '@/components/Rule';
import { SplitReveal } from '@/components/SplitReveal';
import { TransitionLink } from '@/components/TransitionLink';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { photo } from '@/content/images';
import { categoryLabel, sortedProjects } from '@/content/projects';
import { site } from '@/content/site';
import { memberBySlug, publishedTeam } from '@/content/team';
import { breadcrumbLd, jsonLd as ld, pageMeta } from '@/lib/seo';

const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

type Params = { slug: string };

export const dynamicParams = false;
export const generateStaticParams = () => publishedTeam.map((m) => ({ slug: m.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const m = memberBySlug(slug);
  if (!m) return {};
  return pageMeta({
    title: m.name,
    description: `${m.name}: ${m.headline ?? m.role}. ${m.bio[0].slice(0, 130)}…`,
    path: `/estudio/${slug}`,
    type: 'profile',
  });
}

export default async function PerfilPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const m = memberBySlug(slug);
  if (!m) notFound();

  const portrait = m.photo ? photo(m.photo) : undefined;
  const other = publishedTeam.find((x) => x.slug !== slug);
  const cats = m.projectCategories ?? [];
  const items = sortedProjects
    .filter((p) => cats.includes(p.category))
    .slice(0, 6)
    .map((p) => {
      const ph = photo(p.slug)!;
      return {
        slug: p.slug,
        title: p.title,
        location: p.location,
        year: p.year,
        category: p.category,
        categoryLabel: categoryLabel(p.category),
        thumb: { src: ph.src, blur: ph.blur },
      };
    });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: m.headline ?? m.role,
    worksFor: { '@type': 'Organization', name: site.name, url: site.url },
    url: `${site.url}/estudio/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(jsonLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={ld(
          breadcrumbLd([
            { name: 'Inicio', path: '/' },
            { name: 'Estudio', path: '/estudio' },
            { name: m.name, path: `/estudio/${slug}` },
          ]),
        )}
      />
      <PageHero label={`01 / Estudio · ${m.role}`} title={m.name} lead={m.headline} />

      <section className="bg-bone py-[clamp(5rem,10vw,9rem)]">
        <div className="shell grid-12 gap-y-14">
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <RevealImage className="bg-ink-2 aspect-[4/5] w-full">
                {portrait ? (
                  <Image
                    src={portrait.src}
                    alt={`Retrato de ${m.name}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 92vw"
                    placeholder="blur"
                    blurDataURL={portrait.blur}
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-[radial-gradient(120%_90%_at_30%_10%,#2a2927,#0e0e0e)]">
                    <span
                      className="display text-bone/15 text-[clamp(7rem,18vw,15rem)]"
                      aria-hidden="true"
                    >
                      {m.initials}
                    </span>
                  </div>
                )}
              </RevealImage>
              {m.cv && (
                <a
                  href={m.cv.href}
                  download
                  data-cursor="link"
                  className="label bg-ink text-bone hover:bg-brand mt-6 inline-flex w-full items-center justify-between rounded-full px-7 py-5 transition-colors duration-500"
                >
                  {m.cv.label} (PDF) <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <p className="label text-stone">{m.role}</p>
            <div className="text-ink/85 mt-8 max-w-[60ch] space-y-6 text-[1.0625rem] leading-relaxed">
              {m.bio.map((p, i) => (
                <p key={p.slice(0, 24)} className={i === 0 ? 't-lead text-ink max-w-none' : ''}>
                  {p}
                </p>
              ))}
            </div>

            {m.facts && (
              <dl className="mt-14 grid gap-x-8 sm:grid-cols-2">
                {m.facts.map((f) => (
                  <div key={f.label} className="border-ink/15 border-t py-5">
                    <dt className="label text-stone">{f.label}</dt>
                    <dd className="mt-2">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {m.clients && (
              <div className="border-ink/15 mt-14 border-t pt-6">
                <h2 className="label text-stone">{m.clients.title}</h2>
                <p className="mt-4 max-w-[58ch] text-[1.0625rem] leading-relaxed">
                  {m.clients.text}
                </p>
              </div>
            )}

            {m.sections?.map((s) => (
              <div key={s.title} className="mt-16">
                <h2 className="display text-[clamp(1.75rem,1.1rem+2vw,3rem)]">{s.title}</h2>
                <ul className="mt-6">
                  {s.items.map((it) => (
                    <li
                      key={it.text}
                      className="border-ink/15 grid grid-cols-[1fr_auto] items-baseline gap-6 border-t py-4"
                    >
                      <span>{it.text}</span>
                      {it.note && <span className="label text-stone text-right">{it.note}</span>}
                    </li>
                  ))}
                  <li className="border-ink/15 border-t" />
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {items.length > 0 && (
        <section className="bg-bone-2 py-[clamp(5rem,10vw,9rem)]">
          <div className="shell">
            <Rule />
            <div className="mt-10 mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
              <h2 className="display t-h3 max-w-[14ch]">
                <SplitReveal as="span" className="block">
                  {`Proyectos de ${m.name.split(' ')[0]}`}
                </SplitReveal>
              </h2>
              <TransitionLink
                href={`/proyectos?categoria=${cats[0]}`}
                data-cursor="link"
                className="label link-draw pb-1"
              >
                Ver todos →
              </TransitionLink>
            </div>
            <ProjectGrid items={items} />
          </div>
        </section>
      )}

      {other && (
        <section className="bg-bone py-[clamp(4rem,8vw,7rem)]">
          <div className="shell">
            <p className="label text-stone">Conozca también a</p>
            <TransitionLink
              href={`/estudio/${other.slug}`}
              data-cursor="ver"
              className="display link-draw mt-4 inline-block text-[clamp(2rem,1.2rem+3.4vw,4.5rem)]"
            >
              {other.name} →
            </TransitionLink>
          </div>
        </section>
      )}
      <Closing />
    </>
  );
}
