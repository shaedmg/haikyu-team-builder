// Service Worker para Haikyu Team Builder
// Versión: 1.0.0

const CACHE_NAME = 'haikyu-team-builder-v1.0.0';
const CACHE_VERSION = '1.0.0';

// Recursos críticos para cachear
const CORE_CACHE_RESOURCES = [
  './',
  './index.html',
  './styles.css',
  './dist/init.js',
  './manifest.json',
];

// Recursos de imágenes para cachear
const IMAGE_CACHE_RESOURCES = [
  './assets/images/characters/',
  './assets/images/favicon.svg',
  './assets/images/icon-192x192.png',
  './assets/images/icon-512x512.png',
];

// Recursos externos para cachear
const EXTERNAL_CACHE_RESOURCES = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
];

// Todas las URLs para el cache inicial
const urlsToCache = [...CORE_CACHE_RESOURCES, ...EXTERNAL_CACHE_RESOURCES];

// Estrategias de cache
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only',
};

// Configuración de rutas y sus estrategias
const ROUTE_CACHE_CONFIG = [
  {
    pattern: /\.(js|css|html)$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: 'static-resources',
  },
  {
    pattern: /\.(png|jpg|jpeg|svg|webp|gif|ico)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: 'images',
    expiration: {
      maxEntries: 200,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
    },
  },
  {
    pattern: /\.json$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: 'json-data',
  },
  {
    pattern: /^https:\/\/fonts\.googleapis\.com/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheName: 'google-fonts-stylesheets',
  },
  {
    pattern: /^https:\/\/fonts\.gstatic\.com/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    cacheName: 'google-fonts-webfonts',
    expiration: {
      maxEntries: 30,
      maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
    },
  },
];

// Event: Install
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker version:', CACHE_VERSION);

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Core resources cached successfully');
        return self.skipWaiting(); // Activar inmediatamente
      })
      .catch((error) => {
        console.error('[SW] Failed to cache core resources:', error);
      })
  );
});

// Event: Activate
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker version:', CACHE_VERSION);

  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      cleanupOldCaches(),
      // Tomar control de todas las páginas inmediatamente
      self.clients.claim(),
    ]).then(() => {
      console.log('[SW] Service Worker activated and ready');
    })
  );
});

// Event: Fetch
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Solo interceptar GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Determinar estrategia de cache basada en la URL
  const cacheStrategy = determineCacheStrategy(url);

  event.respondWith(handleRequest(request, cacheStrategy));
});

// Event: Message (comunicación con la app)
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);

  if (event.data && event.data.type) {
    switch (event.data.type) {
      case 'SKIP_WAITING':
        self.skipWaiting();
        break;
      case 'GET_CACHE_INFO':
        getCacheInfo().then((info) => {
          event.ports[0].postMessage(info);
        });
        break;
      case 'CLEAR_CACHE':
        clearAllCaches().then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
      case 'PRELOAD_IMAGES':
        preloadImages(event.data.imageUrls).then(() => {
          event.ports[0].postMessage({ success: true });
        });
        break;
    }
  }
});

// Event: Sync (background sync)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'team-data-sync') {
    event.waitUntil(syncTeamData());
  }
});

// Event: Push (notificaciones push)
self.addEventListener('push', (event) => {
  console.log('[SW] Push message received');

  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible!',
    icon: './assets/images/icon-192x192.png',
    badge: './assets/images/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver cambios',
        icon: './assets/images/icon-explore.png',
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: './assets/images/icon-close.png',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification('Haikyu Team Builder', options)
  );
});

// Funciones auxiliares

/**
 * Determina la estrategia de cache para una URL
 */
function determineCacheStrategy(url) {
  for (const config of ROUTE_CACHE_CONFIG) {
    if (config.pattern.test(url.pathname) || config.pattern.test(url.href)) {
      return config;
    }
  }

  // Estrategia por defecto
  return {
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheName: 'default',
  };
}

/**
 * Maneja las requests según la estrategia de cache
 */
async function handleRequest(request, config) {
  const cacheName = config.cacheName || CACHE_NAME;

  switch (config.strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      return cacheFirst(request, cacheName);

    case CACHE_STRATEGIES.NETWORK_FIRST:
      return networkFirst(request, cacheName);

    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      return staleWhileRevalidate(request, cacheName);

    case CACHE_STRATEGIES.NETWORK_ONLY:
      return fetch(request);

    case CACHE_STRATEGIES.CACHE_ONLY:
      return caches.match(request);

    default:
      return networkFirst(request, cacheName);
  }
}

/**
 * Estrategia Cache First
 */
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

/**
 * Estrategia Network First
 */
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response('Content not available offline', { status: 503 });
  }
}

/**
 * Estrategia Stale While Revalidate
 */
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      const cache = caches.open(cacheName);
      cache.then((c) => c.put(request, networkResponse.clone()));
      return networkResponse;
    })
    .catch((error) => {
      console.log('[SW] Network update failed:', error);
    });

  return cachedResponse || networkResponsePromise;
}

/**
 * Limpia caches antiguos
 */
async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(
    (name) => name !== CACHE_NAME && name.startsWith('haikyu-team-builder-')
  );

  console.log('[SW] Cleaning up old caches:', oldCaches);

  return Promise.all(oldCaches.map((cacheName) => caches.delete(cacheName)));
}

/**
 * Obtiene información de los caches
 */
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const cacheInfo = [];

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const keys = await cache.keys();
    cacheInfo.push({
      name,
      size: keys.length,
      resources: keys.map((req) => req.url),
    });
  }

  return {
    version: CACHE_VERSION,
    caches: cacheInfo,
    totalCaches: cacheNames.length,
  };
}

/**
 * Limpia todos los caches
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  console.log('[SW] Clearing all caches');

  return Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
}

/**
 * Precarga imágenes en el cache
 */
async function preloadImages(imageUrls) {
  console.log('[SW] Preloading images:', imageUrls);

  const cache = await caches.open('images');
  const requests = imageUrls.map((url) => new Request(url));

  return Promise.all(
    requests.map(async (request) => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          await cache.put(request, response);
        }
      } catch (error) {
        console.warn('[SW] Failed to preload image:', request.url, error);
      }
    })
  );
}

/**
 * Sincroniza datos del equipo en background
 */
async function syncTeamData() {
  console.log('[SW] Syncing team data in background');

  try {
    // Aquí podrías sincronizar datos con un servidor
    // Por ahora, solo simulamos la sincronización
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('[SW] Team data sync completed');
  } catch (error) {
    console.error('[SW] Team data sync failed:', error);
  }
}

// Utilidades de debugging
function logCacheStatus() {
  getCacheInfo().then((info) => {
    console.log('[SW] Cache Status:', info);
  });
}

// Log inicial
console.log('[SW] Service Worker script loaded, version:', CACHE_VERSION);
