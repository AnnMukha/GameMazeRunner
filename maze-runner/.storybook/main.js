

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../src/stories/Button.stories.js",
    "../src/stories/GameOverModal.stories.jsx",
  ],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-webpack5",
  staticDirs: ["../public"],
};
export default config;
