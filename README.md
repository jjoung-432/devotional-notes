# 🙏 나의 묵상노트

말씀 묵상, 감정일기, 기도제목을 한 곳에서 기록하는 크리스천 PWA 앱입니다.

## 주요 기능

- **말씀 탭** — 개역한글판 성경 구절 추천 (20개 큐레이션)
- **감정일기 탭** — 긍정/부정 감정 선택, 점수·이유 기록, 감사일기, 칭찬 등
- **기도 탭** — 카테고리별 기도제목 관리 (기도중 / 응답됨 상태 전환)
- **기록 탭** — 날짜별 일기 목록, 상세 내용 펼쳐보기, 통계

## 기술 스택

- **단일 파일 PWA** — `index.html` 하나로 구성
- **Firebase Authentication** — Google 소셜 로그인
- **Firestore** — 사용자별 데이터 클라우드 저장
- **Service Worker** — 오프라인 지원, 홈 화면 추가 가능
- **OpenMoji** — 오픈소스 이모지 이미지

## 배포 (GitHub Pages)

```bash
git add .
git commit -m "deploy"
git push origin main
```

GitHub 저장소 → Settings → Pages → Branch: `main` / `(root)` 선택 후 저장

## Firebase 설정

`index.html` 내 `firebaseConfig` 값은 이미 설정되어 있습니다.
Firebase 콘솔에서 아래를 확인해주세요.

1. **Authentication** → Google 로그인 제공업체 활성화
2. **Firestore** → 데이터베이스 생성
3. **Firestore 보안 규칙** 설정:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

## 로컬 실행

별도 빌드 없이 `index.html`을 브라우저로 바로 열거나,
간단한 로컬 서버로 실행합니다.

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .
```
