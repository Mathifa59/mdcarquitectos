// Genera un mapa estático (sin dependencias en runtime) con teselas de OpenStreetMap.
// Solo se envían al servidor de teselas las coordenadas públicas del estudio.
//   node scripts/build-map.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const LAT = -12.1059924;
const LON = -76.9709862;
const Z = 16;
const n = 2 ** Z;
const fx = ((LON + 180) / 360) * n;
const fy =
  ((1 - Math.log(Math.tan((LAT * Math.PI) / 180) + 1 / Math.cos((LAT * Math.PI) / 180)) / Math.PI) /
    2) *
  n;
const cx = Math.floor(fx);
const cy = Math.floor(fy);

const comps = [];
for (let dy = -2; dy <= 2; dy++) {
  for (let dx = -2; dx <= 2; dx++) {
    const res = await fetch(`https://tile.openstreetmap.org/${Z}/${cx + dx}/${cy + dy}.png`, {
      headers: { 'User-Agent': 'mdc-web-static-map-build/1.0 (one-off build script)' },
    });
    if (!res.ok) throw new Error(`tile ${dx},${dy}: ${res.status}`);
    comps.push({
      input: Buffer.from(await res.arrayBuffer()),
      left: (dx + 2) * 256,
      top: (dy + 2) * 256,
    });
  }
}
const px = Math.round((fx - (cx - 2)) * 256);
const py = Math.round((fy - (cy - 2)) * 256);
const W = 720;
const H = 440;
fs.mkdirSync('public/images', { recursive: true });
const stitched = await sharp({
  create: { width: 1280, height: 1280, channels: 3, background: '#e8e5de' },
})
  .composite(comps)
  .png()
  .toBuffer();
await sharp(stitched)
  .extract({ left: Math.max(0, px - W / 2), top: Math.max(0, py - H / 2), width: W, height: H })
  .grayscale()
  .modulate({ brightness: 1.02 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/images/mapa-estudio.jpg');
console.log('mapa listo', { px, py });
