import { style } from "@vanilla-extract/css";

export const root = style({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "transparent",
  padding: 0,
  cursor: "pointer",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
  ":active": {
    transform: "scale(0.95)",
  },
});
