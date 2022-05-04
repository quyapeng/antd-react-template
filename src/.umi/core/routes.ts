// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/Mi/study/antd-react-template/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/Loading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404__index' */'@/pages/404/index.tsx'), loading: LoadingComponent}),
        "title": "页面未找到"
      },
      {
        "path": "/home",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home__index' */'@/pages/home/index.tsx'), loading: LoadingComponent}),
        "title": "首页"
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__index' */'@/pages/index.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/login/LoginForm",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login__LoginForm' */'@/pages/login/LoginForm.tsx'), loading: LoadingComponent})
      },
      {
        "path": "/login",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__login__index' */'@/pages/login/index.tsx'), loading: LoadingComponent}),
        "title": "登录"
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404__index' */'@/pages/404/index.tsx'), loading: LoadingComponent})
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
