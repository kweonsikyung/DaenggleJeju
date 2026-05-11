import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "84px",
  height: "110px",
  justifyContent: "space-between",
  border: "none",
  background: "none",
  padding: "0",
  cursor: "pointer",
  transition: "transform 0.2s",
  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});

const baseImageContainer = style({
  width: "84px",
  height: "84px",
  borderRadius: "50%",
  overflow: "hidden",
  borderWidth: "2px",
  borderStyle: "solid",
  boxSizing: "border-box",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const imageContainer = styleVariants({
  after: [
    baseImageContainer,
    {
      borderColor: "#eee",
    },
  ],
  before: [
    baseImageContainer,
    {
      borderColor: COLORS.GREEN600,
    },
  ],
});

export const image = style({
  width: "70px",
  height: "70px",
  objectFit: "cover",
  borderRadius: "50%",
});

export const text = style({
  ...TYPO.LABEL1M,
  textAlign: "center",
  color: "#333",
});
