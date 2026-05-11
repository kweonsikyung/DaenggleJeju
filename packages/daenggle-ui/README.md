# daenggle-ui

> 🐾 댕글제주 UI 컴포넌트 라이브러리

Next.js + vanilla-extract 기반의 반려동물 여행 서비스 [댕글제주](https://www.daengglejeju.site)의 UI 컴포넌트 패키지입니다.

## 설치

```bash
npm install daenggle-ui
# or
pnpm add daenggle-ui
# or
yarn add daenggle-ui
```

## 요구사항

```json
{
  "next": ">=14.0.0",
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "vaul": ">=1.0.0"
}
```

## 사용법

```tsx
import { Button, Header, BottomSheet } from 'daenggle-ui';

export default function Page() {
  return (
    <>
      <Header title="댕글제주" />
      <Button size="medium" status="primary" text="탐색하기" onClick={() => {}} />
    </>
  );
}
```

## 컴포넌트 목록

### Atoms

| 컴포넌트 | 설명 |
| --- | --- |
| AvatarPicker | 아바타 이미지 선택 |
| BottomSheet | 하단 드로어 시트 |
| Button | 기본 버튼 |
| Location | 위치 버튼 |
| LoginButton | 로그인 버튼 |
| AiProfileHeader | AI 프로필 헤더 |
| ChatInput | 채팅 입력창 |
| MessageBox | 채팅 메시지 박스 |
| ThinkingBubble | AI 생각 중 버블 |
| TopicSelector | 토픽 선택기 |
| Chip | 기본 칩 |
| ChipKeyword | 키워드 칩 |
| ChipMapList | 지도 목록 칩 |
| DangleCard | 댕글 카드 |
| DangleItem | 댕글 아이템 |
| DanglePlace | 댕글 장소 |
| DanglePlay | 댕글 영상 플레이 |
| DangleReview | 댕글 리뷰 |
| DangleVideo | 댕글 비디오 |
| Dropdown | 드롭다운 |
| EmptyState | 빈 상태 |
| Fab | 플로팅 액션 버튼 |
| FilterChip | 필터 칩 |
| FilterChipExpand | 확장 필터 칩 |
| Header | 헤더 |
| LoadingSpinner | 로딩 스피너 |
| Modal | 모달 |
| NavBar | 하단 네비게이션 바 |
| NoticeBox | 공지 박스 |
| Pagination | 페이지네이션 |
| ProfileCard | 프로필 카드 |
| ProgressCircle | 원형 프로그레스 |
| RadioGroup | 라디오 그룹 |
| SearchField | 검색 필드 |
| SegmentedControl | 세그먼트 컨트롤 |
| SelectField | 선택 필드 |
| ShortsBottomInfo | 숏츠 하단 정보 |
| Skeleton | 스켈레톤 |
| Tabs | 탭 |
| TextField | 텍스트 필드 |
| Tooltip | 툴팁 |
| TopBar | 상단 바 |

### Molecules

| 컴포넌트 | 설명 |
| --- | --- |
| Carousel | 캐러셀 |
| FilterSection | 필터 섹션 |
| Grid | 그리드 |
| MapFloatingButtons | 지도 플로팅 버튼 |
| SearchHeader | 검색 헤더 |
| ShortsOverlay | 숏츠 오버레이 |
| WelcomeOverlay | 웰컴 오버레이 |

## 기술 스택

- React 18+
- Next.js 14+
- vanilla-extract
- vaul

## 라이센스

MIT