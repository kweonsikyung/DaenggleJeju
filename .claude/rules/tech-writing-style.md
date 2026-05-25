---
title: Tech Writing Style
impact: MEDIUM
impactDescription: 문서 가독성과 일관성 향상
tags: writing, wiki, docs
---

## Tech Writing Style

기술 문서(위키, 트러블슈팅, 기술 블로그)를 작성할 때 이 스타일을 따른다. 독자에게 말 걸듯 쓰고, 개념은 비유로 먼저 소개한 뒤 코드로 증명한다.

**Incorrect (딱딱하고 단절된 문체):**

```markdown
본 문서는 daenggle-ui 빌드 파이프라인 정상화 과정을 기술합니다.
문제점은 다음과 같습니다.
1. exports 필드가 src를 참조함
2. dts가 false로 설정됨
```

**Correct (해요체, 서사적 흐름):**

```markdown
`pnpm publish`를 하면 패키지가 npm에 올라가겠지, 라고 생각했는데
막상 외부에서 설치하면 `Cannot find module`이 뜨는 상황이었어요.

로컬에서는 멀쩡히 동작해요. 그런데 왜 패키지로 배포하면 안 될까요?
이 질문을 따라가다 보니 문제가 세 가지였어요.
```

---

### 문체 규칙

- **해요체** 고정 — `~해요`, `~돼요`, `~있어요`. `~합니다` 금지
- 문장은 짧게, 한 문장에 한 개념
- "사실", "당연히", "물론" 금지 — 독자를 낮추는 표현

### 트러블슈팅 구조

```
들어가며   → 의문이나 상황으로 시작 ("로컬에서는 되는데 왜?")
개념 소개  → 문제 이해에 필요한 것만, 표나 비유 먼저
문제 N     → ### 현상 / ### 원인 / ### 해결 (Before·After 코드)
결과       → 수치로 (경고 4개 → 0개, 파일 200개 → 5개)
마치며     → 핵심 교훈을 bullet로, 다음 사람이 같은 실수 안 하도록
```

### 코드·표 규칙

- Before/After는 나란히 — diff 또는 별도 블록
- 실제 에러 메시지 그대로 인용 — 검색에 걸리도록
- 개념 비교는 표로

**Incorrect:**

```markdown
JSX 변환 방식이 두 가지 있는데 하나는 React.createElement를 쓰고
다른 하나는 jsx()를 써요. 전자는 React import가 필요하고 후자는 불필요해요.
```

**Correct:**

```markdown
| 방식 | 변환 결과 | React import |
|---|---|---|
| classic | `React.createElement(...)` | 필요 |
| automatic | `jsx(...)` | 불필요 |
```
