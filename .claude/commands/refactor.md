# 리팩토링 가이드라인

이 프로젝트의 리팩토링 요청을 수행할 때 아래 규칙을 반드시 따른다.
규칙에 위배되는 기존 코드를 발견하면 함께 수정한다.

---

## 1. 서버 컴포넌트 우선

데이터 페칭은 서버에서 한다. `"use client"`는 인터랙션이 꼭 필요한 리프 컴포넌트에만 붙인다.

**Bad**
```tsx
"use client";
import { useEffect, useState } from "react";

export default function PlacePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/places").then(r => r.json()).then(setData);
  }, []);

  return <div>{data?.name}</div>;
}
```

**Good**
```tsx
// app/places/page.tsx — 서버 컴포넌트 (no "use client")
export default async function PlacePage() {
  const data = await getRequest<PlaceData>("/places");
  return <PlaceView data={data} />;
}

// PlaceView.tsx — 인터랙션이 있을 때만 "use client"
"use client";
export function PlaceView({ data }: { data: PlaceData }) {
  return <div>{data.name}</div>;
}
```

---

## 2. SWR은 클라이언트 인터랙션 데이터에만

서버에서 못 가져오는 데이터(사용자 세션 의존, 실시간 갱신)에만 SWR을 쓴다.
`useEffect` + `fetch` 조합은 금지.

**Bad**
```tsx
"use client";
export function MyPage() {
  const [scraps, setScraps] = useState([]);
  useEffect(() => {
    api.get("/scraps/my").then(r => setScraps(r.data));
  }, []);
}
```

**Good**
```tsx
"use client";
export function MyPage() {
  const { data: scraps, isLoading } = useSWR<ScrapList>("/scraps/my");
  if (isLoading) return <ListSkeleton />;
  return <ScrapList items={scraps?.items} />;
}
```

---

## 3. 로딩 상태 — 빈 화면 절대 금지

모든 비동기 데이터에 로딩 UI가 있어야 한다. 스켈레톤 우선, 없으면 스피너.
라우트마다 `loading.tsx`를 작성한다.

**Bad**
```tsx
export function PlaceList() {
  const { data } = useSWR("/places");
  // 로딩 중 아무것도 안 보임
  return <div>{data?.items.map(...)}</div>;
}
```

**Good**
```tsx
export function PlaceList() {
  const { data, isLoading, error } = useSWR("/places");

  if (isLoading) return <ListSkeleton />;
  if (error) return <EmptyState title="불러오기 실패" description="다시 시도해주세요." />;
  if (!data?.items.length) return <EmptyState title="결과가 없습니다." />;

  return <div>{data.items.map(...)}</div>;
}
```

```tsx
// app/places/loading.tsx
export default function Loading() {
  return <ListSkeleton />;
}
```

---

## 4. 에러 상태 필수

에러를 삼키거나 콘솔에만 남기면 안 된다. 항상 UI로 표현한다.

**Bad**
```tsx
const { data, error } = useSWR("/api/reviews");
// error 처리 없음
return <ReviewList items={data?.items} />;
```

**Good**
```tsx
const { data, error, isLoading } = useSWR("/api/reviews");

if (isLoading) return <ReviewSkeleton />;
if (error) return <EmptyState title="리뷰를 불러오지 못했습니다." description={error.message} />;
```

---

## 5. 낙관적 업데이트 (스크랩/북마크 등)

서버 응답 전에 UI를 먼저 업데이트한다. 실패 시 롤백.

**Bad**
```tsx
const handleScrap = async () => {
  await postScrap(id); // 기다리는 동안 UI 변화 없음
  refetch();           // 완료 후 갱신
};
```

**Good**
```tsx
const handleScrap = async () => {
  // 즉시 UI 반영
  setIsBookmarked(prev => !prev);
  setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1);

  try {
    await postScrap({ id, type: "place" });
  } catch {
    // 실패 시 롤백
    setIsBookmarked(prev => !prev);
    setBookmarkCount(prev => isBookmarked ? prev + 1 : prev - 1);
  }
};
```

---

## 6. 이미지 — next/image 필수

**Bad**
```tsx
<img src="/assets/logo.svg" alt="로고" width={72} height={24} />
```

**Good**
```tsx
import Image from "next/image";
<Image src="/assets/logo.svg" alt="로고" width={72} height={24} priority />
```

---

## 7. 타입 — any 금지

**Bad**
```tsx
const handleData = (data: any) => {
  return data.items.map((item: any) => item.title);
};
```

**Good**
```tsx
const handleData = (data: PlaceListResponse) => {
  return data.items.map((item) => item.title);
};

// 외부 데이터가 불확실하면 unknown + 타입 가드
function isApiError(e: unknown): e is ApiError {
  return e instanceof ApiError;
}
```

---

## 8. 페이지 컴포넌트 — UI만, 로직은 훅으로

페이지 파일에 비즈니스 로직이 50줄 이상이면 훅으로 분리한다.

**Bad**
```tsx
export default function MapPage() {
  const [places, setPlaces] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.get(`/places?filter=${filter}`)
      .then(r => setPlaces(r.data.items))
      .finally(() => setIsLoading(false));
  }, [filter]);

  const handleScrap = async (id: number) => { /* 30줄 로직 */ };
  const handleFilter = (f: string) => { /* 10줄 로직 */ };

  return <MapView ... />;
}
```

**Good**
```tsx
// hooks/useMapPage.ts
export function useMapPage() {
  const [filter, setFilter] = useState("all");
  const { data, isLoading } = useSWR(`/places?filter=${filter}`);
  const handleScrap = async (id: number) => { ... };
  return { places: data?.items, isLoading, filter, setFilter, handleScrap };
}

// app/map/page.tsx
export default function MapPage() {
  const { places, isLoading, filter, setFilter, handleScrap } = useMapPage();
  return <MapView places={places} isLoading={isLoading} ... />;
}
```

---

## 9. props — 5개 초과 시 interface 분리

**Bad**
```tsx
function PlaceCard({ title, thumbnail, distance, category, tags, onClick, isBookmarked, onBookmark, bookmarkCount }: { title: string; thumbnail: string; ... }) {
```

**Good**
```tsx
interface PlaceCardProps {
  title: string;
  thumbnail: string;
  distance: string | null;
  category: string;
  tags?: string[];
  onClick?: () => void;
  isBookmarked?: boolean;
  onBookmarkClick?: () => void;
  bookmarkCount?: number;
}

function PlaceCard({ title, thumbnail, ...}: PlaceCardProps) {
```

---

## 10. 매직 스트링 금지

**Bad**
```tsx
if (activeTab === "dangle") { ... }
postScrap({ id, type: "place" });
router.push("/shorts?listType=accommodations");
```

**Good**
```tsx
// constants/tabIds.ts
export const TAB_ID = { DANGLE: "dangle", NEAR: "near" } as const;

// types/scrap.ts
export type ScrapType = "place" | "dangle";

if (activeTab === TAB_ID.DANGLE) { ... }
postScrap({ id, type: "place" satisfies ScrapType });
```

---

## 11. 컴포넌트 위치 기준

| 조건 | 위치 |
|---|---|
| 다른 프로젝트에서도 쓸 수 있는 범용 UI | `packages/daenggle-ui/src/` |
| 이 앱 전용이지만 여러 페이지에서 재사용 | `apps/web/src/ui/` |
| 특정 페이지에서만 사용 | 해당 페이지 폴더 내 `ui/` (예: `app/curation/ui/`) |

아토믹 디자인 의존 방향: `atoms → molecules → views` (역방향 금지)

---

## 12. SWR keepPreviousData — 페이지/탭 전환 시 깜빡임 방지

**Bad**
```tsx
const { data } = useSWR(`/places?filter=${filter}`);
// 필터 바꾸면 data가 undefined → 빈 화면 깜빡임
```

**Good**
```tsx
const { data } = useSWR(`/places?filter=${filter}`, { keepPreviousData: true });
// 새 데이터 올 때까지 이전 데이터 유지
```

---

## 13. console.log 커밋 금지

개발 중 디버깅 로그는 커밋 전 반드시 제거한다.
Biome이 `noConsole` 경고를 띄우므로 pre-commit에서 자동 감지된다.
