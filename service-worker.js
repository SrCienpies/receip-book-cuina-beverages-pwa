
const cacheName = "recetario-v2";
const filesToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./cocktail_recipes.json",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json"
];

// Instala y guarda archivos en cache
self.addEventListener("install", event => {
  self.skipWaiting(); // fuerza actualización inmediata
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Activa y limpia caches anteriores
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      )
    )
  );
});

// Intercepta peticiones
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // Evita cachear llamadas a Supabase
  if (url.includes("supabase.co")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
