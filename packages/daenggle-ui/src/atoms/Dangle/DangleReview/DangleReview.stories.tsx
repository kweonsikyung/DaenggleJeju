import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DangleReview } from "./DangleReview";

const meta = {
  title: "Dangle/DangleReview",
  component: DangleReview,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    rating: {
      control: { type: "range", min: 0, max: 5, step: 1 },
    },
    isMine: {
      control: "boolean",
    },
    profileImageUrl: { control: "text" },
    userName: { control: "text" },
    dogInfo: { control: "text" },
    locationCategory: { control: "text" },
    placeName: { control: "text" },
    date: { control: "text" },
    content: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 375,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DangleReview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "다른 사람 리뷰 (Default)",
  args: {
    isMine: false,
    profileImageUrl: "/assets/dangle/dog_profile1.png",
    userName: "해투 견주님",
    dogInfo: "골든리트리버 · 7살 · 대형견 · 20kg 이상",
    rating: 5,
    date: "2025.03.14",
    chips: [
      "실내 모든 곳 이용 가능", // CHIP_LABELS_OTHER[0] "출입 가능 여부"
      "목줄 착용 필수", // CHIP_LABELS_OTHER[1] "출입 조건"
      "매우 친절", // CHIP_LABELS_OTHER[2] "반려견 친화도"
    ],
    content:
      "대형견도 편하게 머물 수 있었어요 깔끔하고 깨끗한 방, 실내 전 구역 출입 가능해요 우디플레이트엔 매우 다양한 디저트가 있어 입도 즐거웠어요. 주변에 맛집도 있고 산책...",
    locationCategory: undefined,
    placeName: undefined,
  },
};

export const FourStars: Story = {
  name: "다른 사람 리뷰 (4점)",
  args: {
    isMine: false, // [UPDATE]
    profileImageUrl: "/assets/dangle/dog_profile2.png",
    userName: "댕댕이 견주님",
    dogInfo: "푸들 · 3살 · 소형견 · 5kg 미만",
    rating: 4,
    date: "2025.03.12",
    chips: [
      "실내 일부만 가능", // CHIP_LABELS_OTHER[0] "출입 가능 여부"
      "이동가방 필수", // CHIP_LABELS_OTHER[1] "출입 조건"
      "친절", // CHIP_LABELS_OTHER[2] "반려견 친화도"
    ],
    content:
      "사장님이 친절하셨어요. 소형견 친구들이 놀기 좋은 곳 같아요. 공간이 넓지는 않지만 아기자기하게 잘 꾸며져 있습니다.",
    locationCategory: undefined,
    placeName: undefined,
  },
};

// [NEW] 'isMine={true}'를 위한 스토리 추가
export const MyReview: Story = {
  name: "내 리뷰 (isMine=true)",
  args: {
    isMine: true,
    locationCategory: "제주시 애월읍 · 콘도",
    placeName: "한화리조트 제주",
    rating: 5,
    date: "2025.03.14",
    chips: [
      "실내 일부만 가능", // CHIP_LABELS_OTHER[0] "출입 가능 여부"
      "이동가방 필수", // CHIP_LABELS_OTHER[1] "출입 조건"
      "친절", // CHIP_LABELS_OTHER[2] "반려견 친화도"
    ],
    content:
      "대형견도 편하게 머물 수 있었어요 깔끔하고 깨끗한 방, 실내 전 구역 출입 가능해요 우디플레이트엔 매우 다양한 디저트가 있어 입도 즐거웠어요. 주변에 맛집도 있고 산책...",
    profileImageUrl: undefined,
    userName: undefined,
    dogInfo: undefined,
  },
};
