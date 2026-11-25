import { z } from 'zod';

export const PROJECT_TYPES = [
  'Retail / tienda',
  'Corporativa / oficinas',
  'Gastronómica / restaurante',
  'Residencial / inmobiliario',
  'Educación',
  'Otro',
] as const;

export const contactSchema = z.object({
  nombre: z.string().trim().min(2, 'Escriba su nombre.').max(100, 'El nombre es demasiado largo.'),
  email: z.string().trim().pipe(z.email('Escriba un correo válido.')),
  telefono: z.string().trim().max(30, 'El teléfono es demasiado largo.').optional(),
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
