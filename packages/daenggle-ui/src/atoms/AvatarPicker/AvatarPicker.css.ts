import { style } from "@vanilla-extract/css";

export const wrapper = style({
  position: "relative",
  display: "block",
  width: 94,
  height: 94,
});

export const avatarImg = style({
  width: 94,
  height: 94,
  borderRadius: "9999px",
  objectFit: "cover",
  display: "block",
});

/** 카메라 버튼 (오른쪽 아래) */
export const cameraBtn = style({
  position: "absolute",
  right: -2,
  bottom: -2,
  width: 28,
  height: 28,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
});

/** 스크린리더 전용 숨김 */
export const visuallyHidden = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});
