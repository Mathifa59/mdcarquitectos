# MD&C Arquitectos · contexto para continuar el trabajo

Sitio institucional de **MD&C Arquitectos** (Medios de Diseño y Construcción S.A.C.), Lima. Next.js (App Router) + TypeScript + Tailwind v4 + GSAP/Lenis. Dominio: `https://www.mdc-arquitectos.com`. Idioma: español (`es-PE`).

## Estado
Fases 0–6 completas: auditoría, base, imágenes y contenido, home, proyectos, estudio/servicios/contacto, y pulido (SEO, OG, 404, redirecciones 301, rendimiento). Lighthouse móvil: Accesibilidad/Buenas prácticas/SEO 100, Rendimiento 85–100. **Lo que sigue lo hace el dueño del proyecto: despliegue en Vercel, dominio y Resend.**

## Cómo arrancar
```bash
nvm use            # Node ≥ 20.19 (ver .nvmrc)
npm install
cp .env.example .env.local   # completar RESEND_API_KEY y CONTACT_TO_EMAIL
npm run dev
```
`npm run build` y `npx eslint .` deben pasar sin avisos antes de cada commit.

## Mapa del código
- `src/content/` es la fuente de verdad (editar aquí): `site.ts` (WhatsApp, dirección, cifras), `projects.ts` + `canales.ts` (64 proyectos), `services.ts`, `team.ts`, `studio.ts`, `brands.ts`. `images.json` y `redirects.ts` son **generados**.
- `src/components/` UI y animaciones; `src/lib/` GSAP, Lenis, SEO (`seo.ts`), OG (`og.tsx`), galería, formato.
- `scripts/`: `optimize-images.mjs` (necesita las fotos originales, que **no** están en el repo), `build-icons.mjs`, `build-map.mjs`, `build-redirects.mjs`, `vectorize-logo.mjs`, `validate-content.mjs`.

## Reglas del proyecto
- **No inventar datos**: si falta un campo, se omite. Los pendientes están marcados `TODO-CONFIRMAR` en el código (`grep -rn TODO-CONFIRMAR src`).
- Animar solo `transform`, `opacity` y `clip-path`; respetar `prefers-reduced-motion`.
- Fotos a pantalla completa solo si `photo.hero` es verdadero (≥1600 px); el resto va contenido.
- `content/images.ts` solo se importa desde Server Components (pesa por los placeholders blur).
- Retratos del equipo con hash en el nombre (evita caché al cambiarlos).
- Proyectos y personas excluidos de la publicación: la lista vive solo en local (carpeta `docs/` y `.raw/`, no versionadas).

## Pendientes de confirmar con la clienta
1. Correo definitivo de contacto (hoy `contacto@mdc-arquitectos.com`).
2. Cifras de Mariyoli: el sitio usa las oficiales (+30 años, +80 proyectos, +160 000 m², +70 marcas); la clienta envió otras (28 años, +60, +140 000, +40). Decisión tomada: se mantienen las oficiales.
3. Retratos de los fundadores: son imágenes generadas con IA; sustituir por fotos reales cuando existan (`.raw/team/<slug>.webp` y volver a correr `optimize-images.mjs`).
4. Discrepancias de datos entre los documentos de Canales Arquitectos (áreas/años) y 11 proyectos más sin fotos asociables.
5. Cargo y CV en PDF de José Canales; redes sociales reales; nombre oficial de la universidad de Mariyoli.

## Archivos locales que NO están en el repo (a propósito)
`.raw/` (materiales fuente), `docs/` (notas internas de auditoría), `.env.local` (claves). Si trabajas en otro equipo y necesitas regenerar imágenes, copia la carpeta de originales (se sincroniza por OneDrive) y define `CURATED_DIR` si usas la selección curada.
