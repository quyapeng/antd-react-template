import { defineConfig } from 'umi';
import { ApiUrlMap } from '.';

export default defineConfig({
  define: {
    'process.env.apiUrl': ApiUrlMap.prd,
  },
});
