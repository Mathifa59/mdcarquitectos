// Genera favicon, apple-icon e íconos del manifest a partir del logo vectorizado (solo "MD").
//   node scripts/build-icons.mjs
import fs from 'node:fs';
import sharp from 'sharp';

const logo = JSON.parse(fs.readFileSync('src/content/logo-paths.json', 'utf8'));
const RED = '#A80102';

// 1) Caja que ocupa "MD" en el lienzo del logo.
const probe = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${logo.viewBox}" width="${logo.w}" height="${logo.h}"><rect width="100%" height="100%" fill="#fff"/><path d="${logo.md}" fill="#000"/></svg>`,
);
const { info } = await sharp(probe).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
const bw = info.width;
const bh = info.height;
const ox = -info.trimOffsetLeft;
const oy = -info.trimOffsetTop;

// 2) Icono cuadrado: fondo rojo, "MD" blanco centrado con margen.
const size = 512;
const pad = 96;
const scale = (size - pad * 2) / bw;
const dy = (size - bh * scale) / 2;
const svg = (r) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${RED}"/><g transform="translate(${pad} ${dy}) scale(${scale}) translate(${ox} ${oy})"><path d="${logo.md}" fill="#F3F1EC"/></g></svg>`;

fs.writeFileSync('src/app/icon.svg', svg(96));
fs.mkdirSync('public/icons', { recursive: true });
const png = (s, r = 0) =>
  sharp(Buffer.from(svg(r)))
    .resize(s, s)
    .png()
    .toBuffer();
fs.writeFileSync('src/app/apple-icon.png', await png(180));
fs.writeFileSync('public/icons/icon-192.png', await png(192, 96));
fs.writeFileSync('public/icons/icon-512.png', await png(512, 96));
fs.writeFileSync('public/icons/icon-maskable-512.png', await png(512));

// 3) favicon.ico (PNG embebido de 48 px)
const ico48 = await png(48, 10);
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(1, 4);
head.writeUInt8(48, 6);
head.writeUInt8(48, 7);
head.writeUInt16LE(1, 10); // planos
head.writeUInt16LE(32, 12); // bits por píxel
head.writeUInt32LE(ico48.length, 14);
head.writeUInt32LE(22, 18);
fs.writeFileSync('src/app/favicon.ico', Buffer.concat([head, ico48]));
console.log('iconos listos', { bw, bh });
