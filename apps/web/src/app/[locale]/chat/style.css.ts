import { style } from "@vanilla-extract/css";

export const page = style({
  width: "100%",
  height: "100dvh",
  display: "flex",
  flexDirection: "column",
});

export const container = style({
  flex: 1,
  width: "100%",
  overflowY: "auto",
  marginBottom: "20px",
});

export const topBarWithBorder = style({
  borderBottom: "1px solid #F5F5F5",
  boxShadow: "1.8px 0px 6px 0px #0000001A",
});

export const notice_container = style({
  padding: "8px 18px",
});

export const inputWrapper = style({
  width: "100%",
  position: "sticky",
  bottom: 0,
});
