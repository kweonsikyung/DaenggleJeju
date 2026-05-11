import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 18px",
});

export const imageWrapper = style({
  flexShrink: 0,
});

export const profileImage = style({});

export const textContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const title = style({
  ...TYPO.LABEL1B,
  margin: 0,
  color: "#262626",
});

export const subtitle = style({
  ...TYPO.CAPTION2M,
  color: "#737373",
  margin: 0,
});
