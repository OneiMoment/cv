/**
 * Service Worker for Mohammed Al Otaibi CV Website
 * Provides full offline cache-first & network-fallback capability with instant cache updating
 */

const CACHE_NAME = 'cv-cache-v14';
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
  './images/android-chrome-192x192.png',
  './images/android-chrome-512x512.png',
  './images/site.webmanifest',
  './certificates/Diploma1.pdf',
  './certificates/Diploma2.pdf',
  './certificates/IELTS%202014.pdf',
  './certificates/LAN%20Switching%20and%20Wireless.pdf',
  './certificates/Network%20Fundamentals.pdf',
  './certificates/Routing%20Protocols%20and%20Concepts.pdf'
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

// Fetch Event - Hybrid Performance Strategy:
// 1. Navigation requests (HTML): Network-first with Cache fallback for fresh content
// 2. Static Assets (CSS, JS, Fonts, Images, PDFs): Stale-While-Revalidate for instant load
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // 1. HTML / Navigation Requests
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/') {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(event.request).then(cached => cached || caches.match('./index.html'));
      })
    );
    return;
  }

  // 2. Static Assets (Images, Fonts, Scripts, Styles, PDFs): Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => null);

      return cachedResponse || fetchPromise;
    })
  );
});
