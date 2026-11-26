# MD&C Arquitectos · contexto para continuar el trabajo

Sitio institucional de **MD&C Arquitectos** (Medios de Diseño y Construcción S.A.C.), Lima. Next.js (App Router) + TypeScript + Tailwind v4 + GSAP/Lenis. Dominio: `https://www.mdc-arquitectos.com`. Idioma: español (`es-PE`). Desarrollo por devhorses (crédito en el footer).

## Estado (2026-11-25)
**El sitio está en producción** y el formulario de contacto funciona de punta a punta. Fases 0–6 completas (auditoría, base, imágenes y contenido, home, proyectos, estudio/servicios/contacto, pulido SEO/OG/404/redirecciones/rendimiento). Lighthouse móvil: Accesibilidad/Buenas prácticas/SEO 100, Rendimiento 85–100.

Hecho después de la fase 6:
- **Despliegue**: proyecto `mdcarquectos` en Vercel (plan Hobby), conectado al repo `Mathifa59/mdcarquitectos` (rama `main`; cada push redespliega solo).
- **Dominio** (DNS en Yachay, zona `mdc-arquitectos.com`): `A @ → 216.198.79.1` (Vercel), `CNAME www → …vercel-dns-017.com`, `A mail → 161.132.57.24` (servidor de correo), `MX 0 mail.mdc-arquitectos.com`, SPF intacto (`TXT v=spf1 …`), más TXT de verificación de Google Search Console y los registros de Resend (`resend._domainkey`, `rsend`, `send`, `_dmarc`). Vercel redirige el dominio sin `www` a `www` (308); **el dominio canónico es `www`** (`site.ts`, `next.config.ts`). El MX no apunta al nombre raíz a propósito: el A raíz va a Vercel, no al correo.
- **Correo corporativo** (Yachay, plan Buzón 10, 10/10 usados): `mariyoli.delgado@`, `jose.canales@`, `renato.canales@`, `administracion@`, `proyectos@`, `contabilidad@`, `r1obra@`, `r2obra@`, `r3obra@`, `contacto@`. Conexión Outlook por IMAP: `mail.mdc-arquitectos.com`, 993 SSL/TLS; SMTP 465 SSL/TLS.
- **Formulario**: Server Action (`src/app/contacto/actions.ts`) + Resend. Variables en Vercel (Production): `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (= `contacto@mdc-arquitectos.com`), `CONTACT_FROM_EMAIL` (`MD&C Arquitectos <web@mdc-arquitectos.com>`). Dominio verificado en Resend (solo envío; **no** activar "Receiving", rompería el MX). Correo HTML con formato en `src/lib/contactEmail.ts` (con versión de texto y HTML escapado). Selector propio accesible en `components/contact/Select.tsx`; foco de campos con línea inferior (sin recuadro) y cursor normal sobre campos de texto.
- **Open Graph**: la imagen se genera como **JPEG** (~90 KB) en `src/lib/og.tsx`; el PNG original pesaba 1 MB y WhatsApp lo descartaba. WhatsApp cachea: probar con `?v=2`.
- **Política de privacidad** en `/privacidad` (Ley 29733; sin cookies de seguimiento ni analítica), enlazada en footer y formulario. Texto con criterio general: **falta revisión legal**.
- **Equipo**: 3 arquitectos en `/estudio` (Mariyoli, José, Renato Canales Delgado). Renato es "Arquitecto asociado" con tarjeta sin perfil porque aún no hay biografía; al llenar `bio` en `team.ts` se crea su perfil (`profileTeam`), y si añades `cv` aparece el botón.
- **UI**: titular del hero limitado por alto (`.t-h1-hero`, laptops), botón de WhatsApp claro (visible sobre fondo oscuro, rojo al hover), footer con "Volver arriba" sin chocar con WhatsApp y menos espacio sobre él, seguimiento del cursor 0,25 s.

## Cómo arrancar
```bash
nvm use            # Node ≥ 20.19 (ver .nvmrc)
npm install
cp .env.example .env.local   # completar RESEND_API_KEY y CONTACT_TO_EMAIL
npm run dev
```
`npm run build` y `npx eslint .` deben pasar sin avisos antes de cada commit. (`npx prettier --check` avisa en todos los archivos por saltos de línea de Windows: es ruido preexistente.) `package-lock.json` y `next-env.d.ts` cambian solos con `npm install`/build: no incluirlos en los commits.

## Mapa del código
- `src/content/` es la fuente de verdad (editar aquí): `site.ts` (WhatsApp, dirección, correo, cifras), `projects.ts` + `canales.ts` (64 proyectos), `services.ts`, `team.ts`, `studio.ts`, `brands.ts`. `images.json` y `redirects.ts` son **generados**.
- `src/components/` UI y animaciones (`Cursor`, `Footer`, `WhatsAppButton`, `contact/`, `studio/PartnerCard`); `src/lib/` GSAP, Lenis, SEO (`seo.ts`), OG (`og.tsx`), correo (`contactEmail.ts`), galería, formato.
- `src/app/`: `/`, `/estudio` (+`/[slug]`), `/servicios`, `/proyectos`, `/contacto`, `/privacidad`, sitemap, robots, manifest, OG.
- `scripts/`: `optimize-images.mjs` (necesita las fotos originales, que **no** están en el repo), `build-icons.mjs`, `build-map.mjs`, `build-redirects.mjs`, `vectorize-logo.mjs`, `validate-content.mjs`.

## Reglas del proyecto
- **No inventar datos**: si falta un campo, se omite. Los pendientes están marcados `TODO-CONFIRMAR` en el código (`grep -rn TODO-CONFIRMAR src`).
- Animar solo `transform`, `opacity` y `clip-path`; respetar `prefers-reduced-motion`.
- Fotos a pantalla completa solo si `photo.hero` es verdadero (≥1600 px); el resto va contenido.
- `content/images.ts` solo se importa desde Server Components (pesa por los placeholders blur).
- Retratos del equipo con hash en el nombre (evita caché al cambiarlos). **No correr `optimize-images.mjs` sin `.raw/`**: reconstruye `images.json` solo con lo que encuentre y borraría los retratos. Para un retrato nuevo sin `.raw/`, procesarlo (JPEG ≤2400 px, nombre `<slug>.<hash8>.jpg`, blur de 16 px) y añadir la entrada a mano en `images.json` con indentación de 2 espacios (así se hizo con Renato).
- Proyectos y personas excluidos de la publicación: la lista vive solo en local (carpeta `docs/` y `.raw/`, no versionadas).
- Commits: terminar con `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`. Nunca poner claves ni contraseñas en el repo ni en el chat.

## Pendientes de confirmar con la clienta
1. Correo definitivo de contacto (hoy `contacto@mdc-arquitectos.com`; también es el destino del formulario).
2. **RUC** de la empresa y si el banco de datos está inscrito ante la Autoridad Nacional de Protección de Datos Personales (para `/privacidad`); revisión legal del texto. Preguntar si les corresponde el Libro de Reclamaciones.
3. **Renato Canales Delgado**: cargo definitivo (hoy "Arquitecto asociado"), biografía y CV en PDF. La sección dice "Nuestros fundadores / Dos trayectorias": decidir si se separa en "Fundadores" y "Equipo".
4. Cifras de Mariyoli: el sitio usa las oficiales (+30 años, +80 proyectos, +160 000 m², +70 marcas); la clienta envió otras (28 años, +60, +140 000, +40). Decisión tomada: se mantienen las oficiales, pero ella las volvió a enviar: reconfirmar.
5. Retratos de los fundadores: son imágenes generadas con IA (incluido Renato); sustituir por fotos reales cuando existan.
6. Discrepancias de datos entre los documentos de Canales Arquitectos (áreas/años) y 11 proyectos más sin fotos asociables.
7. Cargo y CV en PDF de José Canales; redes sociales reales; nombre oficial de la universidad de Mariyoli.
8. **Tipografía anterior**: el usuario mencionó una carpeta con las fuentes del sitio anterior (no encontrada: no está en el proyecto, OneDrive, Descargas ni git). El sitio usa hoy Inter Tight + Instrument Serif (Google Fonts, `layout.tsx`). El sitio viejo (`agenciamk.info/lab/proyectos/mdc-arquitectos`) cargaba "MK Hero"/"Open Sans", probablemente de la plantilla de la agencia. Pendiente: ubicar la carpeta y decidir si se usa (comprobar licencia web).

## Archivos locales que NO están en el repo (a propósito)
`.raw/` (materiales fuente), `docs/` (notas internas de auditoría), `.env.local` (claves), `.claude/` (configuración local). Si trabajas en otro equipo y necesitas regenerar imágenes, copia la carpeta de originales (se sincroniza por OneDrive) y define `CURATED_DIR` si usas la selección curada. Las variables de producción viven en Vercel, no en el repo.
