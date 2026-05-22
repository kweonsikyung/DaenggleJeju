# daenggle-ui

> 댕글제주 UI 컴포넌트 라이브러리

Next.js + vanilla-extract 기반의 반려동물 여행 서비스 [댕글제주](https://www.daengglejeju.site)의 UI 컴포넌트 패키지.

**Storybook**: https://69fb04cd7a987b199b2a54b6-almsvanktf.chromatic.com/

## 설치

```bash
npm install daenggle-ui
# or
pnpm add daenggle-ui
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
import { Button, Header, BottomSheet } from "daenggle-ui";

export default function Page() {
  return (
    <>
      <Header title="댕글제주" />
      <Button
        size="medium"
        status="primary"
        text="탐색하기"
        onClick={() => {}}
      />
    </>
  );
}
```

## 컴포넌트 목록

### Atoms

| 컴포넌트                                                                               | 설명                   |
| -------------------------------------------------------------------------------------- | ---------------------- |
| `AvatarPicker`                                                                         | 프로필 이미지 선택     |
| `BottomSheet`                                                                          | 하단 슬라이드 시트     |
| `Button`, `Location`, `LoginButton`                                                    | 버튼 변형              |
| `AiProfileHeader`, `ChatInput`, `MessageBox`, `ThinkingBubble`, `TopicSelector`        | 채팅 UI                |
| `Chip`, `ChipKeyword`, `ChipMapList`                                                   | 칩 변형                |
| `DangleCard`, `DangleItem`, `DanglePlace`, `DanglePlay`, `DangleReview`, `DangleVideo` | 댕글 카드 변형         |
| `Dropdown`                                                                             | 드롭다운               |
| `EmptyState`                                                                           | 빈 상태                |
| `Fab`                                                                                  | Floating Action Button |
| `FilterChip`, `FilterChipExpand`                                                       | 필터 칩 변형           |
| `Header`                                                                               | 페이지 헤더            |
| `LoadingSpinner`                                                                       | 로딩 스피너            |
| `Modal`                                                                                | 모달                   |
| `NavBar`                                                                               | 하단 내비게이션 바     |
| `NoticeBox`                                                                            | 안내 박스              |
| `Pagination`                                                                           | 페이지네이션           |
| `ProfileCard`                                                                          | 프로필 카드            |
| `ProgressCircle`                                                                       | 원형 진행률            |
| `RadioGroup`                                                                           | 라디오 그룹            |
| `SearchField`                                                                          | 검색 입력              |
| `SegmentedControl`                                                                     | 세그먼트 컨트롤        |
| `SelectField`                                                                          | 셀렉트 박스            |
| `ShortsBottomInfo`                                                                     | 숏츠 하단 정보         |
| `Skeleton`                                                                             | 스켈레톤 로딩          |
| `Tabs`                                                                                 | 탭                     |
| `TextField`                                                                            | 텍스트 입력            |
| `Tooltip`                                                                              | 툴팁                   |
| `TopBar`                                                                               | 상단 바                |

### Molecules

| 컴포넌트             | 설명                     |
| -------------------- | ------------------------ |
| `Carousel`           | 이미지/카드 슬라이더     |
| `FilterSection`      | 필터 칩 묶음             |
| `Grid`               | 그리드 레이아웃          |
| `MapFloatingButtons` | 지도 위 플로팅 버튼 그룹 |
| `SearchHeader`       | 검색창 포함 헤더         |
| `ShortsOverlay`      | 숏츠 오버레이            |
| `WelcomeOverlay`     | 온보딩 오버레이          |

## 기술 스택

- React 18+, Next.js 14+
- vanilla-extract
- vaul, embla-carousel-react, react-icons

## 라이센스

MIT
