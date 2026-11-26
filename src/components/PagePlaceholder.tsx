import { TransitionLink } from './TransitionLink';

/** Marcador temporal de la Fase 1: prueba header, tema y transiciones. */
export function PagePlaceholder({
  label,
  title,
  phase,
}: {
  label: string;
  title: string;
  phase: string;
}) {
  return (
    <>
      <section
        data-header-theme="dark"
        className="bg-ink text-bone relative flex min-h-[100svh] flex-col justify-end pb-16"
      >
        <div className="shell">
          <p className="label text-bone/60 mb-6">{label}</p>
          <h1 className="display t-h1 max-w-[12ch]">{title}</h1>
          <p className="label text-topo mt-10">En construcción · {phase}</p>
        </div>
      </section>
      <section className="shell grid min-h-[120svh] content-start gap-10 py-32">
        <p className="t-lead max-w-[28ch]">
          Sección de prueba para verificar el scroll suave, el header que se oculta y los temas
          claro/oscuro.
        </p>
        <TransitionLink href="/" className="label link-draw w-fit">
          Volver al inicio
        </TransitionLink>
      </section>
    </>
  );
}
