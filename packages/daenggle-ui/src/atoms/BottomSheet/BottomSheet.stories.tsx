import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import React, { useState } from "react";
import { BottomSheet } from "./BottomSheet";

type Props = React.ComponentProps<typeof BottomSheet>;
const meta = {
  title: "Common/BottomSheet",
  component: BottomSheet,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    open: { control: false, table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    title: "타이틀",
    open: false,
    onOpenChange: () => {},
    children: null,
  } satisfies Partial<Props>,
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [open, setOpen] = useState<boolean>(Boolean(args.open));

    return (
      <>
        <div style={{ fontSize: 20, fontWeight: 700 }} onClick={() => setOpen(true)}>
          열기
        </div>
        <BottomSheet {...args} open={open} onOpenChange={setOpen}>
          <section style={{ minHeight: "200px" }}></section>
        </BottomSheet>
      </>
    );
  },
};
