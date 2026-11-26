/**
 * Textos institucionales entregados por la clienta (se publican tal cual, sin reescribir).
 * Fuente: dos documentos pegados en el chat el 2026-11-25 ("Introducción" y "Quiénes somos").
 *
 * TODO-CONFIRMAR con la clienta:
 *  - "edificaciones, educación, nuestra firma…" en `about.leaders` parece una errata; se deja textual.
 *  - Datos de la Arq. José Canales López (foto, cargo, bio) para su tarjeta en /estudio.
 *  - Si las 7 líneas de negocio deben reflejarse también en /servicios (hoy hay 3 líneas oficiales).
 */

export const slogan = 'Ideas que construyen espacios extraordinarios.';

export const intro = {
  title: 'MD&C ARQUITECTOS',
  slogan,
  paragraphs: [
    'MD&C ARQUITECTOS nace de la fusión estratégica de dos empresas especializadas, que integran experiencia, conocimiento y visión empresarial en el sector de la arquitectura y la construcción.',
    'Por un lado, la trayectoria de la Arq. Mariyoli Delgado de Rivero, especializada en arquitectura comercial, proyectos de retail, diseño de interiores e implementación de espacios corporativos y comerciales.',
    'Por otro, la experiencia del Arq. José Canales López, especializado en el desarrollo de proyectos inmobiliarios, arquitectura residencial y edificaciones entre otros.',
    'Esta unión consolida una firma multidisciplinaria capaz de ofrecer soluciones integrales, acompañando a nuestros clientes desde el estudio de inversión inmobiliario, conceptualización y el desarrollo del proyecto hasta su ejecución y entrega final.',
  ],
  linesTitle: 'Nuestras principales líneas de negocio:',
  lines: [
    'Arquitectura comercial y retail.',
    'Proyectos inmobiliarios.',
    'Arquitectura corporativa y residencial.',
    'Diseño de interiores.',
    'Implementación y ejecución de obras.',
    'Gerencia y supervisión de proyectos.',
    'Consultoría arquitectónica.',
  ],
  closingParagraph:
    'Integramos creatividad, experiencia y excelencia técnica para desarrollar proyectos que generen valor, optimicen la inversión y trasciendan en el tiempo.',
  closingLine: 'Dos trayectorias. Una visión compartida. Una nueva dimensión de la arquitectura.',
} as const;

export const about = {
  title: 'Quiénes somos',
  // 2026-11-26: la clienta pidió que la introducción presente a la firma como resultado de la fusión de dos empresas.
  lead: 'Somos el resultado de la fusión de dos empresas: dos trayectorias, una visión compartida y el compromiso de transformar espacios en experiencias extraordinarias.',
  paragraphs: [
    'MD&C ARQUITECTOS nace de la fusión estratégica de dos empresas con una sólida trayectoria en el sector de la arquitectura y la construcción, uniendo experiencia, creatividad y conocimiento especializado.',
    // TODO-CONFIRMAR: "educación," parece una errata; texto textual de la clienta.
    'Liderada por la Arq. Mariyoli Delgado de Rivero, especialista en arquitectura comercial, retail, diseño de interiores e implementación de espacios, y el Arq. José Canales López, especialista en el desarrollo de proyectos inmobiliarios y edificaciones, educación, nuestra firma integra dos visiones complementarias para ofrecer soluciones arquitectónicas de alto valor.',
    'Desarrollamos proyectos integrales, acompañando a nuestros clientes desde la conceptualización y el diseño hasta la ejecución y entrega final, con especial atención a la funcionalidad, la estética, la innovación y la rentabilidad de cada inversión.',
    'Creemos en una arquitectura que no solo transforma espacios, sino que potencia negocios, genera oportunidades y mejora la calidad de vida de las personas.',
    'Nuestra experiencia, compromiso y capacidad de gestión nos permiten afrontar proyectos de diferentes escalas y niveles de complejidad, construyendo relaciones de confianza a largo plazo con nuestros clientes.',
  ],
  signature: 'MD&C ARQUITECTOS',
  slogan,
} as const;

/** "Nuestros fundadores": texto entregado por la clienta (2026-11-25). */
export const founders = {
  title: 'Nuestros fundadores',
  tagline: 'Dos trayectorias profesionales. Una visión empresarial compartida.',
  lead: 'La experiencia y especialización de nuestros fundadores constituyen los pilares de MD&C ARQUITECTOS, integrando el desarrollo inmobiliario, la arquitectura comercial y la ejecución integral de proyectos.',
  shared: {
    title: 'Una visión compartida',
    paragraphs: [
      'La unión de ambas trayectorias consolida una firma multidisciplinaria que integra arquitectura, inversión inmobiliaria, estrategia comercial, diseño y construcción.',
      'Nuestro compromiso es transformar cada oportunidad en un proyecto exitoso, ofreciendo soluciones integrales que aporten identidad, funcionalidad, rentabilidad y valor a largo plazo.',
    ],
    signature: 'MD&C ARQUITECTOS',
    slogan,
  },
} as const;
