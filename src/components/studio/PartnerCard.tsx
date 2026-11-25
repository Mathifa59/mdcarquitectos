import Image from 'next/image';
import { TransitionLink } from '../TransitionLink';
import { RevealImage } from '../RevealImage';
import type { TeamMember } from '@/content/types';

/** Enlaza al perfil solo si existe; sin biografía la tarjeta es solo informativa. */
function CardLink({ href, children }: { href?: string; children: React.ReactNode }) {
  return href ? (
    <TransitionLink href={href} data-cursor="ver" className="block">
      {children}
    </TransitionLink>
  ) : (
    <div>{children}</div>
  );
}

/** Tarjeta de socio: foto (o monograma si aún no hay retrato), nombre, cargo y enlace al perfil. */
export function PartnerCard({
  member,
  photo,
  index,
}: {
  member: TeamMember;
  photo?: { src: string; blur: string };
  index: number;
}) {
  const hasProfile = member.bio.length > 0;

  return (
    <article className="group">
      <CardLink href={hasProfile ? `/estudio/${member.slug}` : undefined}>
        <RevealImage className="bg-ink-2 aspect-[4/5] w-full" delay={index * 0.12}>
          {photo ? (
            <Image
              src={photo.src}
              alt={`Retrato de ${member.name}`}
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
              placeholder="blur"
              blurDataURL={photo.blur}
              className="object-cover object-top transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-[radial-gradient(120%_90%_at_30%_10%,#2a2927,#0e0e0e)]">
              <span
                className="display text-bone/15 text-[clamp(6rem,16vw,14rem)]"
                aria-hidden="true"
              >
                {member.initials}
              </span>
            </div>
          )}
        </RevealImage>
        <div className="mt-6 flex items-start justify-between gap-6">
          <div>
            <h3 className="display text-[clamp(1.75rem,1.1rem+1.5vw,2.5rem)]">{member.name}</h3>
            <p className="label text-stone mt-3">{member.role}</p>
            {member.headline && <p className="text-stone mt-2">{member.headline}</p>}
          </div>
          {hasProfile && (
            <span
              aria-hidden="true"
              className="label mt-2 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            >
              Ver perfil →
            </span>
          )}
        </div>
      </CardLink>
    </article>
  );
}
