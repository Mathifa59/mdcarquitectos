# MD&C Arquitectos · contexto para continuar el trabajo

Sitio institucional de **MD&C Arquitectos** (Medios de Diseño y Construcción S.A.C.), Lima. Next.js (App Router) + TypeScript + Tailwind v4 + GSAP/Lenis. Dominio: `https://www.mdc-arquitectos.com`. Idioma: español (`es-PE`). Desarrollo por devhorses (crédito en el footer).

## Estado (2026-11-27)
**Rediseño según las directrices de la clienta** (`MDC_Directrices_Finales_Devhorses.docx` + maqueta HTML, 2026-11-26), aplicado sobre `main`. **La versión anterior está en la rama `version-actual-2026-11-26`** (diseño Inter Tight/Instrument Serif, paleta roja, portada rotativa): para volver a ella, `git checkout version-actual-2026-11-26`.
- **Visual**: paleta de la clienta (`--color-ink #191919`, `bone #F8F7F4`, `bone-2 #DEDAD4`, `topo #8A8177`, `graphite #4B4B4B`; el rojo solo queda en el logo; errores con `danger`), tipografía **Manrope** (sin serif), escala H1 36–72 px, `.shell` de 1320 px.
- **Navegación**: Inicio / El estudio / Servicios / Proyectos / Clientes (nueva, `/clientes`) / Contacto, con botón "Conversemos". Menú visible en escritorio y overlay en móvil. `nav` en `site.ts`.
- **Inicio** (`app/page.tsx`, textos en `content/home.ts`): portada con dos imágenes iguales (Indian Chic Puruchuco + Los Ciruelos, sin carrusel), estudio, 2 áreas de negocio, 8 destacados intercalados (`homeFeaturedSlugs`), dirección (fundadores iguales + Renato en "Equipo profesional") y franja de clientes, cierre.
- **El estudio**: texto institucional de 3 párrafos (`content/studio.ts`); fundadores a igual escala y Renato aparte.
- **Servicios**: 8 especialidades (`serviceCatalog` en `services.ts`) con CTA "Solicitar una consulta" (`/contacto?tipo=…`), enlace a las 3 fichas existentes y a proyectos relacionados.
- **Proyectos**: 6 categorías (Retail, Inmobiliario y urbanismo, Corporativo, Residencial, Gastronómico, Educativo e institucional); "Comercial y empresarial" se redistribuyó (los 64 proyectos y sus URL se conservan); filtro adicional por estudio (MD&C / Canales); fichas con "Estudio de origen", "Ver proyectos relacionados" y "Consultar por un proyecto similar". Indian Chic Puruchuco es el primero del portafolio.
- **Contacto**: formulario con empresa, ubicación y consentimiento de privacidad obligatorio; correo HTML enruta por área (CC a `mariyolidelgado@` para Retail/Corporativo/Gastronómico y a `josecanales@` para Inmobiliario/Residencial/Educativo). Pie con WhatsApp por área (`site.contacts`).
- **Cifras**: Mariyoli = **28 años**; las cifras globales (+30 años, +80 proyectos, m², marcas) están **ocultas** hasta validarlas (la clienta lo pide en las directrices). No sumar años de ambas empresas.
- **SEO**: título de inicio "MD&C Arquitectos | Arquitectura comercial y desarrollo inmobiliario en Lima"; `/clientes` en el sitemap.
- **Página `/enlaces` y QR** (2026-11-27): página estilo Linktree (`src/app/enlaces/page.tsx`) con sitio web, redes (`site.social`), WhatsApp por área (`site.contacts`) y correo, con iconos de trazo (globo, Instagram, Facebook, LinkedIn, WhatsApp, correo); se muestra a pantalla completa (`fixed inset-0 z-[200]`, atributo `data-enlaces`) sobre el cabezal y el pie, y **no se indexa ni está en el sitemap**. Una regla en `globals.css` (`html:has([data-enlaces]) { overflow: hidden }`) oculta el scroll de la página de fondo para que haya una sola barra; no usar `<main>` dentro (el layout ya tiene uno). El QR apunta a `https://www.mdc-arquitectos.com/enlaces` (nivel de corrección H, #191919 sobre blanco), así que cambiar enlaces no obliga a reimprimirlo. Archivos `qr-mdc-enlaces.png` (2000 px) y `.svg` en la carpeta local `qr/` (no versionada); se generan con el paquete `qrcode` (no es dependencia del proyecto): `QR.toFile(salida, url, { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#191919', light: '#ffffff' } })`.
- **Google Search Console** (2026-11-27): propiedad de dominio verificada con TXT en Yachay y sitemap enviado (`/sitemap.xml`). `/estudio` ya figura indexada (versión previa al rediseño); conviene "Probar URL publicada" y "Solicitar indexación" en `/`, `/estudio`, `/servicios`, `/proyectos` y `/clientes`. El favicon y el título nuevos tardan días o semanas en reflejarse en Google. Favicon servido: `favicon.ico` 48×48, `icon.svg` y `apple-icon.png` (todos en `src/app/`).
- **Tarjeta de presentación digital de Mariyoli**: su QR apunta a `https://www.mdc-arquitectos.com/enlaces` (verificado). Muestra tres servicios (Diseño comercial, Diseño interior, Gestión y ejecución de obra); "diseño interior" no es una de las 8 especialidades de `serviceCatalog` (solo aparece en el texto del área comercial y en su perfil): preguntar a la clienta si quiere tarjeta propia.
- Se eliminaron los componentes antiguos del inicio (Hero rotativo, Intro, ServicesSection, Stats, FeaturedStrip, MariyoliBlock).

Lo siguiente describe el estado previo al rediseño (se conserva como referencia):
**El sitio está en producción** y el formulario de contacto funciona de punta a punta. Fases 0–6 completas (auditoría, base, imágenes y contenido, home, proyectos, estudio/servicios/contacto, pulido SEO/OG/404/redirecciones/rendimiento). Lighthouse móvil: Accesibilidad/Buenas prácticas/SEO 100, Rendimiento 85–100.

Hecho después de la fase 6:
- **Despliegue**: proyecto `mdcarquectos` en Vercel (plan Hobby), conectado al repo `Mathifa59/mdcarquitectos` (rama `main`; cada push redespliega solo).
- **Dominio** (DNS en Yachay, zona `mdc-arquitectos.com`): `A @ → 216.198.79.1` (Vercel), `CNAME www → …vercel-dns-017.com`, `A mail → 161.132.57.24` (servidor de correo), `MX 0 mail.mdc-arquitectos.com`, SPF intacto (`TXT v=spf1 …`), más TXT de verificación de Google Search Console y los registros de Resend (`resend._domainkey`, `rsend`, `send`, `_dmarc`). Vercel redirige el dominio sin `www` a `www` (308); **el dominio canónico es `www`** (`site.ts`, `next.config.ts`). El MX no apunta al nombre raíz a propósito: el A raíz va a Vercel, no al correo.
- **Correo corporativo** (Yachay, plan Buzón 10, 10/10 usados): `mariyolidelgado@` (sin punto), `jose.canales@` (**la clienta publica `josecanales@`: crear ese alias/reenviador en Yachay hacia `jose.canales@`; el plan Buzón 10 está lleno, así que debe ser un reenviador**), `renato.canales@`, `administracion@`, `proyectos@`, `contabilidad@`, `r1obra@`, `r2obra@`, `r3obra@`, `contacto@`. Conexión Outlook por IMAP: `mail.mdc-arquitectos.com`, 993 SSL/TLS; SMTP 465 SSL/TLS.
- **Formulario**: Server Action (`src/app/contacto/actions.ts`) + Resend. Variables en Vercel (Production): `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (= `contacto@mdc-arquitectos.com`), `CONTACT_FROM_EMAIL` (`MD&C Arquitectos <web@mdc-arquitectos.com>`). Dominio verificado en Resend (solo envío; **no** activar "Receiving", rompería el MX). Correo HTML con formato en `src/lib/contactEmail.ts` (con versión de texto y HTML escapado). Selector propio accesible en `components/contact/Select.tsx`; foco de campos con línea inferior (sin recuadro) y cursor normal sobre campos de texto.
- **Open Graph**: la imagen se genera como **JPEG** (~90 KB) en `src/lib/og.tsx`; el PNG original pesaba 1 MB y WhatsApp lo descartaba. WhatsApp cachea: probar con `?v=2`.
- **Política de privacidad** en `/privacidad` (Ley 29733; sin cookies de seguimiento ni analítica), enlazada en footer y formulario. Texto con criterio general: **falta revisión legal**.
- **Equipo**: 3 arquitectos en `/estudio` (Mariyoli, José, Renato Canales Delgado). Renato es "Arquitecto asociado" con tarjeta sin perfil porque aún no hay biografía; al llenar `bio` en `team.ts` se crea su perfil (`profileTeam`), y si añades `cv` aparece el botón.
- **UI**: titular del hero limitado por alto (`.t-h1-hero`, laptops), botón de WhatsApp claro (visible sobre fondo oscuro, rojo al hover), footer con "Volver arriba" sin chocar con WhatsApp y menos espacio sobre él, seguimiento del cursor 0,25 s.

Cambios pedidos por la clienta (2026-11-26), ya en producción:
- **Portada**: 4 fotos rotativas (Indian Puruchuco, Porta Freedom, Indian Santa Anita, Explorer) generadas con `node scripts/build-hero.mjs` (no necesita `.raw/`; reescala a 2000 px desde `public/images/projects`, escribe `public/images/hero/` y las claves `hero/*` de `images.json`) y listadas en `heroSlides` de `src/app/page.tsx`. La imagen OG de inicio usa `hero/indian-puruchuco`. Las fotos de origen miden ~1200 px: se ven algo suaves a pantalla completa; sustituir por originales mayores cuando existan.
- **Tipografía** más chica: escala `--text-h1/h2/h3` en `globals.css` y titulares con `clamp` propio (Closing, NextProject, MenuOverlay, ProjectFacts, ProjectHero); titular del hero a `10.5svh`.
- **Logo**: "&" más grande y de trazo fino (glifo de Inter Tight 200 convertido a trazado), `C` desplazada y viewBox nuevo en `logo-paths.json` (`compactH` = alto sin "ARQUITECTOS"); logo del header más grande (`w-[7rem] sm:w-[9.5rem]`). El logo original está en el historial de git.
- **Textos**: el lead de "Quiénes somos" (`about.lead`) presenta la firma como fusión de dos empresas; en el inicio, tras ese lead, van dos párrafos sobre la empresa (`about.paragraphs[2]` y `[3]`) en `home/Intro.tsx`.
- **Proyectos por estudio**: los perfiles listan los proyectos de su estudio (`projectsBy` en `team.ts`): Mariyoli → "Proyectos de MD&C" (sin `office`), José → "Proyectos de Canales Arquitectos" (con `office`).
- **Orden del portafolio** (`sortedProjects` en `projects.ts`): primero MD&C y luego Canales; por categoría y con las marcas juntas (Topitop, Indian, Marathon, Andean, Porta…), usando `order` solo para decidir qué va primero. La clienta encontraba confuso el retail disperso.
- **Fotos**: se retiraron las 110 fotos de menos de 1000 px de ancho (de 215), dejando como mínimo una por proyecto (si todas eran pequeñas se conservó la mayor). Se añadieron 3 fotos de Andean (fachadas y local, <1000 px) al proyecto Mall Aventura Plaza y la foto de Topitop Mall del Sur (770 px) que la clienta pidió incluir. Los nuevos retratos/fotos pequeñas llevan `tier: 'mid'` a mano en `images.json`.
- **Destacados del inicio** (`featured`): Topitop Mega Plaza, Indian Puruchuco, Starbucks Cayma, Marathon Mega Plaza, Kuna, Banco Ripley, H.Stern, Topitop Mall del Sur, Andean Mall Aventura, Porta Freedom y Explorer (se quitó Oficinas Porta).
- **Redes**: Instagram, Facebook y LinkedIn en `site.social` (footer y `sameAs` del JSON-LD de `seo.ts`).
- **Validador**: `scripts/validate-content.mjs` ignora las claves `hero/`; sigue marcando "equipo excluido publicado" (pendiente de revisar con la lista local de exclusiones, probablemente por Renato).

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
- `src/app/`: `/`, `/estudio` (+`/[slug]`), `/servicios`, `/proyectos`, `/clientes`, `/contacto`, `/privacidad`, `/enlaces` (QR), sitemap, robots, manifest, OG.
- `scripts/`: `optimize-images.mjs` (necesita las fotos originales, que **no** están en el repo), `build-icons.mjs`, `build-map.mjs`, `build-redirects.mjs`, `vectorize-logo.mjs`, `validate-content.mjs`.

## Reglas del proyecto
- **No inventar datos**: si falta un campo, se omite. Los pendientes están marcados `TODO-CONFIRMAR` en el código (`grep -rn TODO-CONFIRMAR src`).
- Animar solo `transform`, `opacity` y `clip-path`; respetar `prefers-reduced-motion`.
- `Header.tsx` detecta si hay fondo oscuro bajo el cabezal con `elementsFromPoint(...)` ignorando el propio header (el menú de escritorio ocupa el centro); si se vuelve a medir con `elementFromPoint` el logo y el menú quedan invisibles sobre secciones oscuras.
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

9. **Hoja de vida de Renato** (la clienta la enviará): crear su perfil con `bio`, cargo y `cv`.
10. **Edificio con letrero "Ferrini"** (foto enviada el 2026-11-26): falta saber a qué proyecto pertenece; no está publicado.
11. Foto Denim de Topitop enviada sin nombre (no usada); fotos reales de Explorer (hoy es una recreación 3D) y originales de mayor resolución para portada y Andean.
12. Preguntar a la clienta si en `/proyectos` quiere dos encabezados separados ("MD&C" y "Canales Arquitectos") o solo retail en el perfil de Mariyoli.

## Archivos locales que NO están en el repo (a propósito)
`.raw/` (materiales fuente), `docs/` (notas internas de auditoría), `qr/` (QR de /enlaces en PNG y SVG), `.env.local` (claves), `.claude/` (configuración local). Si trabajas en otro equipo y necesitas regenerar imágenes, copia la carpeta de originales (se sincroniza por OneDrive) y define `CURATED_DIR` si usas la selección curada. Las variables de producción viven en Vercel, no en el repo.

## Pendientes del rediseño (2026-11-26)
13. **`josecanales@mdc-arquitectos.com`** está publicado pero no existe: crear reenviador en Yachay (Email Forwarders) o los correos de consultas inmobiliarias rebotarán.
14. **Logo**: las directrices piden el logo oficial sin redibujar; el sitio usa la versión con "&" grande y fina pedida antes. Pendiente decidir (el original está en el historial de git).
15. **Fotos originales** en alta resolución: Oficinas Porta, Centro Empresarial Altavista (hoy 768×1024), Cibertec SJL, Topitop Mega Plaza, Starbucks Cayma (1236 px), Casa Asia Golf (1024 px). Retratos aprobados de los tres arquitectos (los actuales son referenciales). Hard Rock Café Cusco y Madam Tusan: verificar autorización antes de publicarlos.
16. **Clientes**: validar relación y permiso de uso de cada nombre y logotipo (`clientsPage` en `content/home.ts`); hoy se muestran solo nombres (sin logos). "Bohemia", "Tomasal" y "Villa Médica" se clasificaron como Inmobiliario por criterio propio.
17. **PDF de CV de Mariyoli** (`public/docs/`) aún dice "+30 años": actualizar a 28. Falta CV de José y hoja de vida de Renato.
18. Las directrices piden "área (indicar tipo)" en las fichas: falta saber si los m² son construidos, techados o del terreno. No se muestra el tipo.
19. Antes de publicar: la clienta pidió un **enlace de prueba para aprobar**; Vercel genera previews en ramas distintas de `main`.
