import { keyframes, style } from "@vanilla-extract/css";

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "-1000px 0",
  },
  "100%": {
    backgroundPosition: "1000px 0",
  },
});

export const skeleton = style({
  display: "inline-block",
  width: "100%",
  height: "100%",
  backgroundColor: "#f0f0f0",
  borderRadius: "4px",
  backgroundImage: "linear-gradient(to right, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)",
  backgroundSize: "2000px 100%",
  backgroundRepeat: "no-repeat",
  animation: `${shimmer} 2s linear infinite`,
});
