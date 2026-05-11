"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { Swiper as SwiperCore } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

//components
import { Dropdown, EmptyState, NavBar, ShortsBottomInfo, ShortsOverlay, TopBar } from "daenggle-ui";
import { NAV_ITEMS } from "@/constants/navData";
//hooks
import {
  useDaenggleAccommodations,
  useDaenggleConcepts,
  useDaenggleRegions,
  useDaenggleTrending,
} from "@/hooks/api/useDaenggle";
//utils
import { DaenggleConceptKey, DaenggleContextId } from "@/types/daenggle";
import { VideoData } from "@/utils/dummyData";
import { formatApiVideoToLocal, JEJU_REGIONS } from "./_util";
import * as s from "./style.css";

/** type (related YOUTUBE) */
declare global {
  interface Window {
    YT?: { Player: new (el: string, opts: YT.PlayerOptions) => YT.Player };
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace YT {
  export interface Player {
    playVideo: () => void;
    pauseVideo: () => void;
    destroy: () => void;
    getIframe: () => HTMLIFrameElement;
  }
  export interface PlayerOptions {
    height: string;
    width: string;
    videoId: string;
    playerVars?: {
      autoplay?: 0 | 1;
      mute?: 0 | 1;
      controls?: 0 | 1;
      playsinline?: 0 | 1;
      loop?: 0 | 1;
    };
    events?: {
      onReady?: (event: { target: YT.Player }) => void;
      onStateChange?: (event: { data: number }) => void;
    };
  }
}

/**
 * 영상 재생 래퍼 및 재생 페이지
 */
function ShortsPageContent() {
  /** router */
  const searchParams = useSearchParams();
  const router = useRouter();

  const contentId = searchParams.get("contentId") as string | null;
  const contextId = searchParams.get("contextId") as DaenggleContextId | null;
  const conceptKey = searchParams.get("conceptKey") as DaenggleConceptKey | null;
  const listType = searchParams.get("listType");
  const startIndex = parseInt(searchParams.get("startIndex") || "0", 10);

  /** state */
  const [isStarted, setIsStarted] = useState(!!contentId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(startIndex);
  const playerRef = useRef<YT.Player | null>(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [videoStates, setVideoStates] = useState<{
    [videoId: string]: { liked: boolean; saved: boolean };
  }>({});

  /** api handler */
  const {
    daenggleRegionsData,
    isLoading: regionsLoading,
    error: regionsError,
  } = useDaenggleRegions(contextId ? { contextId, sort: "rank", limit: 20, offset: 0 } : undefined);

  const {
    daenggleConceptsData,
    isLoading: conceptsLoading,
    error: conceptsError,
  } = useDaenggleConcepts(
    conceptKey ? { conceptKeys: [conceptKey], limitPerConcept: 8 } : undefined
  );

  const {
    daenggleAccommodationsData,
    isLoading: accomLoading,
    error: accomError,
  } = useDaenggleAccommodations(
    listType === "accommodations" ? { sort: "rank", limit: 10, offset: 0 } : undefined
  );

  const {
    daenggleTrendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useDaenggleTrending(
    listType === "trending" ? { sort: "views", days: 90, limit: 10, offset: 0 } : undefined
  );

  /** utils */
  const formattedVideos = useMemo<VideoData[]>(() => {
    if (contentId) {
      return [
        {
          id: contentId,
          loc: "",
          videoId: contentId,
          thumbnailUrl: `https://i.ytimg.com/vi/${contentId}/hqdefault.jpg`,
          profileImageUrl: "",
          userName: "",
          description: "",
          tags: [],
          bookmarks: 0,
          comments: 0,
          likes: 0,
        },
      ];
    }
    if (contextId && daenggleRegionsData?.items) {
      return daenggleRegionsData.items.map(formatApiVideoToLocal);
    }
    if (conceptKey && daenggleConceptsData?.shelves) {
      const shelf = daenggleConceptsData.shelves.find((s) => s.key === conceptKey);
      if (shelf?.items) return shelf.items.map(formatApiVideoToLocal);
    }
    if (listType === "accommodations" && daenggleAccommodationsData?.items) {
      return daenggleAccommodationsData.items.map(formatApiVideoToLocal);
    }
    if (listType === "trending" && daenggleTrendingData?.items) {
      return daenggleTrendingData.items.map(formatApiVideoToLocal);
    }
    return [];
  }, [
    contentId,
    contextId,
    conceptKey,
    listType,
    daenggleRegionsData,
    daenggleConceptsData,
    daenggleAccommodationsData,
    daenggleTrendingData,
  ]);

  /** lifecycle */
  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!isStarted || !window.YT?.Player) return;

    playerRef.current?.destroy();

    const currentVideo = formattedVideos[activeSlideIndex];
    if (!currentVideo) return;

    const player = new window.YT.Player(`player-${currentVideo.videoId}`, {
      height: "100%",
      width: "100%",
      videoId: currentVideo.videoId,
      playerVars: {
        autoplay: 1,
        mute: 0,
        controls: 0,
        playsinline: 1,
        loop: 0,
      },
      events: {
        onReady: (event) => {
          event.target.playVideo();
          setIsPlaying(true);
        },
        onStateChange: (event) => {
          if (event.data === 0 && !contentId) {
            swiperRef.current?.slideNext();
          }
        },
      },
    });
    playerRef.current = player;

    return () => {
      player.destroy();
    };
  }, [isStarted, activeSlideIndex, formattedVideos, contentId]);

  useEffect(() => {
    if (!isStarted || !playerRef.current?.playVideo) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying, isStarted]);

  /** loading */
  const isLoading =
    !contentId && (regionsLoading || conceptsLoading || accomLoading || trendingLoading);
  const anyError = regionsError || conceptsError || accomError || trendingError;
  const currentVideo = formattedVideos[activeSlideIndex] || formattedVideos[0];

  if (isLoading) {
    return (
      <div className={s.page}>
        <EmptyState title="로딩 중" description="잠시만 기다려 주세요." />
        <NavBar activeId="dangle" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
      </div>
    );
  }

  if (anyError || formattedVideos.length === 0 || !currentVideo) {
    return (
      <div className={s.page}>
        <EmptyState title="에러 발생" description="잠시 후 다시 시도해주세요" />
        <NavBar activeId="dangle" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
      </div>
    );
  }

  /** event handler */
  const handleStartPlaying = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStarted(true);
  };

  const handleTogglePlay = () => {
    if (isStarted) {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleRegionChange = (newContextId: string) => {
    router.push(`/shorts?contextId=${newContextId}`);
  };
  const formatNumber = (num: number) => num.toLocaleString();

  const handleToggleLike = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    setVideoStates((prev) => ({
      ...prev,
      [videoId]: { ...prev[videoId], liked: !prev[videoId]?.liked },
    }));
  };

  const handleToggleSave = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    setVideoStates((prev) => ({
      ...prev,
      [videoId]: { ...prev[videoId], saved: !prev[videoId]?.saved },
    }));
  };

  /** render */
  const TopBarSection = () => (
    <div className={s.topSection} onClick={(e) => e.stopPropagation()}>
      <TopBar
        transparent
        whiteIcon
        backIconHandler={() => router.back()}
        backIconSrc="/assets/icon24/arrow-left_line.svg"
        rightIcons={[
          {
            icon: <Image alt="검색" height={24} src="/assets/icon16/search_line.svg" width={24} />,
            onClick: () => router.push("/search"),
          },
        ]}
      />
      {contextId && (
        <div className={s.dropdownWrapper}>
          <Dropdown
            options={JEJU_REGIONS}
            selectedValue={contextId}
            onSelect={handleRegionChange}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    // 시작 전 UI
    if (!isStarted) {
      const firstVideo = formattedVideos[startIndex];
      if (!firstVideo) return null;

      const isFirstVideoSaved = videoStates[firstVideo.videoId]?.saved ?? false;
      const isFirstVideoLiked = videoStates[firstVideo.videoId]?.liked ?? false;

      return (
        <div className={s.container}>
          <div
            className={s.staticThumbnail}
            style={{ backgroundImage: `url(${firstVideo.thumbnailUrl})` }}
          />
          <ShortsOverlay>
            <div className={s.topGradient} />
            <div className={s.bottomGradient} />
            <TopBarSection />

            <div className={s.sideActions}>
              <button
                className={s.actionButton}
                onClick={(e) => handleToggleSave(e, firstVideo.videoId)}
              >
                <Image
                  src={
                    isFirstVideoSaved ? "/assets/video/save-active.svg" : "/assets/video/save.svg"
                  }
                  alt="Save"
                  width={40}
                  height={40}
                />
                <span>{formatNumber(firstVideo.bookmarks + (isFirstVideoSaved ? 1 : 0))}</span>
              </button>
              <button
                className={s.actionButton}
                onClick={(e) => handleToggleLike(e, firstVideo.videoId)}
              >
                <Image
                  src={
                    isFirstVideoLiked ? "/assets/video/heart-active.svg" : "/assets/video/heart.svg"
                  }
                  alt="Like"
                  width={40}
                  height={40}
                />
                <span>{formatNumber((firstVideo.likes ?? 0) + (isFirstVideoLiked ? 1 : 0))}</span>
              </button>
            </div>
            <div className={s.bottom}>
              <ShortsBottomInfo video={firstVideo} />
            </div>
          </ShortsOverlay>
          <div className={s.playButtonContainer} onClick={handleStartPlaying}>
            <Image
              src={"/assets/icon56/play-btn.svg"}
              alt="Play Video"
              width={80}
              height={80}
              className={s.playIcon}
            />
          </div>
        </div>
      );
    }

    // 시작 후 UI
    return (
      <div className={s.container}>
        <Swiper
          direction="vertical"
          className={s.swiperContainer}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveSlideIndex(swiper.activeIndex);
            setIsPlaying(true);
          }}
          initialSlide={startIndex}
        >
          {formattedVideos.map((video, index) => {
            const isCurrentVideoSaved = videoStates[video.videoId]?.saved ?? false;
            const isCurrentVideoLiked = videoStates[video.videoId]?.liked ?? false;
            return (
              <SwiperSlide key={video.videoId} className={s.swiperSlide} onClick={handleTogglePlay}>
                <div id={`player-${video.videoId}`} className={s.playerBackground} />

                {index === activeSlideIndex && (
                  <>
                    <ShortsOverlay>
                      <div className={s.topGradient} />
                      <div className={s.bottomGradient} />
                      <TopBarSection />
                      {!contentId && (
                        <>
                          <div className={s.sideActions}>
                            <button
                              className={s.actionButton}
                              onClick={(e) => handleToggleSave(e, video.videoId)}
                            >
                              <Image
                                src={
                                  isCurrentVideoSaved
                                    ? "/assets/video/save-active.svg"
                                    : "/assets/video/save.svg"
                                }
                                alt="Save"
                                width={40}
                                height={40}
                              />
                              <span>
                                {formatNumber(video.bookmarks + (isCurrentVideoSaved ? 1 : 0))}
                              </span>
                            </button>
                            <button
                              className={s.actionButton}
                              onClick={(e) => handleToggleLike(e, video.videoId)}
                            >
                              <Image
                                src={
                                  isCurrentVideoLiked
                                    ? "/assets/video/heart-active.svg"
                                    : "/assets/video/heart.svg"
                                }
                                alt="Like"
                                width={40}
                                height={40}
                              />
                              <span>
                                {formatNumber((video.likes ?? 0) + (isCurrentVideoLiked ? 1 : 0))}
                              </span>
                            </button>
                          </div>
                          <div className={s.bottom}>
                            <ShortsBottomInfo video={video} />
                          </div>
                        </>
                      )}
                    </ShortsOverlay>

                    {!isPlaying && (
                      <div
                        className={s.playButtonContainer}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlay();
                        }}
                      >
                        <Image
                          src={"/assets/icon56/play-btn.svg"}
                          alt="Play Video"
                          width={80}
                          height={80}
                          className={s.playIcon}
                        />
                      </div>
                    )}
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  };

  return (
    <div className={s.page}>
      {renderContent()}
      <NavBar activeId="dangle" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
    </div>
  );
}

/**
 * 영상 재생
 */
export default function ShortsPage() {
  const FallbackUI = (
    <div className={s.page}>
      <EmptyState title="로딩 중" description="잠시만 기다려 주세요." />
      <NavBar activeId="dangle" items={NAV_ITEMS} onNavigate={() => {}} />
    </div>
  );
  return (
    <Suspense fallback={FallbackUI}>
      <ShortsPageContent />
    </Suspense>
  );
}
