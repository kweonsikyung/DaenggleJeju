import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField } from "./TextField";

const meta = {
  title: "Input/TextField",
  component: TextField,
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
    onChange: { action: "change" },
    onBlur: { action: "blur" },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "input", placeholder: "Place holder" },
};

export const Filled: Story = {
  args: { label: "filled input", defaultValue: "사용자 입력 후" },
};

export const Error: Story = {
  args: {
    label: "error input",
    defaultValue: "bad email",
    validator: (v) => (v.includes("@") ? undefined : "올바른 이메일 형식이 아닙니다."),
    helperText: "올바른 이메일을 입력해주세요.",
  },
};

export const Disabled: Story = {
  args: {
    label: "disabled input",
    placeholder: "Place holder",
    disabled: true,
  },
};
