'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useUI } from './UIProvider';

/** Link interno que dispara la cortina de transición. */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link>) {
  const { navigate } = useUI();
  const target = typeof href === 'string' ? href : (href.pathname ?? '/');
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        )
          return;
        e.preventDefault();
        navigate(target);
      }}
      {...rest}
    />
  );
}
