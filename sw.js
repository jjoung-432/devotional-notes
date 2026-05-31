// 캐시 완전 비활성화 — 항상 네트워크에서 최신 파일 제공

self.addEventListener('install', event => {
  // 설치 즉시 활성화 (대기 없이 바로 새 워커로 전환)
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    // 모든 기존 캐시 삭제
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim()) // 열린 탭 전부 즉시 새 워커로 제어
  );
});

self.addEventListener('fetch', event => {
  // 캐시 전혀 사용하지 않음 — 모든 요청을 네트워크로 직접 통과
  // (서비스워커가 fetch를 가로채지 않으면 브라우저 기본 동작으로 처리됨)
});
