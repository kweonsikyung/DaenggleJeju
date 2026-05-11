import { globalStyle, style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

const arrowSize = 8;
const gap = 10;
const tooltipBackgroundColor = "#fff";
const tooltipColor = COLORS.GREEN700;
const tooltipZIndex = 50;
const tooltipMaxWidth = "280px";

export const tooltipWrapper = style({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: tooltipBackgroundColor,
  color: tooltipColor,
  borderRadius: "8px",
  padding: "16px",
  zIndex: tooltipZIndex,
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  transition: "opacity 0.2s ease, visibility 0.2s ease",
  maxWidth: tooltipMaxWidth,
  width: 180,
  textAlign: "left",
});

export const headerContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  marginBottom: "8px",
});

export const tooltipTitle = style({
  ...TYPO.BODY1B,
  fontFamily: "var(--font-laundry)",
  color: tooltipColor,
  flexGrow: 1,
  marginRight: "8px",
  whiteSpace: "pre-wrap",
});

export const closeButton = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: 1,
  flexShrink: 0,
  ":hover": {
    opacity: 0.8,
  },
});

export const tooltipText = style({
  fontSize: "11px",
  fontWeight: 500,
  color: COLORS.NEUTRAL500,
  whiteSpace: "pre-wrap",
  width: "100%",
});

export const tooltipArrow = style({
  position: "absolute",
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderColor: "transparent",
});

export const positionVariants = styleVariants({
  top: {
    bottom: `calc(100% + ${gap}px)`,
    left: "-40%",
    transform: "translateX(-50%)",
  },
  bottom: {
    top: `calc(100% + ${gap}px)`,
    left: "50%",
    transform: "translateX(-50%)",
  },
  left: {
    right: `calc(100% + ${gap}px)`,
    top: "50%",
    transform: "translateY(-50%)",
  },
  right: {
    left: `calc(100% + ${gap}px)`,
    top: "50%",
    transform: "translateY(-50%)",
  },
});

globalStyle(`${positionVariants.top} .${tooltipArrow}`, {
  top: "100%",
  left: "80%",
  transform: "translateX(-50%)",
  borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
  borderTopColor: tooltipBackgroundColor,
});

globalStyle(`${positionVariants.bottom} .${tooltipArrow}`, {
  bottom: "100%",
  left: "50%",
  transform: "translateX(-50%)",
  borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
  borderBottomColor: tooltipBackgroundColor,
});

globalStyle(`${positionVariants.left} .${tooltipArrow}`, {
  top: "50%",
  left: "100%",
  transform: "translateY(-50%)",
  borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
  borderLeftColor: tooltipBackgroundColor,
});

globalStyle(`${positionVariants.right} .${tooltipArrow}`, {
  top: "50%",
  right: "100%",
  transform: "translateY(-50%)",
  borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
  borderRightColor: tooltipBackgroundColor,
});
