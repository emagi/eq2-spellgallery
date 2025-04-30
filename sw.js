const CACHE_NAME = 'spell-gallery-v1';

// On install, cache your shell and index.json
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll([
        '/',               // your index.html
        '/index.html',
        '/index.json',
        // you can pre-cache a handful of favorites,
        // but we'll dynamically cache the rest as they're fetched
      ])
    )
  );
  self.skipWaiting();
});

// Intercept all requests for videos, thumbnails, JSON, HTML
self.addEventListener('fetch', evt => {
  const url = new URL(evt.request.url);

  // only handle our own origin
  if (url.origin !== location.origin) return;

  // we want to cache:
  //  - index.json, index.html
  //  - /spells/*.mp4 and /spells_thumbnails/*.mp4
  if (
    url.pathname === '/dof_spellvisuals.json' ||
    url.pathname === '/index_dof.html' ||
    url.pathname.startsWith('/spells/') ||
    url.pathname.startsWith('/spells_thumbnails/')
  ) {
    evt.respondWith(
      caches.match(evt.request).then(cached => {
        if (cached) return cached;
        return fetch(evt.request).then(fetched => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(evt.request, fetched.clone());
            return fetched;
          });
        });
      })
    );
  }
});
