# 인프라

댕글제주 클라이언트의 인프라 구성 및 배포 파이프라인을 설명합니다.

## 목차

- [아키텍처 개요](#아키텍처-개요)
- [환경 구성 배경](#환경-구성-배경)
- [배포 파이프라인](#배포-파이프라인)
- [디렉터리 구조](#디렉터리-구조)
- [Dockerfile](#dockerfile)
- [k8s 매니페스트](#k8s-매니페스트)
- [GitHub Actions Secrets](#github-actions-secrets)
- [로컬 스테이징](#로컬-스테이징)
- [배포 확인 명령어](#배포-확인-명령어)

---

## 레포 구성

인프라는 두 레포가 역할을 나눠 관리한다.

| 레포 | 관리 대상 | 적용 방법 |
|---|---|---|
| [`daengglejeju-infra`](https://github.com/kweonsikyung/daengglejeju-infra) | AWS 리소스 (EC2, CloudFront, VPC, Route53, ACM) + ArgoCD 설치·설정 | `terraform apply` (1회성 프로비저닝) |
| 이 레포 (`infra/k8s/`) | 앱 배포 매니페스트 (Deployment, Service, Ingress 등) | ArgoCD가 이 경로를 감시 → 자동 클러스터 반영 |

```
daengglejeju-infra
├── *.tf          ← EC2·CloudFront·VPC 등 AWS 리소스
└── argocd/       ← 클러스터에 ArgoCD 붙이는 단계 (최초 1회)

DaenggleJeju/infra/         ← 이 레포
├── Dockerfile / docker-compose.yml
└── k8s/          ← 앱 K8s 매니페스트 (ArgoCD가 감시)
```

---

## 아키텍처 개요

```
  유저
   |
   v
AWS CloudFront (CDN, HTTPS 강제, 정적 자산 캐시)
   |
   v (HTTP, port 80)
AWS EC2 / k3s
  +--------------------------------------------------+
  |                                                  |
  |  Traefik Ingress (80/443)                        |
  |                    |                             |
  |             cert-manager (Let's Encrypt TLS)     |
  |                    |                             |
  |             ClusterIP Service (80 → 3000)        |
  |                    |                             |
  |             Next.js Pod (ghcr.io image)          |
  |                    ↑                             |
  |             ArgoCD (GitOps auto-sync)            |
  |                                                  |
  +--------------------------------------------------+
```

> **HTTPS 처리 위치**: 뷰어 HTTPS 강제는 CloudFront(`viewer_protocol_policy = redirect-to-https`)가 담당한다. CloudFront → Origin 구간은 HTTP(port 80)로 통신하므로 Traefik 레벨에서 별도 HTTP→HTTPS 리다이렉트를 하면 CloudFront가 자신의 alias로 돌아오는 셀프 루프를 감지해 504를 반환한다.

---

## 환경 구성 배경

[12-Factor App의 Dev/Prod Parity](https://12factor.net/dev-prod-parity) 원칙에 따라 로컬과 프로덕션이 동일한 Docker 이미지를 사용하도록 구성했습니다. "로컬에서 됐는데 프로덕션에서 안 됨" 류의 환경 차이 버그를 근본적으로 차단하는 것이 목적입니다.

- **로컬 (Docker Compose)**: 별도 스테이징 서버 없이 GHCR 이미지를 pull해 검증. 프로덕션과 동일한 아티팩트로 앱 레벨 동작을 확인
- **프로덕션 (k3s)**: ArgoCD가 Git 매니페스트를 감지해 자동 배포. 롤링 업데이트·자동 롤백 제공
- **빌드/배포 분리**: `develop` → 빌드만, `main` → ArgoCD 자동 배포. 검증되지 않은 코드가 프로덕션에 즉시 반영되는 위험 차단

---

## 배포 파이프라인

```
[develop push]
      |
      v
GitHub Actions (deploy.yml)
  1. Docker 이미지 빌드
  2. GHCR push (:latest, :sha-<SHA>)
  3. infra/k8s/deployment.yaml 이미지 태그 업데이트 → develop 커밋

[PR: develop → main 머지]
      |
      v
ArgoCD (daengglejeju-infra 레포에서 관리)
  - main 브랜치 infra/k8s/ 변경 감지
  - k3s 자동 배포 (automated sync + selfHeal + prune)
  - 실패 시 자동 롤백
```

| 브랜치 | 트리거 | 수행 작업 |
|---|---|---|
| `develop` | push | 이미지 빌드 → GHCR push → deployment.yaml 태그 업데이트 |
| `main` | PR 머지 | ArgoCD가 매니페스트 diff 감지 → k3s 자동 배포 |

---

## 디렉터리 구조

```
infra/
  Dockerfile            # Next.js standalone 멀티스테이지 빌드
  docker-compose.yml    # 로컬 스테이징 환경 (GHCR 이미지)
  k8s/
    deployment.yaml     # Deployment 스펙 (이미지 태그는 CI가 자동 업데이트)
    service.yaml        # ClusterIP 서비스 (포트 80 → 컨테이너 3000)
    ingress.yaml        # Traefik Ingress (도메인 라우팅, TLS 어노테이션)
    cert-issuer.yaml    # cert-manager ClusterIssuer (Let's Encrypt ACME)
    middleware.yaml     # Traefik 미들웨어 정의 (현재 미사용 — 향후 확장용)
```

---

## Dockerfile

Next.js `output: "standalone"` 옵션을 활용한 멀티스테이지 빌드입니다.

| 스테이지 | 역할 |
|---|---|
| `base` | Node.js 22 + pnpm 환경 |
| `deps` | `pnpm install --frozen-lockfile` — 의존성만 설치 |
| `builder` | `daenggle-ui` → `web` 순서로 빌드 |
| `runner` | standalone 결과물만 복사 — 최소 이미지 생성 |

---

## k8s 매니페스트

### Deployment

- **이미지**: CI가 `develop` push마다 `sha-<GITHUB_SHA>` 태그로 자동 업데이트
- **replicas**: 1
- **리소스 제한**: requests 256Mi/100m · limits 512Mi/500m
- **imagePullSecret**: `ghcr-secret` (최초 1회 수동 생성 필요 — 아래 참고)

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=<GitHub 유저명> \
  --docker-password=<GHCR_TOKEN>
```

### Service

- **타입**: ClusterIP — 외부 직접 노출 없이 Ingress를 통해서만 접근합니다.
- **포트**: 80 → 컨테이너 3000

### Ingress

- **컨트롤러**: Traefik (k3s 기본 내장)
- **도메인**: `daengglejeju.cloud`, `www.daengglejeju.cloud`
- **TLS**: cert-manager가 Let's Encrypt 인증서를 자동 발급/갱신합니다.
- **HTTP → HTTPS 리디렉트**: CloudFront `viewer_protocol_policy`가 담당. Traefik 레벨 리다이렉트는 적용하지 않음 (CloudFront 셀프 루프 → 504 유발)

### cert-issuer

- **종류**: ClusterIssuer (클러스터 전체에서 사용)
- **ACME 서버**: Let's Encrypt 프로덕션 엔드포인트
- **챌린지 방식**: HTTP-01 (Traefik Ingress 경유)

---

## GitHub Actions Secrets

GitHub 레포 → Settings → Secrets and variables → Actions에서 관리합니다.

| Secret | 설명 |
|---|---|
| `GHCR_TOKEN` | GHCR 이미지 push용 PAT (`write:packages` scope 필요) |
| `NEXT_PUBLIC_KAKAOMAP_API_KEY` | 카카오맵 API 키 |

> `K3S_HOST`, `K3S_USER`, `K3S_SSH_KEY`는 ArgoCD 전환 후 더 이상 사용하지 않습니다.

---

## 로컬 스테이징

GHCR에 push된 이미지를 로컬에서 실행해 `main` 배포 전 검증합니다.

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
docker compose pull    # GHCR에서 최신 이미지 다운로드
docker compose up      # Next.js 앱 실행
```

`http://localhost:3000`에서 앱을 확인합니다.

---

## 배포 확인 명령어

```bash
# ArgoCD 앱 상태
kubectl get application -n argocd

# 파드 상태
kubectl get pods -l app=daengglejeju-web

# 최근 로그
kubectl logs -l app=daengglejeju-web --tail=100

# Ingress 및 TLS 인증서 확인
kubectl get ingress
kubectl get certificate
```
