---
---
const staticCacheName = '{{ "now" | date: "%Y-%m-%d-%H-%M" }}';
const dynamicCacheName = '{{ "now" | date: "%Y-%m-%d-%H-%M" }}';

const assets = [
  '{{ site.url }}/pages/fallback/index.html'
];

// Limit dynamic cache size
const limitCacheSize = (name, maxItems) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(() => limitCacheSize(name, maxItems));
      }
    });
  });
};

// Install event: Pre-cache fallback
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', evt => {
  const keepCaches = [staticCacheName, dynamicCacheName];
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => !keepCaches.includes(k)).map(k => caches.delete(k))
      );
    })
  );
});

// Fetch event: Cache only same-origin requests under /name1/
self.addEventListener('fetch', evt => {
  const req = evt.request;
  const url = new URL(req.url);

  // Only handle GET requests for {{ site.url }} (https://site.com/name1)
  if (
    req.method === 'GET' &&
    url.origin === location.origin &&
    url.href.startsWith('{{ site.url }}/')
  ) {
    evt.respondWith(
      caches.match(req).then(cacheRes => {
        return cacheRes || fetch(req).then(fetchRes => {
          // Skip opaque or error responses
          if (
            fetchRes.status !== 200 ||
            fetchRes.type === 'opaque'
          ) {
            return fetchRes;
          }

          // Cache it
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(req, fetchRes.clone());
            limitCacheSize(dynamicCacheName, 50);
            return fetchRes;
          });
        });
      }).catch(() => {
        return caches.match('{{ site.url }}/pages/fallback/index.html');
      })
    );
  }
});


importScripts("https://www.gstatic.com/firebasejs/3.7.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.7.4/firebase-messaging.js");

firebase.initializeApp({
    'messagingSenderId': '348845039541'
  });

  const messaging = firebase.messaging();
