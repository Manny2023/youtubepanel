const CACHE_NAME = 'catalogos-pwa-cache-v1';
const urlsToCache = [
  '.',
  './index.html',
  './manifest.json',
  // Agrega recursos estáticos aquí: css, imágenes, iconos, scripts
];

// Instalación y cacheo de recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activación: limpieza de caches antiguos si es necesario
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if(key !== CACHE_NAME){
          return caches.delete(key);
        }
      })
    ))
  );
});

// Intercepción de peticiones para dar recursos cacheados
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
