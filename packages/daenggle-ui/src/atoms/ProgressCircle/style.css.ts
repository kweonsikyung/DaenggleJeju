import { keyframes, style } from "@vanilla-extract/css";

const fillAnim = keyframes({
  "0%": { strokeDashoffset: 63 },
  "100%": { strokeDashoffset: 0 },
});

export const circleBase = style({
  transform: "rotate(-90deg)",
  overflow: "visible",
});

export const progressRing = style({
  transition: "stroke-dashoffset 0.4s ease",
});

export const active = style({
  animation: `${fillAnim} 0.4s ease forwards`,
});
