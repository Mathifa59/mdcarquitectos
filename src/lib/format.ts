// Espacio duro (U+00A0): lo renderizan todas las fuentes y evita cortes de l\u00ednea dentro de la cifra.
const THIN = '\u00a0';

/** 1096 → "1 096" · 969.03 → "969,03" (formato es-PE del brief, con espacio fino). */
export function formatArea(n: number): string {
  const [int, dec] = n
    .toFixed(2)
    .replace(/\.00$/, '')
    .replace(/(\.\d)0$/, '$1')
    .split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, THIN);
  return dec ? `${grouped},${dec}` : grouped;
}

/** Une una lista con comas y "y": ["a","b","c"] → "a, b y c". */
export function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} y ${items.at(-1)}`;
}

const keepCase = (s: string) => s.startsWith('Look');
/** Primera letra en minúscula para usar un término en medio de una frase. */
export const lowerFirst = (s: string) => (keepCase(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));

/** "Retail · Lima · 2019 · 500 m²": etiqueta, ciudad (último tramo de la ubicación), año y área. */
export function projectMeta(
  p: { location?: string; year?: string; areaM2?: number },
  label: string,
): string {
  return [
    label,
    p.location?.split(', ').pop(),
    p.year,
    p.areaM2 ? `${formatArea(p.areaM2)} m²` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');
}
