import { defineConfig } from 'umi';
import { ApiUrlMap, authHeader } from '.';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  hash: true,
  ignoreMomentLocale: true,
  fastRefresh: {},
  forkTSChecker: {},
  dynamicImport: {
    loading: '@/components/Loading',
  },
  outputPath: 'build',
  favicon: '/logo.ico',
  // 用于提供给代码中可用的变量
  define: {
    'process.env.apiUrl': ApiUrlMap.stg,
    'process.env.authHeader': authHeader,
  },
});
