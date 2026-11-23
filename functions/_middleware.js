// Send visitors from old addresses to the main one, keeping the page they asked for.
// Only the exact old hosts are redirected; Cloudflare preview links keep working.
const MAIN = 'leofurniture.co.ke';
const OLD = new Set(['leo-furniture-kenya.pages.dev', 'www.leofurniture.co.ke']);
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (OLD.has(url.hostname)) {
    url.hostname = MAIN; url.protocol = 'https:'; url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
