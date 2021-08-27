import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'unity-ui',
  description: '小而美的UI组件库',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  // mode:'site',
  outputPath: 'docs-dist',
  history: {
    type: 'hash',
  },
  alias: {
    img: '@/assets/img',
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
