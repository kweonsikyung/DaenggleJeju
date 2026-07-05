import { recipe } from "@vanilla-extract/recipes";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    padding: "3px 8px",
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 700,
    lineHeight: 1,
  },
  variants: {
    variant: {
      ok:      { background: "#E3FFEE", color: "#0E6F36" },
      warning: { background: "#FFF8E1", color: "#B45309" },
      error:   { background: "#FFF0F0", color: "#C0392B" },
      info:    { background: "#F2FFD0", color: "#5A7619" },
      neutral: { background: "#ECECEC", color: "#4C4C4C" },
    },
  },
});
