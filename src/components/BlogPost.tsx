import React, { useEffect, useState } from 'react';
import { Typography, Button, Space, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { dbManager, BlogPost as BlogPostType } from '../utils/database';
import '../styles/blog.css';
import dayjs from 'dayjs';

// 通用按鈕樣式函數
const getButtonStyle = (type: 'default' | 'primary' | 'link' = 'default', isActive: boolean = false) => {
  const baseStyle = {
    fontSize: '16px',
    padding: '8px 24px',
    transition: 'all 0.3s',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  if (type === 'primary' || isActive) {
    return {
      ...baseStyle,
      background: 'linear-gradient(145deg, #4a6bff 0%, #2b4bdf 100%)',
      border: 'none',
      boxShadow: '0 4px 12px rgba(74, 107, 255, 0.25)',
      color: '#fff'
    };
  }

  return {
    ...baseStyle,
    background: '#fff',
    border: '1px solid #d9d9d9',
    boxShadow: 'none',
    color: 'rgba(0, 0, 0, 0.88)'
  };
};

// 按鈕懸停效果
const getHoverEffects = (element: HTMLElement, isActive: boolean = false) => {
  if (isActive) return;
  
  element.style.background = '#f0f2ff';
  element.style.borderColor = '#4a6bff';
  element.style.color = '#4a6bff';
};

const getLeaveEffects = (element: HTMLElement, isActive: boolean = false) => {
  if (isActive) return;
  
  element.style.background = '#fff';
  element.style.borderColor = '#d9d9d9';
  element.style.color = 'rgba(0, 0, 0, 0.88)';
};

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        await dbManager.connect();
        const posts = await dbManager.getAllPosts();
        const currentPost = posts.find(p => p.id === parseInt(id || ''));
        
        if (currentPost) {
          setPost(currentPost);
        } else {
          message.error('找不到該文章');
          navigate('/blog');
        }
      } catch (error) {
        console.error('載入文章失敗:', error);
        message.error('載入文章失敗');
        navigate('/blog');
      }
    };
    loadPost();
  }, [id, navigate]);

  return (
    <div style={{
      padding: '100px 24px 50px',
      background: 'linear-gradient(to bottom, #e6f7ff 0%, #ffffff 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/blog')}
            style={getButtonStyle('default')}
            className="nav-button"
            onMouseEnter={(e) => getHoverEffects(e.currentTarget)}
            onMouseLeave={(e) => getLeaveEffects(e.currentTarget)}
          >
            返回文章列表
          </Button>

          {post && (
            <div style={{ padding: '24px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Title level={1} style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
                background: 'linear-gradient(45deg, #1890ff 30%, #096dd9 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {post.title}
              </Title>

              <Text type="secondary" style={{ display: 'block', marginBottom: '32px', fontSize: '16px' }}>
                {dayjs(post.date).format('YYYY年MM月DD日')}
              </Text>
              
              <div className="blog-content-container" style={{ 
                background: '#f9f9f9', 
                padding: '24px', 
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <div className="blog-content" style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </div>
            </div>
          )}
        </Space>
      </div>
    </div>
  );
};

export default BlogPost;