# daenggle-ui

<p>
  <a href="https://www.npmjs.com/package/daenggle-ui"><img src="https://img.shields.io/npm/v/daenggle-ui?style=flat&colorA=000000&colorB=000000" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/daenggle-ui"><img src="https://img.shields.io/npm/dm/daenggle-ui?style=flat&colorA=000000&colorB=000000" alt="npm downloads" /></a>
  <a href="https://69fb04cd7a987b199b2a54b6-almsvanktf.chromatic.com/"><img src="https://img.shields.io/badge/storybook-live-FF4785?style=flat&logo=storybook&logoColor=white" alt="Storybook" /></a>
  <img src="https://img.shields.io/badge/license-MIT-000000?style=flat" alt="MIT License" />
</p>

UI component library for [DaenggleJeju](https://www.daengglejeju.site) — a pet-friendly travel service built with **Next.js** and **vanilla-extract**.

**[View Storybook →](https://69fb04cd7a987b199b2a54b6-almsvanktf.chromatic.com/)**

---

## Installation

```bash
npm install daenggle-ui
# or
pnpm add daenggle-ui
# or
yarn add daenggle-ui
```

## Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install next react react-dom vaul
```

| Package | Version |
| --- | --- |
| `next` | `>= 14.0.0` |
| `react` | `>= 18.0.0` |
| `react-dom` | `>= 18.0.0` |
| `vaul` | `>= 1.0.0` |

---

## Quick Start

```tsx
import { Button, Header, BottomSheet } from "daenggle-ui";

export default function Page() {
  return (
    <>
      <Header title="DaenggleJeju" />
      <Button
        size="medium"
        status="primary"
        text="Explore"
        onClick={() => {}}
      />
    </>
  );
}
```

> **Note:** This library uses [vanilla-extract](https://vanilla-extract.style/) for styling. Styles are zero-runtime and compile to static CSS at build time.

---

## Components

Browse the full interactive component showcase in [Storybook](https://69fb04cd7a987b199b2a54b6-almsvanktf.chromatic.com/).

### Atoms

Fundamental, single-purpose UI building blocks.

| Component | Description |
| --- | --- |
| `AvatarPicker` | Profile image selector |
| `BottomSheet` | Slide-up bottom sheet panel |
| `Button` | Primary action button |
| `LoginButton` | Social login button |
| `Location` | Location indicator button |
| `AiProfileHeader` | AI chat profile header |
| `ChatInput` | Chat message input field |
| `MessageBox` | Chat message bubble |
| `ThinkingBubble` | AI thinking state indicator |
| `TopicSelector` | Topic selection UI |
| `Chip` | Tag chip |
| `ChipKeyword` | Keyword chip |
| `ChipMapList` | Map list chip |
| `DangleCard` | Dangle content card |
| `DangleItem` | Dangle list item |
| `DanglePlace` | Place card |
| `DanglePlay` | Playable content card |
| `DangleReview` | Review card |
| `DangleVideo` | Video card |
| `Dropdown` | Select dropdown |
| `EmptyState` | Empty / zero-data placeholder |
| `Fab` | Floating action button |
| `FilterChip` | Toggleable filter chip |
| `FilterChipExpand` | Expandable filter chip |
| `Header` | Page header |
| `LoadingSpinner` | Loading indicator |
| `Modal` | Dialog modal |
| `NavBar` | Bottom navigation bar |
| `NoticeBox` | Informational notice box |
| `Pagination` | Page navigation |
| `ProfileCard` | User profile card |
| `ProgressCircle` | Circular progress indicator |
| `RadioGroup` | Radio button group |
| `SearchField` | Search input |
| `SegmentedControl` | Segmented tab control |
| `SelectField` | Select input field |
| `ShortsBottomInfo` | Shorts video bottom info overlay |
| `Skeleton` | Loading skeleton placeholder |
| `Tabs` | Tab navigation |
| `TextField` | Text input field |
| `Tooltip` | Tooltip |
| `TopBar` | Top action bar |

### Molecules

Composed components built from atoms, with specific interaction logic.

| Component | Description |
| --- | --- |
| `Carousel` | Image / card slider |
| `FilterSection` | Grouped filter chip set |
| `Grid` | Responsive grid layout |
| `MapFloatingButtons` | Floating button group over map |
| `SearchHeader` | Header with integrated search |
| `ShortsOverlay` | Shorts video overlay |
| `WelcomeOverlay` | Onboarding welcome overlay |

---

## Requirements

- **React** 18+
- **Next.js** 14+
- **Node.js** 18+

This library is designed and optimized for **Next.js App Router**. It may work in other React environments, but is not officially supported.

---

## Tech Stack

| | |
| --- | --- |
| Styling | [vanilla-extract](https://vanilla-extract.style/) — zero-runtime CSS-in-TypeScript |
| Carousel | [embla-carousel-react](https://www.embla-carousel.com/) |
| Bottom Sheet | [vaul](https://vaul.emilkowal.ski/) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |

---

## License

MIT © [DaenggleJeju](https://www.daengglejeju.site)
