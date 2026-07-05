"use client";

import { useTranslations } from "next-intl";
import { CONTENT_TYPE_ID_TO_KEY, ContentTypeKey } from "@/constants/contentTypeMap";
import type { ContentType } from "@/types/place";

export function useContentTypeLabel() {
  const t = useTranslations("contentType");

  return (contentType: ContentType | undefined): string => {
    if (!contentType) return "";
    const key = (CONTENT_TYPE_ID_TO_KEY as Record<number, ContentTypeKey>)[contentType.id];
    return key ? t(key) : contentType.name;
  };
}
