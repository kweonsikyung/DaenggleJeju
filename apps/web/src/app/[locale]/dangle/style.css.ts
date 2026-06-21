import { style } from "@vanilla-extract/css";

export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const container = style({
  flex: 1,
  width: "100%",
  overflowY: "auto",
});

export const pd = style({
  padding: "16px",
});
