import type { ContentType, PlaceItem } from "@/types/place";

export interface PlaceDisplayItem {
  contentId: number;
  title: string;
  thumbnail: string | null;
  locationCategory: string;
  distanceText: string | null;

  isScrapped: boolean;
  scrapCount: number;
  daenggleCount: number;
  chips: string[];
}

export function toPlaceDisplay(
  item: PlaceItem,
  getContentTypeLabel: (ct: ContentType | undefined) => string
): PlaceDisplayItem {
  const typeLabel = getContentTypeLabel(item.contentType);
  const locationCategory = item.metaLine ? `${item.metaLine} · ${typeLabel}` : typeLabel;

  return {
    contentId: item.contentId,
    title: item.title,
    thumbnail: item.thumbnail,
    locationCategory,
    distanceText: item.distanceText,

    isScrapped: item.isScrapped,
    scrapCount: item.scrapCount,
    daenggleCount: item.daenggleCount,
    chips: [...(item.chips1 ?? []), ...(item.chips2 ?? [])],
  };
}
