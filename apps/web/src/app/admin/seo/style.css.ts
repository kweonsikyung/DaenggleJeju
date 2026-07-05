import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";
import { ADMIN_TOKENS } from "../tokens";

export const content = style({
  flex: 1,
  overflowY: "auto",
  padding: "24px 28px",
  background: ADMIN_TOKENS.CONTENT_BG,
});

/* ── 토바 배지 ── */

export const statusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "5px 10px",
  borderRadius: 20,

  ...TYPO.CAPTION1M,
  background: COLORS.GREEN100,
  color: COLORS.GREEN700,
});

/* ── 통계 카드 ── */

export const statRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 16,
  marginBottom: 20,
});

export const statCard = style({
  background: ADMIN_TOKENS.CARD_BG,
  borderRadius: 12,
  border: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export const statCardTop = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const statLabel = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL500,
});

export const statIcon = style({
  width: 32,
  height: 32,
  borderRadius: 8,
  background: COLORS.GREEN100,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: COLORS.GREEN700,
  flexShrink: 0,
});

export const statValue = style({
  fontSize: 30,
  fontWeight: 700,
  lineHeight: "1",
  color: COLORS.NEUTRAL900,
});

export const statDesc = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL400,
});

/* ── 테이블 공통 ── */

export const th = style({
  textAlign: "left",
  padding: "10px 14px",
  background: "#F8FAFC",
  borderBottom: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  ...TYPO.CAPTION1B,
  color: COLORS.NEUTRAL500,
  whiteSpace: "nowrap",
});

export const td = style({
  padding: "10px 14px",
  borderBottom: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  verticalAlign: "middle",
});

export const tr = style({
  ":hover": { background: "#F8FAFC" },
});

/* ── 카드 바디 ── */

export const cardBody = style({
  padding: 20,
});

/* ── 번역 진행 바 ── */

export const progressGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 14,
  marginBottom: 20,
});

export const progressCard = style({
  padding: "14px 16px",
  background: "#F8FAFC",
  borderRadius: 8,
  border: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
});

export const progressHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
});

export const progressLocale = style({
  ...TYPO.LABEL1B,
  color: COLORS.NEUTRAL800,
});

export const progressPct = style({
  ...TYPO.LABEL1B,
  color: COLORS.GREEN700,
});

export const progressTrack = style({
  height: 6,
  borderRadius: 3,
  background: ADMIN_TOKENS.CARD_BORDER,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  borderRadius: 3,
  background: COLORS.GREEN500,
});

export const progressCount = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL500,
  marginTop: 6,
});

/* ── 사이트맵 URL ── */

export const urlGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 8,
});

export const urlItem = style({
  padding: "8px 12px",
  background: "#F8FAFC",
  borderRadius: 6,
  border: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  wordBreak: "break-all",
});

export const urlMeta = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL400,
  display: "block",
  marginBottom: 2,
});

export const urlText = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL700,
});

/* ── 빠른 링크 ── */

export const quickLinkGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: 12,
});

export const quickLink = style({
  display: "block",
  padding: "12px 16px",
  background: ADMIN_TOKENS.CARD_BG,
  border: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  borderRadius: 8,
  color: COLORS.GREEN700,
  textDecoration: "none",
  ...TYPO.LABEL2M,

  transition: "border-color 0.12s, box-shadow 0.12s",
  ":hover": {
    borderColor: COLORS.GREEN400,
    boxShadow: `0 0 0 3px ${COLORS.GREEN100}`,
  },
});

export const quickLinkDesc = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL400,
  marginTop: 2,
  display: "block",
});

/* ── 기타 텍스트 ── */

export const pathText = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL400,
});

export const pageKey = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL400,
  display: "block",
  marginTop: 2,
});

export const monoText = style({
  fontFamily: "monospace",
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL500,
});

export const titleVal = style({
  ...TYPO.CAPTION1M,
});

export const timestamp = style({
  ...TYPO.CAPTION2M,
  color: COLORS.NEUTRAL400,
  textAlign: "right",
  paddingBottom: 8,
});
