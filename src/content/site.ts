/** Datos globales del estudio. Editar aquí; todo el sitio los consume. */
export const site = {
  name: 'MD&C Arquitectos',
  legalName: 'Medios de Diseño y Construcción S.A.C.',
  url: 'https://www.mdc-arquitectos.com',
  tagline: 'Arquitectura comercial · Retail · Corporativa · Gastronómica',
  whatsapp: {
    number: '51986622055',
    display: '+51 986 622 055',
    message: 'Hola, vengo de la web de MD&C Arquitectos y quiero información sobre un proyecto.',
  },
  address: {
    street: 'Av. La Encalada 1010, Of. 702',
    district: 'Surco',
    city: 'Lima',
    country: 'Perú',
    // TODO-CONFIRMAR: dirección referencial
    geo: { lat: -12.1059924, lon: -76.9709862 },
  },
  // TODO-CONFIRMAR: correo aún no verificado por la clienta
  email: 'contacto@mdc-arquitectos.com',
  // Redes oficiales entregadas por la clienta (2026-11-26).
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/mdcarquitectos/' },
    { label: 'Facebook', href: 'https://www.facebook.com/mdcarquitecturacomercial' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mdc-arquitectura-comercial/' },
  ] as { label: string; href: string }[],
  stats: [
    { value: 30, prefix: '+', label: 'años de experiencia' },
    { value: 80, prefix: '+', label: 'proyectos' },
    { value: 160000, prefix: '+', label: 'm² construidos' },
    { value: 70, prefix: '+', label: 'marcas' },
  ],
  countries: ['Perú', 'Colombia', 'Bolivia', 'Venezuela'],
} as const;

/** Frase de cierre antes del footer: tres opciones propuestas (se usa la primera). */
export const closingPhrases = [
  'Donde el diseño se convierte en experiencia',
  'Espacios que se recuerdan, marcas que se eligen',
  'Diseñamos el lugar donde su marca cobra vida',
] as const;

export const whatsappUrl = (message: string = site.whatsapp.message) =>
  `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const nav = [
  { href: '/proyectos', label: 'Proyectos', caption: 'Retail, corporativa y gastronómica' },
  { href: '/servicios', label: 'Servicios', caption: 'De la idea a la entrega llave en mano' },
  { href: '/estudio', label: 'Estudio', caption: 'Más de 30 años creando espacios' },
  { href: '/contacto', label: 'Contacto', caption: 'Conversemos sobre su proyecto' },
] as const;
