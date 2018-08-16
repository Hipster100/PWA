

//Base files to be cached
var CACHE_FILES = [
  './',
  'vendor.bundle.js',
  'main.bundle.js',
  '/styles.bundle.js',
  
  
];

self.addEventListener('install', async  event => {

  let test = ['1','3', '34'];

  const cache = await caches.open('new-static3');
  cache.addAll(CACHE_FILES)
})

self.addEventListener('fetch', async event => {

  const req = event.request;
  const url = new URL(req.url);
  if(url.origin === location.origin){ // if we are searching on our local site

    event.respondWith(cacheFirst(req));
  } 
  else {
    event.respondWith(networkFirst(req));
  }
})

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req); //check if we have a cached response
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open('new-dynamic');  //create new cache

  try {
    const res = await fetch(req);
    cache.put(req, res.clone()); //add new stuff to cache
    return res;
  } catch (error) {
    return await cache.match(req);
  }
}