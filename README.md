# MD&C Arquitectos · sitio web

Sitio institucional de **MD&C Arquitectos** (Medios de Diseño y Construcción S.A.C.), estudio de arquitectura comercial de Lima: retail, corporativa, gastronómica y desarrollo inmobiliario.

- **Stack:** Next.js (App Router) + TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger, SplitText, Draggable, Inertia) + Lenis · Resend + zod para el formulario.
- **Idioma:** español (`es-PE`). El contenido está separado en `src/content/` para añadir inglés más adelante.
- **Dominio:** `https://www.mdc-arquitectos.com` (definido en `src/content/site.ts`).

## Requisitos

Node.js **≥ 20.19** (ver `.nvmrc`) y npm.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compilación de producción
npm run start    # sirve la compilación
npm run lint     # ESLint
npm run format   # Prettier
```

## Variables de entorno

Copie `.env.example` a `.env.local` y complete los valores:

| Variable             | Descripción                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Clave de [Resend](https://resend.com) para enviar el formulario de contacto.     |
| `CONTACT_TO_EMAIL`   | Correo que recibe las consultas.                                                 |
| `CONTACT_FROM_EMAIL` | (Opcional) Remitente de un dominio verificado en Resend.                         |

Sin estas variables el formulario muestra un aviso y deriva al botón de WhatsApp.

## Estructura

```
src/
  app/                 Rutas: / · /estudio · /estudio/[slug] · /servicios · /servicios/[slug]
                       /proyectos · /proyectos/[slug] · /contacto · sitemap · robots · manifest · OG
  components/          UI y animaciones (home/, projects/, studio/, contact/)
  content/             Contenido tipado (editar aquí)
    site.ts            Datos globales: WhatsApp, dirección, cifras, navegación
    projects.ts        Proyectos MD&C y categorías
    canales.ts         Proyectos de Canales Arquitectos
    services.ts        Las 3 líneas de servicio y sus 5 subservicios
    team.ts            Fundadores
    studio.ts          Textos institucionales
    images.json        Fotos optimizadas (generado)
  lib/                 GSAP, Lenis, SEO, formato, galería
public/                Imágenes optimizadas, logo SVG, íconos y CV
scripts/               Utilidades de contenido (ver abajo)
```

### Editar contenido

- **Datos de contacto, cifras y navegación:** `src/content/site.ts`.
- **Proyectos:** agregue una entrada en `projects.ts` (o `canales.ts`) y sus fotos al pipeline.
- **Los campos vacíos no se muestran:** no se inventan datos.
- Los comentarios `TODO-CONFIRMAR` marcan datos pendientes de validar con la clienta.

### Imágenes

`scripts/optimize-images.mjs` lee las fotos originales (no se versionan), corrige la orientación EXIF, limita a 2400 px y escribe `public/images/**` y `src/content/images.json` con dimensiones y placeholders blur. Las fuentes se declaran en `scripts/projects.source.mjs`.

Otras utilidades: `build-icons.mjs` (favicon e íconos), `build-map.mjs` (mapa estático), `vectorize-logo.mjs` (logo SVG), `build-redirects.mjs` (redirecciones del sitio anterior).

## SEO y calidad

- Metadatos por página, Open Graph/Twitter generados (`opengraph-image.tsx`, uno por proyecto), `sitemap.xml`, `robots.txt`, manifest y JSON-LD (`Organization`/`LocalBusiness`, `CreativeWork`, `Service`, `Person`, `BreadcrumbList`).
- Redirecciones 301 desde las URLs del sitio anterior (`next.config.ts`).
- Animaciones solo con `transform`, `opacity` y `clip-path`; respetan `prefers-reduced-motion`.
