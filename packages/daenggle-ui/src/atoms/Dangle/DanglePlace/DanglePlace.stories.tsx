import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DanglePlace } from "./DanglePlace";

const meta = {
  title: "Dangle/DanglePlace",
  component: DanglePlace,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    thumbnailUrl: "/assets/dangle/dog.png",
    locationCategory: "제주 제주시 구좌읍 · 한식",
    name: "평대리명석",
    distance: "4.9",
    playCount: 4,
    bookmarkCount: 131,
    tags: ["모든크기", "모든구역", "목줄착용", "짖음OK"],
    onClick: fn(),
    onBookmarkClick: fn(),
  },
} satisfies Meta<typeof DanglePlace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isExpanded: false,
  },
};

export const ExpandedStay: Story = {
  args: {
    isExpanded: true,
    thumbnailUrl: "/assets/dangle/dog.png",
    locationCategory: "제주 제주시 구좌읍 · 독채펜션",
    name: "애월빛",
    distance: "4.9",
    playCount: 4,
    bookmarkCount: 131,
    tags: ["모든크기", "모든구역", "목줄착용", "짖음OK"],
    details: { time: "숙박 15:00~", price: "210,000" },
  },
};
