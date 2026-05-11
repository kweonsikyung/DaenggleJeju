import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  width: "100%",
  height: "90px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  border: "none",
  background: "#fff",
  boxSizing: "border-box",
  cursor: "pointer",
});

export const thumbnailWrapper = style({
  width: "70px",
  height: "90px",
  borderRadius: "6px",
  overflow: "hidden",
  flexShrink: 0,
});

export const thumbnail = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const contentWrapper = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: 0,
});

export const title = style({
  ...TYPO.LABEL1M,
  margin: 0,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const stats = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: COLORS.NEUTRAL500,
});

export const statItem = style({
  display: "flex",
  alignItems: "center",
  gap: "2px",
});

export const statValue = style({
  ...TYPO.CAPTION1B,
});

export const divider = style({
  ...TYPO.CAPTION1B,
  margin: "0 2px",
});

export const timeAgo = style({
  ...TYPO.CAPTION1M,
});

export const playButtonWrapper = style({
  width: "32px",
  height: "32px",
  flexShrink: "0",
});

export const tagWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  maxHeight: "40px",
  overflow: "hidden",
});

export const tag = style({
  ...TYPO.CAPTION2M,
  backgroundColor: COLORS.NEUTRAL100,
  borderRadius: "1px",
  padding: "2px 4px",
  color: COLORS.NEUTRAL500,
});
