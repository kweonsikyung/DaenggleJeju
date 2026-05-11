import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  zIndex: "999",
});

export const content = style({
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  margin: "0 auto",
  width: "100%",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  background: "#fff",
  boxShadow: "0px 4px 20px 0px #00000033",
  display: "grid",
  gridTemplateRows: "auto auto 1fr",
  overflow: "hidden",
  zIndex: "9999",
});

export const handle = style({
  height: 16,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  selectors: {
    "&::before": {
      content: '""',
      display: "block",
      width: 48,
      height: 4,
      borderRadius: 4,
      background: "#D6D8DC",
    },
  },
});

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "center",
  padding: "16px 18px",
  background: "#fff",
  margin: 0,
});

export const title = style({
  ...TYPO.HEADLINE1,
  color: "#262626",
});

export const close = style({
  inlineSize: 24,
  blockSize: 24,
  display: "grid",
  placeItems: "center",
  backgroundColor: "transparent",
  border: "none",
  color: "#222",
  cursor: "pointer",
});

export const body = style({
  overflowY: "auto",
  minHeight: "60vh",
  maxHeight: "80vh",
  WebkitOverflowScrolling: "touch",
});
