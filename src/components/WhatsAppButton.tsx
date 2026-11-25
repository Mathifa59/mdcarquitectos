'use client';

import { useUI } from './UIProvider';
import { WhatsAppIcon } from './WhatsAppIcon';
import { whatsappUrl } from '@/content/site';

/** Botón flotante discreto. Se oculta con el menú abierto. */
export function WhatsAppButton() {
  const { menuOpen } = useUI();
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      data-cursor="whatsapp"
      className={`group border-ink/10 bg-ink text-bone hover:bg-brand fixed right-5 bottom-5 z-[60] grid size-12 place-items-center rounded-full border shadow-[0_10px_30px_-8px_rgba(14,14,14,0.55)] transition-[transform,background-color,opacity] duration-500 ease-[var(--ease-out-expo)] hover:scale-110 focus-visible:scale-110 sm:right-7 sm:bottom-7 sm:size-14 ${menuOpen ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
    >
      <WhatsAppIcon className="size-5 sm:size-6" />
    </a>
  );
}
