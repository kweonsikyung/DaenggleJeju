import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
});

export const title = style({
  ...TYPO.BODY1B,
  color: "#000",
  padding: "12px 0px",
});

export const desc = style({
  paddingLeft: "4px",
  ...TYPO.CAPTION1M,
  color: COLORS.GREEN700,
});

export const chipsContainer = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});
