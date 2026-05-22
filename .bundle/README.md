# .bundle

번들 사이즈 예산 설정과 측정 기록을 관리합니다.

## 파일 구조

```
.bundle/
  .size-limit.json      # web/app 전체 번들 예산 (500 KB gzip)
  .size-limit.ui.json   # daenggle-ui ESM 라이브러리 예산 (80 KB gzip)
  bundle-history.json   # 커밋별 번들 사이즈 기록 (최대 30개)
  README.md
```

## 측정 항목

| 항목              | 설명                                  | 예산   |
| ----------------- | ------------------------------------- | ------ |
| `webChunksDisk`   | 웹앱 `.next/static/chunks` 물리 용량  | —      |
| `webChunksGzip`   | 웹앱 청크 전체 gzip 전송 용량         | 500 KB |
| `uiDistGzip`      | `daenggle-ui` dist ESM 전체 gzip 합계 | 80 KB  |

> **uiDistGzip 측정 방식**
> `package.json`이 `./src/index.ts`를 직접 가리키기 때문에 Next.js가 소스를 인라인 컴파일함.
> 빌트 청크에 "daenggle-ui" 문자열이 없으므로 grep 방식은 불가.
> `dist/**/*.mjs`를 gzip 압축한 바이트 합산값으로 측정.

## 명령어

```bash
# 웹앱 번들 예산 체크 (500KB)
pnpm size

# daenggle-ui 컴포넌트별 사이즈 breakdown 출력
pnpm size:ui

# daenggle-ui 예산 체크 (80KB)
pnpm size:ui:budget
```

## 기록 주기

`pnpm size` 실행 시 `scripts/track-bundle.mjs`가 호출되어 `bundle-history.json`에 추가됨.
기록은 최신 30개만 유지.

## 예산 초과 시

1. `pnpm size:ui --top 30` 으로 어느 컴포넌트가 큰지 확인
2. 불필요한 의존성 제거 또는 코드 분리
3. 예산 상향이 불가피하면 `.size-limit.ui.json`의 `limit` 값을 조정하고 이유를 커밋 메시지에 기록
