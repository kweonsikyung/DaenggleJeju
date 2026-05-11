import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const locationListButton = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  backgroundColor: COLORS.NEUTRAL700,
  borderRadius: "99px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  border: "none",
  cursor: "pointer",
});

export const locationListText = style({
  ...TYPO.LABEL2M,
  color: COLORS.NEUTRAL50,
  paddingRight: "4px",
});

export const locationListCount = style({
  ...TYPO.LABEL2B,
  color: COLORS.LIME400,
});
