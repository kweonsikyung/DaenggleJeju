import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  minWidth: "162px",
  width: "100%",
  borderRadius: "12px",
  padding: "12px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  textAlign: "left",
  background: COLORS.NEUTRAL50,
  border: `1px solid ${COLORS.NEUTRAL200}`,
});

export const state = styleVariants({
  default: {
    background: COLORS.NEUTRAL50,
    border: `1px solid ${COLORS.NEUTRAL200}`,
  },
  selected: {
    background: COLORS.GREEN50,
    boxShadow: `inset 0 0 0 2px ${COLORS.GREEN600}`,
  },
  disabled: {
    background: COLORS.NEUTRAL100,
    border: `1px solid ${COLORS.NEUTRAL200}`,
    cursor: "not-allowed",
  },
});

export const title = style({
  ...TYPO.BODY2M,
  color: COLORS.NEUTRAL900,
});

export const desc = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL500,
});
