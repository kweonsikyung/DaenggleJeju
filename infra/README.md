# 인프라

댕글제주 클라이언트의 인프라 구성 및 배포 파이프라인을 설명합니다.

## 목차

- [아키텍처 개요](#아키텍처-개요)
- [환경 구성 배경](#환경-구성-배경)
- [브랜치 전략](#브랜치-전략)
- [디렉터리 구조](#디렉터리-구조)
- [Dockerfile](#dockerfile)
- [k8s 매니페스트](#k8s-매니페스트)
- [GitHub Actions Secrets](#github-actions-secrets)
- [로컬 스테이징](#로컬-스테이징)
- [배포 확인 명령어](#배포-확인-명령어)

---

## 아키텍처 개요

```
[develop push]                        [main push]
      |                                     |
      v                                     v
Docker 빌드 + GHCR push             k3s 프로덕션 배포
(:latest, :<sha>)                   (:latest rollout)


                  AWS EC2 / k3s
  +------------------------------------------------+
  |                                                |
  |  Internet --> Traefik Ingress (443/80)         |
  |                    |                           |
  |             cert-manager (Let's Encrypt TLS)   |
  |                    |                           |
  |             ClusterIP Service (80 -> 3000)     |
  |                    |                           |
  |             Next.js Pod (ghcr.io image)        |
  |                                                |
  +------------------------------------------------+
```

---

## 환경 구성 배경

[12-Factor App의 Dev/Prod Parity](https://12factor.net/dev-prod-parity) 원칙에 따라 로컬과 프로덕션이 동일한 Docker 이미지를 사용하도록 구성했습니다. "로컬에서 됐는데 프로덕션에서 안 됨" 류의 환경 차이 버그를 근본적으로 차단하는 것이 목적입니다.

- **로컬 (Docker Compose)**: 별도 스테이징 서버 없이 GHCR `:latest` 이미지를 pull해 검증. 프로덕션과 동일한 아티팩트로 앱 레벨 동작을 확인
- **프로덕션 (k3s)**: Docker Compose 대비 롤링 업데이트·파드 셀프힐링 기본 제공. 단일 서버에서 프로덕션 수준 신뢰성 확보
- **빌드/배포 분리**: `develop` → 빌드만, `main` → 배포만. 검증되지 않은 코드가 프로덕션에 즉시 반영되는 위험 차단

---

## 브랜치 전략

| 브랜치 | 트리거 | 수행 작업 |
|---|---|---|
| `develop` | push | Docker 이미지 빌드 → GHCR push (`:latest`, `:<sha>` 태그) |
| `main` | push | k3s 클러스터에 `:latest` 이미지 rollout |

`develop → main` PR 머지가 곧 프로덕션 배포 트리거입니다. `main`에 직접 push하지 않습니다.

---

## 디렉터리 구조

```
infra/
  Dockerfile            # Next.js standalone 멀티스테이지 빌드
  docker-compose.yml    # 로컬 스테이징 환경 (GHCR :latest 이미지)
  k8s/
    deployment.yaml     # Deployment 스펙 (파드, 리소스 제한, imagePullSecret)
    service.yaml        # ClusterIP 서비스 (포트 80 → 컨테이너 3000)
    ingress.yaml        # Traefik Ingress (도메인 라우팅, TLS 어노테이션)
    cert-issuer.yaml    # cert-manager ClusterIssuer (Let's Encrypt ACME)
```

---

## Dockerfile

Next.js `output: "standalone"` 옵션을 활용한 멀티스테이지 빌드입니다.

| 스테이지 | 역할 |
|---|---|
| `base` | Node.js 22 + pnpm 환경 |
| `deps` | `pnpm install --frozen-lockfile` — 의존성만 설치 |
| `builder` | `daenggle-ui` → `@daengglejeju/hooks` → `web` 순서로 빌드 |
| `runner` | standalone 결과물만 복사 — 최소 이미지 생성 |

빌드 순서가 중요합니다. `web`이 `daenggle-ui`와 `@daengglejeju/hooks`에 의존하므로 패키지 빌드를 먼저 수행합니다.

---

## k8s 매니페스트

### Deployment

- **이미지**: `ghcr.io/kweonsikyung/daengglejeju:latest`
- **replicas**: 1
- **리소스 제한**: requests 256Mi/100m · limits 512Mi/500m
- **imagePullSecret**: `ghcr-secret` (GitHub Actions에서 자동 생성/갱신)

### Service

- **타입**: ClusterIP — 외부 직접 노출 없이 Ingress를 통해서만 접근합니다.
- **포트**: 80 → 컨테이너 3000

### Ingress

- **컨트롤러**: Traefik (k3s 기본 내장)
- **도메인**: `daengglejeju.cloud`, `www.daengglejeju.cloud`
- **TLS**: cert-manager가 Let's Encrypt 인증서를 자동 발급/갱신합니다.
- **HTTP → HTTPS 리디렉트**: `default-redirect-https` Traefik 미들웨어 적용

### cert-issuer

- **종류**: ClusterIssuer (클러스터 전체에서 사용)
- **ACME 서버**: Let's Encrypt 프로덕션 엔드포인트
- **챌린지 방식**: HTTP-01 (Traefik Ingress 경유)

---

## GitHub Actions Secrets

GitHub 레포 → Settings → Secrets and variables → Actions에서 관리합니다.

| Secret | 설명 | 비고 |
|---|---|---|
| `GHCR_TOKEN` | GHCR 이미지 push/pull용 PAT | `write:packages` scope 필요 |
| `K3S_HOST` | k3s 서버 IP 주소 | |
| `K3S_USER` | SSH 접속 유저명 | |
| `K3S_SSH_KEY` | SSH 개인키 (PEM 형식) | |

> **주의**: `GITHUB_TOKEN`은 워크플로 종료 후 만료됩니다. GHCR pull secret에는 반드시 만료되지 않는 PAT(`GHCR_TOKEN`)을 사용해야 합니다. 만료된 토큰으로 생성된 `ghcr-secret`은 파드 재시작 시 `ImagePullBackOff`를 유발합니다.

---

## 로컬 스테이징

GHCR에 push된 `:latest` 이미지를 로컬에서 실행해 `main` 배포 전 검증합니다. 프로덕션과 동일한 Docker 이미지를 사용하므로 앱 레벨의 동작을 신뢰할 수 있습니다.

### 사전 조건

- Docker Desktop 실행 중
- GHCR 로그인
  ```bash
  docker login ghcr.io -u <GitHub 유저명>
  # Password: GHCR_TOKEN (PAT)
  ```
- `apps/web/.env.local` 파일 존재 (`NEXT_PUBLIC_*` 환경변수 포함)

### 실행 방법

```bash
# infra/ 디렉터리에서 실행
docker compose pull    # GHCR에서 :latest 이미지 다운로드
docker compose up      # Next.js 앱 실행
```

`http://localhost:3000`에서 앱을 확인합니다.

> `develop` push가 완료되어 GHCR에 `:latest`가 올라간 후 `pull`이 가능합니다.

---

## 배포 확인 명령어

k3s 서버에 SSH 접속 후 아래 명령어로 배포 상태를 확인합니다.

```bash
# 파드 상태
kubectl get pods -l app=daengglejeju-web

# 배포 rollout 상태
kubectl rollout status deployment/daengglejeju-web

# 최근 로그
kubectl logs -l app=daengglejeju-web --tail=100

# Ingress 및 TLS 인증서 확인
kubectl get ingress
kubectl get certificate
```
