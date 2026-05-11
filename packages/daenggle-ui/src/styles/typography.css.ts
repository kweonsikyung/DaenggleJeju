export const TYPO = {
  DISPLAY: {
    fontFamily: "var(--font-laundry)",
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "-1.2%",
  },

  HEADING1: {
    fontSize: "22px",
    fontWeight: 700,
    lineHeight: "32px",
    letterSpacing: "-1.2%",
  },
  HEADING2: {
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "auto",
    letterSpacing: "0",
  },

  HEADLINE1: {
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "24px",
    letterSpacing: "0",
  },
  HEADLINE2: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "22px",
    letterSpacing: "0",
  },

  BODY1B: {
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "22px",
    letterSpacing: "0",
  },
  BODY1M: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0",
  },

  BODY2B: {
    fontSize: "15px",
    fontWeight: 700,
    lineHeight: "22px",
    letterSpacing: "0",
  },
  BODY2M: {
    fontSize: "15px",
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0",
  },

  BODY3: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "24px",
    letterSpacing: "-1.2%",
  },

  LABEL1B: {
    fontSize: "14px",
    fontWeight: 700,
    lineHeight: "18px",
    letterSpacing: "0",
  },
  LABEL1M: {
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0",
  },
  LABEL1R: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "18px",
    letterSpacing: "0",
  },

  LABEL2B: {
    fontSize: "13px",
    fontWeight: 600,
    lineHeight: "auto",
    letterSpacing: "0",
  },
  LABEL2M: {
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: "auto",
    letterSpacing: "0",
  },

  CAPTION1B: {
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: "16px",
    letterSpacing: "0",
  },
  CAPTION1M: {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "16px",
    letterSpacing: "0",
  },

  CAPTION2B: {
    fontSize: "11px",
    fontWeight: 700,
    lineHeight: "auto",
    letterSpacing: "0",
  },
  CAPTION2M: {
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: "auto",
    letterSpacing: "0",
  },
} as const;

export type TypoKeys = keyof typeof TYPO;
