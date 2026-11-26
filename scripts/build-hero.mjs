/**
 * Genera las fotos de la portada (home) a partir de fotos ya publicadas en /public/images/projects.
 * No necesita `.raw/`: reescala a 2000 px de ancho (Lanczos + nitidez suave) y registra cada una en
 * images.json bajo la clave `hero/<nombre>` con su placeholder blur.
 *
 *   node scripts/build-hero.mjs
 *
 * Para cambiar las fotos de la portada: editar HERO, correr el script y ajustar `heroSlides` en src/app/page.tsx.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const HERO = [
  { name: 'indian-puruchuco', from: 'indian-chic-real-plaza-puruchuco/07.jpg' },
  { name: 'porta-freedom', from: 'porta-freedom/01.jpg' },
  { name: 'indian-santa-anita', from: 'indian-chic-mall-aventura-santa-anita/07.jpg' },
  { name: 'explorer', from: 'explorer/01.jpg' },
];

const outDir = path.join(root, 'public/images/hero');
await mkdir(outDir, { recursive: true });
const jsonPath = path.join(root, 'src/content/images.json');
const data = JSON.parse(await readFile(jsonPath, 'utf8'));

for (const { name, from } of HERO) {
  const src = path.join(root, 'public/images/projects', from);
  const meta = await sharp(src).metadata();
  const width = Math.max(2000, meta.width);
  const buf = await sharp(src)
    .resize({ width, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.6, m2: 1 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });
  await writeFile(path.join(outDir, `${name}.jpg`), buf.data);
  const blurBuf = await sharp(buf.data).resize(16).jpeg({ quality: 50 }).toBuffer();
  data[`hero/${name}`] = [
    {
      src: `/images/hero/${name}.jpg`,
      w: buf.info.width,
      h: buf.info.height,
      blur: `data:image/jpeg;base64,${blurBuf.toString('base64')}`,
      source: 'old',
      hero: true,
      tier: 'mid',
    },
  ];
  console.log(name, `${meta.width}x${meta.height} → ${buf.info.width}x${buf.info.height}`, Math.round(buf.data.length / 1024) + ' KB');
}

await writeFile(jsonPath, JSON.stringify(data, null, 2) + '\n');
