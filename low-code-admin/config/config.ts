import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';
const { BASE_URL, API_BASE_URL, PUBLIC_PATH } = process.env;
export default defineConfig({ 
  define: {
    BASE_URL,
    API_BASE_URL,
    PUBLIC_PATH,
  },
  title: '',
  base: BASE_URL,
  publicPath: PUBLIC_PATH,
  history: {
    type: 'browser',
  },
  antd: {},
  access: {},
  model: {},
  valtio: {},
  initialState: {},
  request: {},
  proxy,
  routes,
  layout: {
    title: '@umijs/max',
  },
  npmClient: 'pnpm',
  qiankun: {
    master: {},
  },
  externals: {
    '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
  },
  scripts: [
    {
      src: 'https://g.alicdn.com/code/lib/react/18.0.0/umd/react.production.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/react-dom/18.0.0/umd/react-dom.production.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/moment.js/2.29.1/moment-with-locales.min.js',
      defer: true,
    },
    {
      src: 'https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js',
      defer: true,
    },
    {
      src: 'https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/js/engine-core.js',
      defer: true,
    },
    {
      src: 'https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/js/engine-ext.js',
      defer: true,
    },
  ],
  mock: {
    // 开启 mock 功能
    // include: ['mock/**'],
    // 可以自定义 mock 请求的路径
    // 默认情况下，会根据文件路径生成接口
    // 例如 mock/user.ts 会映射到 /api/user
    // path: 'mock'
  },
});