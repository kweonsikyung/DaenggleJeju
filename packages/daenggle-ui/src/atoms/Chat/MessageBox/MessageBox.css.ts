import { style } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const wrapper = style({
  display: "flex",
  width: "100%",
  padding: "8px 18px",
});

// 공통 메시지 스타일
const baseMessageBox = style({
  ...TYPO.BODY3,
  padding: "12px 16px",
  maxWidth: "80%",
  whiteSpace: "pre-wrap",
});

// AI 메시지 박스 스타일
export const aiMessageBox = style([
  baseMessageBox,
  {
    backgroundColor: COLORS.NEUTRAL100,
    borderRadius: "0 16px 16px 16px",
    color: "#000",
    marginRight: "auto",
  },
]);

// 사용자 메시지 박스 스타일
export const userMessageBox = style([
  baseMessageBox,
  {
    backgroundColor: "#00A63E",
    borderRadius: "16px 0 16px 16px",
    color: "#fff",
    marginLeft: "auto",
  },
]);
