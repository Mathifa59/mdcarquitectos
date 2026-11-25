'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { sendContact } from '@/app/contacto/actions';
import { PROJECT_TYPES, type ContactState } from '@/lib/contact';
import { whatsappUrl } from '@/content/site';
import { WhatsAppIcon } from '../WhatsAppIcon';
import { Select } from './Select';

const initial: ContactState = { status: 'idle' };

const fieldBase =
  'w-full border-0 border-b border-ink/25 bg-transparent px-0 py-4 text-[1.0625rem] outline-none transition-[border-color,box-shadow] duration-500 placeholder:text-stone/60 focus:border-ink focus:shadow-[0_1px_0_0_var(--color-ink)] focus-visible:outline-none';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      data-cursor="link"
      className="label group bg-ink text-bone hover:bg-brand relative inline-flex items-center gap-4 overflow-hidden rounded-full px-9 py-5 transition-colors duration-500 disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? 'Enviando…' : 'Enviar mensaje'}
      <span
        aria-hidden="true"
        className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="label text-stone">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-brand mt-2 text-[0.9rem]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Formulario de contacto (Server Action + Resend). El botón de WhatsApp es la alternativa siempre visible. */
export function ContactForm() {
  const [state, action] = useActionState(sendContact, initial);
  const v = state.values ?? {};
  const err = state.errors ?? {};

  if (state.status === 'success') {
    return (
      <div role="status" className="border-ink/20 border-t pt-10">
        <p className="label text-stone">Mensaje enviado</p>
        <h2 className="display mt-6 text-[clamp(2.25rem,1.2rem+3.6vw,5rem)]">
          Gracias. Le responderemos pronto.
        </h2>
        <p className="text-stone mt-6 max-w-[40ch]">
          Si su consulta es urgente, también puede escribirnos directamente por WhatsApp.
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="label border-ink/30 hover:border-ink hover:bg-ink hover:text-bone mt-10 inline-flex items-center gap-3 rounded-full border px-8 py-5 transition-colors duration-500"
        >
          <WhatsAppIcon className="size-4" /> Escribir por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      onFocusCapture={(e) => {
        // Marca de tiempo del primer foco (antispam: se rechazan envíos instantáneos).
        const el = e.currentTarget.elements.namedItem('started') as HTMLInputElement | null;
        if (el && !el.value) el.value = String(Date.now());
      }}
      className="space-y-8"
      aria-describedby="form-status"
    >
      {/* Honeypot: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No rellenar este campo
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="started" defaultValue="" />

      <div id="form-status" aria-live="polite">
        {state.status === 'error' && state.message && (
          <p role="alert" className="border-brand text-brand border-l-2 pl-4 text-[1rem]">
            {state.message}
          </p>
        )}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="nombre" label="Nombre *" error={err.nombre}>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            required
            defaultValue={v.nombre}
            aria-invalid={Boolean(err.nombre)}
            aria-describedby={err.nombre ? 'nombre-error' : undefined}
            className={fieldBase}
            placeholder="Su nombre"
          />
        </Field>
        <Field id="email" label="Correo *" error={err.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={v.email}
            aria-invalid={Boolean(err.email)}
            aria-describedby={err.email ? 'email-error' : undefined}
            className={fieldBase}
            placeholder="nombre@empresa.com"
          />
        </Field>
        <Field id="telefono" label="Teléfono" error={err.telefono}>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            defaultValue={v.telefono}
            aria-invalid={Boolean(err.telefono)}
            aria-describedby={err.telefono ? 'telefono-error' : undefined}
            className={fieldBase}
            placeholder="Opcional"
          />
        </Field>
        <Field id="tipo" label="Tipo de proyecto" error={err.tipo}>
          <Select
            id="tipo"
            name="tipo"
            options={PROJECT_TYPES}
            placeholder="Seleccione (opcional)"
            defaultValue={v.tipo ?? ''}
          />
        </Field>
      </div>

      <Field id="mensaje" label="Cuéntenos sobre su proyecto *" error={err.mensaje}>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          defaultValue={v.mensaje}
          aria-invalid={Boolean(err.mensaje)}
          aria-describedby={err.mensaje ? 'mensaje-error' : undefined}
          className={`${fieldBase} resize-y`}
          placeholder="Ubicación, tipo de local, m² aproximados, plazos…"
        />
      </Field>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Submit />
        <p className="text-stone max-w-[34ch] text-[0.8125rem] leading-relaxed">
          Usaremos sus datos solo para responder su consulta.
        </p>
      </div>
    </form>
  );
}
