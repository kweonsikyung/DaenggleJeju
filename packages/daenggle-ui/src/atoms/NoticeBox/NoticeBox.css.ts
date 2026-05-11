import { keyframes, style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

const YELLOW_COLORS = {
  background: "#FEFCE8",
  text: "#D08700",
};

const BLUE_COLORS = {
  background: "#EFF6FF",
  text: "#525252",
};

const slideDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideUp = keyframes({
  "0%": { opacity: 1, transform: "translateY(0)" },
  "100%": { opacity: 0, transform: "translateY(-10px)" },
});

export const animateIn = style({
  animation: `${slideDown} 0.4s ease-out`,
});

export const animateOut = style({
  animation: `${slideUp} 0.4s ease-out forwards`,
});

export const container = style({
  width: "100%",
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  padding: "12px",
  borderRadius: "16px",
});

export const iconWrapper = style({
  flexShrink: 0,
  width: "20px",
  height: "20px",
  marginTop: "1px",
});

export const content = style({
  flexGrow: 1,
  ...TYPO.CAPTION1M,
  margin: 0,
});

export const closeButton = style({
  flexShrink: 0,
  width: "20px",
  height: "20px",
  padding: 0,
  background: "transparent",
  border: "none",
  cursor: "pointer",
  marginTop: "1px",
});

export const yellowTheme = style({
  backgroundColor: YELLOW_COLORS.background,
  color: YELLOW_COLORS.text,
});

export const blueTheme = style({
  backgroundColor: BLUE_COLORS.background,
  color: BLUE_COLORS.text,
});
