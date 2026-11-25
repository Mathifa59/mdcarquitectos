import type { Metadata } from 'next';
import { site } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = {
  ...pageMeta({
    title: 'Política de privacidad',
    path: '/privacidad',
    description: `Cómo ${site.name} trata los datos personales que recibe por su formulario de contacto, conforme a la Ley N.º 29733.`,
  }),
};

const UPDATED = '25 de noviembre de 2026';

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: 'Quién es el titular del banco de datos',
    body: (
      <>
        <p>
          {site.legalName} («{site.name}»), con domicilio en {site.address.street},{' '}
          {site.address.district}, {site.address.city}, {site.address.country}, es responsable del
          tratamiento de los datos personales que usted nos entrega a través de este sitio web (
          {site.url.replace(/^https?:\/\//, '')}).
        </p>
        {/* TODO-CONFIRMAR: RUC y, si corresponde, número de inscripción del banco de datos ante la ANPD. */}
      </>
    ),
  },
  {
    title: 'Qué datos recogemos',
    body: (
      <>
        <p>Solo los que usted escribe en el formulario de contacto:</p>
        <ul>
          <li>nombre y correo electrónico (obligatorios);</li>
          <li>teléfono y tipo de proyecto (opcionales);</li>
          <li>el contenido de su mensaje.</li>
        </ul>
        <p>
          Si nos escribe por WhatsApp o por correo, recibimos los datos que usted decida compartir
          en esa conversación.
        </p>
      </>
    ),
  },
  {
    title: 'Para qué los usamos',
    body: (
      <>
        <p>
          Usamos sus datos únicamente para responder su consulta, enviarle información o una
          propuesta sobre el proyecto que nos plantea y, si resulta en una relación comercial,
          gestionarla. No los usamos para publicidad masiva ni los vendemos o cedemos a terceros con
          fines comerciales.
        </p>
      </>
    ),
  },
  {
    title: 'Base legal',
    body: (
      <p>
        El tratamiento se basa en su consentimiento, que usted otorga al enviar voluntariamente el
        formulario, conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su
        Reglamento.
      </p>
    ),
  },
  {
    title: 'Con quién los compartimos',
    body: (
      <>
        <p>
          Para operar el sitio y atender su consulta recurrimos a proveedores que tratan datos por
          encargo nuestro y bajo nuestras instrucciones:
        </p>
        <ul>
          <li>Vercel Inc., que aloja el sitio web;</li>
          <li>Resend, que envía a nuestro correo el mensaje que usted escribe en el formulario;</li>
          <li>nuestro proveedor de correo corporativo, donde se almacena la consulta recibida.</li>
        </ul>
        <p>
          Estos proveedores pueden operar fuera del Perú, por lo que sus datos pueden ser objeto de
          transferencia internacional. Solo se transfieren los datos necesarios para prestar el
          servicio.
        </p>
      </>
    ),
  },
  {
    title: 'Cuánto tiempo los conservamos',
    body: (
      <p>
        Conservamos sus datos durante el tiempo necesario para atender su consulta y, si hay una
        relación comercial, mientras esta dure y las obligaciones legales lo exijan. Luego los
        eliminamos o bloqueamos.
      </p>
    ),
  },
  {
    title: 'Cookies y tecnologías similares',
    body: (
      <p>
        Este sitio no utiliza cookies de publicidad ni de seguimiento, ni herramientas de analítica
        de terceros. Solo usa almacenamiento técnico del navegador para recordar que ya se mostró la
        animación de inicio durante su visita. Si en el futuro incorporamos analítica, lo
        indicaremos aquí.
      </p>
    ),
  },
  {
    title: 'Sus derechos',
    body: (
      <>
        <p>
          Usted puede ejercer en cualquier momento sus derechos de información, acceso,
          rectificación, cancelación, oposición y revocación del consentimiento. Escríbanos a{' '}
          <a href={`mailto:${site.email}`} className="link-draw">
            {site.email}
          </a>{' '}
          indicando su nombre, el derecho que desea ejercer y una copia de su documento de
          identidad. Le responderemos dentro de los plazos que fija la ley.
        </p>
        <p>
          Si considera que no hemos atendido su solicitud, puede acudir a la Autoridad Nacional de
          Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.
        </p>
      </>
    ),
  },
  {
    title: 'Seguridad',
    body: (
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger sus datos: la
        comunicación con el sitio viaja cifrada (HTTPS) y el acceso a las consultas recibidas está
        restringido al personal autorizado.
      </p>
    ),
  },
  {
    title: 'Cambios en esta política',
    body: (
      <p>
        Podemos actualizar esta política para reflejar cambios legales o del sitio. La fecha de la
        última actualización figura al inicio de esta página.
      </p>
    ),
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <section data-header-theme="dark" className="bg-ink text-bone">
        <div className="shell pt-[calc(var(--header-h)+4rem)] pb-[clamp(3rem,6vw,5rem)]">
          <p className="label text-bone/70 mb-8">Legal</p>
          <h1 className="display text-[clamp(2.5rem,1.2rem+5vw,6rem)]">Política de privacidad</h1>
          <p className="text-bone/60 mt-8 text-[0.9375rem]">Última actualización: {UPDATED}</p>
        </div>
      </section>

      <section className="bg-bone py-[clamp(4rem,8vw,7rem)]">
        <div className="shell grid-12">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <p className="t-lead mb-14 max-w-[40ch]">
              En {site.name} cuidamos sus datos. Esta página explica qué información recibimos por
              este sitio, para qué la usamos y cómo puede ejercer sus derechos.
            </p>
            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.title} className="border-ink/15 border-t pt-8">
                  <h2 className="display text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)]">
                    <span className="label text-stone mr-4 align-middle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.title}
                  </h2>
                  <div className="text-ink/85 mt-5 space-y-4 leading-relaxed [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
