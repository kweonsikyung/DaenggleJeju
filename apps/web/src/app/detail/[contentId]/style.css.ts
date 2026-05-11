import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

/* --- Layout --- */
export const page = style({
  width: "100%",
  height: "100dvh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

export const container = style({
  flex: 1,
  width: "100%",
  overflowY: "auto",

  display: "flex",
  flexDirection: "column",
  gap: "40px",
});

/* --- common sections --- */
export const section = style({
  padding: "16px 18px",
});

export const placeInfoSection = style({
  padding: "0px 18px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

export const sectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "56px",
});

export const sectionTitle = style(TYPO.HEADLINE1);

export const sectionActionText = style([
  TYPO.CAPTION1M,
  {
    color: "#2B7FFF",
    cursor: "pointer",
  },
]);

/* --- Place Info Components --- */
export const placeHeader = style({
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
});

export const placeImage = style({
  width: "80px",
  height: "80px",
  borderRadius: "8px",
  objectFit: "cover",
  flexShrink: 0,
});

export const placeDetails = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "80px",
});

export const placeName = style(TYPO.HEADLINE1);

export const placeStats = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const statText = style([TYPO.CAPTION1M, { color: COLORS.NEUTRAL500 }]);

export const visitChip = style([
  TYPO.CAPTION2M,
  {
    backgroundColor: COLORS.GREEN50,
    color: COLORS.GREEN500,
    padding: "2px 4px",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
]);

export const infoTagGroup = style({
  display: "flex",
  gap: "3px",
  flexWrap: "wrap",
});

export const tagGroup = style({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  border: `1px solid ${COLORS.GREEN600}`,
  borderRadius: "8px",
  overflow: "hidden",
  height: "54px",
});

export const tagItem = style([
  TYPO.BODY2B,
  {
    color: COLORS.GREEN600,
    flex: 1,
    textAlign: "center",
  },
]);

export const tagDivider = style({
  width: "1px",
  height: "16px",
  backgroundColor: COLORS.NEUTRAL200,
});

export const infoList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const infoItem = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const infoText = style([TYPO.LABEL2M, { color: COLORS.NEUTRAL700 }]);
export const infoLink = style([TYPO.BODY2M, { color: "#2B7FFF", textDecoration: "underline" }]);

/* --- Attention Notes Section --- */
export const attentionBox = style({
  backgroundColor: COLORS.NEUTRAL50,
  borderRadius: "12px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const attentionTitle = style([TYPO.BODY2B]);

export const attentionList = style({
  paddingLeft: "20px",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const attentionItem = style([TYPO.BODY2M, { color: COLORS.NEUTRAL600 }]);

/* --- Review Section --- */
export const reviewList = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const reviewSummary = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  height: "120px",
});

export const reviewRating = style([
  TYPO.HEADING1,
  {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#4897F3",
  },
]);

export const pawRatingContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "2px",
});

export const reviewCount = style([TYPO.BODY3, { color: COLORS.NEUTRAL600 }]);

/* --- Modal Section --- */
export const formContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const formDescription = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL700,
  margin: "0 0 8px 0",
});

export const textareaWrapper = style({
  position: "relative",
  width: "100%",
});

export const textarea = style({
  width: "100%",
  minHeight: "120px",
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${COLORS.NEUTRAL300}`,
  ...TYPO.BODY3,
  resize: "none",
  transition: "border-color 0.2s ease",
  ":focus": {
    borderColor: COLORS.GREEN700,
    outline: "none",
  },
  "::placeholder": {
    color: COLORS.NEUTRAL500,
  },
});

export const textareaError = style({
  borderColor: "#ff4141ff",
  ":focus": {
    borderColor: "#ff4141ff",
  },
});

export const charCountWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "4px",
});

export const charCount = style({
  ...TYPO.CAPTION1M,
  color: COLORS.NEUTRAL500,
  textAlign: "right",
  flexGrow: 1,
});

export const errorText = style({
  ...TYPO.CAPTION1M,
  color: "#ff4141ff",
  marginRight: "8px", // 글자 수 카운터와의 간격
});

export const submitButton = style({
  width: "100%", // 버튼 너비 100%
  marginTop: "8px", // 텍스트 에어리어 그룹과의 간격
});
