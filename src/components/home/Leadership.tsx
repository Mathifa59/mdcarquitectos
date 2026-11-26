import { Rule } from '../Rule';
import { SplitReveal } from '../SplitReveal';
import { PartnerCard } from '../studio/PartnerCard';
import { leadership } from '@/content/home';
import type { TeamMember } from '@/content/types';

type Photo = { src: string; blur: string };

/** Fundadores con el mismo tamaño y jerarquía; después, el resto del equipo. */
export function Leadership({
  founders,
  team,
  photos,
}: {
  founders: TeamMember[];
  team: TeamMember[];
  photos: Record<string, Photo | undefined>;
}) {
  return (
    <section className="bg-bone-2 py-[clamp(4.5rem,9vw,8rem)]">
      <div className="shell">
        <Rule />
        <div className="grid-12 mt-10 gap-y-6 sm:mt-14">
          <p className="label text-stone col-span-12 lg:col-span-3">{leadership.label}</p>
          <h2 className="display t-h2 col-span-12 max-w-[14ch] lg:col-span-9">
            <SplitReveal as="span" className="block">
              {leadership.title}
            </SplitReveal>
          </h2>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {founders.map((m, i) => (
            <PartnerCard key={m.slug} member={m} photo={photos[m.slug]} index={i} />
          ))}
        </div>

        {team.length > 0 && (
          <div className="border-ink/15 mt-16 border-t pt-8">
            <p className="label text-stone mb-8">Equipo profesional</p>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <PartnerCard key={m.slug} member={m} photo={photos[m.slug]} index={i} compact />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
