import { style, styleVariants } from "@vanilla-extract/css";

const baseChip = style({
  display: "inline-flex",
  alignItems: "center",
  height: "32px",
  padding: "8px 12px",
  gap: "4px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  whiteSpace: "nowrap",
});

export const chip = styleVariants({
  selected: [
    baseChip,
    {
      backgroundColor: "#1C2025",
      color: "#fff",
    },
  ],
  default: [
    baseChip,
    {
      backgroundColor: "#f0f0f4",
      color: "#404040",
    },
  ],
});

export const text = styleVariants({
  selected: {
    color: "#fff",
  },
  default: {
    color: "#404040",
  },
});

export const icon = styleVariants({
  selected: {
    filter: "brightness(0) invert(1)",
  },
  default: {
    filter: "none",
  },
});
