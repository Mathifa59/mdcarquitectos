'use client';

export type FilterOption = { slug: string; label: string; count: number };

/** Filtros por categoría (pills con contador). */
export function FilterBar({
  options,
  value,
  onChange,
  dark = false,
  className = '',
}: {
  options: FilterOption[];
  value: string;
  onChange: (slug: string) => void;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar por categoría"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {options.map((o) => {
        const on = value === o.slug;
        return (
          <button
            key={o.slug}
            role="tab"
            aria-selected={on}
            data-cursor="link"
            onClick={() => onChange(o.slug)}
            className={`label inline-flex items-center gap-2 rounded-full border px-5 py-3 transition-colors duration-500 ${
              on
                ? dark
                  ? 'border-bone bg-bone text-ink'
                  : 'border-ink bg-ink text-bone'
                : dark
                  ? 'border-bone/30 hover:border-bone'
                  : 'border-ink/25 hover:border-ink'
            }`}
          >
            {o.label}
            <span className={on ? 'opacity-60' : dark ? 'text-bone/55' : 'text-stone'}>
              {String(o.count).padStart(2, '0')}
            </span>
          </button>
        );
      })}
    </div>
  );
}
