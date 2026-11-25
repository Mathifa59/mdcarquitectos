// Vectoriza el logo aprobado (PNG 6000px) en 4 capas: MD, &, C y ARQUITECTOS.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import potrace from 'potrace';

const SRC = path.resolve('../LOGO MDC/MDyC_rojo_aprobado_6000px.png');
const X0 = 470,
  X1 = 5560,
  Y0 = 1830,
  Y1 = 3705,
  S = 0.5;
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, channels: C } = info;
const w = Math.round((X1 - X0) * S),
  h = Math.round((Y1 - Y0) * S);

const layers = {
  md: (x, y, r, g) => y < 3200 && x < 3520 && g > 128,
  amp: (x, y, r, g) => y < 3200 && x >= 3400 && x < 4300 && r >= 84 && g > 72 && g < 215,
  c: (x, y, r, g) => y < 3200 && x >= 3900 && r < 84 && g < 84,
  arq: (x, y, r, g) => y >= 3340 && g > 128,
};

const trace = (buf) =>
  new Promise((res, rej) =>
    potrace.trace(
      buf,
      { threshold: 128, turdSize: 12, alphaMax: 1, optTolerance: 0.4, blackOnWhite: true },
      (e, svg) => (e ? rej(e) : res(svg)),
    ),
  );

const out = {};
for (const [name, test] of Object.entries(layers)) {
  const mask = Buffer.alloc(w * h, 255);
  for (let yy = 0; yy < h; yy++)
    for (let xx = 0; xx < w; xx++) {
      const x = Math.round(X0 + xx / S),
        y = Math.round(Y0 + yy / S),
        i = (y * W + x) * C;
      if (test(x, y, data[i], data[i + 1], data[i + 2])) mask[yy * w + xx] = 0;
    }
  const png = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
    .png()
    .toBuffer();
  const svg = await trace(png);
  out[name] = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ');
  console.log(name, out[name].length);
}
const meta = { viewBox: `0 0 ${w} ${h}`, w, h, ...out };
fs.writeFileSync('src/content/logo-paths.json', JSON.stringify(meta));
const mk = (md, amp, c, arq, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="MD&amp;C Arquitectos">${bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ''}<path fill="${md}" d="${out.md}"/><path fill="${amp}" d="${out.amp}"/><path fill="${c}" d="${out.c}"/><path fill="${arq}" d="${out.arq}"/></svg>`;
fs.writeFileSync('public/brand/mdc-logo-color.svg', mk('#A80102', '#8c8c8c', '#0E0E0E', '#0E0E0E'));
fs.writeFileSync('public/brand/mdc-logo-negro.svg', mk('#0E0E0E', '#0E0E0E', '#0E0E0E', '#0E0E0E'));
fs.writeFileSync(
  'public/brand/mdc-logo-blanco.svg',
  mk('#F3F1EC', '#F3F1EC', '#F3F1EC', '#F3F1EC'),
);
fs.writeFileSync(
  'public/brand/mdc-logo-sobre-oscuro.svg',
  mk('#E01B1B', '#8c8c8c', '#F3F1EC', '#F3F1EC'),
);
// preview sobre rojo aprobado
fs.writeFileSync('.raw/logo-preview.svg', mk('#fff', '#8c8c8c', '#000', '#fff', '#A80102'));
await sharp('.raw/logo-preview.svg', { density: 72 })
  .resize(1400)
  .png()
  .toFile('.raw/logo-preview.png');
