"use client";

//components
import {
  BottomSheet,
  Button,
  DanglePlace,
  EmptyState,
  FilterChip,
  FilterSection,
  NavBar,
  SearchHeader,
} from "daenggle-ui";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";
import { NAV_ITEMS } from "@/constants/navData";
//hooks
import { usePlaceList } from "@/hooks/api/usePlaces";
import { GetPlaceListReq } from "@/types/place";
import { DanglePlaceSkeleton } from "@/ui/views/Skeletons/DangleSkeletons";
//utils
import {
  FILTER_CHIP_ID_TO_CONTENT_TYPE_ID,
  FILTER_CHIPS,
  FILTER_OPTION_ID_TO_API_PARAM,
  OPTION_DATA,
} from "../map/_util";
import * as s from "./style.css";

/**
 * 내근처(리스트) 페이지
 * * style/ page = top + container + nav(near) + bottomSheet
 */
export default function ListClientPage() {
  /** router */
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("filter") || "dangle";

  /** state */
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [apiParams, setApiParams] = useState<GetPlaceListReq>({});

  const { data: placeData, isLoading } = usePlaceList(apiParams);

  /** variables */
  const listData = placeData?.items || [];
  const isAnyFilterSelected = Object.values(selectedFilters).some((arr) => arr.length > 0);

  /** filter handler */
  const handleFilterSelect = (group: string, id: string) => {
    setSelectedFilters((prev) => {
      const data = OPTION_DATA.find((d) => d.group === group);
      if (!data) return prev;

      const existing = prev[group] || [];
      const multiSelect = data.multiSelect;

      if (multiSelect) {
        if (existing.includes(id)) {
          return { ...prev, [group]: existing.filter((item) => item !== id) };
        } else {
          return { ...prev, [group]: [...existing, id] };
        }
      } else {
        return { ...prev, [group]: existing.includes(id) ? [] : [id] };
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
  };

  const handleApplyFilters = () => {
    const newApiParams: GetPlaceListReq = {};
    const contentTypeId = FILTER_CHIP_ID_TO_CONTENT_TYPE_ID[activeFilter];
    if (contentTypeId) {
      newApiParams.contentTypeId = contentTypeId;
    } else if (activeFilter !== "dangle") {
      newApiParams.all = true;
    }
    for (const group in selectedFilters) {
      if (selectedFilters[group].length > 0) {
        const paramKey = group as keyof typeof FILTER_OPTION_ID_TO_API_PARAM;
        const paramValues = selectedFilters[group].map(
          (id) =>
            FILTER_OPTION_ID_TO_API_PARAM[paramKey][
              id as keyof (typeof FILTER_OPTION_ID_TO_API_PARAM)[typeof paramKey]
            ]
        );
        (newApiParams as unknown as Record<string, unknown>)[paramKey] = paramValues;
      }
    }
    setApiParams(newApiParams);
    setIsBottomSheetOpen(false);
  };

  useEffect(() => {
    const contentTypeId = FILTER_CHIP_ID_TO_CONTENT_TYPE_ID[activeFilter];
    if (contentTypeId) {
      setApiParams((prev) => ({ ...prev, contentTypeId, all: undefined }));
    } else {
      const { contentTypeId, ...rest } = apiParams;
      setApiParams({ ...rest, all: true });
    }
  }, [activeFilter, apiParams]);

  return (
    <div className={s.page}>
      {/* top */}
      <div className={s.topContainer}>
        <SearchHeader
          backIconHandler={() => router.back()}
          searchFieldProps={{ placeholder: "제주 지역 또는 장소명 검색" }}
        />
        <div className={s.filterWrapper}>
          <div className={s.filterChipsContainer}>
            {FILTER_CHIPS.map((chip) => (
              <FilterChip
                key={chip.id}
                text={chip.text}
                iconUrl={chip.iconUrl}
                selected={activeFilter === chip.id}
                onClick={() => {
                  if (chip.id === "filter") {
                    setIsBottomSheetOpen(true);
                  } else {
                    setActiveFilter(chip.id);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* container */}
      <div className={s.container}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div className={s.cardWrapper} key={`skeleton-${index}`}>
              <DanglePlaceSkeleton />
            </div>
          ))
        ) : listData.length > 0 ? (
          listData.map((item) => (
            <div className={s.cardWrapper} key={item.contentId}>
              <DanglePlace
                thumbnailUrl={item.thumbnail || ""}
                locationCategory={item.metaLine}
                name={item.title}
                distance={item.distanceText}
                playCount={item.daenggleCount}
                bookmarkCount={item.scrapCount}
                tags={[...(item.chips1 || []), ...(item.chips2 || [])]}
                onClick={() => router.push(`/detail/${item.contentId}`)}
              />
            </div>
          ))
        ) : (
          <EmptyState title="결과 없음" description="선택된 필터에 해당하는 장소가 없습니다." />
        )}
      </div>

      {/* nav */}
      <NavBar activeId="near" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />

      {/* bottomSheet */}
      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen} title="필터">
        <div className={s.bottomSheetContent}>
          {OPTION_DATA.map((data) => (
            <FilterSection
              key={data.group}
              title={data.title}
              chips={data.chips}
              multiSelect={data.multiSelect}
              selectedChips={selectedFilters[data.group] || []}
              onChipClick={(chipId: string) => handleFilterSelect(data.group, chipId)}
            />
          ))}
        </div>
        <div className={s.bottomSheetFooter}>
          <Button
            size={ButtonSize.MEDIUM}
            status={ButtonStatus.DEFAULT}
            text="초기화"
            onClick={handleResetFilters}
          />
          <Button
            size={ButtonSize.MEDIUM}
            status={isAnyFilterSelected ? ButtonStatus.ACTIVE : ButtonStatus.DISABLED}
            text="적용"
            onClick={handleApplyFilters}
            disabled={!isAnyFilterSelected}
          />
        </div>
      </BottomSheet>
    </div>
  );
}
