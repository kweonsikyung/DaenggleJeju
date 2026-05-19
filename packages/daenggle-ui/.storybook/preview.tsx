import type { Preview } from "@storybook/nextjs-vite";
import { IconContext } from "react-icons";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    docs: {
      autodocs: true,
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <IconContext.Provider value={{ color: "#525252" }}>
        <Story />
      </IconContext.Provider>
    ),
  ],
};

export default preview;
