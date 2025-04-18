import React from 'react';
import BlogPost from '../components/BlogPost';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * 博客文章頁面組件
 * 顯示單篇博客文章的詳細內容
 */
const BlogPostPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <BlogPost />
    </ErrorBoundary>
  );
};

export default BlogPostPage;