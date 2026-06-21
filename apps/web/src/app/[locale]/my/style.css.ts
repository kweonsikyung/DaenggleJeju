import { style } from "@vanilla-extract/css";

export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
});

export const container = style({
  flex: 1,
  width: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
});

export const contentWrapper = style({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const listContainer = style({
  padding: "16px",
  overflow: "scroll",
  flex: 1,
});

export const placeList = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});
