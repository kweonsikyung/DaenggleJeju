export const CONTENT_TYPE_ID_TO_KEY = {
  32: "stay",
  39: "restaurant",
  12: "tourist",
  28: "leisure",
  38: "shopping",
} as const satisfies Record<number, string>;

export type ContentTypeKey = (typeof CONTENT_TYPE_ID_TO_KEY)[keyof typeof CONTENT_TYPE_ID_TO_KEY];

export const TAB_ID_TO_CONTENT_TYPE_ID: Record<string, number> = {
  accom: 32,
  restaurant: 39,
  tourist: 12,
  activity: 28,
};
