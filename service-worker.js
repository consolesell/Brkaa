self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                'index.html',
                'homepage.html',
                'bookings.html',
                'homepagestyles.css',
                'bookings.css',
                'styles.css',
                'homepagescript.js',
                'bookings.js',
                'index.js',
                'public/services/logos/logo1.png',
                'public/services/logos/logo2.jpg'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});