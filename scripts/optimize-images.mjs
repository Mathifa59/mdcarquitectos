// Pipeline de imágenes: lee la selección curada y el sitio viejo (.raw/old-site),
// corrige EXIF, limita a 2400 px, exporta a public/images y genera content/images.json.
//   node scripts/optimize-images.mjs --review   → solo hojas de contacto en .raw/review/
//   node scripts/optimize-images.mjs            → exporta imágenes y images.json
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { projects } from './projects.source.mjs';

const REVIEW = process.argv.includes('--review');
const ROOT = path.resolve(process.cwd(), '..');
// Selección curada de fotos de MD&C (no se versiona). Configurable con CURATED_DIR.
const CURATED_DIR = process.env.CURATED_DIR ?? path.join(ROOT, 'fotos-curadas');
const OLD_DIR = path.resolve('.raw/old-site');
const PPTX_DIR = path.resolve('.raw/canales/pptx/ppt/media');
const OUT_DIR = path.resolve('public/images');
const MAX = 2400;
const MIN_LONG = 700; // por debajo de esto no se publica
const HERO_W = 1600; // ancho mínimo para pantalla completa (P1)
const exclusions = JSON.parse(fs.readFileSync('scripts/image-exclusions.json', 'utf8'));
const sql = JSON.parse(fs.readFileSync('.raw/sql-dump.json', 'utf8'));
const oldById = new Map(sql.projects.map((p) => [p.id, p]));

const dhash = async (file) => {
  const b = await sharp(file).rotate().resize(17, 16, { fit: 'fill' }).greyscale().raw().toBuffer();
  const h = [];
  for (let y = 0; y < 16; y++)
    for (let x = 0; x < 16; x++) h.push(b[y * 17 + x] > b[y * 17 + x + 1] ? 1 : 0);
  return h;
};
const ham = (a, b) => a.reduce((s, v, i) => s + (v !== b[i]), 0);
const meta = async (file) => {
  const m = await sharp(file).rotate().metadata(); // rotate() normaliza orientación EXIF en metadata.autoOrient
  const o = m.orientation ?? 1;
  const swap = o >= 5;
  return { w: swap ? m.height : m.width, h: swap ? m.width : m.height };
};

async function candidates(p) {
  const list = p.curated.map((f) => ({
    file: path.join(CURATED_DIR, f),
    source: 'curated',
    id: f,
  }));
  for (const f of p.pptx ?? [])
    list.push({ file: path.join(PPTX_DIR, f), source: 'canales', id: f });
  const o = p.old ? oldById.get(p.old) : null;
  if (o) {
    let gal = [];
    try {
      gal = JSON.parse(o.galeria || '[]').map((g) => g[1]);
    } catch {}
    const olds = [o.large, ...gal].filter(Boolean);
    if (olds.length < 2 && o.imagen) olds.push(o.imagen);
    for (const f of olds) list.push({ file: path.join(OLD_DIR, f), source: 'old', id: f });
  }
  const kept = [];
  for (const c of list) {
    if (exclusions.some((e) => c.id.includes(e))) continue;
    if (!fs.existsSync(c.file)) continue;
    const m = await meta(c.file);
    c.w = m.w;
    c.h = m.h;
    if (Math.max(m.w, m.h) < MIN_LONG) continue;
    c.hash = await dhash(c.file);
    const dup = kept.findIndex((k) => ham(k.hash, c.hash) <= 30);
    if (dup >= 0) {
      const k = kept[dup];
      // Prioridad a la curada, salvo que la del sitio viejo sea ≥1.5× más grande.
      if (
        k.source === 'curated' &&
        c.source === 'old' &&
        Math.max(c.w, c.h) >= 1.5 * Math.max(k.w, k.h)
      )
        kept[dup] = c;
      continue;
    }
    kept.push(c);
  }
  return kept;
}

const blur = async (file) => {
  const b = await sharp(file).rotate().resize(16).blur(0.5).jpeg({ quality: 40 }).toBuffer();
  return `data:image/jpeg;base64,${b.toString('base64')}`;
};

async function sheet(items, out) {
  const cols = 6,
    cw = 300,
    ch = 210,
    lh = 30;
  const rows = Math.ceil(items.length / cols);
  const comps = [];
  for (let i = 0; i < items.length; i++) {
    const x = (i % cols) * cw,
      y = Math.floor(i / cols) * (ch + lh);
    const b = await sharp(items[i].file)
      .rotate()
      .resize(cw - 6, ch - 4, { fit: 'contain', background: '#222' })
      .jpeg({ quality: 70 })
      .toBuffer();
    comps.push({ input: b, left: x + 3, top: y + 2 });
    const t =
      `${items[i].label} ${items[i].w}x${items[i].h}${items[i].source === 'curated' ? ' [C]' : ''}`.replace(
        /&/g,
        '&amp;',
      );
    comps.push({
      input: Buffer.from(
        `<svg width="${cw}" height="${lh}"><text x="4" y="14" font-size="11" font-family="Arial" fill="#fff">${t}</text><text x="4" y="27" font-size="10" font-family="Arial" fill="#999">${path.basename(items[i].id)}</text></svg>`,
      ),
      left: x,
      top: y + ch,
    });
  }
  await sharp({
    create: { width: cols * cw, height: rows * (ch + lh), channels: 3, background: '#111' },
  })
    .composite(comps)
    .jpeg({ quality: 70 })
    .toFile(out);
}

const result = {};
const review = [];
for (const p of projects) {
  const kept = await candidates(p);
  if (!kept.length) {
    console.warn('SIN FOTOS UTILIZABLES:', p.slug);
    continue;
  }
  if (REVIEW) {
    kept.forEach((k, i) =>
      review.push({ ...k, label: `${p.slug.slice(0, 22)} ${String(i + 1).padStart(2, '0')}` }),
    );
    continue;
  }
  const dir = path.join(OUT_DIR, 'projects', p.slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  result[p.slug] = [];
  for (let i = 0; i < kept.length; i++) {
    const k = kept[i];
    const name = `${String(i + 1).padStart(2, '0')}.jpg`;
    const dest = path.join(dir, name);
    await sharp(k.file)
      .rotate()
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(dest);
    const m = await sharp(dest).metadata();
    result[p.slug].push({
      src: `/images/projects/${p.slug}/${name}`,
      w: m.width,
      h: m.height,
      blur: await blur(dest),
      source: k.source,
      hero: m.width >= HERO_W && m.width > m.height,
      tier: m.width >= 1600 ? 'hi' : m.width >= 1000 ? 'mid' : 'low',
    });
  }
  console.log(
    p.slug.padEnd(42),
    result[p.slug].map((r) => `${r.w}x${r.h}${r.hero ? '★' : ''}`).join(' '),
  );
}

if (REVIEW) {
  fs.mkdirSync('.raw/review', { recursive: true });
  const per = 36;
  for (let i = 0; i < review.length; i += per)
    await sheet(
      review.slice(i, i + per),
      `.raw/review/sheet-${String(i / per + 1).padStart(2, '0')}.jpg`,
    );
  console.log('candidatas:', review.length);
} else {
  // Retrato de Mariyoli (P3) y CV (P2)
  const teamDir = path.join(OUT_DIR, 'team');
  fs.mkdirSync(teamDir, { recursive: true });
  const portrait = path.join(ROOT, 'FOTOS', 'IMG_0887.JPG');
  const dest = path.join(teamDir, 'mariyoli-delgado.jpg');
  await sharp(portrait)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(dest);
  const m = await sharp(dest).metadata();
  result['team/mariyoli-delgado'] = [
    {
      src: '/images/team/mariyoli-delgado.jpg',
      w: m.width,
      h: m.height,
      blur: await blur(dest),
      source: 'portrait',
      hero: false,
    },
  ];
  fs.mkdirSync('public/docs', { recursive: true });
  fs.copyFileSync(
    path.join(ROOT, 'Hoja de vida 2026.pdf'),
    'public/docs/cv-mariyoli-delgado-de-rivero.pdf',
  );
  fs.writeFileSync('src/content/images.json', JSON.stringify(result, null, 1));
  console.log('images.json →', Object.keys(result).length, 'entradas');
}
