interface Chips {
  sizes?: string[];
  areas?: string[];
  conditions?: string;
  amenities?: string[];
}

/**
 * chips 객체를 string[]로 정규화
 * @param chips - Chips 객체 또는 null
 * @returns
 */
export const normalizeChipsArray = (chips: Chips | null): string[] => {
  if (!chips) {
    return [];
  }

  const sizes = chips.sizes || [];
  const areas = chips.areas || [];
  const amenities = chips.amenities || [];

  const conditions =
    chips.conditions && chips.conditions !== "정보없음"
      ? chips.conditions.split(",").map((item) => item.trim())
      : [];

  return [...sizes, ...areas, ...conditions, ...amenities];
};
