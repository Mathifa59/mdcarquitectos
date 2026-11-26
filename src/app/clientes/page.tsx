import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Rule } from '@/components/Rule';
import { WordReveal } from '@/components/WordReveal';
import { clientsPage } from '@/content/home';
import { pageMeta } from '@/lib/seo';

const Closing = dynamic(() => import('@/components/home/Closing').then((m) => m.Closing));

export const metadata: Metadata = pageMeta({
  title: 'Clientes',
  path: '/clientes',
  description:
    'Empresas, marcas, desarrolladores e instituciones con las que hemos colaborado en arquitectura comercial y desarrollo inmobiliario.',
});

export default function ClientesPage() {
  return (
    <>
      <section data-header-theme="dark" className="bg-ink text-bone">
        <div className="shell pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))] pb-[clamp(3rem,6vw,5rem)]">
          <p className="label text-bone/70 mb-8">04 / Clientes</p>
          <h1 className="display t-h1 max-w-[20ch]">
            <WordReveal as="span" className="block">
              {clientsPage.title}
            </WordReveal>
          </h1>
          <p className="text-bone/80 mt-8 max-w-[56ch] text-[clamp(1.0625rem,0.98rem+0.4vw,1.25rem)] leading-relaxed">
            {clientsPage.text}
          </p>
        </div>
      </section>

      <section className="bg-bone py-[clamp(4.5rem,9vw,8rem)]">
        <div className="shell space-y-16 sm:space-y-20">
          {clientsPage.groups.map((g, i) => (
            <div key={g.title}>
              <Rule />
              <div className="grid-12 mt-8 gap-y-8 sm:mt-10">
                <h2 className="label text-stone col-span-12 lg:col-span-3">
                  {String(i + 1).padStart(2, '0')} / {g.title}
                </h2>
                <ul className="col-span-12 grid gap-x-8 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  {g.names.map((n) => (
                    <li
                      key={n}
                      className="border-ink/15 display border-t py-5 text-[clamp(1.125rem,1rem+0.6vw,1.5rem)]"
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Closing />
    </>
  );
}
