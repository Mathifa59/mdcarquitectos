'use client';

import dynamic from 'next/dynamic';

/** El cursor personalizado solo se descarga cuando el navegador termina de hidratar. */
const Cursor = dynamic(() => import('./Cursor').then((m) => m.Cursor), { ssr: false });

export function LazyCursor() {
  return <Cursor />;
}
