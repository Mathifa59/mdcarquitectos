// Genera src/content/redirects.ts: URLs del sitio anterior (/portafolio/{categoria}/{slug}) → nuevas.
// Los proyectos que ya no se publican caen en la regla genérica de next.config (→ /proyectos).
//   node scripts/build-redirects.mjs
import fs from 'node:fs';
import { projects } from './projects.source.mjs';

const sql = JSON.parse(fs.readFileSync('.raw/sql-dump.json', 'utf8'));
const OLD_CAT = {
  1: 'arquitectura-corporativa',
  2: 'arquitectura-retail',
  3: 'arquitectura-gastronomica',
};
const byOldId = new Map(projects.filter((p) => p.old).map((p) => [p.old, p.slug]));

const rules = [];
for (const p of sql.projects) {
  const next = byOldId.get(p.id);
  if (!next) continue;
  rules.push({
    source: `/portafolio/${OLD_CAT[p.projects_categories_id]}/${p.slug}`,
    destination: `/proyectos/${next}`,
  });
}
const out = `// Archivo generado por scripts/build-redirects.mjs. No editar a mano.
export const legacyProjectRedirects: { source: string; destination: string }[] = ${JSON.stringify(rules, null, 2)};
`;
fs.writeFileSync('src/content/redirects.ts', out);
console.log(rules.length, 'redirecciones de proyectos');
