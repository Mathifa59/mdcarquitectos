'use client';

import { useEffect } from 'react';
import { whatsappUrl } from '@/content/site';

/** Error inesperado en una página: permite reintentar o escribir por WhatsApp. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section
      data-header-theme="dark"
      className="bg-ink text-bone relative flex min-h-[100svh] flex-col justify-end"
    >
      <div className="shell pt-[calc(var(--header-h)+4rem)] pb-[clamp(3rem,7vw,6rem)]">
        <p className="label text-bone/70 mb-6">Algo salió mal</p>
        <h1 className="display t-h2 max-w-[14ch]">No pudimos cargar esta página</h1>
        <p className="t-lead text-bone/80 mt-8 max-w-[30ch]">
          Inténtelo de nuevo. Si el problema continúa, escríbanos y lo resolvemos.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            data-cursor="link"
            className="label bg-bone text-ink hover:bg-brand hover:text-bone rounded-full px-8 py-5 transition-colors duration-500"
          >
            Reintentar
          </button>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="label border-bone/30 hover:border-bone hover:bg-bone hover:text-ink rounded-full border px-8 py-5 transition-colors duration-500"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
