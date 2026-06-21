import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const page = style({
  minHeight: "100dvh",
  maxHeight: "100dvh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const container = style({
  flex: 1,
  width: "100%",
  overflowY: "auto",
  padding: "0 20px",
  display: "flex",
  flexDirection: "column",
});

export const footer = style({
  width: "100%",
  minHeight: 60,
  padding: "0 20px",
});

// New Header Styles
export const headerContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  gap: "16px",
  paddingTop: "24px",
  paddingBottom: "24px",
});

export const headerTitle = style({
  ...TYPO.HEADLINE1,
  color: "#262626",
  margin: 0,
});

export const headerDescription = style({
  ...TYPO.LABEL1M,
  color: COLORS.NEUTRAL500,
  paddingTop: "4px",
});

export const placeLocation = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL500,
});

export const placeName = style({
  ...TYPO.BODY2B,
  color: "#262626",
  paddingTop: "4px",
});

// New PawRating Styles
export const pawRatingContainer = style({
  display: "flex",
  gap: "8px",
});

export const pawButton = style({
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
});

// Existing Form Styles
export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  paddingBottom: "24px",
});

export const formSection = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const textFieldWrapper = style({
  marginTop: "4px",
});

// Styles for the success screen
export const successContainer = style({
  width: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: 4,
});

export const successTitle = style({
  ...TYPO.HEADING2,
});

export const successDescription = style({
  ...TYPO.LABEL2M,
  color: COLORS.NEUTRAL600,
});

export const successFooter = style({
  display: "flex",
  gap: "8px",
  width: "100%",
  padding: "0 20px",
  minHeight: 60,
});
