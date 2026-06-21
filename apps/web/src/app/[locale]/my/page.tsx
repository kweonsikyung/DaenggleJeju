"use client";

//components
import {
  DanglePlace,
  DanglePlay,
  DangleReview,
  EmptyState,
  Grid,
  NavBar,
  ProfileCard,
  SegmentedControl,
  Tabs,
  TopBar,
} from "daenggle-ui";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { TAB_ID_TO_CONTENT_TYPE_ID } from "@/constants/contentTypeMap";
import { useContentTypeLabel } from "@/hooks/useContentTypeLabel";
import { NAV_ITEMS } from "@/constants/navData";
import { useMyFootprints } from "@/hooks/api/useFootprints";
import { usePetProfileList } from "@/hooks/api/usePetProfile";
import { useScrapList } from "@/hooks/api/useScraps";
import { ScrapDangleItem, ScrapPlaceItem } from "@/types/scrap";
import { getRandomAvatar } from "@/utils/getRandomAvatar";
import { extractHashtags } from "@/utils/textParsing";
//utils and hooks
import { emptyStateContent, subTabs } from "./_util";
import * as s from "./style.css";

/**
 * 마이 페이지
 * * style/ page = topbar + container + nav(my)
 */
export default function Page() {
  /** router */
  const router = useRouter();

  const tMy = useTranslations("my");
  const getContentTypeLabel = useContentTypeLabel();

  const localizedMainTabs = useMemo(
    () => [
      { id: "saved", label: tMy("mainTabs.saved") },
      { id: "footprint", label: tMy("mainTabs.footprint") },
    ],
    [tMy],
  );

  const localizedSubTabs = useMemo(
    () =>
      subTabs.map((tab) => ({
        ...tab,
        label: tMy(`subTabs.${tab.id}` as Parameters<typeof tMy>[0]),
      })),
    [tMy],
  );

  /** state */
  const [activeMainTab, setActiveMainTab] = useState("saved");
  const [activeSubTab, setActiveSubTab] = useState("dangle");

  const { petProfileList, isLoading: isPetProfileLoading } =
    usePetProfileList();
  const myPet = petProfileList?.at(-1);

  const scrapType = activeSubTab === "dangle" ? "daenggle" : "place";
  const { scrapData, isLoading: isScrapsLoading } = useScrapList(
    activeMainTab === "saved"
      ? {
          type: scrapType,
          limit: 50,
        }
      : undefined,
  );

  const {
    myFootprintsData,
    isLoading: isFootprintsLoading,
    error: footprintsError,
  } = useMyFootprints(
    activeMainTab === "footprint" ? { limit: 50 } : undefined,
  );

  const filteredItems = useMemo(() => {
    if (activeMainTab !== "saved" || !scrapData?.items) return [];

    if (activeSubTab === "dangle") {
      return scrapData.items as ScrapDangleItem[];
    }
    const targetTypeId = TAB_ID_TO_CONTENT_TYPE_ID[activeSubTab];
    return (scrapData.items as ScrapPlaceItem[]).filter(
      (item) => item.contentType?.id === targetTypeId,
    );
  }, [scrapData, activeSubTab, activeMainTab]);

  const detailsString = [
    myPet?.breedNameKo,
    myPet?.sizeLabelKo,
    myPet?.ageYears ? `${myPet.ageYears}살` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const currentEmptyState =
    emptyStateContent[activeMainTab as keyof typeof emptyStateContent];

  return (
    <div className={s.page}>
      <TopBar backIconHandler={() => router.back()} title="마이댕글" />
      <div className={s.container}>
        <div className={s.contentWrapper}>
          {isPetProfileLoading ? (
            <div>프로필 로딩 중...</div>
          ) : myPet ? (
            <ProfileCard
              imageUrl="/assets/dangle/dog.png"
              name={myPet.name}
              description="견주님"
              details={detailsString}
              onEditClick={() => router.push("/curation")}
            />
          ) : (
            <ProfileCard
              name="반려견 없음"
              description="프로필을 등록해주세요."
              imageUrl={getRandomAvatar()}
              details="내 반려견을 동록하고 맞춤형 정보를 받아볼 수 있어요!"
              onEditClick={() => router.push("/curation")}
            />
          )}

          <SegmentedControl
            options={localizedMainTabs}
            activeOption={activeMainTab}
            onSelect={setActiveMainTab}
          />
        </div>

        {activeMainTab === "saved" && (
          <>
            <Tabs
              tabs={localizedSubTabs}
              activeTab={activeSubTab}
              onTabClick={setActiveSubTab}
            />
            <div className={s.listContainer}>
              {isScrapsLoading ? (
                <p>스크랩 목록을 불러오는 중입니다...</p>
              ) : filteredItems.length === 0 ? (
                <EmptyState
                  imageUrl={currentEmptyState.imageUrl}
                  title={currentEmptyState.title}
                  description={currentEmptyState.description}
                />
              ) : activeSubTab === "dangle" ? (
                <Grid>
                  {(filteredItems as ScrapDangleItem[]).map((item, index) => {
                    const { cleanTitle, tags } = extractHashtags(item.title);
                    return (
                      <DanglePlay
                        key={`${item.videoId}-${index}`}
                        type="medium"
                        width="100%"
                        imageUrl={item.thumbnailUrl}
                        profileImageUrl={getRandomAvatar()}
                        name={item.channelTitle}
                        title={cleanTitle}
                        tags={tags}
                        onClick={() =>
                          router.push(`/shorts?contentId=${item.videoId}`)
                        }
                      />
                    );
                  })}
                </Grid>
              ) : (
                <div className={s.placeList}>
                  {(filteredItems as ScrapPlaceItem[]).map((item) => (
                    <DanglePlace
                      key={item.contentId}
                      thumbnailUrl={item.thumbnail || ""}
                      locationCategory={
                        item.metaLine || getContentTypeLabel(item.contentType)
                      }
                      name={item.title}
                      distance={item.distanceText}
                      tags={item.chips}
                      onClick={() => router.push(`/detail/${item.contentId}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeMainTab === "footprint" && (
          <div className={s.listContainer}>
            {isFootprintsLoading ? (
              <p>발자국 목록을 불러오는 중입니다...</p>
            ) : footprintsError ? (
              <EmptyState
                title="오류 발생"
                description="발자국 목록을 불러오지 못했습니다."
              />
            ) : !myFootprintsData || myFootprintsData.items.length === 0 ? (
              <EmptyState
                imageUrl={currentEmptyState.imageUrl}
                title={currentEmptyState.title}
                description={currentEmptyState.description}
              />
            ) : (
              <div className={s.placeList}>
                {myFootprintsData.items.map((item) => (
                  <DangleReview
                    isMine={true}
                    key={item.footprintId}
                    locationCategory={
                      item.metaLine || getContentTypeLabel(item.contentType)
                    }
                    placeName={item.title}
                    rating={item.rating}
                    date={item.createdAtText}
                    chips={item.chips}
                    chipLabels={[
                      "출입 가능 여부",
                      "출입 조건",
                      "반려견 친화도",
                    ]}
                    content={item.body}
                    onClick={() => router.push(`/detail/${item.contentId}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav */}
      <NavBar
        activeId="my"
        items={NAV_ITEMS}
        onNavigate={(path) => router.push(path)}
      />
    </div>
  );
}
