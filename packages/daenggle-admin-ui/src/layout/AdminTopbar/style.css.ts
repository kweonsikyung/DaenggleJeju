import { style } from "@vanilla-extract/css";
import { ADMIN_TOKENS } from "../../styles/tokens.css";

export const topbar = style({
  padding: "16px 28px",
  background: ADMIN_TOKENS.CARD_BG,
  borderBottom: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
});

export const title = style({
  fontSize: 22,
  fontWeight: 700,
  lineHeight: "32px",
  color: "#171717",
  margin: 0,
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
});
