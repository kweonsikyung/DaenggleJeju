"use client";

import {
  BottomSheet,
  Button,
  DanglePlace,
  FilterChip,
  FilterSection,
  LoadingSpinner,
  MapFloatingButtons,
  NavBar,
  SearchHeader,
  WelcomeOverlay,
} from "daenggle-ui";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";
import { NAV_ITEMS } from "@/constants/navData";
import { useDaengglePlacesMap } from "@/hooks/api/useDaenggle";
import { usePlaceMap } from "@/hooks/api/usePlaces";
import { usePostScrap } from "@/hooks/api/useScraps";
import { useKakaoMap } from "@/hooks/useKakaoMap";
import { useLocationStore } from "@/stores/locationStore";
import { GetPlaceMapReq, PlaceItem } from "@/types/place";
import {
  FILTER_CHIP_ID_TO_CONTENT_TYPE_ID,
  FILTER_CHIPS,
  FILTER_OPTION_ID_TO_API_PARAM,
  JEJU_BBOX,
  MARKER_IMAGES,
  OPTION_DATA,
} from "./_util";
import * as s from "./style.css";

const LOCAL_STORAGE_KEY = "hasVisitedMap";

/**
 * 내근처(지도) 페이지
 * * style/ page = top(absolute) + map + bottom(absolute) + nav(near) + bottomheet
 */
export default function MapPage() {
  /** router */
  const router = useRouter();

  /** state */
  const [activeFilter, setActiveFilter] = useState("dangle");
  const [selectedPlace, setSelectedPlace] = useState<PlaceItem | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [apiParams, setApiParams] = useState<GetPlaceMapReq>({
    bbox: JEJU_BBOX,
  });
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [showDanglePickTooltip, setShowDanglePickTooltip] = useState(true);
  const [showGpsToast, setShowGpsToast] = useState(false);

  /** data fetching */
  const { data: placeData, isLoading: isPlaceLoading } = usePlaceMap(
    activeFilter !== "dangle" ? apiParams : { bbox: "" }
  );
  const { daengglePlacesMapData, isLoading: isDaenggleLoading } = useDaengglePlacesMap(
    activeFilter === "dangle" ? {} : undefined
  );

  const isLoading = isPlaceLoading || isDaenggleLoading;

  const places = useMemo(() => placeData?.items || [], [placeData]);
  const daenggleData = useMemo(() => daengglePlacesMapData, [daengglePlacesMapData]);

  const { postScrap, isPosting } = usePostScrap();

  /** Map Hook */
  const handlePlaceSelect = useCallback((place: PlaceItem | null) => {
    setSelectedPlace(place);
  }, []);

  const handleDangleClick = useCallback(
    (videoId: string | number) => {
      router.push(`/shorts?contentId=${videoId}`);
    },
    [router]
  );

  const { mapContainerRef, centerToJeju, map } = useKakaoMap({
    places: places, // Memoized 'places'
    daengglePlaces: daenggleData, // Memoized 'daenggleData'
    activeFilter: activeFilter,
    onPlaceSelect: handlePlaceSelect,
    onDangleClick: handleDangleClick,
    markerImages: MARKER_IMAGES,
  });

  const handleGpsClick = () => {
    if (map && window.kakao) {
      const jejuCenter = new window.kakao.maps.LatLng(33.3846, 126.5535);
      const zoomLevel = 10;

      map.setLevel(zoomLevel);
      map.panTo(jejuCenter);
    } else {
      centerToJeju();
    }

    setShowGpsToast(true);
    setTimeout(() => {
      setShowGpsToast(false);
    }, 3000);
  };
  const {
    fetchLocation,
    latitude,
    longitude,
    isLoading: isLocationLoading,
    error: locationError,
  } = useLocationStore();

  /** Scrap handler */
  const handleScrapToggle = async (_contentId: number) => {
    if (isPosting || !selectedPlace) return;

    try {
      await postScrap({ id: _contentId, type: "place" });

      setSelectedPlace((prevPlace) => {
        if (!prevPlace) return null;

        const newIsScrapped = !prevPlace.isScrapped;
        const newScrapCount = newIsScrapped ? prevPlace.scrapCount + 1 : prevPlace.scrapCount - 1;

        return {
          ...prevPlace,
          isScrapped: newIsScrapped,
          scrapCount: newScrapCount,
        };
      });

      mutate(["/places/map", apiParams]);
    } catch (_e) {
      alert("스크랩 작업에 실패했습니다.");
    }
  };

  /** filter state helpers */
  const isAnyFilterSelected = Object.values(selectedFilters).some((arr) => arr.length > 0);

  /** filter handlers */
  const handleFilterSelect = (group: string, id: string) => {
    setSelectedFilters((prev) => {
      const existing = prev[group] || [];
      const multiSelect = OPTION_DATA.find((d) => d.group === group)?.multiSelect;

      if (multiSelect) {
        return {
          ...prev,
          [group]: existing.includes(id)
            ? existing.filter((item) => item !== id)
            : [...existing, id],
        };
      } else {
        return { ...prev, [group]: existing.includes(id) ? [] : [id] };
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
  };

  const handleApplyFilters = () => {
    setApiParams((prev) => {
      const newParams: GetPlaceMapReq = { bbox: JEJU_BBOX };
      const contentTypeId = FILTER_CHIP_ID_TO_CONTENT_TYPE_ID[activeFilter];
      if (contentTypeId) {
        newParams.contentTypeId = contentTypeId;
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
          (newParams as unknown as Record<string, unknown>)[paramKey] = paramValues;
        }
      }
      return newParams;
    });
    setIsBottomSheetOpen(false);
  };

  /** navigation handlers */
  const handleLocationListClick = () => {
    router.push(`/search?filter=${activeFilter}`);
  };

  const handleDangleRecommendClick = () => {
    router.push("/dangle");
  };

  /** lifecycle */
  useEffect(() => {
    const hasVisited = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!hasVisited) {
      setShowWelcomeOverlay(true);
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    }
  }, []);

  useEffect(() => {
    setApiParams((prev) => {
      const newParams = { ...prev, bbox: JEJU_BBOX };
      const contentTypeId = FILTER_CHIP_ID_TO_CONTENT_TYPE_ID[activeFilter];
      if (contentTypeId) {
        newParams.contentTypeId = contentTypeId;
      } else {
        delete newParams.contentTypeId;
      }
      return newParams;
    });
    setSelectedPlace(null);
  }, [activeFilter]);

  const totalCount = activeFilter === "dangle" ? daenggleData?.length || 0 : placeData?.total || 0;

  return (
    <div className={s.page}>
      {isLoading && <LoadingSpinner />}

      {showGpsToast && (
        <div className={s.gpsToast}>현재 위치는 제주 밖이에요. 제주로 안내해드릴게요.</div>
      )}

      {/* top */}
      <div className={s.topContainer}>
        <SearchHeader
          onClick={() => router.push("/search")}
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

      {/* map */}
      <div id="map" ref={mapContainerRef} className={s.mapWrapper}></div>
      {selectedPlace && (
        <div className={s.placeCardContainer}>
          <DanglePlace
            thumbnailUrl={selectedPlace.thumbnail}
            locationCategory={
              selectedPlace.metaLine
                ? `${selectedPlace.metaLine} · ${selectedPlace.contentType?.name ?? ""}`
                : (selectedPlace.contentType?.name ?? "")
            }
            name={selectedPlace.title}
            distance={selectedPlace.distanceText}
            playCount={selectedPlace.daenggleCount}
            bookmarkCount={selectedPlace.scrapCount}
            tags={[...(selectedPlace.chips1 || []), ...(selectedPlace.chips2 || [])]}
            onClick={() => router.push(`/detail/${selectedPlace.contentId}`)}
            onBookmarkClick={() => handleScrapToggle(selectedPlace.contentId)}
            isBookmarked={selectedPlace.isScrapped}
            icons={{
              bookmarkFilled: "/assets/icon24/bookmark_filled.svg",
              bookmarkLine: "/assets/icon24/bookmark_line.svg",
            }}
          />
        </div>
      )}

      {/* bottom */}
      <div className={s.bottomContainer}>
        <MapFloatingButtons
          onGpsClick={handleGpsClick}
          gpsIconSrc="/assets/icon24/gps.svg"
          chipMapListProps={{
            text: "장소 목록",
            cnt: totalCount,
            onLocationListClick: handleLocationListClick,
          }}
          fabProps={{ onClick: handleDangleRecommendClick, imageSrc: "/assets/map/fab.svg" }}
          tooltipProps={{
            title: "댕글제주 PICK!",
            text: "제주의 다양한 영상을 지역, 테마, 인기별로 발견해보세요.",
            onClose: () => setShowDanglePickTooltip(false),
            isVisible: showDanglePickTooltip,
            position: "top",
          }}
        />
      </div>

      {/* nav */}
      <NavBar activeId="near" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />

      {/* WelcomeOverlay 컴포넌트 */}
      {showWelcomeOverlay && (
        <WelcomeOverlay
          logoImageSrc="/assets/footprint.png"
          logoAlt="댕글제주"
          title="🎉 환영합니다"
          subtitle="댕댕이와 함께할 여행을 준비하고 있어요"
          steps={["반려동물 정보 분석 중", "여행 취향 분석 중", "위치 정보 확인 중(선택)"]}
          ctaText="댕글제주 탐색하기"
          loadingText="위치 찾는 중..."
          onFetchLocation={fetchLocation}
          latitude={latitude}
          longitude={longitude}
          isLoading={isLocationLoading}
          error={locationError}
        />
      )}

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
