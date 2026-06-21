"use client";

import { useTranslations } from "next-intl";
import { FILTER_CHIPS } from "@/app/[locale]/map/_util";

type FilterChipId = "dangle" | "stay" | "restaurant" | "travel" | "report";

export function useLocalizedFilterChips() {
  const t = useTranslations("filterChip");

  return FILTER_CHIPS.map((chip) => ({
    ...chip,
    text: chip.id === "filter" ? "" : t(chip.id as FilterChipId),
  }));
}
