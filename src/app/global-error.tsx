'use client';

/** Último recurso si falla el layout raíz: página mínima con la identidad de marca. */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es-PE">
      <body
        style={{
          margin: 0,
          background: '#0E0E0E',
          color: '#F3F1EC',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <main
          style={{
            minHeight: '100svh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div>
            <p
              style={{
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              MD&amp;C Arquitectos
            </p>
            <h1
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                letterSpacing: '-0.04em',
                margin: '1rem 0',
              }}
            >
              Algo salió mal
            </h1>
            <button
              onClick={reset}
              style={{
                padding: '1rem 2rem',
                borderRadius: 999,
                border: 0,
                background: '#F3F1EC',
                color: '#0E0E0E',
                cursor: 'pointer',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Reintentar
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
