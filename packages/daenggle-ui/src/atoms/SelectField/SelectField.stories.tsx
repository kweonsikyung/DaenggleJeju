import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { SelectField } from "./SelectField";

const meta = {
  title: "Input/SelectField",
  component: SelectField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "label",
    placeholder: "placeholder",
    onClick: fn(),
  },
};

export const Filled: Story = {
  args: {
    label: "label",
    value: "selected value",
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    label: "비활성화",
    placeholder: "선택 불가",
    disabled: true,
  },
};
