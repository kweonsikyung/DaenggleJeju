import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { FilterChipExpand } from "./FilterChipExpand";

const meta = {
  title: "Chip/FilterChipExpand",
  component: FilterChipExpand,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    caption: { control: "text" },
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof FilterChipExpand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleAndCaption: Story = {
  args: {
    title: "소형견",
    caption: "10kg 이하",
    selected: false,
  },
};

export const TitleOnly: Story = {
  args: {
    title: "소형견",
    caption: undefined,
    selected: false,
  },
};

export const SelectedTitleAndCaption: Story = {
  args: {
    title: "소형견",
    caption: "10kg 이하",
    selected: true,
  },
};

export const SelectedTitleOnly: Story = {
  args: {
    title: "소형견",
    caption: undefined,
    selected: true,
  },
};
