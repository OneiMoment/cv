/**
 * Service Worker for Mohammed Al Otaibi CV Website
 * Provides full offline cache-first & network-fallback capability with instant cache updating
 */

const CACHE_NAME = 'cv-cache-v7';
const STATIC_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './data.js',
  './robots.txt',
  './sitemap.xml',
  './images/profile.JPG',
  './images/favicon.ico',
  './images/favicon-32x32.png',
  './images/favicon-16x16.png',
  './images/apple-touch-icon.png',
  './images/site.webmanifest'
];

// Install Event - Pre-cache core assets and force immediate activation
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate Event - Clean up any older caches and claim clients immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network first for JS/CSS/Data, with Cache Fallback for instant updates
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request).then(networkResponse => {
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
