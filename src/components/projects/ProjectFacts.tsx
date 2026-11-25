import { Rule } from '../Rule';
import { SplitReveal } from '../SplitReveal';
import { formatArea, joinList, lowerFirst } from '@/lib/format';
import type { Project } from '@/content/types';

/** "Datos del proyecto": cifras grandes, ficha y un texto breve armado solo con datos reales. */
export function ProjectFacts({
  project,
  categoryLabel,
  phrase,
}: {
  project: Project;
  categoryLabel: string;
  phrase: string;
}) {
  const { client, location, areaM2, year, scope, sites, office, extra, description } = project;

  const rows = [
    ['Estudio', office],
    ['Cliente', client],
    ['Categoría', categoryLabel],
    ['Ubicación', location],
    ['Área', areaM2 ? `${formatArea(areaM2)} m²` : undefined],
    ['Año', year],
    ['Alcance', scope.length ? joinList(scope) : undefined],
    ...(extra ?? []).map((e): [string, string] => [e.label, e.value]),
  ].filter((r): r is [string, string] => Boolean(r[1]));

  // Texto breve compuesto únicamente con los datos existentes (nada inventado).
  const sentence = [
    client ? `Proyecto de ${phrase} para ${client}` : `Proyecto de ${phrase}`,
    location ? ` en ${location}` : '',
    year ? `, desarrollado en ${year}` : '',
    '.',
  ].join('');
  const scopeText = scope.length
    ? `El alcance de ${office ?? 'MD&C'} incluyó ${joinList(scope.map(lowerFirst))}.`
    : '';
  const hasText = Boolean(description?.length || client || location || year || scope.length);

  return (
    <section className="bg-bone py-[clamp(5rem,10vw,9rem)]">
      <div className="shell">
        <Rule />
        <div className="grid-12 mt-10 gap-y-12 sm:mt-14">
          <p className="label text-stone col-span-12 lg:col-span-3">Datos del proyecto</p>

          <div className="col-span-12 lg:col-span-9">
            {(areaM2 || year) && (
              <div className="grid grid-cols-2 gap-6">
                {areaM2 && (
                  <div>
                    <p className="display text-[clamp(2.75rem,1rem+6.4vw,8rem)] tabular-nums">
                      {formatArea(areaM2)}
                      <span className="ml-1 text-[0.4em]">m²</span>
                    </p>
                    <p className="label text-stone mt-3">Área</p>
                  </div>
                )}
                {year && (
                  <div>
                    <p className="display text-[clamp(2.75rem,1rem+6.4vw,8rem)] tabular-nums">
                      {year}
                    </p>
                    <p className="label text-stone mt-3">Año</p>
                  </div>
                )}
              </div>
            )}

            <dl className={`grid gap-x-8 sm:grid-cols-2 ${areaM2 || year ? 'mt-14 sm:mt-20' : ''}`}>
              {rows
                .filter(([k]) => !(k === 'Área' || k === 'Año'))
                .map(([k, v]) => (
                  <div key={k} className="border-ink/15 border-t py-5">
                    <dt className="label text-stone">{k}</dt>
                    <dd className="mt-2 text-[1.05rem]">{v}</dd>
                  </div>
                ))}
            </dl>

            {sites && sites.length > 0 && (
              <div className="mt-10">
                <p className="label text-stone mb-4">Locales</p>
                <ul>
                  {sites.map((s) => (
                    <li
                      key={s.name}
                      className="border-ink/15 grid grid-cols-[1fr_auto_auto] items-baseline gap-6 border-t py-4"
                    >
                      <span>{s.name}</span>
                      <span className="label text-stone tabular-nums">
                        {s.areaM2 ? `${formatArea(s.areaM2)} m²` : ''}
                      </span>
                      <span className="label text-stone w-12 text-right tabular-nums">
                        {s.year ?? ''}
                      </span>
                    </li>
                  ))}
                  <li className="border-ink/15 border-t" />
                </ul>
              </div>
            )}

            {description?.length ? (
              <div className="mt-14 max-w-[62ch] space-y-5 sm:mt-20">
                {description.map((p) => (
                  <p key={p.slice(0, 24)} className="text-ink/85 text-[1.0625rem] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ) : (
              hasText && (
                <p className="t-lead text-ink/85 mt-14 max-w-[34ch] sm:mt-20">
                  <SplitReveal as="span" className="block">
                    {[sentence, scopeText].filter(Boolean).join(' ')}
                  </SplitReveal>
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
