/**
 * Coordina el preloader con las animaciones de entrada del home.
 * El layout marca <html data-preload="1"> (script en <head>) cuando toca mostrarlo.
 */
const EVENT = 'mdc:preloader-done';

export const preloaderActive = () =>
  typeof document !== 'undefined' && document.documentElement.dataset.preload === '1';

export const finishPreloader = () => {
  document.documentElement.removeAttribute('data-preload');
  try {
    sessionStorage.setItem('mdc-pre', '1');
  } catch {}
  window.dispatchEvent(new Event(EVENT));
};

/** Ejecuta cb ya (si no hay preloader) o cuando termine. Devuelve una función de limpieza. */
export const whenReady = (cb: () => void) => {
  if (!preloaderActive()) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
};
