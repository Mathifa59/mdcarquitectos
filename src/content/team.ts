import type { TeamMember } from './types';

/**
 * Textos de "Nuestros fundadores" entregados por la clienta (2026-11-25).
 * TODO-CONFIRMAR: el texto original decía "más de 60 proyectos, 140,000 m² y 40 marcas"; se usan las
 * cifras oficiales vigentes (+80 proyectos, +160 000 m², +70 marcas) para no contradecir el resto del sitio.
 */
export const mariyoli: TeamMember = {
  slug: 'mariyoli-delgado',
  published: true,
  name: 'Mariyoli Delgado de Rivero',
  role: 'Socia fundadora',
  headline: 'Arquitectura Comercial, Retail y Gestión de Proyectos',
  photo: 'team/mariyoli-delgado',
  initials: 'MD',
  bio: [
    'Arquitecta de Interiores egresada de la Universidad Orval, fundadora y gerente general de Medios de Diseño y Construcción S.A.C. – MDC Arquitectos.',
    'Cuenta con una amplia trayectoria profesional en arquitectura comercial, retail, Store Planning, Visual Merchandising, diseño de interiores e implementación de espacios comerciales y corporativos.',
    'A lo largo de su carrera ha liderado más de 80 proyectos, superando los 160 000 m² desarrollados y trabajando con más de 70 marcas nacionales e internacionales en Perú, Colombia, Bolivia y Venezuela.',
    'Su experiencia comprende el desarrollo de tiendas, restaurantes, showrooms, oficinas corporativas, centros de salud y viviendas, integrando el diseño arquitectónico con la estrategia comercial y la rentabilidad del negocio.',
    'Especialista en la gestión integral de proyectos, lidera equipos multidisciplinarios desde la conceptualización y el desarrollo técnico hasta la ejecución, supervisión y entrega final de las obras.',
    'En MD&C ARQUITECTOS lidera el área de arquitectura comercial, retail, diseño de interiores e implementación de proyectos, ofreciendo soluciones que fortalecen la identidad de las marcas, optimizan la inversión y mejoran la experiencia del consumidor.',
  ],
  clients: {
    title: 'Principales marcas y clientes',
    text: 'Vainsa Innova, Decor Center, Cassinelli, Celima, Marathon, Kuna, Andean, Porta, Mae Alcott, Sole, Starbucks, KFC, Burger King, Madam Tusan, Topitop, Indian, Perulandia y Hard Rock Café, entre otros.',
  },
  facts: [
    { label: 'Formación', value: 'Arquitecta de Interiores, Universidad Orval' }, // TODO-CONFIRMAR: nombre oficial
    { label: 'Experiencia', value: 'Más de 30 años' },
    {
      label: 'Especialidades',
      value: 'Store Planning · Visual Merchandising · Gestión integral de proyectos',
    },
    { label: 'Presencia', value: 'Perú · Colombia · Bolivia · Venezuela' },
  ],
  // TODO-CONFIRMAR: la clienta envió "28 años · +140,000 m² · +60 proyectos · +40 marcas · 4 países".
  // Se usan las cifras oficiales vigentes (las mismas del resto del sitio) para no contradecirlas.
  stats: [
    { value: 30, prefix: '+', label: 'años de experiencia profesional' },
    { value: 160000, prefix: '+', label: 'm² desarrollados' },
    { value: 80, prefix: '+', label: 'proyectos' },
    { value: 70, prefix: '+', label: 'marcas nacionales e internacionales' },
    { value: 4, label: 'países de experiencia internacional' },
  ],
  cv: { href: '/docs/cv-mariyoli-delgado-de-rivero.pdf', label: 'Descargar CV' },
  // La clienta encontró confuso "Proyectos Retail" (parecía una categoría): ahora se listan por estudio autor.
  projectsTitle: 'Proyectos de MD&C',
  projectsBy: 'mdc',
};

/**
 * Arq. José Canales López. Fuentes: "Nuestros fundadores", PPT "CV PEPE ULT" y Word "Canales Arquitectos 2021".
 * Retrato provisto por la clienta (aspecto generado con IA: sustituir por foto real cuando exista). Sin PDF de CV (solo existe el PPT).
 */
export const jose: TeamMember = {
  slug: 'jose-canales',
  published: true,
  name: 'José Canales López',
  role: 'Socio fundador',
  headline: 'Arquitectura, Urbanismo y Desarrollo Inmobiliario',
  photo: 'team/jose-canales',
  initials: 'JC',
  bio: [
    'Arquitecto graduado de la Facultad de Arquitectura y Urbanismo de la Universidad Ricardo Palma, colegiado con registro CAP N.° 1145, con más de cuatro décadas de experiencia profesional.',
    'Gerente General de Canales Arquitectos S.A.C., exdecano nacional del Colegio de Arquitectos del Perú durante el período 2002-2005 y presidente del Consejo Nacional de Exdecanos del CAP desde 2022.',
    'Su destacada trayectoria comprende el desarrollo de grandes conjuntos habitacionales, edificios multifamiliares, habilitaciones urbanas, condominios, centros empresariales, instituciones educativas, hoteles y entidades bancarias.',
    'Ganador de numerosos concursos nacionales de arquitectura y miembro del jurado de la Bienal Nacional e Iberoamericana de Arquitectura, ha consolidado una trayectoria que combina excelencia arquitectónica, liderazgo institucional y visión empresarial.',
    'Su experiencia abarca proyectos inmobiliarios de gran envergadura, integrando estudios de factibilidad, análisis de rentabilidad, planificación urbana y desarrollo arquitectónico.',
    'En MD&C ARQUITECTOS lidera el área de desarrollo inmobiliario, aportando su conocimiento técnico, normativo y estratégico para transformar oportunidades de inversión en proyectos arquitectónicos de alto valor.',
  ],
  clients: {
    title: 'Principales clientes y proyectos',
    text: 'CISSAC, Armas Doomo, Attura Inmobiliaria, RedBay del Perú, CIBERTEC, Innova Schools, Villa Médica, Residencial Los Ciruelos, Casaparq Monterrico y Torres de San Borja, entre otros.',
  },
  facts: [
    { label: 'Colegiatura', value: 'CAP N.° 1145' },
    {
      label: 'Formación',
      value: 'Facultad de Arquitectura y Urbanismo, Universidad Ricardo Palma',
    },
    { label: 'Experiencia', value: 'Más de cuatro décadas' },
    { label: 'Estudio', value: 'Canales Arquitectos S.A.C. · desde 2013' },
  ],
  stats: [
    { value: 40, prefix: '+', label: 'años de experiencia profesional' },
    { value: 14, label: 'premios y menciones honrosas' },
    { value: 5, label: 'primeros puestos en concursos de arquitectura' },
    { value: 8, label: 'buenas pro en concursos públicos' },
    { value: '2002–2005', label: 'Decano Nacional del CAP' },
  ],
  projectsTitle: 'Proyectos de Canales Arquitectos',
  projectsBy: 'canales',
  sections: [
    {
      title: 'Cargos y trayectoria gremial',
      items: [
        { text: 'Gerente General de Canales Arquitectos SAC', note: '2013 – actualidad' },
        {
          text: 'Presidente del Consejo Nacional de ex Decanos del CAP',
          note: '2022 – actualidad',
        },
        { text: 'Decano Nacional del CAP', note: '2002 – 2005' },
        {
          text: 'Miembro del Consejo Nacional del Colegio de Arquitectos del Perú',
          note: '1995 – 1998',
        },
        { text: 'Miembro del jurado de la Bienal Nacional e Iberoamericana' },
        { text: 'Delegado municipal del CAP, unidad calificada de la zona del Callao' },
        { text: 'Miembro de la comisión encargada de revisar el reglamento de concursos del CAP' },
        { text: 'Director de concursos y delegaciones' },
        { text: 'Miembro de la comisión del patrimonio nacional del CAP' },
        { text: 'Miembro de la comisión del reglamento nacional de concursos' },
        { text: 'Representante del CAP y miembro de CAPECO' },
        {
          text: 'Miembro del comité comunal consultivo de desarrollo urbano de la Municipalidad de La Molina',
        },
        { text: 'Delegado municipal del CAP ante la Municipalidad de Miraflores' },
        { text: 'Delegado municipal del CAP ante la Municipalidad de San Isidro' },
        { text: 'Miembro del comité ejecutivo del concurso de calidad arquitectónica' },
        { text: 'Miembro del directorio de la revista CAP' },
      ],
    },
    {
      title: 'Participación en concursos auspiciados por el CAP',
      items: [
        { text: 'Banco Industrial del Perú, Arequipa', note: '1.er puesto' },
        { text: 'Banco Industrial del Perú, Tacna', note: '1.er puesto' },
        { text: 'Banco Industrial del Perú, Piura', note: '1.er puesto' },
        { text: 'Ministerio de Vivienda: Torres de San Borja', note: '1.er puesto' },
        {
          text: 'Sociedad de Beneficencia Pública: Conjunto Habitacional Palomino',
          note: '1.er puesto',
        },
        { text: 'Banco Central Hipotecario: Conjunto Habitacional Polo Hunt', note: '2.º puesto' },
        {
          text: 'Organismo Regional de Desarrollo: Complejo Turístico Recreacional, Puno',
          note: '2.º puesto',
        },
        { text: 'Banco Agrario del Perú, Huaraz', note: '2.º puesto' },
        {
          text: 'Universidad Nacional Mayor de San Marcos: Oficina del Rectorado',
          note: '2.º puesto',
        },
        { text: 'Banco Central Hipotecario, Huaraz', note: '3.er puesto' },
        {
          text: 'Ministerio de Transportes y Comunicaciones: Terminal aéreo de Puerto Maldonado',
          note: '3.er puesto',
        },
        { text: 'Banco Central Hipotecario: Centro Cívico de Mollendo', note: 'Mención honrosa' },
        {
          text: 'Oficina Nacional de Registros Públicos: Nuevo local de Registros Públicos, Lima',
          note: 'Mención honrosa',
        },
        { text: 'Inmobiliaria Los Pacaes: Utopía del Soltero', note: 'Mención honrosa' },
      ],
    },
    {
      title: 'Participación en concursos públicos',
      items: [
        { text: 'Banco de la Nación, Moquegua', note: 'Buena pro' },
        { text: 'Ministerio de Educación: C.N.N. INIED, Arequipa', note: 'Buena pro' },
        {
          text: 'Ministerio de Justicia, Defensa: Centro de internamiento El Frontón',
          note: 'Buena pro',
        },
        { text: 'SUNAD: Puesto de control Tomasiri, Tacna', note: 'Buena pro' },
        { text: 'SUNAD: Puesto de control Cancas, Tumbes', note: 'Buena pro' },
        { text: 'IMPE: Ampliación del centro de reclusión de Huacho', note: 'Buena pro' }, // TODO-CONFIRMAR: ¿INPE?
        { text: 'IMPE: Ampliación del centro de reclusión de Chincha', note: 'Buena pro' },
        {
          text: 'IMPE: Centro de estudios criminológicos y penitenciarios, Callao',
          note: 'Buena pro',
        },
      ],
    },
  ],
};

/**
 * Arq. Renato Canales Delgado. Retrato provisto por la clienta (2026-11-25).
 * TODO-CONFIRMAR: falta su biografía, cifras y CV. Sin biografía solo se muestra la tarjeta (foto,
 * nombre y cargo) en /estudio; al agregar `bio` se genera su página de perfil. Sin `cv` no hay botón.
 */
export const renato: TeamMember = {
  slug: 'renato-canales-delgado',
  published: true,
  name: 'Renato Canales Delgado',
  role: 'Arquitecto asociado', // TODO-CONFIRMAR: cargo
  photo: 'team/renato-canales-delgado',
  initials: 'RC',
  bio: [],
};

export const team: TeamMember[] = [mariyoli, jose, renato];
/** Quienes aparecen en la web (tarjeta en /estudio). */
export const publishedTeam = team.filter((m) => m.published && m.name && m.role);
/** Quienes además tienen biografía: solo ellos tienen página de perfil. */
export const profileTeam = publishedTeam.filter((m) => m.bio.length > 0);
export const memberBySlug = (slug: string) => profileTeam.find((m) => m.slug === slug);

/** Titular y propósito tomados del CV (no son una cita textual). */
export const mariyoliHeadline =
  'Arquitecta Consultora Senior / Especialista en Arquitectura Comercial, Retail y Gestión Integral de Proyectos';
export const mariyoliPurpose = 'Crear espacios para experiencias únicas.';
