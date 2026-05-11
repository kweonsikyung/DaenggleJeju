import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "16px 18px",
});

export const titleWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

export const title = style({
  ...TYPO.HEADLINE1,
  margin: 0,
  color: "#262626",
});

export const desc = style({
  fontSize: "16px",
  fontWeight: 500,
  color: "#1F2329",
  margin: 0,
  paddingTop: "8px",
});

export const iconButton = style({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  flexShrink: 0,
});
