import { style } from "@vanilla-extract/css";
import { TYPO } from "@/styles/typography.css";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 999,
});

export const modalContainer = style({
  backgroundColor: "#fff",
  borderRadius: "10px",
  padding: "24px",
  width: "calc(100% - 48px)",
  maxWidth: "400px",
  maxHeight: "80vh",
  overflowY: "auto",
  boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

export const modalTitle = style({
  ...TYPO.HEADING2,
  margin: 0,
  flexGrow: 1,
});

export const closeButton = style({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "16px",
});

export const modalContent = style({
  flexGrow: 1,
});
