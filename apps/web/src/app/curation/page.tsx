"use client";

import { Button, TopBar } from "daenggle-ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";
import { usePostPetProfile } from "@/hooks/api/usePetProfile";
import { usePostPreference } from "@/hooks/api/usePreference";
import { RegionContextId, StyleCode } from "@/types/preference";
import {
  BREED_OPTIONS,
  currentStepTitle,
  JEJU_OVERALL_ID,
  REGION_ID_TO_CODE_MAP,
  STYLE_LABEL_TO_CODE_MAP,
  WEIGHT_OPTIONS,
} from "./_util";
import * as s from "./style.css";
import Step1 from "./ui/step1";
import Step2 from "./ui/step2";
import Step3 from "./ui/step3";

/**
 * curation 질문 페이지
 * * style/ page = topbar + container + footer(btn)
 */
export default function Curation() {
  /** form state */
  const [step, setStep] = useState<number>(1);
  const [isStepValid, setIsStepValid] = useState<boolean>(false);

  //step 1,2,3 form data
  const [_avatarFile, setAvatarFile] = useState<File | null>(null);
  const [petProfileData, setPetProfileData] = useState({
    name: "",
    breed: "",
    weight: "",
  });
  const [selectedRegions, setSelectedRegions] = useState<number[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  /** router */
  const router = useRouter();

  /** API Mutations (SWR) */
  const { createPetProfile, isCreating: isPetProfileSaving } = usePostPetProfile();
  const { savePreference, isSaving: isPreferenceSaving } = usePostPreference();
  const isSaving = isPetProfileSaving || isPreferenceSaving;

  /** 버튼 클릭 핸들러 */
  const handleNextStep = async () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      const nextStepValid = step + 1 === 2 ? selectedRegions.length > 0 : selectedStyles.length > 0;
      setIsStepValid(nextStepValid);
      return;
    }

    // 3단계 완료 시 api call
    try {
      const breedId = BREED_OPTIONS.find((b) => b.label === petProfileData.breed)?.id;
      const sizeCode = WEIGHT_OPTIONS.find((w) => w.label === petProfileData.weight)?.code;

      if (!breedId || !sizeCode) {
        throw new Error("반려견 프로필 정보가 올바르지 않습니다.");
      }

      const petProfilePayload = {
        name: petProfileData.name,
        breedId,
        sizeCode,
        birthDate: "2023-01-01", // TODO: 생년월일 입력 기능 추가 필요
        // TODO: 이미지 파일(avatarFile) 별도 처리 필요
      };

      const regionCodes = selectedRegions
        .filter((id) => id !== JEJU_OVERALL_ID)
        .map((id) => REGION_ID_TO_CODE_MAP[id])
        .filter((c): c is RegionContextId => !!c);

      const styleCodes = selectedStyles
        .map((label) => STYLE_LABEL_TO_CODE_MAP[label])
        .filter((c): c is StyleCode => !!c);

      const preferencePayload = {
        regionContextIds: regionCodes,
        styleCodes: styleCodes,
      };

      await Promise.all([createPetProfile(petProfilePayload), savePreference(preferencePayload)]);

      router.push("/map");
    } catch (_error) {
      alert("프로필 및 취향 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  /** render function */
  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={petProfileData}
            setFormData={setPetProfileData}
            setAvatarFile={setAvatarFile}
            setIsValid={setIsStepValid}
          />
        );
      case 2:
        return (
          <Step2
            selectedItems={selectedRegions}
            setSelectedItems={setSelectedRegions}
            setIsValid={setIsStepValid}
          />
        );
      case 3:
        return (
          <Step3
            selectedItems={selectedStyles}
            setSelectedItems={setSelectedStyles}
            setIsValid={setIsStepValid}
          />
        );
      default:
        return null;
    }
  };

  const buttonText = () => {
    if (isSaving) return "저장 중...";
    return step === 3 ? "완료" : "다음";
  };

  return (
    <div className={s.page}>
      <TopBar
        backIconHandler={() => (step > 1 ? setStep(step - 1) : router.back())}
        backIconSrc="/assets/icon24/arrow-left_line.svg"
        rightIcons={[
          {
            icon: <Image alt="닫기" height={24} src="/assets/icon24/x_line.svg" width={24} />,
            onClick: () => router.push("/map"),
          },
        ]}
      />
      <div className={s.container}>
        <h2 className={s.title}>{currentStepTitle[step]}</h2>
        <div className={s.content}>{renderStepComponent()}</div>
      </div>
      <div className={s.footer}>
        <Button
          size={ButtonSize.LARGE}
          status={isStepValid ? ButtonStatus.ACTIVE : ButtonStatus.DISABLED}
          text={buttonText()}
          onClick={handleNextStep}
          disabled={!isStepValid || isSaving}
        />
      </div>
    </div>
  );
}
