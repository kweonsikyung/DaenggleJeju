import { keyframes, style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0.9)" },
  "100%": { opacity: 1, transform: "scale(1)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(255, 255, 255, 0.35)",
  backdropFilter: "blur(3px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  animation: `${fadeIn} 0.4s ease`,
});

export const modalCard = style({
  background: COLORS.NEUTRAL0,
  borderRadius: "20px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  width: "320px",
  padding: "28px 20px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const title = style({
  ...TYPO.HEADING1,
  color: COLORS.NEUTRAL800,
  marginBottom: "6px",
});

export const subtitle = style({
  ...TYPO.BODY2M,
  color: COLORS.NEUTRAL500,
  marginBottom: "20px",
});

export const checkList = style({
  listStyle: "none",
  padding: 0,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "24px",
});

export const listItem = style({
  ...TYPO.BODY3,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "10px",
  background: COLORS.NEUTRAL50,
  borderRadius: "10px",
  padding: "10px 14px",
  color: COLORS.NEUTRAL500,
  transition: "all 0.3s ease",
  fontWeight: 600,
});

export const active = style({
  background: COLORS.GREEN50,
  color: COLORS.GREEN700,
  fontWeight: 600,
});

export const icon = style({
  width: "24px",
  height: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const startButton = style({
  width: "100%",
  borderRadius: "12px",
  padding: "12px 0",
  fontSize: "16px",
  fontWeight: 600,
  border: "none",
  transition: "all 0.3s ease",
});

export const buttonDisabled = style({
  background: COLORS.NEUTRAL200,
  color: COLORS.NEUTRAL500,
  cursor: "not-allowed",
  opacity: 0.6,
});

export const buttonActive = style({
  background: COLORS.GREEN600,
  color: COLORS.NEUTRAL0,
  cursor: "pointer",
  ":hover": { opacity: 0.85 },
});

export const errorText = style({
  marginTop: "10px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#E74C3C",
});
