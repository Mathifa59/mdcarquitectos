import data from './images.json';
import type { Photo } from './types';

/**
 * ⚠️ Solo importar desde Server Components: images.json pesa (placeholders blur) y no debe
 * entrar al bundle del cliente. Pasar las fotos necesarias como props.
 */
const all = data as unknown as Record<string, Photo[]>;

export const photos = (key: string): Photo[] => all[key] ?? [];
export const photo = (key: string, index = 0): Photo | undefined => photos(key)[index];

/** Foto de pantalla completa: la primera apta (≥1600 px horizontal) o, si no hay, la primera. */
export const heroPhoto = (key: string): Photo | undefined =>
  photos(key).find((p) => p.hero) ?? photos(key)[0];

/** ¿El proyecto tiene alguna foto apta para pantalla completa? */
export const hasHero = (key: string) => photos(key).some((p) => p.hero);

export const portrait = (key: string) => photo(key);
