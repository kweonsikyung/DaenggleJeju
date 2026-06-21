import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

/* 화면 */
export const page = style({
  minHeight: "100dvh",
  maxHeight: "100dvh",
  background: COLORS.LIME50,
  overflow: "hidden",
});

/* 상단 바 */
export const topBar = style({
  display: "grid",
  gridTemplateColumns: "1fr auto 1fr",
  alignItems: "center",
  padding: "24px 18px",
});

export const skip = style({
  justifySelf: "end",
  ...TYPO.LABEL1M,
  color: "#7D7D7D",
  textDecoration: "underline",
  cursor: "pointer",
});

/* Embla */
// Embla 필수 DOM 구조(뷰포트 → 컨테이너 → 슬라이드)
export const viewport = style({
  overflow: "hidden",
  width: "100%",
  height: "calc(100dvh - 66px)",
});

export const container = style({
  display: "flex",
  height: "100%",
});

export const slide = style({
  flex: "0 0 100%",
  minWidth: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
});

/* 내용 */
export const top = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "14px",
  justifyContent: "center",
  padding: "30px 0px",
});

export const title = style({
  textAlign: "center",
  color: COLORS.NEUTRAL800,
  fontWeight: 500,
  fontSize: "24px",
  lineHeight: "32px",
});

export const titleBold = style({
  fontWeight: 800,
});

export const phone = style({
  position: "relative",
  flex: "1 1 0%",
  minHeight: 0,
  alignSelf: "stretch",

  width: "100%",
  height: "100%",

  pointerEvents: "none",
});
