import { style } from "@vanilla-extract/css";

// Embla 뷰포트
export const embla = style({
  overflow: "hidden", // 네이티브 스크롤 숨김
  width: "100%",
});

// Embla 스크롤 컨테이너
export const embla__container = style({
  display: "flex",
  padding: "16px 0", // 기존 상하 패딩 유지
});

// Embla 슬라이드 아이템
export const embla__slide = style({
  position: "relative",
  flexShrink: 0, // 아이템이 줄어들지 않도록 설정
  minWidth: 0, // flex-basis가 올바르게 작동하도록 설정
});
