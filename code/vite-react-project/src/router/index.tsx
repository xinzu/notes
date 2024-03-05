/*
 * @Description  : 路由配置
 * @Author       : yanhuan
 * @Date         : 2024-03-05 19:46:05
 * @LastEditors  : yanhuan
 * @LastEditTime : 2024-03-05 19:46:05
 */

import { RouteObject, Navigate, useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Test from '@/views/Test';

// 路由懒加载
const handleLazy = (name: string) => {
  const Comp = lazy(() => import(/* @vite-ignore */ `@/views/${name}`));
  //element需要传入<Element />这种形式，与component不同
  return (
    <Suspense fallback={<h2>Loading..</h2>}>
      <Comp />
    </Suspense>
  );
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Test />,
    children: [],
  },
  {
    path: '/404',
    element: handleLazy('NotFound'),
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

export default function MainRouter() {
  return useRoutes(routes);
}
