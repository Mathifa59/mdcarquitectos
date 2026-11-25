'use client';

import { useEffect, useId, useRef, useState } from 'react';

type Props = {
  id: string;
  name: string;
  options: readonly string[];
  placeholder: string;
  defaultValue?: string;
};

/** Selector propio (listbox accesible): reemplaza el desplegable nativo, que no se puede estilizar. */
export function Select({ id, name, options, placeholder, defaultValue = '' }: Props) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const choose = (v: string) => {
    setValue(v);
    setOpen(false);
    btn.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && open) {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) return openList();
      const n = options.length;
      setActive((a) => (e.key === 'ArrowDown' ? (a + 1) % n : (a - 1 + n) % n));
    } else if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      if (active >= 0) choose(options[active]);
    } else if (e.key === 'Home' && open) {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End' && open) {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={btn}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        data-cursor="link"
        onClick={() => (open ? setOpen(false) : openList())}
        className="border-ink/25 hover:border-ink/60 flex w-full items-center justify-between gap-4 border-0 border-b bg-transparent px-0 py-4 text-left text-[1.0625rem] transition-colors duration-500 focus-visible:outline-none"
      >
        <span className={value ? 'text-ink' : 'text-stone/60'}>{value || placeholder}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className={`size-3 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      <ul
        id={listId}
        role="listbox"
        aria-label={placeholder}
        hidden={!open}
        className="border-ink/10 bg-bone absolute inset-x-0 top-full z-30 mt-2 max-h-[24rem] overflow-auto border py-2 shadow-[0_24px_60px_-20px_rgba(14,14,14,0.35)]"
      >
        {[placeholder, ...options].map((o, i) => {
          const v = i === 0 ? '' : o;
          const selected = v === value;
          const idx = i - 1;
          return (
            <li
              key={o}
              role="option"
              aria-selected={selected}
              data-cursor="link"
              onClick={() => choose(v)}
              onPointerMove={() => idx >= 0 && setActive(idx)}
              className={`flex cursor-pointer items-center justify-between gap-4 px-5 py-3 text-[1rem] transition-colors duration-200 ${
                idx === active ? 'bg-ink/[0.06]' : ''
              } ${i === 0 ? 'text-stone' : 'text-ink'}`}
            >
              {o}
              {selected && (
                <svg aria-hidden="true" viewBox="0 0 12 10" className="text-brand size-3">
                  <path
                    d="m1 5 3.5 3.5L11 1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
