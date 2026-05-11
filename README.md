<div align="center">

<img src="apps/web/public/assets/logo/logo-colored.png" width="200" alt="DaenggleJeju Logo" />

<h3>DaenggleJeju v2: Pet-Friendly Vibes & Vids</h3>

<p>
  <img src="https://img.shields.io/badge/pnpm-10.14.0-F69220?style=flat&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-15.4.6-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/SWR-2.3.5-000000?style=flat&logo=swr&logoColor=white" alt="SWR" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" />
</p>

<p>
  <img src="https://img.shields.io/badge/Vanilla--Extract-1.17.4-555555?style=flat" alt="Vanilla Extract" />
  <img src="https://img.shields.io/badge/Jest-30.1.1-C21325?style=flat&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Storybook-9.1.1-FF4785?style=flat&logo=storybook&logoColor=white" alt="Storybook" />
</p>

</div>

---

# DaenggleJeju

이 레포지토리는 DaenggleJeju의 **운영 v2 웹 클라이언트**입니다.  
Next.js 기반 웹앱과 공용 UI 패키지를 하나의 monorepo에서 관리합니다.

---

## Project Structure

```bash
DaenggleJeju/
├── apps/
│   └── web/                  # Next.js web application
│
├── packages/
│   └── daenggle-ui/           # Shared UI component package
│
├── scripts/                   # Release and automation scripts
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── biome.json
└── tsconfig.json
```

---

## Tech Stack

| Category | Stack |
| --- | --- |
| Framework | Next.js |
| Language | TypeScript |
| Package Manager | pnpm |
| Styling | Vanilla Extract |
| Data Fetching | SWR |
| UI Documentation | Storybook |
| Testing | Jest |
| Lint / Format | Biome |
| Git Hooks | Husky, lint-staged, commitlint |
| Deployment | Docker Compose |

---

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

The web app runs at:

```bash
http://localhost:3000
```

---

## Web App

The web application is located in `apps/web`.

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Build production app |
| `pnpm start` | Start production server |
| `pnpm lint` | Run lint check |
| `pnpm lint:fix` | Fix lint issues |
| `pnpm typecheck` | Run TypeScript type check |
| `pnpm storybook` | Start Storybook |
| `pnpm build-storybook` | Build Storybook |
| `pnpm release:web` | Release web app version |

---

## UI Package

The shared UI package is located in `packages/daenggle-ui`.

| Command | Description |
| --- | --- |
| `pnpm build:ui` | Build UI package |
| `pnpm check:ui` | Validate package with publint |
| `pnpm size:ui` | Check bundle size |
| `pnpm release:ui` | Release UI package to npm |

The web app consumes `daenggle-ui` through the workspace during local development.

```bash
pnpm build:ui
pnpm dev
```

---

## Storybook / Chromatic

```bash
pnpm storybook
pnpm chromatic
```

Storybook is used to preview and test shared UI components.

---

## Release

### Web App Release

```bash
pnpm release:web
```

Release flow:

1. Update `CHANGELOG.md`
2. Run release script
3. Select version type: `patch`, `minor`, or `major`
4. Run lint, typecheck, and build checks
5. Create release commit and git tag
6. Push changes and tag

---

### UI Package Release

```bash
pnpm release:ui
```

Release flow:

1. Update `packages/daenggle-ui/CHANGELOG.md`
2. Run release script
3. Select version type: `patch`, `minor`, or `major`
4. Run package validation and build
5. Publish package to npm
6. Create release commit and git tag
7. Push changes and tag

---

## Git Hooks

This project uses Husky to automate checks during Git workflows.

### Hook Flow

```bash
git commit
  ├─ pre-commit
  │   └─ Run lint-staged
  │       └─ Apply lint:fix to staged ts/tsx files
  │
  └─ commit-msg
      └─ Validate commit message with commitlint

git push
  └─ pre-push
      └─ Run TypeScript type check
```

### Hook Details

| Hook | Timing | Action | On Failure |
| --- | --- | --- | --- |
| `pre-commit` | Before commit | Run lint-staged | Block commit |
| `commit-msg` | After commit message input | Validate commit message | Block commit |
| `pre-push` | Before push | Run typecheck | Block push |

---

## Commit Convention

Commit messages follow the format below:

```bash
type: message
```

### Allowed Types

| Type | Description |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Build, config, package, or maintenance task |
| `docs` | Documentation change |
| `style` | Code style or formatting change |
| `refactor` | Code refactoring without behavior change |
| `test` | Test addition or update |
| `perf` | Performance improvement |
| `revert` | Revert previous commit |
| `release` | Version release |

### Examples

```bash
git commit -m "feat: add main banner component"
git commit -m "fix: update login button click handler"
git commit -m "docs: update deployment guide"
```

Invalid examples:

```bash
git commit -m "update banner"
git commit -m "button fix"
```

---

## Bypassing Hooks

Use `--no-verify` only when absolutely necessary.

```bash
git commit --no-verify -m "hotfix: urgent fix"
git push --no-verify
```

---

## Deployment

This project is deployed with Docker Compose.

```bash
docker compose up -d --build
```

Planned production deployment stack:

```bash
Docker Compose
Caddy
Next.js standalone server
```

---

## Common Commands

| Command | When to Use |
| --- | --- |
| `pnpm dev` | Start local development |
| `pnpm build` | Verify production build |
| `pnpm lint` | Check lint issues |
| `pnpm lint:fix` | Fix lint issues |
| `pnpm typecheck` | Check TypeScript errors |
| `pnpm build:ui` | Build UI package |
| `pnpm check:ui` | Validate UI package before publish |
| `pnpm release:web` | Release web app version |
| `pnpm release:ui` | Release UI package |
| `pnpm storybook` | Preview UI components |
| `pnpm chromatic` | Run visual regression deployment |