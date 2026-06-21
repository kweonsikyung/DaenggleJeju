import { CONTENT_TYPE_ID_TO_KEY, ContentTypeKey } from "@/constants/contentTypeMap";

export function getContentTypeKey(id: number): ContentTypeKey | null {
  return (CONTENT_TYPE_ID_TO_KEY as Record<number, ContentTypeKey>)[id] ?? null;
}
