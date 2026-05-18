// KPS Teslimat Service Worker — Cache-first for thumbnails
const CACHE_NAME = 'kps-v1';
const PRECACHE = ['/teslimat.html', '/teslimat.css', '/teslimat.js', '/shop.css', '/style.css', '/assets/logo.webp'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
    const url = new URL(e.request.url);
    // Cache-first for R2 CDN thumbnails
    if (url.hostname.includes('r2.dev') && url.pathname.includes('/thumbs/')) {
        e.respondWith(caches.open(CACHE_NAME).then(c => c.match(e.request).then(r => r || fetch(e.request).then(res => { if (res.ok) c.put(e.request, res.clone()); return res; }).catch(() => new Response('', { status: 503 })))));
        return;
    }
    // Network-first for everything else
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
