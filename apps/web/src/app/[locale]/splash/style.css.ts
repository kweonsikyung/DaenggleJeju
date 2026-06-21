import { keyframes, style } from "@vanilla-extract/css";

const riseBounce = keyframes({
  "0%": { transform: "translateY(40px)", opacity: 0 },
  "60%": { transform: "translateY(0)", opacity: 1 },
  "80%": { transform: "translateY(6px)", opacity: 1 },
  "100%": { transform: "translateY(0)", opacity: 1 },
});

const fade = keyframes({ to: { opacity: 0 } });

export const wrap = style({
  position: "fixed",
  inset: 0,
  zIndex: 50,
  width: "100%",
  height: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  overflow: "hidden",
});

export const logoWrap = style({
  position: "absolute",
  left: "50%",
  top: "80%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  pointerEvents: "none",
});

export const logo = style({
  animation: `${riseBounce} 1.4s ease-out forwards`,
});

export const fadeOut = style({
  animation: `${fade} .5s ease forwards`,
});
