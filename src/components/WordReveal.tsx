import type { ElementType } from 'react';

/**
 * Titular que se revela palabra por palabra con CSS puro (máscara + translateY).
 * Se renderiza en el servidor: el texto está en el HTML inicial y la animación no depende de JavaScript,
 * así el titular entra rápido en el LCP. En el home espera al preloader (ver globals.css).
 */
export function WordReveal({
  children,
  as: Tag = 'span',
  className = '',
  delay = 0.2,
  stagger = 0.07,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = children.split(' ');
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span className="wm">
            <span className="w" style={{ animationDelay: `${(delay + i * stagger).toFixed(2)}s` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
