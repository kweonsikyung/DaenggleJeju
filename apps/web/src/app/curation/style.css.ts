import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

/* --- page = topbar + container(title+content) + footer --- */
export const page = style({
  minHeight: "100dvh",
  maxHeight: "100dvh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "18px",
});

export const container = style({
  flex: 1,
  width: "100%",
  overflowY: "auto",
  padding: "0 20px",

  display: "flex",
  flexDirection: "column",
});

export const content = style({
  flex: 1,
});

export const footer = style({
  width: "100%",
  height: 100,
  padding: "0 20px",
});

export const title = style({
  ...TYPO.HEADING1,
  color: "#262626",
  width: "100%",
  height: "64px",
  textAlign: "center",
  whiteSpace: "pre-line",
});

/* --- step1 --- */
export const step1_container = style({
  display: "grid",
  placeItems: "center",
  marginTop: 40,
});
export const step1_grid = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "33px",
});
export const step1_li = style({
  width: "100%",
  padding: "16px 20px",
  border: "none",
  background: "none",
  textAlign: "left",
  fontSize: 16,
  cursor: "pointer",
});
/* --- step2 --- */
export const caption = style({
  ...TYPO.LABEL1B,
  color: COLORS.GREEN700,
  paddingBottom: 16,
});
export const step2_container = style({
  marginTop: "26px",
});
export const step2_grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
});
/* --- step3 --- */
export const step3_container = style({
  marginTop: "26px",
  display: "flex",
  flexDirection: "column",
  gap: 12,
});
