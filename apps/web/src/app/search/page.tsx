"use client";

// components
import {
  BottomSheet,
  Button,
  ChipKeyword,
  DanglePlace,
  DanglePlay,
  DangleVideo,
  EmptyState,
  FilterChip,
  FilterSection,
  Grid,
  NavBar,
  SearchHeader,
} from "daenggle-ui";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";
import { NAV_ITEMS } from "@/constants/navData";
import { useDaengglePlacesAll, useDaenggleSearch } from "@/hooks/api/useDaenggle";
// hooks
import { usePlaceList, usePlaceSearch } from "@/hooks/api/usePlaces";
import { usePostScrap } from "@/hooks/api/useScraps";
import type { GetPlaceListReq, GetPlaceSearchReq } from "@/types/place";
import { getRandomAvatar } from "@/utils/getRandomAvatar";
import { extractHashtags, findLocationInfo } from "@/utils/textParsing";
import { getThumbnailUrl } from "../dangle/_util";
// utils and types
import {
  FILTER_CHIPS,
  FILTER_OPTION_ID_TO_API_PARAM,
  getContentTypeIdByChipId,
  OPTION_DATA,
} from "../map/_util";
import * as s from "./style.css";

/**
 * 검색 페이지
 * - 검색 전 UI
 * - 검색 후 UI: isSearchMode가 true일 때, 조건- q(검색어), filter(액티브 칩)
 */
function SearchPageContent() {
  /** router */
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") || "";
  const filterFromUrl = searchParams.get("filter");

  /** state */
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]); //최근검색키워드
  const [searchValue, setSearchValue] = useState(""); //검색어
  const [activeFilter, setActiveFilter] = useState(filterFromUrl || "dangle"); //액티브 필터 칩
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); //바텀시트
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({}); //바텀시트 필터

  // 모드 결정- q 또는 filter가 있으면 isSearchMode로 검색된 결과 노출 ( 검색 후 UI )
  const isSearchMode = !!query || !!filterFromUrl;
  const isFilteredListMode = useMemo(() => !!filterFromUrl && !query, [filterFromUrl, query]);
  const isAnyFilterSelected = Object.values(selectedFilters).some((arr) => arr.length > 0);

  /** API Parameter 생성 로직 */
  const placeSearchReq: GetPlaceSearchReq | undefined = useMemo(() => {
    if (isFilteredListMode || !query || activeFilter === "dangle") {
      return undefined;
    }
    const contentTypeId = getContentTypeIdByChipId(activeFilter);
    return {
      q: query,
      limit: 30,
      all: !contentTypeId,
      contentTypeId,
    };
  }, [query, activeFilter, isFilteredListMode]);

  const placeListReq: GetPlaceListReq | undefined = useMemo(() => {
    if (!isFilteredListMode || activeFilter === "dangle") {
      return undefined;
    }
    const contentTypeId = getContentTypeIdByChipId(activeFilter);
    const newParams: GetPlaceListReq = {
      limit: 30,
      all: !contentTypeId,
      contentTypeId,
    };
    // 바텀시트 필터
    for (const group in selectedFilters) {
      if (selectedFilters[group].length > 0) {
        const paramKey = group as keyof typeof FILTER_OPTION_ID_TO_API_PARAM;
        const paramValues = selectedFilters[group].map(
          (id) =>
            FILTER_OPTION_ID_TO_API_PARAM[paramKey][
              id as keyof (typeof FILTER_OPTION_ID_TO_API_PARAM)[typeof paramKey]
            ]
        );
        (newParams as unknown as Record<string, unknown>)[paramKey as string] = paramValues;
      }
    }
    return newParams;
  }, [activeFilter, isFilteredListMode, selectedFilters]);

  /** api handler */
  const {
    data: placeSearchData,
    error: placeSearchError,
    isLoading: placeSearchIsLoading,
  } = usePlaceSearch(placeSearchReq);

  const {
    data: placeListData,
    error: placeListError,
    isLoading: placeListIsLoading,
  } = usePlaceList(placeListReq);

  const {
    daenggleSearchData,
    error: dangleError,
    isLoading: dangleIsLoading,
  } = useDaenggleSearch(!query ? undefined : { q: query, sort: "rank", limit: 20, offset: 0 });

  const {
    daenggleSearchData: recommendationData,
    isLoading: isRecommendationLoading,
    error: recommendationError,
  } = useDaenggleSearch(
    !isSearchMode ? { q: "추천", sort: "rank", limit: 10, offset: 0 } : undefined
  );
  const {
    daengglePlacesAllData,
    isLoading: isPlacesAllLoading,
    error: PlacesAllError,
  } = useDaengglePlacesAll();

  const { postScrap, isPosting } = usePostScrap();
  const handleScrapToggle = async (contentId: number, currentIsScrapped: boolean) => {
    if (isPosting) return;

    try {
      await postScrap({ id: contentId, type: "place" });

      if (isFilteredListMode) {
        mutate(["/places/list", placeListReq]);
      } else {
        mutate(["/places/search", placeSearchReq]);
      }
    } catch (_e) {
      alert("스크랩 작업에 실패했습니다.");
    }
  };

  // 최종 노출 아이템 결정
  const isLoading =
    placeSearchIsLoading || placeListIsLoading || dangleIsLoading || isPlacesAllLoading;
  const isError = placeSearchError || placeListError || dangleError || PlacesAllError;
  const placeResults = isFilteredListMode
    ? (placeListData?.items ?? [])
    : (placeSearchData?.items ?? []);
  const dangleResults = (query ? daenggleSearchData?.items : daengglePlacesAllData?.items) ?? [];

  /** 필터 핸들러 */
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
    setIsBottomSheetOpen(false);
  };

  /** etc handlers */
  const runSearch = (keyword: string) => {
    const k = keyword.trim();
    if (!k) return;
    router.push(`/search?q=${encodeURIComponent(k)}&filter=dangle`);
    setRecentKeywords((prev) => [k, ...prev.filter((x) => x !== k)].slice(0, 5));
  };
  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") runSearch(searchValue);
  };
  const handleRemoveRecentKeyword = (keyword: string) =>
    setRecentKeywords((prev) => prev.filter((x) => x !== keyword));
  const handleBack = () => router.back();

  /** lifecycle */
  useEffect(() => {
    const stored = localStorage.getItem("recentKeywords");
    if (stored) setRecentKeywords(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentKeywords", JSON.stringify(recentKeywords));
  }, [recentKeywords]);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  useEffect(() => {
    const urlFilter = searchParams.get("filter");
    if (urlFilter) {
      setActiveFilter(urlFilter);
    }
  }, [searchParams]);

  return (
    <div className={s.page}>
      <SearchHeader
        backIconHandler={handleBack}
        searchFieldProps={{
          placeholder: "제주 지역 또는 장소명 검색",
          onChange: (e) => setSearchValue(e.target.value),
          value: searchValue,
          onKeyDown: handleEnterPress,
          onClear: () => setSearchValue(""),
        }}
      />

      <div className={s.container}>
        {isSearchMode && (
          <div className={s.filterChipsContainer}>
            {FILTER_CHIPS.map((chip) => (
              <FilterChip
                key={chip.id}
                {...chip}
                selected={activeFilter === chip.id}
                onClick={() => {
                  if (chip.id === "filter") {
                    setIsBottomSheetOpen(true);
                  } else {
                    router.push(`/search?q=${query}&filter=${chip.id}`);
                    setActiveFilter(chip.id);
                  }
                }}
              />
            ))}
          </div>
        )}

        {!isSearchMode ? (
          <>
            {/* 검색 전 UI */}
            <div className={s.section}>
              <h2 className={s.sectionTitle}>최근검색어</h2>
              {recentKeywords.length ? (
                <div className={s.recentKeywordsWrapper}>
                  {recentKeywords.map((k) => (
                    <ChipKeyword
                      key={k}
                      text={k}
                      selected
                      onClose={() => handleRemoveRecentKeyword(k)}
                      onClick={() => runSearch(k)}
                    />
                  ))}
                </div>
              ) : (
                <div className={s.noHistory}>아직 검색 기록이 없어요.</div>
              )}
            </div>
            {/* <div className={s.section}>
              <h2 className={s.sectionTitle}>바로 찾는 키워드</h2>
              <div className={s.keywordsWrapper}>
                {KEYWORDS.map((k) => (
                  <ChipKeyword key={k} text={k} onClick={() => runSearch(k)} />
                ))}
              </div>
            </div> */}
            <div className={s.section}>
              <h2 className={s.sectionTitle}>이번 주 제주 여기가 뜨겁댕!</h2>
              {isRecommendationLoading && <EmptyState title="추천 장소 로딩 중" />}
              {recommendationError && (
                <EmptyState title="오류 발생" description="추천 장소를 불러오지 못했습니다." />
              )}
              {recommendationData && (
                <div className={s.videoList}>
                  {recommendationData.items.map((item) => {
                    const { cleanTitle, tags } = extractHashtags(item.title);
                    return (
                      <DangleVideo
                        key={item.video_id}
                        thumbnailUrl={getThumbnailUrl(item.video_id)}
                        title={cleanTitle ? cleanTitle : tags.join(" ")}
                        views={item.loveCount}
                        timeAgo={item.published_at}
                        tags={tags}
                        onClick={() => router.push(`/shorts?contentId=${item.video_id}`)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* 검색 후 UI */}
            {isLoading && <EmptyState title="불러오는 중…" description="잠시만 기다려 주세요." />}
            {isError && (
              <EmptyState title="검색 실패" description="서버와 통신 중 문제가 발생했습니다." />
            )}
            {!isLoading && !isError && (
              // 댕글 칩
              <>
                {activeFilter === "dangle" ? (
                  <>
                    {!dangleResults.length ? (
                      <EmptyState
                        title="댕글 영상 결과 없음"
                        description="검색된 댕글 영상이 없습니다."
                      />
                    ) : (
                      <Grid>
                        {dangleResults.map((item, index) => {
                          if ("authorName" in item) {
                            // 쿼리가 있을 때 (검색 결과)
                            const { cleanTitle, tags: extractedTags } = extractHashtags(item.title);
                            const { place: extractedPlace, region: extractedRegion } =
                              findLocationInfo(item.title);

                            // --- 로케이션/주소 추출 시도 ---
                            const finalPlace = extractedPlace || "";
                            const finalRegion = extractedRegion || item.placePill || "제주 전체";
                            // --- 태그 병합 (중복 제거) ---
                            const finalTags = [
                              ...new Set([...extractedTags, ...(item.tags || [])]),
                            ];

                            return (
                              <DanglePlay
                                key={`${item.video_id}-${index}`}
                                type="medium"
                                width="100%"
                                imageUrl={`https://i.ytimg.com/vi/${item.video_id}/hqdefault.jpg`}
                                profileImageUrl={getRandomAvatar()}
                                name={item.authorName}
                                location={finalRegion}
                                address={finalPlace}
                                title={cleanTitle}
                                tags={finalTags}
                                views={item.loveCount || 0}
                                comments={item.scrapCount || 0}
                                timeAgo={item.published_at}
                                onClick={() => router.push(`/shorts?contentId=${item.video_id}`)}
                              />
                            );
                          } else {
                            // 쿼리가 없을 때 (전체 장소)
                            return (
                              <DanglePlay
                                key={`${item.video_id}-${index}`}
                                type="short"
                                width="100%"
                                imageUrl={`https://i.ytimg.com/vi/${item.video_id}/hqdefault.jpg`}
                                location={item.placeTitle}
                                address="제주 전체"
                                onClick={() => {
                                  router.push(`/shorts?contentId=${item.video_id}`);
                                }}
                              />
                            );
                          }
                        })}
                      </Grid>
                    )}
                  </>
                ) : (
                  // 댕글 외 칩
                  <>
                    {!placeResults.length ? (
                      <EmptyState
                        title="검색 결과 없음"
                        description="조건을 변경하거나 다른 검색어로 다시 시도해 보세요."
                      />
                    ) : (
                      <div className={s.grid}>
                        {placeResults.map((item) => {
                          const count = item.scrapCount
                            ? Object.values(item.scrapCount)[0] || 0
                            : 0;

                          return (
                            <DanglePlace
                              key={item.contentId}
                              thumbnailUrl={item.thumbnail}
                              locationCategory={
                                item.metaLine
                                  ? `${item.metaLine} · ${item.contentType?.name ?? ""}`
                                  : (item.contentType?.name ?? "")
                              }
                              name={item.title}
                              distance={item.distanceText}
                              playCount={item.daenggleCount}
                              bookmarkCount={Number(count)}
                              onBookmarkClick={() =>
                                handleScrapToggle(item.contentId, item.isScrapped)
                              }
                              isBookmarked={item.isScrapped}
                              icons={{
                                bookmarkFilled: "/assets/icon24/bookmark_filled.svg",
                                bookmarkLine: "/assets/icon24/bookmark_line.svg",
                              }}
                              tags={[...(item.chips1 || []), ...(item.chips2 || [])]}
                              onClick={() => router.push(`/detail/${item.contentId}`)}
                            />
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
      <NavBar activeId="near" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
      {/* 바텀시트 */}
      <BottomSheet open={isBottomSheetOpen} onOpenChange={setIsBottomSheetOpen} title="필터">
        <div className={s.bottomSheetContent}>
          {OPTION_DATA.map(
            (data: {
              group: string;
              title: string;
              chips: {
                id: string;
                title: string;
              }[];
              multiSelect: boolean;
            }) => (
              <FilterSection
                key={data.group}
                title={data.title}
                chips={data.chips}
                multiSelect={data.multiSelect}
                selectedChips={selectedFilters[data.group] || []}
                onChipClick={(chipId: string) => handleFilterSelect(data.group, chipId)}
              />
            )
          )}
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

/**
 * 검색 페이지 (서버 컴포넌트)
 * 실제 UI 로직은 SearchPageContent에 위임하고,
 * 로딩 상태는 app/search/loading.tsx가 처리합니다.
 */
export default function SearchPage() {
  return <SearchPageContent />;
}
