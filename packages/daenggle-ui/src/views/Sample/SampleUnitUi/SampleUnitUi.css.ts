import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const card = style({
  backgroundColor: COLORS.NEUTRAL0,
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
});

export const image = style({
  width: "100%",
  objectFit: "cover",
});

export const content = style({
  padding: "10px 16px",
});

export const title = style({
  ...TYPO.BODY1B,
  color: COLORS.LIME900,
});

export const description = style({
  ...TYPO.BODY3,
  color: COLORS.NEUTRAL800,
});
