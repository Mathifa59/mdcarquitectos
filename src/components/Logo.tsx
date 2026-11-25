import paths from '@/content/logo-paths.json';

type Tone = 'color' | 'onDark' | 'bone' | 'ink';

/** Logo vectorizado de MD&C. `compact` omite la palabra ARQUITECTOS. */
export function Logo({
  tone = 'color',
  compact = false,
  className,
}: {
  tone?: Tone;
  compact?: boolean;
  className?: string;
}) {
  const h = compact ? 690 : paths.h;
  return (
    <svg
      className={`logo ${className ?? ''}`}
      data-tone={tone}
      viewBox={`0 0 ${paths.w} ${h}`}
      role="img"
      aria-label="MD&C Arquitectos"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="l-md" d={paths.md} />
      <path className="l-amp" d={paths.amp} />
      <path className="l-c" d={paths.c} />
      {!compact && <path className="l-arq" d={paths.arq} />}
    </svg>
  );
}
