import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
});

export const mapWrapper = style({
  width: "100%",
  flex: 1,
});

export const topContainer = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 10,
});

export const bottomContainer = style({
  position: "absolute",
  bottom: 80,
  width: "100%",
  zIndex: 10,
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

export const placeCardContainer = style({
  position: "absolute",
  bottom: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "93%",
  zIndex: 11,
  padding: "12px",
  boxSizing: "border-box",
  transition: "transform 0.3s ease-in-out",
  boxShadow: "1.8px 3.6px 9px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  overflow: "hidden",
  borderRadius: "12px",
});

export const gpsToast = style({
  ...TYPO.CAPTION1M,
  width: "90%",
  textAlign: "center",

  position: "absolute",
  bottom: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "16px",
  borderRadius: "30px",
  backgroundColor: "#000000D1",
  color: "white",
  whiteSpace: "nowrap",
  zIndex: 12,
  transition: "opacity 0.3s ease",
});
