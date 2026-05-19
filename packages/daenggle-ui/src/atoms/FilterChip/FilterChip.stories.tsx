import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { FilterChip } from "./FilterChip";

const meta = {
  title: "Chip/FilterChip",
  component: FilterChip,
  parameters: {
    layout: "centered",
  },
  args: {
    text: "댕글",
    onClick: fn(),
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: false,
    iconUrl: "https://placehold.co/12x12",
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    iconUrl: "https://placehold.co/12x12",
  },
};

export const TextOnly: Story = {
  args: {
    text: "숙소",
    selected: false,
    iconUrl: undefined,
  },
};
