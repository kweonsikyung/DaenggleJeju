<div align="center">

<img src="apps/web/public/assets/logo/logo-colored.png" width="200" alt="DaenggleJeju Logo" />

<h3>DaenggleJeju v2: Pet-Friendly Vibes & Vids</h3>

<p>
  <img src="https://img.shields.io/badge/pnpm-10.14.0-F69220?style=flat&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-15.4.6-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/SWR-2.3.5-000000?style=flat&logo=swr&logoColor=white" alt="SWR" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white" alt="Docker" />
</p>

<p>
  <img src="https://img.shields.io/badge/Vanilla--Extract-1.17.4-555555?style=flat" alt="Vanilla Extract" />
  <img src="https://img.shields.io/badge/Jest-30.1.1-C21325?style=flat&logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Storybook-10.1.11-FF4785?style=flat&logo=storybook&logoColor=white" alt="Storybook" />
</p>

</div>

---

# DaenggleJeju

이 레포지토리는 DaenggleJeju의 **운영 v2 웹 클라이언트**입니다.  
Next.js 기반 웹앱과 공용 UI 패키지를 하나의 monorepo에서 관리합니다.

---

## Table of Contents

- [Overview](#overview)
  - [Project Structure](#project-structure)
  - [Tech Stack](#tech-stack)
- [Development](#development)
  - [Getting Started](#getting-started)
  - [Web App](#web-app)
  - [UI Package](#ui-package)
  - [Storybook / Chromatic](#storybook--chromatic)
- [CI / CD](#ci--cd)
  - [Branch Strategy](#branch-strategy)
  - [GitHub Actions](#github-actions)
- [Release](#release)
  - [Web App Release](#web-app-release)
  - [UI Package Release](#ui-package-release)
- [Git Workflow](#git-workflow)
  - [Git Hooks](#git-hooks)
  - [Commit Convention](#commit-convention)
- [Deployment](#deployment)
  - [Common Commands](#common-commands)

---

# Overview

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
| Bundler | Webpack (web, via Next.js), tsup / esbuild (daenggle-ui) |
| Lint / Format | Biome |
| Git Hooks | Husky, lint-staged, commitlint |
| Deployment | Docker Compose |

---

# Development

## Getting Started

```bash
pnpm install
pnpm dev
```

The web app runs at `http://localhost:3000`.

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

> 👀 Major directories under `apps/web/src/` each have their own README — see `hooks/`, `stores/`, `components/`, `utils/`, `lib/`, `styles/`, `types/`, `constants/`.

## UI Package

The shared UI package is located in `packages/daenggle-ui`.

| Command | Description |
| --- | --- |
| `pnpm build:ui` | Build UI package |
| `pnpm check:ui` | Validate package with publint |
| `pnpm size:ui` | Check bundle size |

The web app consumes `daenggle-ui` through the workspace during local development.  
No need to run `build:ui` — the workspace references `src` directly.

> 👀 For full details → [packages/README.md](packages/README.md) (monorepo dev & release workflow), [packages/daenggle-ui/README.md](packages/daenggle-ui/README.md) (component list, npm usage)

## Storybook / Chromatic

```bash
pnpm storybook    # local preview (port 6006)
pnpm chromatic    # visual regression CI
```

Storybook is used to preview and test shared UI components.

---

# CI / CD

## Branch Strategy

```
feature/* ──→ develop ──→ (PR) ──→ main
```

| Branch | Role |
| --- | --- |
| `feature/*` | Feature development |
| `develop` | Integration / staging |
| `main` | Production |

Tags are created only on `main` — a tag means "this version is in production."

## GitHub Actions

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `ci.yml` | push / PR → develop, main | Lint, typecheck, build UI, build web |
| `storybook.yml` | push → develop | Chromatic visual tests |
| `release.yml` | push → main | Auto-tag + npm publish (triggered by release commit message) |

**Required Secrets**

| Secret | Used by |
| --- | --- |
| `CHROMATIC_PROJECT_TOKEN` | `storybook.yml` |
| `NPM_TOKEN` | `release.yml` (daenggle-ui publish) |

---

# Release

## Release Flow

```
1. Run release script on develop
        ↓
   Version bump + CHANGELOG + commit + push to develop

2. Open PR: develop → main, then merge
        ↓
   CI runs automatically (lint, typecheck, build UI, build web)

3. main merge complete
        ↓
   release.yml runs automatically
   - daenggle-ui: npm publish + git tag daenggle-ui@x.x.x
   - web: git tag web@x.x.x
```

## Web App Release

```bash
pnpm release:web
```

1. Update `apps/web/CHANGELOG.md`
2. Run script — select version type (`patch` / `minor` / `major`)
3. Script runs lint, typecheck, build, then commits and pushes to develop
4. Create PR: develop → main
5. On merge: `release.yml` auto-creates `web@x.x.x` tag

## UI Package Release

```bash
pnpm release:ui
```

1. Update `packages/daenggle-ui/CHANGELOG.md`
2. Run script — select version type (`patch` / `minor` / `major`)
3. Script runs build + publint validation, then commits and pushes to develop
4. Create PR: develop → main
5. On merge: `release.yml` auto-publishes to npm and creates `daenggle-ui@x.x.x` tag

> 👀 For full details → [scripts/README.md](scripts/README.md)

---

# Git Workflow

## Git Hooks

This project uses Husky to automate checks during Git workflows.

| Hook | Timing | Action |
| --- | --- | --- |
| `pre-commit` | Before commit | lint-staged (Biome, density/atomic/circular checks) + dedupe check |
| `commit-msg` | After commit message input | commitlint (Conventional Commits) |
| `pre-push` | Before push | TypeScript type check |

Use `--no-verify` only when absolutely necessary.

```bash
git commit --no-verify -m "hotfix: urgent fix"
git push --no-verify
```

> 👀 For full details → [.husky/README.md](.husky/README.md)

## Commit Convention

Commit messages follow the format below:

```bash
type: message
```

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

```bash
# valid
git commit -m "feat: add main banner component"
git commit -m "fix: update login button click handler"

# invalid
git commit -m "update banner"
git commit -m "button fix"
```

---

# Deployment

This project is deployed with Docker Compose.

```bash
docker compose up -d --build
```

Planned production deployment stack:

```
Docker Compose
Caddy
Next.js standalone server
```

> 👀 For bundle size budgets & history → [.bundle/README.md](.bundle/README.md)

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
