import { getProduct } from '../_lib/shared.js';
// /pimg/<productId>.jpg — serves a product photo (stored in Firestore) as a normal image file, for link previews.
export async function onRequest({ params }) {
  const id = String(params.id || '').replace(/\.(jpe?g|png|webp)$/i, '');
  const p = await getProduct(id);
  const m = p?.img?.match(/^data:(image\/[a-z+.-]+);base64,(.+)$/i);
  if (!m) return new Response('Not found', { status: 404 });
  const bin = atob(m[2]); const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Response(bytes, { headers: { 'content-type': m[1], 'cache-control': 'public, max-age=600' } });
}
