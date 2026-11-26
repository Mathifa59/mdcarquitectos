// Valida el modelo de contenido contra images.json y la lista de exclusión.
//   node --experimental-strip-types scripts/validate-content.mjs
import fs from 'node:fs';
// Copia temporal con extensiones .ts en los imports para poder cargarlos con Node.
fs.rmSync('.raw/vc', { recursive: true, force: true });
fs.mkdirSync('.raw/vc', { recursive: true });
for (const f of fs.readdirSync('src/content').filter((x) => x.endsWith('.ts'))) {
  const src = fs
    .readFileSync('src/content/' + f, 'utf8')
    .replace(/^(import (?!type)[^\n]*from ')(\.\/[\w-]+)(';)/gm, '$1$2.ts$3');
  fs.writeFileSync('.raw/vc/' + f, src);
}
const { projects, categories } = await import('../.raw/vc/projects.ts');
const { services } = await import('../.raw/vc/services.ts');
const { publishedTeam } = await import('../.raw/vc/team.ts');
const images = JSON.parse(fs.readFileSync('src/content/images.json', 'utf8'));
const errors = [];
const slugs = new Set();
// Lista de nombres que no deben publicarse: se lee de .raw/prohibidos.txt (una expresión por línea; no se versiona).
const banned = fs.existsSync('.raw/prohibidos.txt')
  ? fs.readFileSync('.raw/prohibidos.txt', 'utf8').split(/\r?\n/).filter(Boolean)
  : [];
const BANNED = new RegExp(banned.length ? banned.join('|') : '(?!)', 'i');
for (const p of projects) {
  if (slugs.has(p.slug)) errors.push(`slug duplicado: ${p.slug}`);
  slugs.add(p.slug);
  if (!categories.some((c) => c.slug === p.category)) errors.push(`categoría inválida: ${p.slug}`);
  const ph = images[p.slug] ?? [];
  if (!ph.length) errors.push(`sin fotos: ${p.slug}`);
  if (BANNED.test(`${p.title} ${p.client ?? ''}`)) errors.push(`proyecto excluido: ${p.slug}`);
  for (const f of ph) if (!fs.existsSync('public' + f.src)) errors.push(`falta archivo: ${f.src}`);
}
for (const k of Object.keys(images))
  if (!k.startsWith('team/') && !k.startsWith('hero/') && !slugs.has(k)) errors.push(`images.json sobrante: ${k}`);
for (const s of services) {
  if (!slugs.has(s.cover.project) || !images[s.cover.project]?.[s.cover.index])
    errors.push(`portada inválida: ${s.slug}`);
  if (s.subservices.length !== 5) errors.push(`subservicios ≠ 5: ${s.slug}`);
}
const publishedNames = publishedTeam
  .map((m) => m.slug)
  .sort()
  .join(',');
if (!/mariyoli-delgado/.test(publishedNames)) errors.push('falta Mariyoli en el equipo publicado');
if (BANNED.test(publishedNames)) errors.push('equipo excluido publicado');
const byCat = Object.groupBy(projects, (p) => p.category);
console.log(
  'proyectos:',
  projects.length,
  Object.fromEntries(Object.entries(byCat).map(([k, v]) => [k, v.length])),
);
const heroes = projects.filter((p) => images[p.slug].some((f) => f.hero)).map((p) => p.slug);
console.log('con foto apta para pantalla completa:', heroes.length, heroes.join(', '));
if (errors.length) {
  console.error('ERRORES:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('contenido OK');
