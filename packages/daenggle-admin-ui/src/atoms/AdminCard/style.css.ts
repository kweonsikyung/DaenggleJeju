import { style } from "@vanilla-extract/css";
import { ADMIN_TOKENS } from "../../styles/tokens";

export const card = style({
  background: ADMIN_TOKENS.CARD_BG,
  borderRadius: 12,
  border: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  overflow: "hidden",
  marginBottom: 20,
});

export const header = style({
  padding: "16px 20px",
  borderBottom: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
  display: "flex",
  alignItems: "center",
});

export const title = style({
  fontSize: 16,
  fontWeight: 700,
  lineHeight: "22px",
  color: "#1F1F1F",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: 8,
});
