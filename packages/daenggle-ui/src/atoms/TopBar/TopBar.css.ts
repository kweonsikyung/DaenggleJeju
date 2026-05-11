import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  width: "100%",
  background: "#fff",
  padding: "16px 18px",
  display: "grid",
  gridTemplateColumns: "24px 1fr auto",
  alignItems: "center",
  gap: 8,
});

export const sticky = style({
  position: "sticky",
  top: 0,
  zIndex: 50,
});

export const transparent = style({
  background: "transparent",
});

export const whiteIcon = style({
  filter: "brightness(0) invert(1)",
});

export const iconBox = style({
  width: 24,
  height: 24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const iconButton = style({
  width: 24,
  height: 24,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  selectors: {
    "&:disabled": { cursor: "default", opacity: 0.5 },
  },
});

export const sideLeft = style([
  iconButton,
  {
    justifySelf: "start",
  },
]);

export const center = style({
  minWidth: 0,
  overflow: "hidden",
  textAlign: "left",
  justifySelf: "start",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const title = style({
  ...TYPO.HEADLINE1,
  lineHeight: "24px",
  color: COLORS.NEUTRAL600,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const sideRight = style({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
  gap: 16,
});
