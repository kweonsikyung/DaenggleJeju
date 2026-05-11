/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새 기능
        "fix", // 버그 수정
        "chore", // 빌드/설정 등 기타
        "docs", // 문서
        "style", // 포맷팅 (코드 변경 없음)
        "refactor", // 리팩토링
        "test", // 테스트
        "perf", // 성능 개선
        "revert", // 되돌리기
        "release", // 릴리즈
      ],
    ],
    "subject-case": [0], // 한글 커밋 메시지 허용
  },
};
