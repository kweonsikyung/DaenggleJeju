import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

/** 공통 루트 */
export const root = style({
  border: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  borderRadius: "12px",
  width: "100%",
  textAlign: "center",
});

/** 사이즈 (H: 56 / 48) */
export const size = styleVariants({
  large: { height: "56px", padding: "0 20px" },
  medium: { height: "48px", padding: "0 16px" },
});

/** 상태 (default/active/disabled/selected) */
export const state = styleVariants({
  default: {
    ...TYPO.BODY1M,
    background: COLORS.NEUTRAL0,
    color: COLORS.NEUTRAL800,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  },
  active: {
    ...TYPO.BODY1M,
    background: COLORS.NEUTRAL800,
    color: COLORS.NEUTRAL0,
  },
  disabled: {
    ...TYPO.BODY1M,
    background: COLORS.NEUTRAL200,
    color: COLORS.NEUTRAL500,
  },
  selected: {
    ...TYPO.BODY1M,
    background: COLORS.GREEN50,
    color: COLORS.GREEN700,
    boxShadow: `inset 0 0 0 2px ${COLORS.GREEN600}`,
  },
  primary: {
    ...TYPO.BODY1B,
    background: COLORS.GREEN600,
    color: COLORS.NEUTRAL0,
  },
});

/** 라벨 */
export const label = style({
  ...TYPO.BODY1B,
});
