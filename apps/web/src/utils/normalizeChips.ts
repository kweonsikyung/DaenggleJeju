/**
 * chips 입력을 string[]로 정규화
 * - 배열: 그대로
 * - 문자열: 콤마/공백 기준 분리
 * - 그 외/없음: 빈 배열
 */
export function normalizeChips(chips: unknown): string[] {
  if (Array.isArray(chips)) {
    return chips.map((c) => (typeof c === "string" ? c : "")).filter(Boolean);
  }
  if (typeof chips === "string") {
    return chips
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}
