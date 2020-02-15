const VERSION = 'V4';

function log(messages) {
  console.log(VERSION, messages);
}

log('Installing Service Worker');

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));

async function installServiceWorker() {
  log('Service Worker Installation Started.');
  const request = new Request('index.html');
  const response = await fetch(request);

  log('response received after loading index.html', response);

  if (response.status !== 200) {
    throw new Error('Could not load index page');
  }

  const cache = await caches.open('app-cache');

  cache.put(request, response);

  log('Cached index.html');
}

self.addEventListener('activate', () => {
  log('Version is Activated');
});
