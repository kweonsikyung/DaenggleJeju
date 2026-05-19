# hooks

커스텀 훅 모음입니다.  

## 디렉터리 구조

- `api/` — SWR 기반 데이터 패칭 훅 (useAuth, usePlaces …)
- `*.ts` — 그 외 범용 훅 (useKakaoMap, useModal …)

## import

```ts
import { useModal } from "@/hooks/useModal";
import { usePlaces } from "@/hooks/api/usePlaces";
```
