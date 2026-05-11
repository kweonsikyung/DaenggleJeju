import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const container = style({
  position: "relative",
  display: "flex",
  width: "100%",
  backgroundColor: "#F4F4F4",
  borderRadius: "30px",
  padding: "4px",
});

export const optionButton = recipe({
  base: {
    ...TYPO.LABEL1M,
    padding: "10px 16px",
    flex: "1",
    textAlign: "center",
    border: "none",
    background: "none",
    color: "#A1A1A1",
    cursor: "pointer",
    transition: "color 0.3s ease",
    position: "relative",
    zIndex: 1,
    whiteSpace: "nowrap",
  },
  variants: {
    active: {
      true: {
        color: "#000000",
      },
    },
  },
});

export const activeIndicator = style({
  flex: "1",
  position: "absolute",
  top: "4px",
  bottom: "4px",
  backgroundColor: COLORS.NEUTRAL0,
  borderRadius: "30px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  transition: "left 0.3s ease, width 0.3s ease",
  zIndex: 0,
});
