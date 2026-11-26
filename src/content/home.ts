/**
 * Contenido del inicio y de clientes según las directrices de rediseño (2026-11-26).
 * Los textos son los entregados por la clienta; no se reescriben.
 */

export const hero = {
  eyebrow: 'Arquitectura · Consultoría · Construcción',
  title: 'Ideas que construyen espacios extraordinarios.',
  lead: 'Arquitectura comercial y desarrollo inmobiliario. Dos trayectorias, una visión compartida.',
} as const;

/** Portada: dos imágenes de igual peso, una por trayectoria. */
export const heroPair = [
  {
    area: 'Arquitectura comercial',
    slug: 'indian-chic-real-plaza-puruchuco',
    photoKey: 'hero/indian-puruchuco', // foto original de portada
  },
  {
    area: 'Desarrollo inmobiliario',
    slug: 'residencial-los-ciruelos',
    photoKey: 'residencial-los-ciruelos',
  },
] as const;

export const studioIntro = {
  label: '01 / El estudio',
  title: 'Dos trayectorias. Una visión compartida.',
  text: 'MD&C ARQUITECTOS nace de la unión estratégica de MDC Arquitectos y Canales Arquitectos. Integramos la experiencia en arquitectura comercial y corporativa con una sólida trayectoria en arquitectura, urbanismo y desarrollo inmobiliario. Dos equipos complementarios, una visión compartida: crear proyectos que aporten valor a las personas, a los negocios y a la ciudad.',
  more: [
    'Acompañamos a nuestros clientes desde la evaluación de una oportunidad y la conceptualización hasta el desarrollo técnico, la gestión y la ejecución, según el alcance de cada encargo. Nuestro enfoque combina identidad, funcionalidad, calidad arquitectónica y una gestión responsable de la inversión.',
    'Creemos en una arquitectura que trasciende la forma: fortalece la identidad de las marcas, optimiza el uso de los recursos y contribuye a mejorar la calidad de los espacios que habitamos.',
  ],
} as const;

export const areas = {
  label: '02 / Áreas de negocio',
  title: 'Dos especialidades. Una solución integral.',
  items: [
    {
      title: 'Arquitectura comercial y corporativa',
      text: 'Retail, oficinas, gastronomía e interiorismo.',
      href: '/proyectos?categoria=retail',
      projectsLabel: 'Ver proyectos comerciales',
    },
    {
      title: 'Arquitectura y desarrollo inmobiliario',
      text: 'Vivienda, edificios, urbanismo y educación.',
      href: '/proyectos?categoria=inmobiliario',
      projectsLabel: 'Ver proyectos inmobiliarios',
    },
  ],
  transversal: 'Consultoría · Gerencia de proyectos · Construcción',
} as const;

/** Ocho proyectos destacados: cuatro de cada trayectoria, intercalados (orden de la clienta). */
export const homeFeaturedSlugs = [
  'indian-chic-real-plaza-puruchuco',
  'residencial-los-ciruelos',
  'oficinas-porta',
  'centro-empresarial-altavista',
  'starbucks-cayma',
  'multifamiliar-colonial-cissac',
  'cibertec-san-juan-de-lurigancho',
  'casa-asia-golf',
] as const;

export const leadership = {
  label: '04 / Dirección y clientes',
  title: 'Experiencia que respalda cada proyecto.',
} as const;

export const closing = {
  label: '05 / Contacto',
  title: 'Hablemos de su próximo proyecto.',
  text: 'Cuéntenos qué desea desarrollar. Nuestro equipo le ayudará a definir el camino desde la idea hasta su materialización.',
} as const;

/** Página /clientes. TODO-CONFIRMAR: relación y permiso de uso de cada nombre y logotipo. */
export const clientsPage = {
  title: 'La confianza que construye nuestra trayectoria.',
  text: 'A lo largo de nuestras trayectorias hemos colaborado con empresas, marcas, desarrolladores e instituciones de distintos sectores. Cada proyecto representa una oportunidad para construir relaciones duraderas y aportar soluciones a medida.',
  groups: [
    {
      title: 'Marcas y empresas',
      names: [
        'Topitop',
        'Marathon',
        'Porta',
        'H.Stern',
        'Starbucks',
        'KFC',
        'Burger King',
        'Indian Chic',
        'Kuna',
        'Andean',
        'Cassinelli',
        'Celima',
        'DecorCenter',
        'Banco Ripley',
        'Cencosud',
        'New Balance',
        'Vainsa Innova',
        'Mae Alcott',
        'Sole',
        'Madam Tusan',
        'Perulandia',
        'Hard Rock Café',
      ],
    },
    {
      title: 'Desarrolladores e instituciones',
      names: [
        'CISSAC',
        'Armas Doomo',
        'Attura Inmobiliaria',
        'RedBay del Perú',
        'Cibertec',
        'Innova Schools',
        'GLC Constructores e Inmobiliaria',
        'Premier Advisory Services',
        'Dechini',
        'Sarao',
        'Mantto',
      ],
    },
  ],
} as const;
