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
  backgroundColor: "#fff",
  cursor: "pointer",
  whiteSpace: "nowrap",
});

export const root = styleVariants({
  selected: [
    baseChip,
    {
      borderColor: COLORS.GREEN600,
      backgroundColor: COLORS.GREEN600,
      color: "#fff",
    },
  ],
  default: [
    baseChip,
    {
      borderColor: COLORS.NEUTRAL200,
      backgroundColor: "#fff",
      color: "#262626",
    },
  ],
});

export const textWrapper = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
});

export const title = style({
  fontWeight: "bold",
});

export const caption = style({
  ...TYPO.CAPTION1M,
  selectors: {
    [`${root.selected} &`]: {
      color: "#fff",
    },
    [`${root.default} &`]: {
      color: COLORS.NEUTRAL500,
    },
  },
});
