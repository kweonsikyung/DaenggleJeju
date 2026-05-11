import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

const baseCard = style({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  backgroundColor: "#fff",
  cursor: "pointer",
  textAlign: "left",
});

export const root = styleVariants({
  default: [baseCard],
  isExpanded: [baseCard, { height: "auto" }],
});

export const headerContainer = style({
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  position: "relative",
});

export const thumbnailWrapper = style({
  width: "80px",
  height: "80px",
  borderRadius: "8px",
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
  gap: "2px",
});

export const bookmarkButton = style({
  position: "absolute",
  top: 0,
  right: 0,
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

export const locationCategory = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL500,
});

export const name = style({
  ...TYPO.BODY2B,
  margin: 0,
});

export const stats = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const statItem = style({
  display: "flex",
  gap: "4px",
  ...TYPO.CAPTION1B,
  color: "#888",
  alignItems: "center",
});

export const statValue = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL500,
});

export const tags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  paddingTop: "4px",
});

export const tag = style({
  ...TYPO.CAPTION2M,
  backgroundColor: COLORS.NEUTRAL100,
  color: COLORS.NEUTRAL500,
  padding: "2px 4px",
  borderRadius: "1px",
});

export const expandedContent = style({});

export const details = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const detailsTop = style({
  display: "flex",
  justifyContent: "space-between",
  ...TYPO.CAPTION1B,
  color: COLORS.NEUTRAL500,
});

export const detailItem = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const detailLabel = style({
  ...TYPO.CAPTION1M,
});

export const detailValue = style({
  width: "100%",
  textAlign: "right",
  ...TYPO.HEADLINE2,
  color: COLORS.NEUTRAL800,
  fontWeight: "bold",
});
