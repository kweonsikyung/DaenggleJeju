import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  ...TYPO.HEADLINE2,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  padding: "8px 16px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",

  backgroundColor: COLORS.LIME300,
  color: COLORS.NEUTRAL800,
});
