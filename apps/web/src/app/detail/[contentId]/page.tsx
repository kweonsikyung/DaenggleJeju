"use client";

// components
import {
  Button,
  Carousel,
  DanglePlay,
  DangleReview,
  EmptyState,
  Modal,
  NavBar,
  TopBar,
} from "daenggle-ui";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";
import { NAV_ITEMS } from "@/constants/navData";
import { useDaengglePlaceRecommendations } from "@/hooks/api/useDaenggle";
import { usePlaceFootprints } from "@/hooks/api/useFootprints";
// hooks
import { usePlaceFullDetail } from "@/hooks/api/usePlaces";
import { usePostScrap } from "@/hooks/api/useScraps";
import { useModal } from "@/hooks/useModal";
import { getRandomAvatar } from "@/utils/getRandomAvatar";
// utils
import { callPhoneNumber, copyToClipboard } from "@/utils/interaction";
import * as s from "./style.css";

const MAX_LENGTH = 200;

/**
 * 장소 상세 페이지 (내부 로직)
 * contentId가 유효할 때만 렌더링
 */
function PlaceDetailClient({ contentId }: { contentId: number }) {
  /** router */
  const router = useRouter();

  /** state */
  const [isBookmarked, setIsBookmarked] = useState(false);
  const {
    isOpen: isInfoUpdateModalOpen,
    openModal: openInfoUpdateModal,
    closeModal: closeInfoUpdateModal,
  } = useModal();

  const [requestText, setRequestText] = useState("");
  const textLength = requestText.length;
  const isButtonActive = textLength >= 10;
  const isError = textLength > MAX_LENGTH;

  // api handler
  const { data, error, mutate } = usePlaceFullDetail({
    contentId: contentId,
  });

  // 이미지 URL 디코딩 및 최종 src 결정 (useMemo)
  const decodedImageSrc = useMemo(() => {
    let url = data?.thumbnail || null;
    if (typeof url === "string" && url.includes("%")) {
      try {
        url = decodeURIComponent(url);
      } catch (_e) {
        url = null;
      }
    }

    if (typeof url === "string" && url !== "사진 없음" && /^https?:\/\//i.test(url)) {
      return url;
    }
    return "/assets/jeju.png";
  }, [data?.thumbnail]);

  // 이미지 로드 실패 시 fallback 처리를 위한 state
  const [currentImageSrc, setCurrentImageSrc] = useState(decodedImageSrc);
  useEffect(() => {
    setCurrentImageSrc(decodedImageSrc);
  }, [decodedImageSrc]);

  const handleImageError = () => {
    setCurrentImageSrc("/assets/jeju.png");
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestText(e.target.value);
  };

  const handleInfoUpdateRequest = () => {
    if (isButtonActive && !isError) {
      closeInfoUpdateModal();
      setRequestText("");
    }
  };

  const { daengglePlaceRecommendationsData: recommendationsData, error: recsError } =
    useDaengglePlaceRecommendations({
      contentId: String(contentId),
      sort: "rank",
      limit: 10,
      offset: 0,
    });

  const {
    placeFootprintsData,
    error: footprintsError,
    isLoading: isFootprintsLoading,
  } = usePlaceFootprints({
    contentId: String(contentId),
    limit: 5,
    offset: 0,
  });

  const { postScrap, isPosting } = usePostScrap();
  const handleScrapToggle = async () => {
    if (isPosting) return;
    try {
      await postScrap({ id: contentId, type: "place" });
      mutate();
    } catch (_e) {
      alert("스크랩 작업에 실패했습니다.");
    }
  };

  const processedNotes = useMemo(() => {
    const defaultNotes = [
      "외출 시 목줄 2m 이내, 공용 공간은 안거나 짧게",
      "동반 조건은 달라질 수 있어, 방문 전 장소에 문의",
    ];

    if (!data?.petPolicy?.notes || data.petPolicy.notes.length < 2 || !data.petPolicy.notes[1]) {
      return defaultNotes;
    }

    const dirtyNote = data.petPolicy.notes[1];
    const bracketIndex = dirtyNote.indexOf("]");
    let cleanNote = "";

    if (bracketIndex !== -1) {
      cleanNote = dirtyNote.substring(bracketIndex + 1).trim();
    } else {
      cleanNote = dirtyNote.trim();
    }

    const additionalNotes = cleanNote
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return [...defaultNotes, ...additionalNotes];
  }, [data?.petPolicy?.notes]);

  /** 발자국 리뷰 통계 계산 useMemo */
  const reviewStats = useMemo(() => {
    const total = placeFootprintsData?.total || 0;

    if (
      !placeFootprintsData ||
      !placeFootprintsData.items ||
      placeFootprintsData.items.length === 0
    ) {
      return { average: 0, rounded: 0, total: total };
    }

    const items = placeFootprintsData.items;
    const sum = items.reduce((acc, item) => acc + item.rating, 0);
    const average = sum / items.length;

    return {
      average: parseFloat(average.toFixed(1)),
      rounded: Math.round(average),
      total: total,
    };
  }, [placeFootprintsData]);

  useEffect(() => {
    if (data) {
      setIsBookmarked(data.isScrapped);
    }
  }, [data]);

  useEffect(() => {
    setCurrentImageSrc(decodedImageSrc);
  }, [decodedImageSrc]);

  return (
    <div className={s.page}>
      <TopBar
        backIconHandler={() => router.back()}
        backIconSrc="/assets/icon24/arrow-left_line.svg"
        rightIcons={[
          {
            icon: (
              <Image
                alt="북마크"
                height={24}
                src={
                  isBookmarked
                    ? "/assets/icon24/bookmark_filled.svg"
                    : "/assets/icon24/bookmark_line.svg"
                }
                width={24}
              />
            ),
            onClick: handleScrapToggle,
          },
        ]}
      />

      <div className={s.container}>
        {error && (
          <EmptyState title="데이터 로드 실패" description="서버와 통신 중 문제가 발생했습니다." />
        )}
        {data && (
          <>
            <section className={s.placeInfoSection}>
              <div className={s.placeHeader}>
                <Image
                  src={currentImageSrc}
                  alt={data.title}
                  width={80}
                  height={80}
                  className={s.placeImage}
                  onError={handleImageError}
                />
                <div className={s.placeDetails}>
                  <div>
                    <h1 className={s.placeName}>{data.title}</h1>
                    <div className={s.placeStats}>
                      <Image
                        alt="play"
                        width={12}
                        height={12}
                        src="/assets/icon12/play_filled.svg"
                      />
                      <span className={s.statText}>0</span>
                      <span className={s.statText}>·</span>
                      <Image
                        alt="bookmark"
                        width={12}
                        height={12}
                        src="/assets/icon12/bookmark_filled.svg"
                      />
                      <span className={s.statText}>{data.scrapCount}</span>
                    </div>
                  </div>
                  <div className={s.infoTagGroup}>
                    {data.chips2.map((tag) => (
                      <div key={tag} className={s.visitChip}>
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {data.chips1.length > 0 && (
                <div className={s.tagGroup}>
                  {data.chips1.map((tag, index) => (
                    <React.Fragment key={`${tag}-${index}`}>
                      <span className={s.tagItem}>{tag}</span>
                      {index < data.chips1.length - 1 && <div className={s.tagDivider} />}
                    </React.Fragment>
                  ))}
                </div>
              )}

              <ul className={s.infoList}>
                <li className={s.infoItem}>
                  <Image
                    alt="location"
                    width={16}
                    height={16}
                    src="/assets/icon12/map_filled.svg"
                  />
                  <span className={s.infoText}>{data.address}</span>
                  <span
                    className={s.infoLink}
                    onClick={() => copyToClipboard(data?.address, "주소가 복사되었습니다.")}
                  >
                    복사
                  </span>
                </li>
                <li className={s.infoItem}>
                  <Image alt="time" width={16} height={16} src="/assets/icon12/clock_filled.svg" />
                  <span className={s.infoText}>{data.openHours}</span>
                </li>
                <li className={s.infoItem}>
                  <Image alt="phone" width={16} height={16} src="/assets/icon12/phone.svg" />
                  <span className={s.infoText}>{data.tel}</span>
                  <span className={s.infoLink} onClick={() => callPhoneNumber(data?.tel)}>
                    전화하기
                  </span>
                  {data.homepage && (
                    <a
                      href={data.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.infoLink}
                    >
                      홈페이지
                    </a>
                  )}
                </li>
              </ul>
            </section>

            <section className={s.section}>
              <div className={s.sectionHeader}>
                <h2 className={s.sectionTitle}>애견 동반 주의 사항</h2>
                <span className={s.sectionActionText} onClick={openInfoUpdateModal}>
                  정보 수정 요청
                </span>
              </div>
              <div className={s.attentionBox}>
                <h4 className={s.attentionTitle}>
                  {data.petPolicy.acmpyTypeCd === "정보없음"
                    ? "반려동물 동반 정책"
                    : data.petPolicy.acmpyTypeCd}
                </h4>
                <ul className={s.attentionList}>
                  {processedNotes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}

        <section className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>연관 댕글 영상 ({recommendationsData?.total || 0})</h2>
          </div>

          {recsError && (
            <EmptyState
              title="데이터 로드 실패"
              description="서버와 통신 중 문제가 발생했습니다."
            />
          )}

          {recommendationsData && recommendationsData.items.length > 0 && (
            <Carousel gap={16} itemWidth={150}>
              {recommendationsData.items.map((item) => (
                <DanglePlay
                  key={item.video_id}
                  type="small"
                  imageUrl={`https://i.ytimg.com/vi/${item.video_id}/hqdefault.jpg`}
                  onClick={() => router.push(`/shorts?contentId=${item.video_id}`)}
                />
              ))}
            </Carousel>
          )}
        </section>

        <section className={s.section}>
          <div className={s.sectionHeader}>
            <h2 className={s.sectionTitle}>
              발자국 인증 ({isFootprintsLoading ? "..." : reviewStats.total})
            </h2>
            <span
              className={s.sectionActionText}
              onClick={() => {
                if (data?.title) {
                  const placeName = encodeURIComponent(data.title);
                  router.push(`/review?contentId=${contentId}&placeName=${placeName}`);
                } else {
                  alert("장소 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
                }
              }}
            >
              발자국 남기기
            </span>
          </div>

          {reviewStats.total > 0 && (
            <div className={s.reviewSummary}>
              <div className={s.reviewRating}>
                <div className={s.pawRatingContainer}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Image
                      key={index}
                      alt={`paw ${index + 1}`}
                      width={24}
                      height={24}
                      src={
                        index < reviewStats.rounded
                          ? "/assets/icon24/dogfootprint-blue.svg"
                          : "/assets/icon24/dogfootprint-white.svg"
                      }
                    />
                  ))}
                </div>
                <span>{isFootprintsLoading ? "..." : reviewStats.average.toFixed(1)}</span>
              </div>
              <p className={s.reviewCount}>{reviewStats.total}개의 평가</p>
            </div>
          )}

          <div className={s.reviewList}>
            {isFootprintsLoading && <div>발자국을 불러오는 중입니다...</div>}
            {footprintsError && (
              <EmptyState
                title="발자국 로드 실패"
                description="리뷰를 불러오는 중 문제가 발생했습니다."
              />
            )}
            {placeFootprintsData && placeFootprintsData.items.length > 0
              ? placeFootprintsData.items.map((review) => (
                  <DangleReview
                    isMine={false}
                    key={review.footprintId}
                    profileImageUrl={getRandomAvatar()}
                    userName={review.writer.pet?.name || "댕글제주"}
                    userSubInfo={
                      `${review.writer.pet?.breedNameKo} · ${review.writer.pet?.sizeLabelKo}` ||
                      "중형견(6~15kg)"
                    }
                    rating={review.rating}
                    filledRatingIconSrc="/assets/icon16/star-fill.svg"
                    date={review.createdAtText}
                    chips={review.chips}
                    chipLabels={["출입 가능 여부", "출입 조건", "반려견 친화도"]}
                    content={review.body}
                  />
                ))
              : !isFootprintsLoading &&
                (!placeFootprintsData || placeFootprintsData.items.length === 0) && (
                  <EmptyState
                    title="첫 발자국을 남겨주세요"
                    description="이 장소에 대한 첫 번째 리뷰를 작성해보세요."
                  />
                )}
          </div>
        </section>
      </div>

      <Modal isOpen={isInfoUpdateModalOpen} onClose={closeInfoUpdateModal} title="정보 수정 요청">
        <div className={s.formContainer}>
          <p className={s.formDescription}>
            제공된 정보는 많은 반려인에게 도움이 됩니다. 감사합니다☺️
            <br />
            *제출된 사항은 검토 후 반영될 예정입니다.
          </p>
          <div className={s.textareaWrapper}>
            <textarea
              className={`${s.textarea} ${isError ? s.textareaError : ""}`}
              placeholder="예) 운영 시간이 오전 9시에서 오후8시로 변경되었어요. (10~200 글자)"
              value={requestText}
              onChange={handleTextChange}
              maxLength={MAX_LENGTH + 1}
            />
            <div className={s.charCountWrapper}>
              {isError && <span className={s.errorText}>{MAX_LENGTH}자 이하로 입력해주세요.</span>}
              <span className={s.charCount}>
                {textLength}/{MAX_LENGTH}
              </span>
            </div>
          </div>
          <Button
            size={ButtonSize.MEDIUM}
            status={isButtonActive && !isError ? ButtonStatus.PRIMARY : ButtonStatus.DISABLED}
            text="요청하기"
            onClick={handleInfoUpdateRequest}
            disabled={!isButtonActive || isError}
            className={s.submitButton}
          />
        </div>
      </Modal>

      <NavBar activeId="near" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
    </div>
  );
}

/**
 * 장소 상세 페이지
 */
export default function DetailPage() {
  /** router */
  const router = useRouter();
  const params = useParams();
  const contentId = params.contentId ? parseInt(params.contentId as string) : null;

  if (contentId === null) {
    return (
      <div className={s.page}>
        <TopBar
          backIconHandler={() => router.back()}
          backIconSrc="/assets/icon24/arrow-left_line.svg"
        />
        <div className={s.container}>
          <EmptyState title="페이지 준비 중" description="정보를 불러오고 있습니다" />
        </div>
        <NavBar activeId="near" items={NAV_ITEMS} onNavigate={(path) => router.push(path)} />
      </div>
    );
  }

  return <PlaceDetailClient contentId={contentId} />;
}
