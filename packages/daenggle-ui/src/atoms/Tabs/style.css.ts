import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const container = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
  overflowX: "auto",
  padding: "0 20px",
  borderBottom: `1px solid ${COLORS.NEUTRAL100}`,
  "::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

export const tab = recipe({
  base: {
    ...TYPO.BODY2B,
    padding: "12px 4px",
    flexShrink: 0,
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    color: COLORS.NEUTRAL400,
    transition: "color 0.2s, border-color 0.2s",
  },
  variants: {
    active: {
      true: {
        color: COLORS.NEUTRAL900,
        borderColor: COLORS.NEUTRAL900,
      },
      false: {
        ":hover": {
          color: COLORS.NEUTRAL600,
        },
      },
    },
  },
});
