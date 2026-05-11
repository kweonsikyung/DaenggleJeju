import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const container = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "16px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxSizing: "border-box",
  border: "1px solid #E5E5E5",
});

export const profileInfo = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const avatar = style({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "cover",
});

export const textInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const nameLine = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const name = style({
  ...TYPO.BODY1B,
  color: COLORS.NEUTRAL900,
});

export const description = style({
  ...TYPO.BODY2M,
  color: COLORS.NEUTRAL700,
});

export const details = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL500,
});

export const editButton = style({
  background: "#F5F5F5",
  border: "none",
  borderRadius: "50px",
  padding: "16px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
