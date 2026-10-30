const CACHE_NAME = 'disney-rea-pwa-v2';
const ASSETS = ['./', './index.html', './manifest.json', './apple-touch-icon.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.themeparks.wiki')) {
    return; // Always fetch live data from network
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});