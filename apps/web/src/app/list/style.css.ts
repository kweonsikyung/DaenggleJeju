import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

/** layout */
export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const topContainer = style({
  width: "100%",
});

export const container = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
});

/** container */
export const cardWrapper = style({
  padding: "16px 18px",
});

export const noResults = style({
  ...TYPO.BODY1B,
  color: "#666",
  textAlign: "center",
  marginTop: "40px",
});

export const filterWrapper = style({
  width: "100%",
  padding: "8px 18px 16px 18px",
  boxSizing: "border-box",
  overflowX: "auto",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

export const filterChipsContainer = style({
  display: "flex",
  gap: "8px",
});

/** bottomSheet */
export const bottomSheetContent = style({
  padding: "0px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

export const bottomSheetFooter = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "40px 18px 16px 18px",
  gap: "16px",
});

/** loading */
export const loadingContainer = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...TYPO.BODY1B,
});
