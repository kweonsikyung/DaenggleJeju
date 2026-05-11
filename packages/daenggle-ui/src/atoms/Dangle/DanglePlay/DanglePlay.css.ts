import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

const baseRoot = style({
  position: "relative",
  border: "none",
  padding: "0",
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "transform 0.2s",
  ":hover": { transform: "scale(1.02)" },
});

export const root = styleVariants({
  short: [
    baseRoot,
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "266px",
      overflow: "hidden",
      gap: 8,
    },
  ],
  small: [
    baseRoot,
    {
      height: "225px",
      borderRadius: "15px",
      overflow: "hidden",
    },
  ],
  medium: [
    baseRoot,
    {
      height: "356px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      borderRadius: "15px",
    },
  ],
});

const baseImageWrapper = style({
  width: "100%",
  position: "relative",
  borderRadius: "15px",
  overflow: "hidden",
  flexShrink: 0,
});

export const imageWrapper = styleVariants({
  short: [baseImageWrapper, { height: "242px" }],
  small: [baseImageWrapper, { height: "100%" }],
  medium: [baseImageWrapper, { height: "242px" }],
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const profileOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 25%)",
  padding: "12px",
  boxSizing: "border-box",
});

export const profileContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const profileImage = style({
  objectFit: "cover",
  borderRadius: "50%",
  border: "1px solid #fff",
});

export const name = style({
  ...TYPO.LABEL2M,
  color: "#fff",

  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  justifyContent: "space-between",
  flex: 1,
});

export const textInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const location = style({
  ...TYPO.CAPTION1B,
  color: COLORS.NEUTRAL700,
});

export const address = style({
  ...TYPO.CAPTION1B,
  color: COLORS.NEUTRAL500,
});

export const title = style({
  ...TYPO.LABEL1B,
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
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

export const stats = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const statItem = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  ...TYPO.CAPTION1B,
  color: "#888",
});

export const statValue = style({
  ...TYPO.CAPTION1M,
});

export const timeAgo = style({
  ...TYPO.CAPTION1M,
  color: "#888",
});
