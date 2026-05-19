"use client";

import { ReactNode } from "react";
import { RiGpsLine } from "react-icons/ri";
import { ChipMapList, ChipMapListProps } from "../../atoms/Chip/ChipMapList/ChipMapList";
import { Fab, FabProps } from "../../atoms/Fab/Fab";
import { Tooltip, TooltipProps } from "../../atoms/Tooltip/Tooltip";
import * as s from "./MapFloatingButtons.css";

export interface MapFloatingButtonsProps {
  /** GPS 버튼 클릭 이벤트 핸들러 */
  onGpsClick: () => void;
  /** GPS 아이콘 (ReactNode) */
  gpsIcon?: ReactNode;
  /** @deprecated gpsIconSrc 대신 gpsIcon prop을 사용하세요 */
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
  gpsIcon,
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
          {gpsIcon ?? <RiGpsLine size={24} />}
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
