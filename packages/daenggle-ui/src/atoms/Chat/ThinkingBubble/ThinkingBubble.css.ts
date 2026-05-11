import { keyframes, style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";

const bounce = keyframes({
  "0%, 80%, 100%": { transform: "scale(0)" },
  "40%": { transform: "scale(1.0)" },
});

export const wrapper = style({
  display: "flex",
  width: "100%",
  padding: "8px 18px",
  justifyContent: "flex-start",
});

export const bubble = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "16px 20px",
  backgroundColor: COLORS.NEUTRAL100,
  borderRadius: "0 16px 16px 16px",
});

export const dot = style({
  width: "8px",
  height: "8px",
  backgroundColor: "#34C759",
  borderRadius: "50%",
  animation: `${bounce} 1.4s infinite ease-in-out both`,
});
