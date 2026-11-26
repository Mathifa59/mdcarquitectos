import { z } from 'zod';

export const PROJECT_TYPES = [
  'Retail',
  'Inmobiliario',
  'Corporativo',
  'Residencial',
  'Gastronómico',
  'Educativo',
  'Otro',
] as const;

/** Tipo de proyecto del formulario según la categoría del portafolio. */
export const TIPO_BY_CATEGORY: Record<string, (typeof PROJECT_TYPES)[number]> = {
  retail: 'Retail',
  inmobiliario: 'Inmobiliario',
  corporativa: 'Corporativo',
  residencial: 'Residencial',
  gastronomica: 'Gastronómico',
  educacion: 'Educativo',
};

/** Área que recibe la consulta (además de contacto@): comercial → Mariyoli, inmobiliario → José. */
export const AREA_BY_TIPO: Record<string, 'comercial' | 'inmobiliario' | undefined> = {
  Retail: 'comercial',
  Corporativo: 'comercial',
  Gastronómico: 'comercial',
  Inmobiliario: 'inmobiliario',
  Residencial: 'inmobiliario',
  Educativo: 'inmobiliario',
};

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, 'Escriba su nombre.').max(100, 'El nombre es demasiado largo.'),
  email: z.string().trim().pipe(z.email('Escriba un correo válido.')),
  empresa: z.string().trim().max(120, 'El nombre de la empresa es demasiado largo.').optional(),
  telefono: z.string().trim().max(30, 'El teléfono es demasiado largo.').optional(),
  ubicacion: z.string().trim().max(120, 'La ubicación es demasiado larga.').optional(),
  consent: z.literal('on', {
    error: 'Debe aceptar la política de privacidad para enviar su consulta.',
  }),
  tipo: z.enum(PROJECT_TYPES).optional(),
  mensaje: z
    .string()
    .trim()
    .min(10, 'Cuéntenos un poco más sobre su proyecto (mínimo 10 caracteres).')
    .max(3000, 'El mensaje es demasiado largo (máximo 3000 caracteres).'),
});

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<keyof z.infer<typeof contactSchema>, string>>;
  values?: Record<string, string>;
};
