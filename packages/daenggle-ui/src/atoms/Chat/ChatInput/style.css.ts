import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const wrapper = style({
  width: "100%",
  backgroundColor: COLORS.NEUTRAL0,
  padding: "8px 16px 24px",
  boxSizing: "border-box",
  borderTop: `1px solid ${COLORS.NEUTRAL100}`,
});

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: COLORS.NEUTRAL100,
  borderRadius: "30px",
  padding: "8px 8px 8px 16px",
});

export const input = style({
  flex: 1,
  border: "none",
  background: "none",
  outline: "none",
  ...TYPO.BODY2M,
  color: COLORS.NEUTRAL900,
  "::placeholder": {
    color: COLORS.NEUTRAL400,
  },
  ":disabled": {
    backgroundColor: "transparent",
    cursor: "not-allowed",
  },
});

export const sendButton = style({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: COLORS.GREEN500,
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  flexShrink: 0,
  ":disabled": {
    backgroundColor: COLORS.NEUTRAL200,
    cursor: "not-allowed",
  },
});
