import { getProduct, page, STARTERS, BOARD } from '../_lib/shared.js';
// /p/<productId> — link-preview page for one product, then opens it on the site.
export async function onRequest({ params, request }) {
  const id = String(params.id || '');
  const { origin } = new URL(request.url);
  const p = (await getProduct(id)) || STARTERS[id] || null;
  const name = p?.name || 'Leo Furniture';
  const kes = p?.kes ? ` · KES ${p.kes.toLocaleString('en-KE')}` : '';
  let image = origin + BOARD;
  if (p?.img?.startsWith('/')) image = origin + p.img;
  else if (p?.img?.startsWith('data:image/')) image = `${origin}/pimg/${encodeURIComponent(id)}.jpg`;
  const desc = (p?.desc || 'Real Craft. Real Quality. Real Kenyan. Handmade in Serem, delivered across Kenya.').slice(0, 200);
  return page({ origin, url: `${origin}/p/${encodeURIComponent(id)}`, title: `${name}${kes} | Leo Furniture`, desc, image, alt: name, go: `/#p=${encodeURIComponent(id)}` });
}
