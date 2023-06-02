import type { Preview } from "@storybook/react";
import "~/styles/globals.css";
import "./storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#000000",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    nextjs: {
      router: {
        basePath: "/",
      },
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
