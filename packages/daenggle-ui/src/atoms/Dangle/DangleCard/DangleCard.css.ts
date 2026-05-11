import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  width: "280px",
  height: "377px",
  borderRadius: "28px",
  overflow: "hidden",
  position: "relative",
  border: "none",
  padding: "0",
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "transform 0.2s",
  ":hover": {
    transform: "scale(1.02)",
  },
});

export const imageWrapper = style({
  width: "100%",
  height: "100%",
  position: "relative",
});

export const overlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  padding: "27px 24px",
  boxSizing: "border-box",
  background:
    "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,0.5) 100%)",
});

export const views = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: "700",
  color: "#fff",
});

export const bottom = style({
  width: "100%",
  color: "#fff",
  textAlign: "left",
});

export const title = style({
  ...TYPO.DISPLAY,
  whiteSpace: "pre-wrap",
  margin: 0,
  paddingBottom: "16px",
});

export const hashtag = style({
  ...TYPO.CAPTION1M,
  display: "inline-block",
  padding: "4px 8px",
  backgroundColor: "#FFFFFF33",
  borderRadius: "30px",
});

export const image = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
