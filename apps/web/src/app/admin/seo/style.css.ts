import { style } from "@vanilla-extract/css";

export const page = style({
  maxWidth: 1100,
  margin: "0 auto",
  padding: "32px 24px",
  color: "#111",
});

export const header = style({
  borderBottom: "2px solid #111",
  paddingBottom: 16,
  marginBottom: 32,
});

export const title = style({
  fontSize: 24,
  fontWeight: 700,
  margin: 0,
});

export const subtitle = style({
  fontSize: 13,
  color: "#666",
  margin: "6px 0 0",
});

export const section = style({
  marginBottom: 40,
});

export const sectionTitle = style({
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#555",
  marginBottom: 12,
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  lineHeight: 1.5,
});

export const th = style({
  textAlign: "left",
  padding: "8px 12px",
  background: "#f4f4f4",
  borderBottom: "1px solid #ddd",
  fontWeight: 600,
  whiteSpace: "nowrap",
});

export const td = style({
  padding: "8px 12px",
  borderBottom: "1px solid #eee",
  verticalAlign: "top",
});

export const badge = style({
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: 4,
  fontSize: 11,
  fontWeight: 600,
});

export const badgeOk = style([
  badge,
  {
    background: "#d1fae5",
    color: "#065f46",
  },
]);

export const badgeMissing = style([
  badge,
  {
    background: "#fee2e2",
    color: "#991b1b",
  },
]);

export const badgeInfo = style([
  badge,
  {
    background: "#e0f2fe",
    color: "#0c4a6e",
  },
]);

export const urlList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 8,
});

export const urlItem = style({
  padding: "6px 10px",
  background: "#f9f9f9",
  borderRadius: 4,
  fontSize: 12,
  color: "#333",
  wordBreak: "break-all",
  border: "1px solid #e5e5e5",
});

export const quickLinkGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 12,
});

export const quickLink = style({
  display: "block",
  padding: "10px 16px",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: 6,
  color: "#0070f3",
  textDecoration: "none",
  fontSize: 13,
  fontWeight: 500,
  transition: "border-color 0.15s",
  ":hover": {
    borderColor: "#0070f3",
  },
});

export const quickLinkDesc = style({
  fontSize: 11,
  color: "#888",
  marginTop: 2,
  display: "block",
});

export const divider = style({
  border: "none",
  borderTop: "1px solid #eee",
  margin: "32px 0",
});

export const statRow = style({
  display: "flex",
  gap: 24,
  flexWrap: "wrap",
  marginBottom: 24,
});

export const statCard = style({
  padding: "16px 20px",
  background: "#f9f9f9",
  borderRadius: 8,
  border: "1px solid #e5e5e5",
  minWidth: 140,
});

export const statValue = style({
  fontSize: 28,
  fontWeight: 700,
  lineHeight: 1,
  marginBottom: 4,
});

export const statLabel = style({
  fontSize: 12,
  color: "#666",
});
