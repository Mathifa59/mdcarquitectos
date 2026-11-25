'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // Curva de marca: arranque contenido, final largo y sin rebote.
  CustomEase.create('mdc', '0.76,0,0.24,1');
  gsap.defaults({ ease: 'expo.out', duration: 0.9 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
export const EASE = { inOut: 'mdc', out: 'expo.out', soft: 'power3.out' } as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
