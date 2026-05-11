"use client";

import { Location } from "daenggle-ui";
import { useEffect } from "react";
import {
  ALL_REGION_IDS,
  ALL_SPECIFIC_REGION_IDS,
  JEJU_OVERALL_ID,
  LOCATION_OPTION,
} from "../_util";
import * as s from "../style.css";

interface Step2Props {
  setIsValid: (isValid: boolean) => void;
  selectedItems: number[];
  setSelectedItems: (items: number[]) => void;
}

export default function Step2({ setIsValid, selectedItems, setSelectedItems }: Step2Props) {
  /** click handler - '제주 전체' 선택/해제 로직 */
  const handleSelect = (id: number) => {
    // 1. '제주 전체' (ID 1)를 클릭한 경우
    if (id === JEJU_OVERALL_ID) {
      if (selectedItems.includes(JEJU_OVERALL_ID)) {
        setSelectedItems([]);
      } else {
        setSelectedItems(ALL_REGION_IDS);
      }
      return;
    }

    // 2. 특정 지역 (ID 1이 아님)을 클릭한 경우
    let newSelectedItems = [...selectedItems];

    if (newSelectedItems.includes(id)) {
      newSelectedItems = newSelectedItems.filter((i) => i !== id);
      if (newSelectedItems.includes(JEJU_OVERALL_ID)) {
        newSelectedItems = newSelectedItems.filter((i) => i !== JEJU_OVERALL_ID);
      }
    } else {
      newSelectedItems.push(id);
    }

    // 3. 클릭 후 상태 확인: 모든 '특정' 지역이 선택되었는지 검사
    const allSpecificRegionsSelected = ALL_SPECIFIC_REGION_IDS.every((regionId) =>
      newSelectedItems.includes(regionId)
    );

    // 모든 특정 지역이 선택되었다면 -> '제주 전체'도 자동으로 선택
    if (allSpecificRegionsSelected && !newSelectedItems.includes(JEJU_OVERALL_ID)) {
      newSelectedItems.push(JEJU_OVERALL_ID);
    }

    setSelectedItems(newSelectedItems);
  };

  /** lifecycle */
  useEffect(() => {
    setIsValid(selectedItems.length > 0);
  }, [selectedItems, setIsValid]);

  return (
    <div className={s.step2_container}>
      <p className={s.caption}>*다중 선택 가능</p>
      <div className={s.step2_grid}>
        {LOCATION_OPTION.map((item) => (
          <Location
            key={item.id}
            title={item.title}
            desc={item.desc}
            selected={selectedItems.includes(item.id)}
            onClick={() => handleSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
