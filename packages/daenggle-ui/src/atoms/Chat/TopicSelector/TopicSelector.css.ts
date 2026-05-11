import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const container = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  padding: "16px 18px",
});

export const topicButton = style({
  padding: "8px 12px",
  backgroundColor: "#fff",
  border: "1px solid #e0e0e0",
  borderRadius: "12px",
  ...TYPO.LABEL1M,
  color: COLORS.NEUTRAL600,
  cursor: "pointer",
  transition: "background-color 0.2s, border-color 0.2s",

  ":hover": {
    backgroundColor: "#f5f5f5",
    borderColor: "#ccc",
  },
});
