import { style, styleVariants } from "@vanilla-extract/css";
import { COLORS } from "@/styles/colors.css";
import { TYPO } from "@/styles/typography.css";

export const root = style({
  width: "100%",
  height: "56px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  cursor: "pointer",
  border: "1px solid transparent",
});

export const icon = style({
  width: "24px",
  height: "24px",
});

export const kind = styleVariants({
  kakao: {
    background: "#FEE102",
    color: "#191600",
    borderColor: "#FEE102",
  },
  naver: {
    background: "#06BE34",
    color: COLORS.NEUTRAL0,
    borderColor: "#06BE34",
  },
  google: {
    background: COLORS.NEUTRAL0,
    color: "#1C1C1C",
    boxShadow: `inset 0 0 0 1px ${COLORS.NEUTRAL200}`,
  },
});

export const label = style({
  ...TYPO.BODY1M,
  lineHeight: "24px",
  textAlign: "left",
});
