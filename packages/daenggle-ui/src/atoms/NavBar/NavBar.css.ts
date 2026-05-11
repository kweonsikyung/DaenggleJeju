import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  width: "100%",
  height: "56px",
  backgroundColor: "#fff",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

export const navItem = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
  background: "none",
  border: "none",
  cursor: "pointer",
});

const bottomNavTextBase = style({
  ...TYPO.CAPTION2M,
});

export const navText = style([bottomNavTextBase, { color: COLORS.NEUTRAL400 }]);
export const navTextSelected = style([bottomNavTextBase, { color: "#262626" }]);
