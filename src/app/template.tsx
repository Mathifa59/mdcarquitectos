'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useUI } from '@/components/UIProvider';

/** Se remonta en cada navegación: destapa la cortina y entra el contenido. */
export default function Template({ children }: { children: React.ReactNode }) {
  const { reveal } = useUI();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reveal()) {
      gsap.fromTo(
        ref.current,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.35, clearProps: 'transform,opacity' },
      );
    }
  }, [reveal]);
  return <div ref={ref}>{children}</div>;
}
