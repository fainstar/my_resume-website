import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { RouteObject } from 'react-router-dom';

// 懶加載組件的加載指示器
const LoadingFallback = (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <div className="loading-container" style={{ textAlign: 'center' }}>
      <Spin size="large" />
      <div style={{ marginTop: '8px' }}>頁面載入中...</div>
    </div>
  </div>
);

// 使用 React.lazy 懶加載組件
const HomePage = React.lazy(() => import('../pages/HomePage'));
const BlogPage = React.lazy(() => import('../pages/BlogPage'));
const BlogPostPage = React.lazy(() => import('../pages/BlogPostPage'));

/**
 * 創建懶加載包裝器
 * @param Component 要懶加載的組件
 * @returns 包裝後的組件
 */
const withLazyLoading = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
  return (
    <Suspense fallback={LoadingFallback}>
      <Component />
    </Suspense>
  );
};

/**
 * 應用路由配置
 * 使用懶加載減少初始加載時間
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: withLazyLoading(HomePage),
  },
  {
    path: '/blog',
    element: withLazyLoading(BlogPage),
  },
  {
    path: '/blog/post',
    element: withLazyLoading(BlogPage),
  },
  {
    path: '/blog/post/:id',
    element: withLazyLoading(BlogPostPage),
  },
];