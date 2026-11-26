/** Datos globales del estudio. Editar aquí; todo el sitio los consume. */
export const site = {
  name: 'MD&C Arquitectos',
  legalName: 'Medios de Diseño y Construcción S.A.C.',
  url: 'https://www.mdc-arquitectos.com',
  tagline: 'Arquitectura · Consultoría · Construcción',
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
  /**
   * Contacto por área (directrices 2026-11-26). `email` de José: la clienta pidió josecanales@; el buzón
   * real en Yachay es jose.canales@, así que josecanales@ debe existir como alias/reenviador.
   */
  contacts: {
    comercial: {
      label: 'Arquitectura comercial',
      person: 'Mariyoli Delgado de Rivero',
      email: 'mariyolidelgado@mdc-arquitectos.com',
      phone: { number: '51986622055', display: '+51 986 622 055' },
    },
    inmobiliario: {
      label: 'Desarrollo inmobiliario',
      person: 'José Canales López',
      email: 'josecanales@mdc-arquitectos.com',
      phone: { number: '51992777828', display: '+51 992 777 828' },
    },
  },
  // Redes oficiales entregadas por la clienta (2026-11-26).
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/mdcarquitectos/' },
    { label: 'Facebook', href: 'https://www.facebook.com/mdcarquitecturacomercial' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mdc-arquitectura-comercial/' },
  ] as { label: string; href: string }[],
  // Cifras globales (+30 años, +80 proyectos, m², marcas) ocultas hasta validarlas con la clienta (directrices 2026-11-26).
  countries: ['Perú', 'Colombia', 'Bolivia', 'Venezuela'],
} as const;

/** Frase de cierre antes del footer: tres opciones propuestas (se usa la primera). */
export const closingPhrases = [
  'Donde el diseño se convierte en experiencia',
  'Espacios que se recuerdan, marcas que se eligen',
  'Diseñamos el lugar donde su marca cobra vida',
] as const;

export const whatsappUrl = (
  message: string = site.whatsapp.message,
  number: string = site.whatsapp.number,
) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

export const nav = [
  { href: '/', label: 'Inicio', caption: 'Dos trayectorias, una visión compartida' },
  { href: '/estudio', label: 'El estudio', caption: 'Fundadores y equipo' },
  { href: '/servicios', label: 'Servicios', caption: 'De la idea a la entrega llave en mano' },
  { href: '/proyectos', label: 'Proyectos', caption: 'Comercial, inmobiliario y más' },
  {
    href: '/clientes',
    label: 'Clientes',
    caption: 'La confianza que construye nuestra trayectoria',
  },
  { href: '/contacto', label: 'Contacto', caption: 'Hablemos de su proyecto' },
] as const;
