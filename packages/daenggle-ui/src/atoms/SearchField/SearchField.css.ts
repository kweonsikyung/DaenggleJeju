import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

const rotateAnimation = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const wrapper = style({
  width: "100%",
});

export const field = style({
  display: "flex",
  alignItems: "center",
  borderRadius: "99px",
  padding: "11px 16px",
  background: COLORS.NEUTRAL0,
  boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  transition: "box-shadow .12s ease, background-color .12s ease",
  gap: "8px",
});

export const state = styleVariants({
  default: {},
  focused: { boxShadow: `inset 0 0 0 1.5px ${COLORS.GREEN600}` },
  typing: { boxShadow: `inset 0 0 0 1.5px ${COLORS.GREEN600}` },
  pressed: {
    background: COLORS.NEUTRAL50,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  },
  filled: {},
  error: {
    boxShadow: `inset 0 0 0 1.5px #E5484D`,
    background: "#FFF5F5",
  },
  disabled: {
    background: COLORS.NEUTRAL50,
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
    opacity: 0.6,
  },
});

export const icon = style({
  width: "16px",
  height: "16px",
  flexShrink: 0,
});

export const rotate = style({
  animation: `${rotateAnimation} 1s linear infinite`,
});

export const input = style({
  flex: 1,
  width: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  ...TYPO.LABEL1M,
  selectors: {
    "&::placeholder": {
      color: COLORS.NEUTRAL400,
    },
    "&:disabled": {
      color: COLORS.NEUTRAL400,
    },
  },
});

export const clearButton = style({
  background: "none",
  border: "none",
  padding: "0",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const errorMessage = style({
  ...TYPO.CAPTION1M,
  color: "#E5484D",
  marginTop: "4px",
  paddingLeft: "12px",
});
