// Shared helpers for link-preview pages (WhatsApp, Facebook etc. read these tags).
// The Firebase web API key below is a public identifier (it is already in index.html); product reads are public in the Firestore rules.
export const PROJECT = 'leo-furniture-d0b59';
export const KEY = 'AIzaSyDH0sjRmWis7xKO7X2DQgGpDutXG5Qx1SA';
export const BOARD = '/img/leo-furniture-whatsapp-preview-v7.jpg';
export const STARTERS = {
  r1: { name: 'Arched TV wall unit', img: '/img/arched-tv-wall-unit.jpg' },
  r2: { name: 'Floral glass wall unit', img: '/img/floral-glass-wall-unit.jpg' },
  r3: { name: 'Classic coffee table', img: '/img/classic-coffee-table-blue.jpg' },
  r4: { name: 'Pink bubble-top coffee table', img: '/img/pink-bubble-top-coffee-table.jpg' },
};
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function getProduct(id) {
  try {
    const r = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents/products/${encodeURIComponent(id)}?key=${KEY}`, { cf: { cacheTtl: 120 } });
    if (!r.ok) return null;
    const f = (await r.json()).fields || {};
    const v = k => f[k]?.stringValue ?? (f[k]?.integerValue != null ? Number(f[k].integerValue) : f[k]?.doubleValue ?? '');
    return { name: v('name'), name_sw: v('name_sw'), desc: v('desc'), desc_sw: v('desc_sw'), kes: Number(v('kes')) || 0, img: v('img') };
  } catch { return null; }
}

export function page({ origin, url, title, desc, image, alt, go }) {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:type" content="product"><meta property="og:site_name" content="Leo Furniture">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(image)}"><meta property="og:image:secure_url" content="${esc(image)}"><meta property="og:image:alt" content="${esc(alt)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/leo-furniture-icon-v2.png">
<meta http-equiv="refresh" content="0;url=${esc(go)}">
<script>location.replace(${JSON.stringify(go)})</script>
</head><body style="font-family:system-ui;background:#f6efe6;color:#2a1d14;padding:24px">
<p><a href="${esc(go)}">${esc(title)}</a></p></body></html>`,
    { headers: { 'content-type': 'text/html;charset=utf-8', 'cache-control': 'public, max-age=300' } });
}
