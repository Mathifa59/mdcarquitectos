import type { Photo } from '@/content/types';

/** Foto con su posición global (para el lightbox). */
export type GPhoto = Photo & { idx: number };

export type Block =
  | { type: 'wide'; photo: GPhoto }
  | { type: 'single'; photo: GPhoto; align: 'left' | 'right' | 'center' }
  | { type: 'pair'; a: GPhoto; b: GPhoto }
  | { type: 'hscroll'; photos: GPhoto[] };

const wideOk = (p: Photo) => p.tier === 'hi' && p.w > p.h;

/**
 * Compone la galería alternando: foto a sangre (solo si la resolución lo permite),
 * pares en dos columnas, fotos sueltas y un tramo de scroll horizontal.
 * Las fotos de resolución media/baja nunca se estiran a pantalla completa.
 */
export function buildBlocks(photos: Photo[], skip: number): Block[] {
  const list: GPhoto[] = photos.map((p, idx) => ({ ...p, idx })).filter((p) => p.idx !== skip);
  const blocks: Block[] = [];
  let i = 0;
  let k = 0;
  let usedH = false;
  const aligns = ['left', 'right', 'center'] as const;

  while (i < list.length) {
    const p = list[i];
    const left = list.length - i;
    // Un tramo horizontal a mitad de galería si quedan ≥ 4 fotos.
    if (!usedH && blocks.length >= 2 && left >= 4) {
      const take = Math.min(4, left);
      blocks.push({ type: 'hscroll', photos: list.slice(i, i + take) });
      i += take;
      usedH = true;
      continue;
    }
    if (wideOk(p)) {
      blocks.push({ type: 'wide', photo: p });
      i += 1;
    } else if (left >= 2 && !wideOk(list[i + 1])) {
      blocks.push({ type: 'pair', a: p, b: list[i + 1] });
      i += 2;
    } else {
      blocks.push({ type: 'single', photo: p, align: aligns[k++ % 3] });
      i += 1;
    }
  }
  return blocks;
}
