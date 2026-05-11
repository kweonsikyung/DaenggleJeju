import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const container = style({
  position: "relative",
  width: "fit-content",
});

export const button = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: COLORS.NEUTRAL50,
  ...TYPO.BODY1B,
  padding: "8px 0",
});

export const chevronIcon = style({
  filter: "brightness(0) invert(1)",
  transition: "transform 0.2s ease-in-out",
});

export const chevronIconUp = style({
  transform: "rotate(180deg)",
});

export const list = style({
  position: "absolute",
  top: "calc(100% + 8px)",
  left: "0",
  background: "rgba(29, 29, 31, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "8px",
  listStyle: "none",
  padding: "8px",
  margin: "0",
  width: "max-content",
  minWidth: "100%",
  color: COLORS.NEUTRAL50,
  zIndex: 100,
  border: `1px solid ${COLORS.NEUTRAL700}`,
});

export const listItem = style({
  padding: "10px 12px",
  cursor: "pointer",
  borderRadius: "4px",
  ...TYPO.BODY2M,
  transition: "background-color 0.1s ease-in-out",

  ":hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
