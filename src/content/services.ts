import type { Service } from './types';

/**
 * Textos oficiales de "Definiciones y conceptos de servicios y sub-servicios".
 * Ortografía corregida y redacción pulida sin cambiar el sentido; se unifica el trato en "usted".
 */
export const services: Service[] = [
  {
    slug: 'arquitectura-retail',
    category: 'retail',
    title: 'Arquitectura Retail',
    label: 'Tiendas y centros comerciales',
    intro:
      'La arquitectura retail busca crear una experiencia de compra única y memorable que empieza en un buen diseño, interior y exterior, capaz de atraer e invitar al consumidor a entrar a la tienda. En MD&C llevamos este concepto en nuestro ADN y lo plasmamos en proyectos únicos que se convierten en un éxito comercial para nuestro cliente.',
    cover: { project: 'indian-chic-real-plaza-puruchuco', index: 1 },
    subservices: [
      {
        id: 'diseno',
        short: 'Diseño y conceptualización',
        title: 'Diseño y conceptualización de tiendas',
        text: 'La conceptualización parte de una propuesta de ideas que transmiten la identidad de la marca y sus valores, y las transforma en espacios únicos, rentables y atractivos, donde el consumidor se sienta acogido. Nos inspiramos en la marca y en las tendencias de consumo.',
      },
      {
        id: 'look-feel',
        short: 'Look & Feel',
        title: 'Look & Feel',
        text: '¿Ha pensado qué quiere que perciba y sienta quien entra por primera vez a su tienda? La impresión del primer momento es decisiva para impactar, sorprender y despertar curiosidad. Esos primeros segundos son su oportunidad de crear la magia que engancha; en ellos todo es principalmente visual, pero si detrás no hay un porqué, es difícil conectar. En MD&C somos especialistas en trasladar esas sensaciones a su cliente.',
      },
      {
        id: 'implementacion',
        short: 'Acondicionamiento e implementación',
        title: 'Acondicionamiento e implementación',
        text: 'Acondicionar, implementar y remodelar un espacio es la forma en que plasmamos el diseño y convertimos los sueños en realidad. Sabemos trasladar la esencia de su marca al diseño conceptual y garantizar así el éxito de su local, sin importar la naturaleza ni la escala del proyecto: crear un espacio nuevo o renovar una tienda existente. Con nuestro equipo de arquitectos lo acompañamos desde la definición de sus necesidades hasta la entrega llave en mano.',
      },
      {
        id: 'gerencia',
        short: 'Gerencia de proyectos',
        title: 'Gerencia de proyectos',
        text: 'Aplicamos conocimientos, habilidades, técnicas y herramientas para alcanzar o superar las necesidades y expectativas de nuestros clientes en el desarrollo de una tienda: eso es para nosotros la gerencia de proyectos. En MD&C nos permite equilibrar alcance, tiempo, costo y calidad para que el proyecto sea eficiente.',
      },
      {
        id: 'remodelacion',
        short: 'Remodelación',
        title: 'Remodelación',
        text: 'En MD&C remodelar es comunicar a todos sus clientes nuevas razones para entrar. La imagen que perciban, dentro y fuera de la tienda, provoca un impacto positivo y los hace sentir cómodos y dispuestos a consumir sus productos y servicios. No importa la dimensión de su espacio comercial: el concepto que quiera crear, lo podemos lograr.',
      },
    ],
  },
  {
    slug: 'arquitectura-corporativa',
    category: 'corporativa',
    title: 'Arquitectura Corporativa',
    label: 'Oficinas y espacios de trabajo',
    intro:
      'La arquitectura corporativa refleja las ideas que se quiere asociar a la identidad de la empresa: innovación, calidad, seguridad, profesionalismo y progreso. Sus efectos sobre la cultura empresarial son amplios. En MD&C somos expertos en proyectos corporativos (oficinas, comedores, recepciones, salas de reuniones y demás ambientes) y sabemos trasladar con éxito la imagen de la empresa al lugar de trabajo.',
    cover: { project: 'oficinas-porta', index: 1 },
    subservices: [
      {
        id: 'diseno',
        short: 'Diseño y conceptualización',
        title: 'Diseño y conceptualización de oficinas',
        text: 'La conceptualización parte de una propuesta de ideas que transmiten la identidad de la marca y sus valores, y las transforma en espacios corporativos únicos: un lugar de trabajo armonioso donde el colaborador se sienta cómodo, inspirado en los valores de la empresa.',
      },
      {
        id: 'look-feel',
        short: 'Look & Feel',
        title: 'Look & Feel',
        text: 'El espacio de trabajo debe contribuir al bienestar físico, cognitivo y emocional de sus colaboradores, que así serán más productivos, creativos e innovadores. Si quiere que su ambiente tenga el estilo y transmita la identidad que caracteriza a su empresa, deje su proyecto en nuestras manos: en MD&C somos especialistas en trasladar esas sensaciones.',
      },
      {
        id: 'implementacion',
        short: 'Acondicionamiento e implementación',
        title: 'Acondicionamiento e implementación',
        text: 'Acondicionar, implementar y remodelar un espacio es la forma en que plasmamos el diseño y convertimos los sueños en realidad. Le ayudamos a llevar a cabo los cambios necesarios para el éxito de su empresa y el bienestar de sus empleados. Diseñamos y ejecutamos proyectos de acondicionamiento de oficinas a cualquier escala: nuevos espacios o renovación de ambientes anticuados o en desuso. Con nuestro equipo de arquitectos lo acompañamos desde la definición de sus necesidades hasta la entrega llave en mano.',
      },
      {
        id: 'gerencia',
        short: 'Gerencia de proyectos',
        title: 'Gerencia de proyectos',
        text: 'Aplicamos conocimientos, habilidades, herramientas y técnicas para alcanzar o superar las necesidades y expectativas de nuestros clientes en el desarrollo de una oficina: eso es para nosotros la gerencia de proyectos. En MD&C nos permite equilibrar alcance, tiempo, costo y calidad para que el proyecto sea eficiente.',
      },
      {
        id: 'remodelacion',
        short: 'Remodelación',
        title: 'Remodelación de oficinas',
        text: 'En MD&C remodelar es comunicar a todos sus clientes nuevas razones para entrar. La imagen que perciba su colaborador, dentro y fuera de la oficina, provoca un impacto motivador y lo hace sentir cómodo en un ambiente adecuado para trabajar. No importa la dimensión de su oficina: el concepto que quiera crear, lo podemos lograr.',
      },
    ],
  },
  {
    slug: 'arquitectura-gastronomica',
    category: 'gastronomica',
    title: 'Arquitectura Gastronómica',
    label: 'Restaurantes y cafeterías',
    intro:
      'La arquitectura gastronómica ya es una especialidad dentro de la arquitectura comercial y puede determinar el éxito o el fracaso de un negocio del sector. Los colores, las formas, las texturas y el diseño de iluminación son los elementos fundamentales para crear la atmósfera; los revestimientos, la ventilación, la acústica y la cartelería, interna y externa, son aspectos clave que en MD&C conocemos a la perfección.',
    cover: { project: 'burger-king', index: 0 },
    subservices: [
      {
        id: 'diseno',
        short: 'Diseño y conceptualización',
        title: 'Diseño y conceptualización',
        text: 'El diseño y la conceptualización parten de una propuesta de ideas que transmiten la identidad del restaurante y las convierte en espacios armónicos y únicos, que combinan iluminación, sectorización, materiales y más, para que el comensal llegue, disfrute y permanezca relajado durante toda su estancia.',
      },
      {
        id: 'look-feel',
        short: 'Look & Feel',
        title: 'Look & Feel',
        text: 'Un buen restaurante no se valora solo por su comida: sus ambientes deben crear ese sentimiento especial que conecta a sus clientes con su cocina. Si quiere que su local tenga el estilo que imagina y transmita la identidad que caracteriza a su cocina, deje su proyecto en nuestras manos: en MD&C somos especialistas en trasladar esas sensaciones a sus clientes.',
      },
      {
        id: 'implementacion',
        short: 'Acondicionamiento e implementación',
        title: 'Acondicionamiento e implementación',
        text: 'Acondicionar, implementar y remodelar un espacio es la forma en que plasmamos el diseño y convertimos los sueños en realidad. Le ayudamos a llevar a cabo los cambios necesarios para el éxito de su restaurante y el bienestar de sus clientes. Diseñamos y ejecutamos proyectos de acondicionamiento a cualquier escala: nuevos espacios o renovación de ambientes anticuados o en desuso. Con nuestro equipo de arquitectos lo acompañamos desde la definición de sus necesidades hasta la entrega llave en mano.',
      },
      {
        id: 'gerencia',
        short: 'Gerencia de proyectos',
        title: 'Gerencia de proyectos',
        text: 'Aplicamos conocimientos, habilidades, herramientas y técnicas para alcanzar o superar las necesidades y expectativas de nuestros clientes en el desarrollo de un proyecto gastronómico: eso es para nosotros la gerencia de proyectos. En MD&C nos permite equilibrar alcance, tiempo, costo y calidad para que el proyecto sea eficiente.',
      },
      {
        id: 'remodelacion',
        short: 'Remodelación',
        title: 'Remodelación',
        text: 'En MD&C remodelar es comunicar a todos sus clientes nuevas razones para entrar. La imagen que perciba su comensal, dentro y fuera del restaurante, provoca un impacto positivo y lo hace sentir cómodo en un ambiente especial. No importa la dimensión de su proyecto: el concepto que quiera crear, lo podemos lograr.',
      },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/**
 * Las ocho especialidades de servicio (directrices 2026-11-26), con los textos definitivos de la clienta.
 * `detail` enlaza a la página de servicio ya existente (3 líneas con subservicios); el resto se presenta
 * en /servicios con ancla propia. `category` lleva al portafolio filtrado; `tipo` preselecciona el formulario.
 */
export type ServiceCard = {
  id: string;
  title: string;
  text: string;
  detail?: string;
  category?:
    'retail' | 'inmobiliario' | 'corporativa' | 'residencial' | 'gastronomica' | 'educacion';
  tipo: string;
};

export const serviceCatalog: ServiceCard[] = [
  {
    id: 'arquitectura-comercial-retail',
    title: 'Arquitectura comercial y retail',
    text: 'Diseñamos espacios que fortalecen la identidad de las marcas y mejoran la experiencia de compra. Desarrollamos conceptos, distribución comercial, store planning, visual merchandising, diseño de tiendas, showrooms e implementación.',
    detail: 'arquitectura-retail',
    category: 'retail',
    tipo: 'Retail',
  },
  {
    id: 'desarrollo-inmobiliario-urbanismo',
    title: 'Desarrollo inmobiliario y urbanismo',
    text: 'Evaluamos el potencial de terrenos y desarrollamos propuestas de arquitectura para conjuntos habitacionales, multifamiliares, condominios y habilitaciones urbanas. Integramos estudios de cabida, factibilidad y criterios de eficiencia y valor inmobiliario.',
    category: 'inmobiliario',
    tipo: 'Inmobiliario',
  },
  {
    id: 'arquitectura-corporativa',
    title: 'Arquitectura corporativa',
    text: 'Diseñamos oficinas, sedes empresariales y espacios de trabajo que expresan la cultura de cada organización y responden a sus necesidades de operación.',
    detail: 'arquitectura-corporativa',
    category: 'corporativa',
    tipo: 'Corporativo',
  },
  {
    id: 'arquitectura-residencial',
    title: 'Arquitectura residencial',
    text: 'Proyectamos viviendas, casas de playa y condominios con especial atención al confort, la relación con el entorno y la calidad espacial.',
    category: 'residencial',
    tipo: 'Residencial',
  },
  {
    id: 'arquitectura-gastronomica',
    title: 'Arquitectura gastronómica',
    text: 'Creamos espacios para restaurantes, cafeterías y cadenas gastronómicas, integrando identidad de marca, experiencia del cliente, flujos y requerimientos operativos.',
    detail: 'arquitectura-gastronomica',
    category: 'gastronomica',
    tipo: 'Gastronómico',
  },
  {
    id: 'arquitectura-educativa-institucional',
    title: 'Arquitectura educativa e institucional',
    text: 'Desarrollamos proyectos para instituciones educativas y organizaciones, considerando funcionalidad, flexibilidad, accesibilidad y necesidades de sus usuarios.',
    category: 'educacion',
    tipo: 'Educativo',
  },
  {
    id: 'consultoria-gerencia-proyectos',
    title: 'Consultoría y gerencia de proyectos',
    text: 'Asesoramos en la definición del alcance, estudios preliminares, coordinación de especialidades, planificación, presupuestos, cronogramas y supervisión.',
    tipo: 'Otro',
  },
  {
    id: 'construccion-implementacion',
    title: 'Construcción e implementación',
    text: 'Ejecutamos remodelaciones, acondicionamientos e implementaciones con coordinación de equipos, control de calidad y seguimiento del presupuesto y del cronograma. Ofrecemos entregas llave en mano cuando el contrato lo contempla.',
    tipo: 'Otro',
  },
];
