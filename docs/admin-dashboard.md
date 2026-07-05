# 어드민 대시보드 설계 기획서

## 목표

제주 반려동물 동반 여행 앱 댕글제주의 내부 관리 도구를 구축한다.  
동시에 UI 레이어는 누구나 npm 으로 설치해서 쓸 수 있는 독립 패키지로 분리한다.

---

## 패키지 분리 전략

```
packages/
  daenggle-ui/          → npm: daenggle-ui        (기존, 모바일 서비스 UI)
  daenggle-admin-ui/    → npm: daenggle-admin-ui  (신규, 어드민 대시보드 UI)
```

### daenggle-admin-ui 가 daenggle-ui 와 다른 이유

| 항목 | daenggle-ui | daenggle-admin-ui |
|---|---|---|
| 대상 | 모바일/서비스 사용자 | 어드민 운영자 |
| 디자인 | 밝고 친근한 앱 UI | 다크 사이드바 + 데이터 테이블 중심 |
| 주요 컴포넌트 | 카드·칩·바텀시트·내비바 | 사이드바·테이블·배지·폼 |
| next 의존 | peer dep | peer dep (동일) |

### npm 배포 구조 (`packages/daenggle-admin-ui`)

```
daenggle-admin-ui/
├── src/
│   ├── atoms/
│   │   ├── AdminCard/        AdminCard.tsx + style.css.ts
│   │   ├── AdminBadge/       AdminBadge.tsx + style.css.ts
│   │   └── AdminTable/       AdminTable.tsx + style.css.ts
│   ├── layout/
│   │   ├── AdminSidebar/     AdminSidebar.tsx + style.css.ts
│   │   └── AdminTopbar/      AdminTopbar.tsx + style.css.ts
│   ├── styles/
│   │   └── tokens.css.ts     디자인 토큰 (export 포함)
│   └── index.ts              named export only
├── package.json
├── tsup.config.ts            daenggle-ui 와 동일 세팅
└── tsconfig.json
```

### 소비 앱 (`apps/web/src/app/admin`)

패키지가 노출하지 않는 앱 전용 코드가 여기에 위치한다.

```
apps/web/src/app/admin/
├── layout.tsx               AdminSidebar 를 패키지에서 import
├── layout.css.ts
├── config/
│   └── nav.ts               앱 전용 네비게이션 정의 (패키지 대상 아님)
└── ...pages
```

### 패키지 컴포넌트 API 설계 원칙

`AdminSidebar` 는 nav 구성을 props 로 받는다.  
패키지 내부에 특정 경로(`/admin/seo` 등)를 하드코딩하지 않는다.

```tsx
// 패키지가 export 하는 타입
export interface NavItem {
  label: string
  href: string
  icon: ReactNode
  badge?: number
  exact?: boolean       // true: 완전 일치, false(기본): prefix 일치
}

export interface NavSection {
  label: string
  items: NavItem[]
}

// 소비 앱에서
import { AdminSidebar } from "daenggle-admin-ui"
import { ADMIN_NAV } from "@/admin/config/nav"   // 앱 전용

<AdminSidebar nav={ADMIN_NAV} logo={<Logo />} footer={<LogoutBtn />} />
```

---

## 어드민 전체 페이지 구조

```
/admin
├── /                   대시보드       핵심 지표 요약
├── /places             장소 관리      목록 · 등록 · 수정 · 삭제
├── /daenggle           댕글 관리      영상 목록 · 등록 · 수정 · 삭제
├── /users              사용자 관리    목록 · 상세
├── /reviews            리뷰 관리      목록 · 신고 처리
└── /seo                SEO 현황       인프라 · 번역 · 사이트맵
```

---

## 페이지별 기능 명세

### 대시보드 `/admin`

| 지표 카드 | 설명 |
|---|---|
| 전체 장소 수 | 컨텐츠 타입별 breakdown (숙박/음식점/관광지/레포츠/쇼핑) |
| 전체 댕글 수 | 영상 총 수 |
| 전체 사용자 수 | 총 수 + 최근 7일 신규 |
| 리뷰·신고 수 | 신고 접수 건 강조 |

하단 테이블 2개: 최근 등록 장소 5건 / 최근 가입 사용자 5건

---

### 장소 관리 `/admin/places`

**목록**
- 컨텐츠 타입 필터 / 장소명 검색 / 페이지네이션
- 컬럼: ID · 장소명 · 타입 · 스크랩 수 · 댕글 수 · 등록일 · 수정/삭제

**등록·수정** `/admin/places/new`, `/admin/places/[id]/edit`
- 기본 정보: 장소명, 주소, 전화번호, 홈페이지, 개요
- 컨텐츠 타입 선택 (32/39/12/28/38)
- 반려동물 조건 체크박스 (leash / carrier / leash_free / diaper)
- 편의시설 체크박스 (parking / bbq / wifi / takeout / yard / pets_zone / barking_ok / jacuzzi)
- 크기 (small / med / large / xlarge) + 공간 (indoor / outdoor / allarea)
- 위도·경도
- 이미지 업로드

---

### 댕글 관리 `/admin/daenggle`

**목록**
- 정렬 필터 (rank / recent / views) / 제목·작성자 검색 / 페이지네이션
- 컬럼: video_id · 제목 · 작성자 · 스크랩 수 · 등록일 · 연결 장소 · 수정/삭제

**등록·수정** `/admin/daenggle/new`, `/admin/daenggle/[id]/edit`
- 제목, 작성자명, 영상 URL, 태그
- 연결 장소 검색·선택
- 컨셉 키 선택 (west_coast_beach / water_activity / dog_park 등)
- 지역 연결 (DaenggleContextId)

---

### 사용자 관리 `/admin/users`

**목록**
- 이름·이메일 검색 / 페이지네이션
- 컬럼: ID · 이름 · 이메일 · 가입일 · 반려동물 수 · 스크랩 수

**상세** `/admin/users/[id]`
- 기본 프로필 / 등록 반려동물 목록 / 스크랩 목록 / 발자국 내역

---

### 리뷰 관리 `/admin/reviews`

- 필터: 전체 / 신고 접수 / 처리 완료
- 신고 수 높은 순 기본 정렬
- 컬럼: ID · 작성자 · 대상 장소 · 내용 요약 · 신고 수 · 상태 · 삭제

---

### SEO 현황 `/admin/seo`

- 인프라 현황 (sitemap / robots / hreflang / JSON-LD)
- 페이지별 메타데이터 적용 현황
- 번역 키 완성도 (ko / en / ja)
- 사이트맵 URL 목록 / 빠른 확인 링크

---

## 프론트엔드 아키텍처

### 레이아웃 구조

```
layout.tsx
  └─ <AdminSidebar nav={ADMIN_NAV} logo={...} footer={...} />   ← 패키지 컴포넌트
  └─ <main>
        └─ page.tsx
              ├─ <AdminTopbar title="..." actions={...} />        ← 패키지 컴포넌트
              └─ 콘텐츠 영역 (스크롤)
```

### 서버/클라이언트 경계

| 컴포넌트 | 위치 | 이유 |
|---|---|---|
| `AdminSidebar` | Client (패키지) | `usePathname` 으로 active 감지 |
| `AdminTopbar` | Server (패키지) | 정적 |
| `AdminCard`, `AdminBadge`, `AdminTable` | Server (패키지) | 정적 |
| 목록 페이지 | Server | 초기 데이터 서버 fetch |
| 검색·필터 | Client | 인터랙션 |
| 등록·수정 폼 | Client | 상태 관리·유효성 검사 |

### API Routes (어드민 전용)

```
apps/web/src/app/api/admin/
├── stats/route.ts          GET — 대시보드 지표
├── places/
│   ├── route.ts            GET(목록) · POST(등록)
│   └── [id]/route.ts       GET · PUT · DELETE
├── daenggle/
│   ├── route.ts
│   └── [id]/route.ts
├── users/
│   ├── route.ts
│   └── [id]/route.ts
└── reviews/
    ├── route.ts
    └── [id]/route.ts
```

---

## 디자인 토큰 (`packages/daenggle-admin-ui/src/styles/tokens.css.ts`)

### 사이드바 — 다크 네이비

| 토큰 | 값 |
|---|---|
| `SIDEBAR_BG` | `#1E2233` |
| `SIDEBAR_HOVER_BG` | `#252840` |
| `SIDEBAR_ACTIVE_BG` | `#2C3354` |
| `SIDEBAR_TEXT` | `#8B93AA` |
| `SIDEBAR_TEXT_ACTIVE` | `#FFFFFF` |
| `SIDEBAR_LABEL` | `#4E5669` |
| `SIDEBAR_BORDER` | `rgba(255,255,255,0.08)` |

### 콘텐츠 영역

| 토큰 | 값 | 비고 |
|---|---|---|
| `CONTENT_BG` | `#F8FAFC` | NEUTRAL50(`#F6F6F6`)보다 밝은 어드민 전용 색 |
| `CARD_BG` | `#FFFFFF` | |
| `CARD_BORDER` | `#E8ECF0` | |

---

## 패키지 컴포넌트 API

### AdminSidebar

```tsx
export interface NavItem {
  label: string
  href: string
  icon: ReactNode
  badge?: number
  exact?: boolean
}

export interface NavSection {
  label: string
  items: NavItem[]
}

export interface AdminSidebarProps {
  nav: NavSection[]
  logo: ReactNode         // 로고 영역 자유 커스터마이징
  footer?: ReactNode      // 로그아웃 등 하단 영역
}
```

### AdminTopbar

```tsx
export interface AdminTopbarProps {
  title: string
  actions?: ReactNode
}
```

### AdminCard

```tsx
export interface AdminCardProps {
  id?: string
  title: ReactNode        // 아이콘 + 텍스트 조합 가능
  children: ReactNode
}
```

### AdminBadge

```tsx
export type AdminBadgeVariant = "ok" | "warning" | "error" | "info" | "neutral"

export interface AdminBadgeProps {
  variant: AdminBadgeVariant
  children: ReactNode
}
```

### AdminTable

```tsx
export interface AdminTableProps {
  head: ReactNode         // <tr><th>...</th></tr>
  children: ReactNode     // <tr><td>...</td></tr> 반복
  empty?: ReactNode       // 데이터 없을 때
}
```

---

## 패키지 설정 (`packages/daenggle-admin-ui/package.json`)

```json
{
  "name": "daenggle-admin-ui",
  "version": "0.1.0",
  "description": "Admin dashboard UI components for Next.js apps",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "import": "...", "require": "..." },
    "./styles": "./dist/index.css"
  },
  "peerDependencies": {
    "@vanilla-extract/css": ">=1.0.0",
    "next": ">=14.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "react-icons": ">=5.0.0"
  }
}
```

tsup.config.ts, tsconfig.json 은 `daenggle-ui` 와 동일 구조.

---

## 작업 순서

### Phase 1 — 패키지 골격 + 공통 쉘

1. `packages/daenggle-admin-ui/` 패키지 초기 세팅 (package.json / tsup / tsconfig)
2. `tokens.css.ts` — 디자인 토큰
3. `AdminSidebar` — 다크 사이드바
4. `AdminTopbar` — 상단 바
5. `AdminCard`, `AdminBadge`, `AdminTable` — 공통 UI
6. `index.ts` — named export
7. `apps/web` 에서 패키지 workspace 의존성 연결
8. `admin/layout.tsx` + `admin/config/nav.ts` — 쉘 완성
9. `admin/seo/page.tsx` — 기존 SEO 페이지를 패키지 컴포넌트로 교체

### Phase 2 — 대시보드

10. `app/api/admin/stats/route.ts`
11. `admin/page.tsx` (대시보드)

### Phase 3 — 장소 관리

12. `app/api/admin/places/` API
13. `admin/places/` 페이지들

### Phase 4 — 댕글 관리

14. `app/api/admin/daenggle/` API
15. `admin/daenggle/` 페이지들

### Phase 5 — 사용자·리뷰 관리

16. `app/api/admin/users/` + `reviews/` API
17. `admin/users/` + `admin/reviews/` 페이지들

### Phase 6 — npm 배포

18. 버전 정책 확정 (semantic versioning)
19. `pnpm publish --filter daenggle-admin-ui`
