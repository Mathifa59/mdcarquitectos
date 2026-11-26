import { heroPhoto } from '@/content/images';
import { slogan } from '@/content/studio';
import { OG_SIZE, OG_TYPE, renderOg } from '@/lib/og';

export const alt = 'MD&C Arquitectos: ideas que construyen espacios extraordinarios';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default async function Image() {
  return renderOg({
    title: slogan.replace(/\.$/, ''),
    label: 'MD&C Arquitectos · Lima, Perú',
    photo: heroPhoto('hero/indian-puruchuco')?.src,
    meta: 'Arquitectura comercial · Retail · Corporativa · Gastronómica',
  });
}
