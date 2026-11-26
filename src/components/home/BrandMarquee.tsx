/** Marquee de marcas en tipografía display (los logos disponibles son de 126 px y se verían pixelados). */
export function BrandMarquee({ brands }: { brands: readonly string[] }) {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {brands.map((b) => (
        <li key={b} className="flex items-center">
          <span className="display px-[clamp(1.25rem,3vw,3.5rem)] text-[clamp(1.5rem,1rem+1.8vw,2.75rem)] whitespace-nowrap">
            {b}
          </span>
          <span className="bg-brand block size-2 rotate-45" />
        </li>
      ))}
    </ul>
  );
  return (
    <section
      id="marcas"
      aria-label="Marcas con las que hemos trabajado"
      className="marquee border-ink/15 bg-bone relative overflow-hidden border-y py-8 sm:py-10"
    >
      <p className="sr-only">Marcas: {brands.join(', ')}.</p>
      <div
        className="marquee-track flex w-max"
        style={{ ['--marquee-time' as string]: `${brands.length * 3.2}s` }}
      >
        {row}
        {row}
      </div>
    </section>
  );
}
