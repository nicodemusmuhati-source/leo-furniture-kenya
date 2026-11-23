import { page } from '../_lib/shared.js';
// /i/<photo-name> — link-preview page for a Design ideas photo, then opens it on the site.
export async function onRequest({ params, request }) {
  const f = String(params.f || '').replace(/[^a-z0-9-]/gi, '');
  const { origin } = new URL(request.url);
  const name = f ? f.charAt(0).toUpperCase() + f.slice(1).replace(/-/g, ' ') : 'Design idea';
  return page({ origin, url: `${origin}/i/${f}`, title: `${name} – design idea | Leo Furniture`,
    desc: 'Sample photo. Vincent can make a similar piece to order, in your size and colour. Real Craft. Real Quality. Real Kenyan.',
    image: `${origin}/img/ideas/${f}.jpg`, alt: name, go: `/#idea=${f}` });
}
