import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

const baseChip = style({
  ...TYPO.LABEL1M,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 12px",
  borderRadius: "12px",
  border: "1px solid #ccc",
  backgroundColor: COLORS.NEUTRAL50,
  cursor: "pointer",
  whiteSpace: "nowrap",
  gap: "4px",
});

export const chip = styleVariants({
  selected: [
    baseChip,
    {
      borderColor: COLORS.NEUTRAL50,
      backgroundColor: "#fff",
      color: "#262626",
      ...TYPO.LABEL1R,
    },
  ],
  default: [
    baseChip,
    {
      borderColor: COLORS.GREEN50,
      backgroundColor: COLORS.GREEN50,
      color: COLORS.GREEN700,
      ...TYPO.LABEL1M,
    },
  ],
});

export const closeButton = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
