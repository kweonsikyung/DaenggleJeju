import { style } from "@vanilla-extract/css";

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const page = style({
  cursor: "pointer",
  backgroundColor: "#ccc",
  border: "none",
  borderRadius: "50%",
  width: "8px",
  height: "8px",
  padding: 0,
});

export const active = style({
  backgroundColor: "#000",
});
