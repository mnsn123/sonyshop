---
---
const staticCacheName = '{{ "now" | date: "%Y-%m-%d-%H-%M" }}';
const dynamicCacheName = '{{ "now" | date: "%Y-%m-%d-%H-%M" }}';
const assets = [
  '{{ site.url }}/pages/fallback/index.html'
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 2500);
          return fetchRes;
        })
      });
    }).catch(() => {
      return caches.match('{{ site.url }}/pages/fallback/index.html');
    })
  );
});



importScripts("https://www.gstatic.com/firebasejs/3.7.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.7.4/firebase-messaging.js");

firebase.initializeApp({
    'messagingSenderId': '348845039541'
  });

  const messaging = firebase.messaging();
