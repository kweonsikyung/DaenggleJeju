"use client";

// components
import { Button, FilterSection, RadioGroup, TextField, TopBar } from "daenggle-ui";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";
// hooks
import { usePostFootprint } from "@/hooks/api/useFootprints";
import { ConditionType, PostFootprintReq, WelcomeScore } from "@/types/footprint";
// utils & data
import { conditionChips, entryOptions, welcomeOptions } from "./_util";
import * as s from "./style.css";

interface PawRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const PawRating = ({ rating, setRating }: PawRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={s.pawRatingContainer}>
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          className={s.pawButton}
          onClick={() => setRating(index)}
          onMouseEnter={() => setHoverRating(index)}
          onMouseLeave={() => setHoverRating(0)}
          type="button"
        >
          <Image
            src={
              (hoverRating || rating) >= index
                ? "/assets/icon24/dogfootprint-blue.svg"
                : "/assets/icon24/dogfootprint-white.svg"
            }
            alt={`paw ${index}`}
            width={32}
            height={32}
          />
        </button>
      ))}
    </div>
  );
};

function LeaveFootprintPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const contentId = searchParams.get("contentId");
  const placeName = searchParams.get("placeName");

  const { createFootprint, isCreating } = usePostFootprint();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0); // 상단 별점
  const [entryStatus, setEntryStatus] = useState<string | null>("allow");
  const [entryDetailText, setEntryDetailText] = useState(""); // 출입 상세
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]); //출입 조건
  const [welcomeStatus, setWelcomeStatus] = useState<number | null>(null); // 환영 지수
  const [bodyText, setBodyText] = useState(""); // 후기 본문

  const handleChipClick = (id: string) => {
    setSelectedConditions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // API 명세에 따른 유효성 검사
  const isEntryDetailValid =
    entryStatus !== "detail" ||
    (entryStatus === "detail" && entryDetailText.length >= 5 && entryDetailText.length <= 20);
  const isBodyValid = bodyText.length >= 5 && bodyText.length <= 500;

  const isFormValid =
    !!welcomeStatus && rating > 0 && isBodyValid && isEntryDetailValid && !!contentId;

  // 제출 핸들러
  const handleSubmit = async () => {
    if (!isFormValid || !contentId || !welcomeStatus) {
      alert("폼을 올바르게 입력해주세요.");
      return;
    }

    if (entryStatus !== "allow" && entryStatus !== "deny" && entryStatus !== "detail") {
      return; // 비정상 상태
    }

    // API 페이로드 생성
    const payload: PostFootprintReq = {
      contentId: parseInt(contentId, 10),
      entryStatus: entryStatus,
      entryStatusDetail: entryStatus === "detail" ? entryDetailText : undefined,
      conditions: selectedConditions as ConditionType[],
      welcome: welcomeStatus as WelcomeScore,
      rating: rating,
      body: bodyText,
    };

    try {
      await createFootprint(payload);
      setIsSubmitted(true);
    } catch (_error) {
      alert("리뷰 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={s.page}>
      <TopBar
        title={isSubmitted ? "" : "발자국 남기기"}
        backIconHandler={() => (isSubmitted ? router.push("/") : router.back())}
        backIconSrc="/assets/icon24/arrow-left_line.svg"
      />
      {isSubmitted ? (
        <>
          <div className={s.successContainer}>
            <Image src="/assets/footprint.png" alt="발자국 인증 완료" width={160} height={160} />
            <h2 className={s.successTitle}>발자국 인증 완료</h2>
            <p className={s.successDescription}>소중한 기록을 함께 나눠주셔서 고마워요!</p>
          </div>
          <div className={s.successFooter}>
            <Button
              text="홈으로 가기"
              status={ButtonStatus.DEFAULT}
              size={ButtonSize.LARGE}
              onClick={() => router.push("/dangle")}
            />
            <Button
              text="작성한 후기 보기"
              status={ButtonStatus.ACTIVE}
              size={ButtonSize.LARGE}
              onClick={() => router.push(`/detail/${contentId}`)}
            />
          </div>
        </>
      ) : (
        <>
          <div className={s.container}>
            {/* Header Section */}
            <div className={s.headerContainer}>
              <div>
                <h2 className={s.headerTitle}>강아지랑 함께하기 어땠나요?</h2>
                <p className={s.headerDescription}>
                  남겨주신 경험은 다른 견주들에게 큰 도움이 돼요!
                </p>
              </div>
              <div>
                <h3 className={s.placeName}>{placeName || "장소 정보 없음"}</h3>
              </div>
              <PawRating rating={rating} setRating={setRating} />
            </div>

            <div className={s.form}>
              <div className={s.formSection}>
                <RadioGroup
                  label="출입 가능 여부"
                  options={entryOptions}
                  selectedValue={entryStatus}
                  onSelect={setEntryStatus}
                />
                {entryStatus === "detail" && (
                  <div className={s.textFieldWrapper}>
                    <TextField
                      placeholder="어디까지 함께 들어갈 수 있었나요?"
                      helperText="최소 5자, 최대 20자"
                      value={entryDetailText}
                      onChange={(e) => setEntryDetailText(e.target.value)}
                      maxLength={20}
                    />
                  </div>
                )}
              </div>

              <div className={s.formSection}>
                <FilterSection
                  title="출입 조건"
                  chips={conditionChips}
                  selectedChips={selectedConditions}
                  onChipClick={handleChipClick}
                  multiSelect
                />
              </div>

              <div className={s.formSection}>
                <RadioGroup
                  label="환영 지수"
                  options={welcomeOptions.map((opt) => ({
                    ...opt,
                    value: String(opt.value),
                  }))}
                  selectedValue={welcomeStatus !== null ? String(welcomeStatus) : null}
                  onSelect={(value) => setWelcomeStatus(parseInt(value, 10))}
                />
              </div>

              <div className={s.formSection}>
                <TextField
                  placeholder="강아지와 함께한 순간이 궁금해요!"
                  helperText="최소 5자, 최대 500자"
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  maxLength={500}
                />
              </div>
            </div>
          </div>
          <div className={s.footer}>
            <Button
              text={isCreating ? "등록 중..." : "작성 완료"}
              status={isFormValid ? ButtonStatus.ACTIVE : ButtonStatus.DISABLED}
              size={ButtonSize.LARGE}
              onClick={handleSubmit}
              disabled={!isFormValid || isCreating}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default function LeaveFootprintPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeaveFootprintPage />
    </Suspense>
  );
}
