'use server';

import { Resend } from 'resend';
import { site } from '@/content/site';
import { contactSchema, type ContactState } from '@/lib/contact';
import { consultaHtml } from '@/lib/contactEmail';

const str = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v : '');

/** Server Action del formulario de contacto: honeypot + validación con zod + envío con Resend. */
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    nombre: str(formData.get('nombre')),
    email: str(formData.get('email')),
    telefono: str(formData.get('telefono')),
    tipo: str(formData.get('tipo')),
    mensaje: str(formData.get('mensaje')),
  };

  // Antispam: el campo "website" está oculto para personas; un bot lo rellena.
  // También se descartan envíos en menos de 2 s desde que se montó el formulario.
  const honeypot = str(formData.get('website'));
  const started = Number(str(formData.get('started')));
  if (honeypot || (started && Date.now() - started < 2000)) {
    return { status: 'success' };
  }

  const parsed = contactSchema.safeParse({
    ...values,
    telefono: values.telefono || undefined,
    tipo: values.tipo || undefined,
  });
  if (!parsed.success) {
    const errors: NonNullable<ContactState['errors']> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof errors;
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return { status: 'error', message: 'Revise los campos marcados.', errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error('[contacto] Faltan RESEND_API_KEY o CONTACT_TO_EMAIL');
    return {
      status: 'error',
      message:
        'El envío no está disponible por ahora. Escríbanos por WhatsApp y le respondemos de inmediato.',
      values,
    };
  }

  const d = parsed.data;
  const text = [
    `Nueva consulta desde ${site.url}`,
    '',
    `Nombre: ${d.nombre}`,
    `Correo: ${d.email}`,
    `Teléfono: ${d.telefono ?? '—'}`,
    `Tipo de proyecto: ${d.tipo ?? '—'}`,
    '',
    'Mensaje:',
    d.mensaje,
  ].join('\n');

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} Web <onboarding@resend.dev>`,
      to: [to],
      replyTo: d.email,
      subject: `Consulta web: ${d.nombre}${d.tipo ? ` · ${d.tipo}` : ''}`,
      text,
      html: consultaHtml(d, site.url, site.name),
    });
    if (error) throw new Error(error.message);
  } catch (e) {
    console.error('[contacto] Error al enviar', e);
    return {
      status: 'error',
      message: 'No pudimos enviar su mensaje. Inténtelo de nuevo o escríbanos por WhatsApp.',
      values,
    };
  }

  return { status: 'success' };
}
