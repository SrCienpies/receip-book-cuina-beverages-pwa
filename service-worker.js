const cacheName = "recetario-v1";
const filesToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./cocktail_recipes.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
