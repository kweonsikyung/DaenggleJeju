import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

/** 전체 컴포넌트 컨테이너 */
export const root = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

/** 라벨 */
export const label = style({
  ...TYPO.LABEL1B,
  color: COLORS.NEUTRAL600,
  marginBottom: "8px",
});

/** 버튼의 기본 스타일 */
export const fieldBase = style({
  height: "56px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "12px",
  padding: "0 16px",
  border: "none",
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  transition: "box-shadow .12s ease, background-color .12s ease",
});

/** 상태에 따른 스타일 변화 */
export const fieldState = styleVariants({
  default: {
    background: COLORS.NEUTRAL0,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL300}`,
  },
  filled: {
    background: COLORS.NEUTRAL50,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  },
  disabled: {
    background: COLORS.NEUTRAL200,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL300}`,
    cursor: "not-allowed",
  },
});

/** 값 텍스트 */
export const valueText = style({
  ...TYPO.BODY1M,
  color: COLORS.NEUTRAL800,
});

/** 플레이스홀더 텍스트 */
export const placeholderText = style({
  ...TYPO.BODY1M,
  color: COLORS.NEUTRAL400,
});
