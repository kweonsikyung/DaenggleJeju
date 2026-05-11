interface Tab {
  id: string;
  label: string;
}

interface SegmentedControlOption {
  id: string;
  label: string;
}

export const mainTabs: SegmentedControlOption[] = [
  { id: "saved", label: "저장" },
  { id: "footprint", label: "발자국 인증" },
];

export const subTabs: Tab[] = [
  { id: "dangle", label: "댕글" },
  { id: "accom", label: "숙소" },
  { id: "restaurant", label: "음식점" },
  { id: "tourist", label: "여행지" },
  { id: "activity", label: "레포츠" },
];

export const emptyStateContent = {
  saved: {
    imageUrl: "/assets/dog_save.png",
    title: "아직 담은 곳이 없어요.",
    description: "마음에 든 장소를 저장하면 언제든 다시 찾을 수 있어요!",
  },
  footprint: {
    imageUrl: "/assets/dog_bag.png",
    title: "아직 발자국이 찍히지 않았어요.",
    description: "댕댕이와의 즐거웠던 여정을 기록해보세요!",
  },
};
