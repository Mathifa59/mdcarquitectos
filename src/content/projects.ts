import { canalesProjects } from './canales';
import type { Category, Project } from './types';

/**
 * Categorías del portafolio, en el orden de los filtros (directrices 2026-11-26). Los slugs se conservan
 * para no romper enlaces antiguos (?categoria=corporativa…); solo cambian las etiquetas.
 * "Comercial y empresarial" se eliminó y sus proyectos se redistribuyeron por tipología.
 */
export const categories: Category[] = [
  {
    slug: 'retail',
    label: 'Retail',
    phrase: 'arquitectura retail',
    serviceSlug: 'arquitectura-retail',
  },
  {
    slug: 'inmobiliario',
    label: 'Inmobiliario y urbanismo',
    phrase: 'desarrollo inmobiliario y urbanismo',
  },
  {
    slug: 'corporativa',
    label: 'Corporativo',
    phrase: 'arquitectura corporativa',
    serviceSlug: 'arquitectura-corporativa',
  },
  { slug: 'residencial', label: 'Residencial', phrase: 'arquitectura residencial' },
  {
    slug: 'gastronomica',
    label: 'Gastronómico',
    phrase: 'arquitectura gastronómica',
    serviceSlug: 'arquitectura-gastronomica',
  },
  { slug: 'educacion', label: 'Educativo e institucional', phrase: 'arquitectura educativa e institucional' },
];

// Textos de alcance normalizados.
const CONCEPT = 'Conceptualización';
const LF = 'Look & Feel';
const ARQ = 'Proyecto arquitectónico';
const IMPL = 'Implementación';
const FLAG = 'Flagship';

/**
 * Proyectos publicados. Fuente: SQL del sitio anterior + CV 2026, sin los proyectos excluidos.
 * No se inventa nada: si falta un dato, el campo se omite y no se muestra.
 * TODO-CONFIRMAR = dato pendiente de validar con la clienta.
 */
const mdcProjects: Project[] = [
  {
    slug: 'topitop-mega-plaza',
    title: 'Topitop · Mega Plaza',
    client: 'Topitop',
    category: 'retail',
    location: 'C.C. Mega Plaza, Lima',
    areaM2: 1096,
    year: '2018',
    scope: [LF, IMPL],
    featured: true,
    order: 1,
  },
  {
    slug: 'indian-chic-real-plaza-puruchuco',
    title: 'Indian Chic · Real Plaza Puruchuco',
    client: 'Indian Chic',
    category: 'retail',
    location: 'C.C. Real Plaza Puruchuco, Lima',
    areaM2: 500,
    year: '2019',
    scope: [IMPL],
    featured: true,
    order: 0, // la clienta lo pidió como primer proyecto de retail (2026-11-26)
  },
  {
    slug: 'oficinas-porta',
    title: 'Oficinas Porta',
    client: 'Porta',
    category: 'corporativa',
    location: 'Centro Empresarial Park Office, La Molina, Lima',
    areaM2: 800,
    year: '2016',
    scope: [IMPL],
    order: 3,
  },
  {
    slug: 'starbucks-cayma',
    title: 'Starbucks · Cayma',
    // TODO-CONFIRMAR: el sitio anterior decía Delosi; el CV 2026 dice Lasino.
    client: 'Lasino',
    category: 'gastronomica',
    location: 'C.C. Cayma, Arequipa',
    areaM2: 153.7,
    year: '2017',
    scope: [IMPL],
    featured: true,
    order: 4,
  },
  {
    slug: 'marathon-mega-plaza',
    title: 'Marathon · Mega Plaza',
    client: 'Marathon',
    category: 'retail',
    location: 'C.C. Mega Plaza, Lima',
    areaM2: 969.03,
    year: '2013',
    scope: [LF, ARQ, IMPL],
    featured: true,
    order: 5,
  },
  {
    slug: 'kuna-portal-de-belen-cusco',
    title: 'Kuna · Portal de Belén',
    client: 'Kuna Inkalpaca Textiles Peruanos',
    category: 'retail',
    location: 'Portal de Belén, Cusco',
    areaM2: 314.13,
    year: '2014',
    scope: [CONCEPT, LF, 'Desarrollo del proyecto', FLAG, IMPL],
    featured: true,
    order: 6,
  },
  {
    slug: 'banco-ripley-estacion-r',
    title: 'Banco Ripley · Estación R',
    client: 'Banco Ripley',
    category: 'retail',
    location: 'Trujillo',
    areaM2: 355,
    year: '2015',
    scope: [CONCEPT, LF, ARQ, IMPL],
    featured: true,
    order: 7,
  },
  {
    slug: 'h-stern-jockey-plaza',
    title: 'H.Stern · Jockey Plaza',
    client: 'H.Stern',
    category: 'retail',
    location: 'C.C. Jockey Plaza, Lima',
    areaM2: 106.35,
    year: '2018–2019',
    scope: ['Nacionalización del proyecto de arquitectura', IMPL],
    featured: true,
    order: 8,
  },
  {
    slug: 'topitop-mall-del-sur',
    title: 'Topitop · Mall del Sur',
    client: 'Topitop',
    category: 'retail',
    location: 'C.C. Mall del Sur, Lima',
    areaM2: 504.15,
    year: '2018–2019',
    scope: [IMPL],
    featured: true,
    order: 9,
  },
  {
    slug: 'indian-chic-mall-aventura-santa-anita',
    title: 'Indian Chic · Mall Aventura Santa Anita',
    client: 'Indian Chic',
    category: 'retail',
    location: 'C.C. Mall Aventura Santa Anita, Lima',
    areaM2: 600,
    year: '2019',
    scope: [IMPL],
    order: 10,
  },
  {
    slug: 'kfc-tello-42',
    title: 'KFC · Tello 42',
    client: 'Delosi',
    category: 'gastronomica',
    location: 'Tello 42, Surquillo, Lima',
    areaM2: 73,
    year: '2016',
    scope: [IMPL],
    order: 11,
  },
  {
    slug: 'burger-king',
    title: 'Burger King',
    client: 'Delosi',
    category: 'gastronomica',
    location: 'Lima',
    year: '2019',
    scope: [IMPL],
    sites: [
      { name: 'C.C. Centro Cívico, Lima', year: '2019' },
      { name: 'C.C. Primavera, Lima', year: '2019' },
      { name: 'Av. Javier Prado, Monterrico, Lima', areaM2: 530.22, year: '2019' },
      { name: 'La Marina, San Miguel, Lima', areaM2: 499.82, year: '2019' },
    ],
    order: 12,
  },
  {
    slug: 'oficinas-superintendencia',
    title: 'Oficinas Superintendencia',
    category: 'corporativa',
    location: 'Av. Dos de Mayo 1475, San Isidro, Lima',
    areaM2: 166.73,
    year: '2015',
    scope: [LF, ARQ],
    order: 13,
  },
  {
    slug: 'divemotor-oficina-y-showroom',
    title: 'Oficina y showroom Divemotor',
    client: 'Divemotor',
    category: 'corporativa',
    location: 'Av. Canadá, La Victoria, Lima',
    areaM2: 400,
    year: '2012',
    scope: [ARQ, IMPL, LF],
    order: 14,
  },
  {
    slug: 'cencosud-metro-la-marina',
    title: 'Cencosud · Metro La Marina',
    client: 'Cencosud',
    category: 'retail',
    location: 'Metro La Marina, Lima',
    areaM2: 1465.17,
    year: '2019',
    scope: [CONCEPT, ARQ, 'Mobiliario', 'Ejecución de obra'],
    order: 15,
  },
  {
    slug: 'hipermercado-ceramico-las-flores',
    title: 'Hipermercado Cerámico Las Flores',
    category: 'retail',
    location: 'Ventanilla, Lima',
    areaM2: 939.78,
    year: '2016',
    scope: ['Diseño conceptual y arquitectónico', FLAG, IMPL],
    order: 16,
  },
  {
    slug: 'andean-inkalpaca-mall-aventura-arequipa',
    title: 'Andean Inkalpaca · Mall Aventura Plaza',
    client: 'Andean Inkalpaca Textiles Peruanos',
    category: 'retail',
    location: 'C.C. Mall Aventura Plaza (Porongoche), Arequipa',
    areaM2: 83.8,
    year: '2016',
    scope: [CONCEPT, LF, 'Desarrollo del proyecto', FLAG, IMPL],
    featured: true,
    order: 17,
  },
  {
    slug: 'andean-inkalpaca-claustros-arequipa',
    title: 'Andean Inkalpaca · Claustros',
    client: 'Andean Inkalpaca Textiles Peruanos',
    category: 'retail',
    location: 'Claustros, Arequipa',
    areaM2: 69.49,
    year: '2016',
    scope: [CONCEPT, LF, 'Desarrollo del proyecto', FLAG, IMPL],
    order: 18,
  },
  {
    slug: 'porta-pro',
    title: 'Porta Pro',
    client: 'Porta',
    category: 'retail',
    location: 'Lima, Cajamarca y Trujillo',
    year: '2014',
    scope: [CONCEPT, LF, 'Desarrollo del proyecto', FLAG, IMPL],
    sites: [
      { name: 'Mega Plaza, Lima', areaM2: 103, year: '2014' },
      { name: 'Real Plaza Cajamarca', areaM2: 62.52, year: '2014' },
      { name: 'Mall Aventura Plaza, Trujillo', areaM2: 100.91, year: '2014' },
    ],
    order: 19,
  },
  {
    slug: 'porta-freedom',
    title: 'Porta Freedom',
    client: 'Porta',
    category: 'retail',
    location: 'Plaza Lima Norte, Lima',
    areaM2: 91.3,
    year: '2015',
    scope: ['Diseño conceptual (Look & Feel)', 'Ejecución de obra'],
    featured: true,
    order: 20,
  },
  {
    slug: 'porta-collage',
    title: 'Porta Collage',
    // TODO-CONFIRMAR: el sitio anterior titulaba "Porta College"; el texto interno dice COLLAGE.
    client: 'Porta',
    category: 'retail',
    location: 'Lima',
    year: '2013–2014',
    scope: ['Diseño', IMPL],
    sites: [
      { name: 'Real Plaza Salaverry, Lima', areaM2: 74.42, year: '2014' },
      { name: 'Mega Plaza, Lima', areaM2: 56.27, year: '2014' },
      { name: 'La Rambla Brasil, Breña, Lima', areaM2: 38.21, year: '2014' },
      { name: 'Real Plaza Lima Sur', areaM2: 39, year: '2013' },
    ],
    order: 21,
  },
  {
    slug: 'sydney',
    title: 'Sydney',
    client: 'Sydney',
    category: 'retail',
    location: 'Mall Aventura Bellavista, Lima',
    areaM2: 190,
    year: '2013',
    scope: [LF, ARQ, FLAG, IMPL],
    order: 22,
  },
  {
    slug: 'new-balance',
    title: 'New Balance',
    client: 'New Balance',
    category: 'retail',
    location: 'C.C. Jockey Plaza, Lima',
    areaM2: 91,
    year: '2013',
    scope: ['Nacionalización del proyecto de arquitectura', IMPL],
    order: 23,
  },
  {
    slug: 'financiera-crediscotia',
    title: 'Financiera Crediscotia',
    client: 'Crediscotia',
    category: 'retail',
    location: 'Av. Belaúnde, Comas, Lima',
    areaM2: 200,
    year: '2013',
    scope: [CONCEPT, LF, ARQ, IMPL],
    order: 24,
  },
  {
    slug: 'showroom-anthaix',
    title: 'Showroom Anthaix',
    client: 'Anthaix',
    category: 'retail',
    location: 'Lima',
    areaM2: 350,
    year: '2018',
    scope: [CONCEPT, LF, ARQ],
    order: 25,
  },
  {
    slug: 'explorer',
    title: 'Explorer',
    client: 'Hiper Deportes',
    category: 'retail',
    location: 'Lima y Cajamarca',
    year: '2013',
    scope: [IMPL],
    sites: [
      { name: 'C.C. Mega Plaza, Lima', areaM2: 273.3, year: '2013' },
      { name: 'C.C. Real Plaza Cajamarca', areaM2: 198.9, year: '2013' },
      { name: 'C.C. Jockey Plaza, Lima', areaM2: 231.1, year: '2013' },
    ],
    featured: true,
    order: 26,
  },
  {
    slug: 'metal-tubo',
    // TODO-CONFIRMAR: las fotos muestran un frente "Sole"; ¿son el mismo proyecto?
    title: 'Metal Tubo',
    category: 'retail',
    location: 'Av. Benavides, Miraflores, Lima',
    areaM2: 300,
    year: '2013',
    scope: [LF, ARQ, IMPL],
    order: 27,
  },
  {
    slug: 'decor-center',
    title: 'DecorCenter',
    client: 'DecorCenter',
    category: 'retail',
    location: 'Lima',
    year: '2010',
    scope: [ARQ, 'Ampliación', IMPL],
    sites: [
      { name: 'Av. La Molina, Lima', areaM2: 2600, year: '2010' },
      { name: 'Av. República de Panamá, Lima', areaM2: 1500, year: '2010' },
    ],
    order: 28,
  },
  {
    slug: 'vainsa-innova',
    title: 'Vainsa Innova',
    client: 'Vainsa Innova',
    category: 'retail',
    // TODO-CONFIRMAR: el sitio anterior repetía aquí los datos de New Balance; se omiten.
    scope: [LF, ARQ, IMPL],
    order: 29,
  },
  {
    slug: 'cassinelli',
    // TODO-CONFIRMAR: sin ficha en el sitio anterior; solo hay fotos curadas.
    title: 'Cassinelli',
    client: 'Cassinelli',
    category: 'retail',
    scope: [],
    order: 30,
  },
  {
    slug: 'mae-alcott',
    title: 'Mae Alcott',
    client: 'Mae Alcott',
    category: 'retail',
    location: 'Trujillo y Lima',
    scope: [ARQ, IMPL],
    sites: [
      { name: 'C.C. Real Plaza Trujillo', areaM2: 100, year: '2015' },
      { name: 'C.C. Jockey Plaza, Lima', areaM2: 48, year: '2014' },
    ],
    order: 31,
  },
  {
    slug: 'topitop-colombia-venezuela',
    title: 'Topitop · Colombia y Venezuela',
    client: 'Topitop',
    category: 'retail',
    location: 'Colombia y Venezuela',
    year: '2010',
    scope: [CONCEPT, ARQ],
    sites: [
      { name: 'C.C. Hayuelos, Colombia', areaM2: 2500, year: '2010' },
      { name: 'C.C. Alta Vista, Colombia', areaM2: 860, year: '2010' },
      { name: 'C.C. Maturín, Venezuela', areaM2: 2150, year: '2010' },
    ],
    order: 32,
  },
  {
    slug: 'vuala',
    title: 'Vualá',
    client: 'Vualá',
    category: 'retail',
    location: 'C.C. Mega Plaza, Lima',
    areaM2: 350,
    year: '2013',
    scope: [LF, ARQ, IMPL],
    order: 33,
  },
  {
    slug: 'company',
    title: 'Company',
    client: 'Company',
    category: 'retail',
    location: 'C.C. San Miguel, Lima',
    areaM2: 60,
    year: '2017',
    scope: [LF, ARQ],
    order: 34,
  },
  {
    slug: 'teleticket-wong-y-metro',
    title: 'Teleticket · Wong y Metro',
    client: 'Teleticket',
    category: 'retail',
    location: 'Lima · 18 módulos a nivel nacional',
    year: '2017–2018',
    scope: ['Diseño conceptual y arquitectónico', LF, 'Implementación de módulos'],
    order: 35,
  },
  {
    slug: 'joyeria-jade',
    title: 'Joyería Jade',
    client: 'Jade',
    category: 'retail',
    location: 'C.C. Mega Plaza, Lima',
    areaM2: 30,
    year: '2014',
    scope: [LF, ARQ, IMPL],
    order: 36,
  },
  {
    slug: 'lab-nutrition',
    title: 'Lab Nutrition',
    client: 'Lab Nutrition',
    category: 'retail',
    location: 'C.C. Plaza Lima Sur, Lima',
    areaM2: 20,
    year: '2012',
    scope: [LF, ARQ],
    order: 37,
  },
  {
    slug: 'flora-y-fauna',
    // TODO-CONFIRMAR: estaba en Gastronómica en el sitio anterior; por su alcance se pasa a Retail.
    title: 'Flora y Fauna',
    client: 'Flora y Fauna',
    category: 'retail',
    location: 'Av. Aviación, San Borja, Lima',
    year: '2018',
    scope: ['Diseño y fabricación de mobiliario'],
    order: 38,
  },
  {
    slug: 'marathon-ica',
    title: 'Marathon · Ica',
    client: 'Marathon',
    category: 'retail',
    location: 'Ica',
    scope: [LF, ARQ, IMPL],
    order: 39,
  },
  {
    slug: 'marathon-san-borja',
    title: 'Marathon · San Borja',
    client: 'Marathon',
    category: 'retail',
    location: 'San Borja, Lima',
    scope: [LF, ARQ, IMPL],
    order: 40,
  },
];

export const projects: Project[] = [...mdcProjects, ...canalesProjects];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/**
 * Orden del portafolio: primero los proyectos de MD&C y luego los de Canales Arquitectos; dentro de
 * cada grupo, por categoría y con los proyectos de una misma marca juntos (Topitop, Porta, Indian…),
 * respetando el orden manual (`order`) para decidir qué categoría y qué marca van primero.
 */
const firstOrder = (key: (p: Project) => string) => {
  const map = new Map<string, number>();
  for (const p of [...projects].sort((a, b) => a.order - b.order)) {
    const k = key(p);
    if (!map.has(k)) map.set(k, p.order);
  }
  return map;
};
const categoryRank = firstOrder((p) => `${p.office ? 1 : 0}|${p.category}`);
const brandRank = firstOrder((p) => `${p.office ? 1 : 0}|${p.category}|${p.client ?? p.slug}`);

export const sortedProjects = [...projects].sort(
  (a, b) =>
    Number(Boolean(a.office)) - Number(Boolean(b.office)) ||
    categoryRank.get(`${a.office ? 1 : 0}|${a.category}`)! -
      categoryRank.get(`${b.office ? 1 : 0}|${b.category}`)! ||
    brandRank.get(`${a.office ? 1 : 0}|${a.category}|${a.client ?? a.slug}`)! -
      brandRank.get(`${b.office ? 1 : 0}|${b.category}|${b.client ?? b.slug}`)! ||
    a.order - b.order,
);
export const featuredProjects = sortedProjects.filter((p) => p.featured);

export const categoryPhrase = (slug: Project['category']) =>
  categories.find((c) => c.slug === slug)!.phrase;

export const categoryLabel = (slug: Project['category']) =>
  categories.find((c) => c.slug === slug)!.label;

/** Siguiente proyecto circular, para el cierre del detalle. */
export const nextProject = (slug: string) => {
  const i = sortedProjects.findIndex((p) => p.slug === slug);
  return sortedProjects[(i + 1) % sortedProjects.length];
};
