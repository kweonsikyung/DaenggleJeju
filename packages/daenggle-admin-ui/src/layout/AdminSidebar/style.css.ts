import { style } from "@vanilla-extract/css";
import { ADMIN_TOKENS } from "../../styles/tokens";

export const sidebar = style({
  width: 240,
  flexShrink: 0,
  background: ADMIN_TOKENS.SIDEBAR_BG,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: "100%",
});

export const logoArea = style({
  padding: "20px 16px",
  borderBottom: `1px solid ${ADMIN_TOKENS.SIDEBAR_BORDER}`,
  flexShrink: 0,
});

export const nav = style({
  flex: 1,
  overflowY: "auto",
  padding: "8px 12px",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  scrollbarWidth: "none",
  "::-webkit-scrollbar": { display: "none" },
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  marginBottom: 8,
});

export const sectionLabel = style({
  fontSize: 11,
  fontWeight: 700,
  color: ADMIN_TOKENS.SIDEBAR_LABEL,
  padding: "10px 8px 4px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  display: "block",
});

const itemBase = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "9px 10px",
  borderRadius: 8,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "18px",
  transition: "background 0.12s, color 0.12s",
});

export const item = style([itemBase, {
  color: ADMIN_TOKENS.SIDEBAR_TEXT,
  ":hover": {
    background: ADMIN_TOKENS.SIDEBAR_HOVER_BG,
    color: ADMIN_TOKENS.SIDEBAR_TEXT_ACTIVE,
  },
}]);

export const itemActive = style([itemBase, {
  background: ADMIN_TOKENS.SIDEBAR_ACTIVE_BG,
  color: ADMIN_TOKENS.SIDEBAR_TEXT_ACTIVE,
  fontWeight: 600,
}]);

export const itemBadge = style({
  marginLeft: "auto",
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  background: "#E74C3C",
  color: "#FFFFFF",
  fontSize: 10,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 4px",
});

export const footer = style({
  padding: "12px",
  borderTop: `1px solid ${ADMIN_TOKENS.SIDEBAR_BORDER}`,
  flexShrink: 0,
});
