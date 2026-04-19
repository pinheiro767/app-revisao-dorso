const CACHE_NAME = 'atlas-miologia-v1';
const URLS = ['./','./index.html','./data-musculos.js','./manifest.json','./assets/icons/icon192.png','./assets/icons/icon512.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request).catch(() => caches.match('./index.html'))));
});