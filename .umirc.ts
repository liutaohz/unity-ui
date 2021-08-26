import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'unity-ui',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  history: {
    type: 'hash',
  },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/EasySimple/unity-ui',
    },
  ],
  publicPath: '/unity-ui/',
  // more config: https://d.umijs.org/config
});
