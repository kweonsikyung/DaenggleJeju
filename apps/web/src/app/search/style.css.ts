import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const container = style({
  flex: 1,
  padding: "8px 16px",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
});

export const section = style({});

export const sectionTitle = style({
  ...TYPO.BODY1B,
  fontWeight: "bold",
  margin: "0",
  paddingBottom: "16px",
});

export const filterChipsContainer = style({
  display: "flex",
  gap: "8px",
  overflowX: "auto",
  minHeight: "32px",
});

export const recentKeywordsWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});

export const noHistory = style({
  ...TYPO.LABEL1B,
  color: COLORS.NEUTRAL500,
  textAlign: "center",
  margin: "45px 0",
});

export const keywordsWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});

export const videoList = style({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

export const placeCard = style({
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  width: "100%",
  padding: "10px 0",
  cursor: "pointer",
});

export const placeThumbWrap = style({
  position: "relative",
  width: "84px",
  height: "84px",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#f3f4f6",
  flexShrink: 0,
});

export const placeThumbImg = style({
  objectFit: "cover",
});

export const placeThumbFallback = style({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#9ca3af",
  fontSize: "12px",
});

export const placeInfo = style({
  flex: 1,
  minWidth: 0,
});

export const placeTitle = style({
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "20px",
  color: "#111827",
  marginBottom: "4px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const placeMeta = style({
  fontSize: "12px",
  color: "#6b7280",
  marginBottom: "6px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const placeChips = style({
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
});

export const placeChip = style({
  fontSize: "11px",
  padding: "2px 6px",
  borderRadius: "9999px",
  background: "#F3F4F6",
  color: "#374151",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
});

export const skeletonCard = style({
  height: "84px",
  borderRadius: "10px",
  background: "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%)",
  backgroundSize: "400% 100%",
  animation: "shine 1.4s ease infinite",
});

export const errorBox = style({
  padding: "12px",
  borderRadius: "8px",
  background: "#FEF2F2",
  color: "#991B1B",
  fontSize: "13px",
});

export const bottomSheetContent = style({
  padding: "0px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

export const bottomSheetFooter = style({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "40px 18px 16px 18px",
  gap: "16px",
});

export const placeCardContainer = style({
  position: "absolute",
  bottom: "80px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "93%",
  zIndex: 11,
  padding: "12px",
  boxSizing: "border-box",
  transition: "transform 0.3s ease-in-out",
  boxShadow: "1.8px 3.6px 9px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  overflow: "hidden",
  borderRadius: "12px",
});
