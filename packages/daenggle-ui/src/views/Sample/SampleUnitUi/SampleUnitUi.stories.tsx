import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SampleUnitUi } from "./SampleUnitUi";

const meta = {
  title: "Sample/SampleUnitUi",
  component: SampleUnitUi,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof SampleUnitUi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "https://placehold.co/400x200",
    title: "SampleUnitUi",
    description: "This is a sample unit UI component.",
    onClick: () => {
      alert("Card clicked!");
    },
  },
};
