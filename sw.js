// Service Worker for Aneeza's Love Portal Notifications
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for push notifications or local message triggers
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

// Periodic background sync or message from page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: event.data.icon || 'images/WhatsApp%20Image%202026-11-21%20at%205.18.36%20PM.jpeg',
      badge: 'images/WhatsApp%20Image%202026-11-21%20at%205.18.36%20PM.jpeg',
      vibrate: [200, 100, 200, 100, 300],
      tag: 'saad-daily-love',
      renotify: true,
      data: { url: '/' }
    });
  }
});
