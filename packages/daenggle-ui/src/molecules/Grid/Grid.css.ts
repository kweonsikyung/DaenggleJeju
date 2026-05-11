import { style } from "@vanilla-extract/css";

export const root = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(162px, 1fr))",
  gap: "16px",
  boxSizing: "border-box",
});
