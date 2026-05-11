import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

/** 컨테이너: 고정 H 56 + 하단 helper 영역 포함 */
export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  width: "100%",
});

/** 라벨 */
export const label = style({
  ...TYPO.LABEL1B,
  color: COLORS.NEUTRAL600,
  marginBottom: "8px",
});

/** 상태 박스(입력 영역) */
const fieldBase = {
  height: "56px",
  display: "flex",
  alignItems: "center",
  borderRadius: "12px",
  padding: "0 16px",
  background: COLORS.NEUTRAL0,
  boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  transition: "box-shadow .12s ease, background-color .12s ease",
} as const;

export const state = styleVariants({
  default: { ...fieldBase, boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL300}` },
  focused: { ...fieldBase, boxShadow: `inset 0 0 0 2px ${COLORS.GREEN600}` },
  pressed: {
    ...fieldBase,
    background: COLORS.GREEN100,
    boxShadow: `inset 0 0 0 1px ${COLORS.GREEN200}`,
  },
  filled: {
    ...fieldBase,
    background: COLORS.NEUTRAL50,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  },
  error: {
    ...fieldBase,
    boxShadow: `inset 0 0 0 2px #E5484D`, // RED 토큰 없어서 임시. 팔레트 생기면 교체
  },
  disabled: {
    ...fieldBase,
    background: COLORS.NEUTRAL200,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL300}`,
  },
});

/** 실제 input */
export const input = style({
  flex: 1,
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  color: COLORS.NEUTRAL800,
  selectors: {
    "&::placeholder": {
      color: COLORS.NEUTRAL400,
    },
    "&:disabled": {
      color: COLORS.NEUTRAL500,
    },
  },
  ...TYPO.BODY1M,
});

/** helper / error 문구 */
export const helperText = style({
  ...TYPO.CAPTION2B,
  color: COLORS.NEUTRAL500,
  padding: "0 4px",
});

export const helperError = style({
  ...TYPO.CAPTION2B,
  color: "#E5484D", // RED 토큰 나오면 교체
  padding: "0 4px",
});
