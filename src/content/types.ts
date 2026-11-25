/** Modelo de contenido. Todo texto de cara al público se escribe en español (es-PE). */

export type CategorySlug =
  'retail' | 'corporativa' | 'gastronomica' | 'residencial' | 'educacion' | 'comercial';

export type Category = {
  slug: CategorySlug;
  label: string;
  /** Frase para textos corridos: "proyecto de {phrase}". */
  phrase: string;
  /** Slug de la página de servicio asociada (solo las 3 líneas con página propia). */
  serviceSlug?: string;
};

/** Foto optimizada por scripts/optimize-images.mjs (ver content/images.json). */
export type Photo = {
  src: string;
  w: number;
  h: number;
  /** data URI de 16 px para placeholder="blur" */
  blur: string;
  source: 'curated' | 'old' | 'portrait' | 'canales';
  /** Apta para pantalla completa (≥1600 px de ancho y horizontal). */
  hero: boolean;
  /** hi ≥1600 · mid ≥1000 · low <1000 px de ancho */
  tier: 'hi' | 'mid' | 'low';
};

/** Local o sede dentro de un proyecto con varias ubicaciones. */
export type ProjectSite = {
  name: string;
  areaM2?: number;
  year?: string;
};

export type Project = {
  slug: string;
  title: string;
  client?: string;
  category: CategorySlug;
  /** Ubicación en una línea. Si hay varias sedes, se resume y el detalle va en `sites`. */
  location?: string;
  areaM2?: number;
  /** Año o rango, como texto: "2016" o "2018–2019". */
  year?: string;
  /** Estudio autor cuando no es MD&C (p. ej. proyectos del socio José Canales). */
  office?: string;
  /** Datos extra de la ficha (pisos, departamentos, lotes…). */
  extra?: { label: string; value: string }[];
  /** Texto descriptivo entregado por la clienta (se muestra tal cual). */
  description?: string[];
  /** Alcance normalizado, en orden de aparición. */
  scope: string[];
  sites?: ProjectSite[];
  /** Entra en el home (scroll horizontal) */
  featured?: boolean;
  /** Orden manual dentro del índice (menor = primero). */
  order: number;
  /** Notas internas; nunca se muestran. */
  note?: string;
};

export type SubService = {
  id: 'diseno' | 'look-feel' | 'implementacion' | 'gerencia' | 'remodelacion';
  /** Título corto, igual en las tres líneas (home y menús). */
  short: string;
  /** Título completo propio de la línea. */
  title: string;
  text: string;
};

export type Service = {
  slug: string;
  category: CategorySlug;
  title: string;
  /** Etiqueta superior en mayúsculas. */
  label: string;
  intro: string;
  subservices: SubService[];
  /** Foto de portada: proyecto y posición en su galería. */
  cover: { project: string; index: number };
};

export type TeamMember = {
  slug: string;
  published: boolean;
  name: string;
  role: string;
  headline?: string;
  /** Clave en images.json */
  photo?: string;
  bio: string[];
  facts?: { label: string; value: string }[];
  cv?: { href: string; label: string };
  /** Iniciales para el monograma cuando no hay foto. */
  initials?: string;
  /** Listas largas del perfil (cargos, concursos…). */
  sections?: { title: string; items: { text: string; note?: string }[] }[];
  /** Categorías de proyectos a destacar en el perfil. */
  projectCategories?: CategorySlug[];
  /** Cifras destacadas del perfil. `value` numérico se anima; texto se muestra tal cual. */
  stats?: { value: number | string; prefix?: string; label: string }[];
  /** Marcas y clientes principales (texto corrido). */
  clients?: { title: string; text: string };
};
