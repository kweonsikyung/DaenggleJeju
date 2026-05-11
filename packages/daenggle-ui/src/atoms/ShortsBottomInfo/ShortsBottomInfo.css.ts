import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const bottomInfo = style({
  width: "100%",
  display: "flex",
  gap: "8px",
  padding: "24px 18px",
});

export const userInfo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});

export const profileImage = style({
  borderRadius: "50%",
});

export const userName = style({
  ...TYPO.CAPTION2M,
  width: "60px",
  textAlign: "center",
  overflow: "ellipse",
});

export const locInfo = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  gap: "8px",
});

export const location = style({
  ...TYPO.LABEL2B,
  padding: "6px 15px",
  borderRadius: "39px",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  gap: "4px",
  alignItems: "center",
});

export const description = style({
  ...TYPO.BODY2M,
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

export const tags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
  maxHeight: "70px",
});

export const tag = style({
  backgroundColor: "rgba(0, 0, 0, 0.3)",
  padding: "4px 10px",
  borderRadius: "99px",
  ...TYPO.BODY3,
  color: "#FFF",
});
