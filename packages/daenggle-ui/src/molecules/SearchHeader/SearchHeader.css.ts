import { style, styleVariants } from "@vanilla-extract/css";

export const root = style({
  width: "100%",
  padding: "8px 18px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const backButton = style({
  background: "none",
  border: "none",
  padding: "0",
  cursor: "pointer",
  flexShrink: 0,
});

const searchFieldWrapperBase = style({
  flex: 1,
  position: "relative",
});

export const searchFieldWrapper = styleVariants({
  fullWidth: [searchFieldWrapperBase, { width: "100%" }],
  withBackButton: [searchFieldWrapperBase, { width: "calc(100% - 48px)" }],
});

export const clickOverlay = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  cursor: "pointer",
  background: "transparent",
});
