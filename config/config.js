import { defineConfig } from 'umi';
import { ApiUrlMap, authHeader } from '.';
import theme from '../src/assets/theme';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  theme,
  hash: true,
  ignoreMomentLocale: true,
  fastRefresh: {},
  forkTSChecker: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
  outputPath: 'build',
  mfsu: {},
  favicon: '/logo.ico',
  // 用于提供给代码中可用的变量
  define: {
    'process.env.apiUrl': ApiUrlMap.stg,
    'process.env.authHeader': authHeader,
  },
});
