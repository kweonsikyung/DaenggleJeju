import { style } from "@vanilla-extract/css";
import { ADMIN_TOKENS } from "daenggle-admin-ui";

export const shell = style({
  display: "flex",
  height: "100vh",
  overflow: "hidden",
  background: ADMIN_TOKENS.CONTENT_BG,
});

export const main = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minWidth: 0,
});

export const logoWrap = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const logoIcon = style({
  width: 36,
  height: 36,
  borderRadius: 8,

  background: "rgba(38, 226, 120, 0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#26E278",
  flexShrink: 0,
});

export const logoName = style({
  fontSize: 14,
  fontWeight: 700,
  color: "#FFFFFF",
  letterSpacing: "0.02em",
});

export const logoSub = style({
  fontSize: 11,
  fontWeight: 500,
  color: "#8B93AA",
  marginTop: 1,
});

export const logoutBtn = style({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "9px 10px",
  borderRadius: 8,

  border: "none",
  background: "transparent",
  color: "#8B93AA",
  cursor: "pointer",
  width: "100%",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "inherit",

  transition: "background 0.12s, color 0.12s",
  ":hover": {
    background: "#252840",
    color: "#FFFFFF",
  },
});
