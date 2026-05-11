import { style } from "@vanilla-extract/css";

export const overlayContainer = style({
  position: "absolute",
  inset: 0,
  zIndex: 10,
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 40%)",
});
