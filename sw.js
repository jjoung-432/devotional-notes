const CACHE_NAME = 'muksan-note-v2.0';
const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// 설치: 기본 파일 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// 활성화: 이전 버전 캐시 전부 삭제
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Network First — 네트워크 성공 시 캐시 갱신, 실패 시 캐시 폴백
self.addEventListener('fetch', event => {
  // 외부 API / CDN 요청은 서비스워커 거치지 않음
  const url = event.request.url;
  if (
    url.includes('firebasejs') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com') ||
    url.includes('fonts.googleapis.com') ||
    url.includes('jsdelivr.net') ||
    url.includes('cdnjs.cloudflare.com') ||
    event.request.method !== 'GET'
  ) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 네트워크 성공 → 캐시 업데이트 후 응답 반환
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // 오프라인 → 캐시에서 반환
        return caches.match(event.request)
          .then(cached => cached || caches.match('./index.html'));
      })
  );
});
