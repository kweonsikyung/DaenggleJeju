import { style } from "@vanilla-extract/css";
import { ADMIN_TOKENS } from "../../styles/tokens.css";

export const wrap = style({
  overflowX: "auto",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  fontWeight: 500,
});

export const emptyArea = style({
  padding: "40px 20px",
  textAlign: "center",
  color: "#9A9A9A",
  fontSize: 13,
  borderTop: `1px solid ${ADMIN_TOKENS.CARD_BORDER}`,
});
