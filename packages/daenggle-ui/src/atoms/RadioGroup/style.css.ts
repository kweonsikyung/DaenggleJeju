import { globalStyle, style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const fieldset = style({
  border: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const legend = style({
  ...TYPO.BODY1B,
  color: "#000",
  padding: "20px 0px",
  width: "100%",
});

export const optionsContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const label = style({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

export const radioInput = style({
  position: "absolute",
  opacity: 0,
  width: 0,
  height: 0,
});

export const radioVisual = style({
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  border: `2px solid ${COLORS.NEUTRAL300}`,
  marginRight: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "border-color 0.2s ease, background-color 0.2s ease",
  selectors: {
    [`${radioInput}:checked + &`]: {
      borderColor: COLORS.GREEN500,
      backgroundColor: COLORS.GREEN500,
    },
    [`${label}:hover &`]: {
      borderColor: COLORS.GREEN500,
    },
  },
});

globalStyle(`${radioInput}:checked + ${radioVisual}::after`, {
  content: '""',
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "white",
});

export const labelText = style({
  ...TYPO.LABEL1M,
  color: COLORS.NEUTRAL700,
});
