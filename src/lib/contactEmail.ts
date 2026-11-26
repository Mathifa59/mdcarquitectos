/** Plantilla HTML del correo de consulta (estilos en línea y tablas: compatible con Outlook y Gmail). */

type Consulta = {
  nombre: string;
  empresa?: string;
  email: string;
  telefono?: string;
  tipo?: string;
  ubicacion?: string;
  mensaje: string;
};

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const INK = '#191919';
const BONE = '#f8f7f4';
const BRAND = '#4b4b4b';
const STONE = '#4b4b4b';
const FONT = "'Helvetica Neue',Helvetica,Arial,sans-serif";

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:14px 0;border-bottom:1px solid #e1ded6;width:140px;vertical-align:top;font:600 11px ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${STONE}">${label}</td>
    <td style="padding:14px 0;border-bottom:1px solid #e1ded6;vertical-align:top;font:400 16px/1.5 ${FONT};color:${INK}">${value}</td>
  </tr>`;
}

export function consultaHtml(d: Consulta, siteUrl: string, siteName: string) {
  const nombre = esc(d.nombre);
  const email = esc(d.email);
  const tel = d.telefono ? esc(d.telefono) : '';
  const telDigits = d.telefono?.replace(/[^\d+]/g, '') ?? '';
  const mensaje = esc(d.mensaje).replace(/\r?\n/g, '<br>');
  const asunto = encodeURIComponent(`Re: su consulta en ${siteName}`);

  const filas = [
    row('Nombre', nombre),
    row('Empresa', d.empresa ? esc(d.empresa) : '—'),
    row(
      'Correo',
      `<a href="mailto:${email}" style="color:${BRAND};text-decoration:none">${email}</a>`,
    ),
    row(
      'Teléfono',
      tel
        ? `<a href="tel:${esc(telDigits)}" style="color:${INK};text-decoration:none">${tel}</a>`
        : '—',
    ),
    row('Proyecto', d.tipo ? esc(d.tipo) : '—'),
    row('Ubicación', d.ubicacion ? esc(d.ubicacion) : '—'),
  ].join('');

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nueva consulta</title></head>
<body style="margin:0;padding:0;background:${BONE}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Nueva consulta de ${nombre}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BONE}"><tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff">
    <tr><td style="background:${INK};padding:28px 36px">
      <div style="font:700 20px ${FONT};letter-spacing:.06em;color:#ffffff">MD<span style="color:${BRAND}">&amp;</span>C <span style="font-weight:400;letter-spacing:.2em;font-size:12px;color:#bdbab2">ARQUITECTOS</span></div>
    </td></tr>
    <tr><td style="height:4px;background:${BRAND};font-size:0;line-height:0">&nbsp;</td></tr>
    <tr><td style="padding:36px 36px 8px">
      <div style="font:600 11px ${FONT};letter-spacing:.18em;text-transform:uppercase;color:${BRAND}">Nueva consulta web</div>
      <div style="margin-top:10px;font:400 26px/1.25 ${FONT};color:${INK}">${nombre} quiere hablar de su proyecto</div>
    </td></tr>
    <tr><td style="padding:12px 36px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e1ded6">${filas}</table>
    </td></tr>
    <tr><td style="padding:28px 36px 4px">
      <div style="font:600 11px ${FONT};letter-spacing:.14em;text-transform:uppercase;color:${STONE}">Mensaje</div>
      <div style="margin-top:12px;padding:20px 22px;background:${BONE};border-left:3px solid ${BRAND};font:400 16px/1.65 ${FONT};color:${INK}">${mensaje}</div>
    </td></tr>
    <tr><td style="padding:28px 36px 40px">
      <a href="mailto:${email}?subject=${asunto}" style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;font:600 12px ${FONT};letter-spacing:.14em;text-transform:uppercase;padding:16px 28px;border-radius:999px">Responder a ${nombre}</a>
    </td></tr>
    <tr><td style="padding:20px 36px;background:#faf9f6;border-top:1px solid #e1ded6;font:400 12px/1.6 ${FONT};color:${STONE}">
      Enviado desde el formulario de <a href="${esc(siteUrl)}" style="color:${STONE}">${esc(siteUrl.replace(/^https?:\/\//, ''))}</a>. Puede responder directamente a este correo: la respuesta llegará a ${email}.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}
