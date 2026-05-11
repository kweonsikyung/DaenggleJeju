import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "100%",
  gap: "4px",
});

export const imageWrapper = style({});

export const image = style({
  objectFit: "contain",
});

export const title = style({
  ...TYPO.LABEL1B,
  color: COLORS.NEUTRAL600,
});

export const description = style({
  ...TYPO.LABEL2M,
  color: COLORS.NEUTRAL500,
});
