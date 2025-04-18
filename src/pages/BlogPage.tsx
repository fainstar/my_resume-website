import React from 'react';
import { useNavigate } from 'react-router-dom';
import Blog from '../components/Blog';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * 博客頁面組件
 * 顯示博客文章列表
 */
const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 處理返回首頁事件
  const handleBack = () => navigate('/');
  
  return (
    <ErrorBoundary>
      <Blog onBack={handleBack} />
    </ErrorBoundary>
  );
};

export default BlogPage;