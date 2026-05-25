# Changelog

## [0.0.17] - 2026-05-25

### Changed
- tsconfig를 `@daengglejeju/tsconfig/library.json` 상속으로 전환 — 모노레포 TS 설정 단일 진원지 확보 (PR #15)
- `scripts/release-ui.sh`에서 src↔dist export 전환 로직 제거 — exports가 `dist/`로 고정된 이후 불필요해진 코드 정리 (PR #13)

## [0.0.16] - 2026-05-24

### Changed
- exports를 `dist/`로 고정 — 릴리즈마다 src↔dist 수동 전환 불필요 (PR #13)
- tsup 빌드 설정 개선: `"use client"` 배너, esbuild `jsx: automatic` 옵션 추가 (PR #13)

## [0.0.15] - 2026-05-23

### Changed
- Replaced `next/image` with `react-icons` across components
- Updated peer dependencies — added `@vanilla-extract/css`, `@vanilla-extract/recipes`, `embla-carousel-react`, `react-icons`
- Improved tsup build configuration for better output performance
- Updated Storybook to v10
- Rewrote README for npm publication

### Removed
- Removed unused `SampleUnitUi` component and related stories

## [0.0.10] - 2026-05-06

### Fixed
- WelcomeOverlay 내부 경로 의존성 제거 (props로 변경)
- LoginButton @/types/LoginType 패키지 내부로 이동
- molecules 내부 import 경로 수정

## [0.0.1] - 2026-05-06

### Added
- Initial release
- Atoms: AvatarPicker, BottomSheet, Button, Location, LoginButton, AiProfileHeader, ChatInput, MessageBox, ThinkingBubble, TopicSelector, Chip, ChipKeyword, ChipMapList, DangleCard, DangleItem, DanglePlace, DanglePlay, DangleReview, DangleVideo, Dropdown, EmptyState, Fab, FilterChip, FilterChipExpand, Header, LoadingSpinner, Modal, NavBar, NoticeBox, Pagination, ProfileCard, ProgressCircle, RadioGroup, SearchField, SegmentedControl, SelectField, ShortsBottomInfo, Skeleton, Tabs, TextField, Tooltip, TopBar
- Molecules: Carousel, FilterSection, Grid, MapFloatingButtons, SearchHeader, ShortsOverlay, WelcomeOverlay