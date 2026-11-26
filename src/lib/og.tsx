import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import sharp from 'sharp';
import logo from '@/content/logo-paths.json';

export const OG_SIZE = { width: 1200, height: 630 } as const;
/** JPEG: el PNG de Satori pesa ~1 MB y WhatsApp descarta vistas previas de más de ~300 KB. */
export const OG_TYPE = 'image/jpeg';

const fontPath = (w: 500 | 600) =>
  path.join(
    process.cwd(),
    'node_modules/@fontsource/inter-tight/files',
    `inter-tight-latin-${w}-normal.woff`,
  );

type Props = {
  title: string;
  /** Etiqueta superior en mayúsculas. */
  label?: string;
  /** Ruta pública de la foto (p. ej. /images/projects/x/01.jpg). */
  photo?: string;
  /** Línea inferior (p. ej. ubicación · año). */
  meta?: string;
};

/** Tarjeta Open Graph/Twitter de marca: foto oscurecida, logo, etiqueta y titular grande. */
export async function renderOg({ title, label, photo, meta }: Props) {
  const [f500, f600] = await Promise.all([readFile(fontPath(500)), readFile(fontPath(600))]);

  let bg: string | undefined;
  if (photo) {
    const buf = await sharp(path.join(process.cwd(), 'public', photo))
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 78 })
      .toBuffer();
    bg = `data:image/jpeg;base64,${buf.toString('base64')}`;
  }

  const size = title.length > 46 ? 64 : title.length > 26 ? 80 : 96;

  const png = new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0E0E0E',
        color: '#F3F1EC',
        fontFamily: 'Inter Tight',
      }}
    >
      {bg && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bg}
          width={1200}
          height={630}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: 'cover',
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          display: 'flex',
          background: bg
            ? 'linear-gradient(180deg, rgba(14,14,14,0.55) 0%, rgba(14,14,14,0.35) 35%, rgba(14,14,14,0.92) 100%)'
            : 'radial-gradient(90% 80% at 85% 0%, #2a2927 0%, #0E0E0E 70%)',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          padding: '56px 72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <svg width="190" height="54" viewBox={`0 0 ${logo.w} ${logo.compactH}`}>
            <path d={logo.md} fill="#E01B1B" />
            <path d={logo.amp} fill="#8C8C8C" />
            <path d={logo.c} fill="#F3F1EC" />
          </svg>
          <div style={{ display: 'flex', height: 2, width: 120, background: '#990101' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {label && (
            <div
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: 'rgba(243,241,236,0.75)',
                marginBottom: 22,
                display: 'flex',
              }}
            >
              {label}
            </div>
          )}
          <div
            style={{
              fontSize: size,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1,
              display: 'flex',
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {meta && (
            <div
              style={{
                fontSize: 26,
                marginTop: 26,
                color: 'rgba(243,241,236,0.8)',
                display: 'flex',
              }}
            >
              {meta}
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Inter Tight', data: f500, weight: 500, style: 'normal' },
        { name: 'Inter Tight', data: f600, weight: 600, style: 'normal' },
      ],
    },
  );

  const jpeg = await sharp(Buffer.from(await png.arrayBuffer()))
    .flatten({ background: '#0E0E0E' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      'Content-Type': OG_TYPE,
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
