import { globalStyle, style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const container = style({
  width: "100%",
  height: "calc(100dvh - 56px)",
  backgroundColor: "#000",
  position: "relative",
  overflow: "hidden",
});

export const swiperContainer = style({
  width: "100%",
  height: "100%",
  cursor: "pointer",
});

export const swiperSlide = style({
  width: "100%",
  height: "100%",
  position: "relative",
  overflow: "hidden",
});

export const playerBackground = style({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  overflow: "hidden",
});

globalStyle(`${playerBackground} > iframe`, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const staticThumbnail = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  zIndex: 1,
});

export const topGradient = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "200px",
  background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
  zIndex: 2,
  pointerEvents: "none",
});

export const bottomGradient = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "250px",
  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
  zIndex: 2,
  pointerEvents: "none",
});

export const topSection = style({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 3,
});

export const dropdownWrapper = style({
  padding: "8px 20px",
});

export const playButtonContainer = style({
  position: "absolute",
  inset: 0,
  zIndex: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const playIcon = style({
  filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.5))",
  transition: "transform 0.2s ease",
  selectors: {
    [`${playButtonContainer}:hover &`]: {
      transform: "scale(1.1)",
    },
  },
});

export const sideActions = style({
  position: "absolute",
  right: "18px",
  bottom: "250px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  zIndex: 3,
});

export const actionButton = style({
  background: "none",
  border: "none",
  color: "white",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  padding: 0,
  ...TYPO.CAPTION1B,
});

export const bottom = style({
  position: "absolute",
  left: "16px",
  right: "16px",
  bottom: "0px",
  zIndex: 3,
  "@media": {
    "(min-height: 670px)": {
      bottom: "20px",
    },
  },
});
