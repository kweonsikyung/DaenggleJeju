# Changelog

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