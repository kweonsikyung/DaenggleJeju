"use client";

import Image from "next/image";
import { ChipMapList, ChipMapListProps } from "../../atoms/Chip/ChipMapList/ChipMapList";
import { Fab, FabProps } from "../../atoms/Fab/Fab";
import { Tooltip, TooltipProps } from "../../atoms/Tooltip/Tooltip";
import * as s from "./MapFloatingButtons.css";

export interface MapFloatingButtonsProps {
  /** GPS 버튼 클릭 이벤트 핸들러 */
  onGpsClick: () => void;
  /** GPS 아이콘 src */
  gpsIconSrc?: string;
  /** 장소 목록 칩 컴포넌트 props */
  chipMapListProps: ChipMapListProps;
  /** FAB 컴포넌트 props */
  fabProps: FabProps;
  /** 툴팁 props */
  tooltipProps: TooltipProps;
}

export function MapFloatingButtons({
  onGpsClick,
  gpsIconSrc,
  chipMapListProps,
  fabProps,
  tooltipProps,
}: MapFloatingButtonsProps) {
  const animatedFabProps: FabProps = {
    ...fabProps,
    className: [fabProps.className, s.fabPulse].filter(Boolean).join(" "),
  };

  return (
    <div className={s.root}>
      <div>
        <button className={s.gpsButton} onClick={onGpsClick}>
          {gpsIconSrc && <Image src={gpsIconSrc} alt="현재 위치" width={24} height={24} />}
        </button>
      </div>
      <div>
        <ChipMapList {...chipMapListProps} />
      </div>
      <div className={s.fabWithTooltipContainer}>
        <Fab {...animatedFabProps} />
        <Tooltip {...tooltipProps} />
      </div>
    </div>
  );
}
