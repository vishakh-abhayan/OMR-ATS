import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    // Handle API routes (proxy to your backend)
    if (new URL(request.url).pathname.startsWith('/api/')) {
      return fetch(request.url.replace(
        new URL(request.url).origin,
        'https://your-backend-domain.com'
      ), request)
    }

    // Serve static assets
    const page = await getAssetFromKV(event, {
      mapRequestToAsset: req => {
        const url = new URL(req.url)
        // Handle client-side routing
        if (!url.pathname.includes('.') && url.pathname !== '/') {
          return new Request(new URL('/index.html', req.url), req)
        }
        return req
      }
    })

    // Add security headers
    const response = new Response(page.body, page)
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    
    return response
  } catch (e) {
    return new Response('Not found', { status: 404 })
  }
}