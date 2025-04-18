import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Modal, Form, Input, DatePicker, Space, Tabs, message, Upload, Radio } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SaveOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { markdownManager } from '../utils/markdownManager';
import type { MarkdownPost } from '../utils/markdownManager';
import { marked } from 'marked';
import LazyImage from './common/LazyImage';
import dayjs from 'dayjs';
import '../styles/blog.css';
import '../styles/blog-templates.css';
import type { RadioChangeEvent } from 'antd';

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

interface BlogProps {
  onBack: () => void;
}

const Blog: React.FC<BlogProps> = ({ onBack }) => {
  const navigate = useNavigate();
  const { Title, Text, Paragraph } = Typography;
  const { TextArea } = Input;

  // 初始化表單實例
  const [form] = Form.useForm();
  
  // 狀態管理
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState<MarkdownPost | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'standard' | 'photo' | 'tech'>('standard');
  const [htmlContent, setHtmlContent] = useState<string>('');
  
  // 密碼保護相關狀態
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordForm] = Form.useForm();
  const [blogPosts, setBlogPosts] = useState<MarkdownPost[]>([]);

  // 處理圖片載入錯誤
  const handleImageError = (postId: string) => {
    console.error(`Failed to load image for post: ${postId}`);
    setBlogPosts(prevPosts => prevPosts.map(p => 
      p.id === postId ? { ...p, coverImage: '/avatar-placeholder.jpg' } : p
    ));
  };

  // 確保表單初始化正確
  useEffect(() => {
    // 當模態框打開時重置表單
    if (isModalVisible) {
      form.resetFields();
      if (currentPost) {
        form.setFieldsValue({
          title: currentPost.title,
          date: dayjs(currentPost.date),
          summary: currentPost.summary,
          content: currentPost.content,
          template: currentPost.template || 'standard',
          coverImage: currentPost.coverImage
        });
        
        // 強制更新表單，確保圖片顯示
        if (currentPost.coverImage) {
          form.validateFields(['coverImage']);
        }
      }
    }
  }, [isModalVisible, currentPost]);

  // 初始化資料庫連接並載入文章
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await markdownManager.getAllPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('載入文章失敗:', error);
        message.error('載入文章失敗');
      }
    };
    loadPosts();
  }, []);

  // 處理新增文章
  const handleAddPost = () => {
    setCurrentPost(null);
    form.resetFields();
    setIsModalVisible(true);
    setPreviewMode(false);
  };

  // 處理編輯文章
  const handleEditPost = (post: MarkdownPost) => {
    setCurrentPost(post);
    setIsModalVisible(true);
    setPreviewMode(false);
    // 表單初始化會在useEffect中處理
  };

  // 處理刪除文章
  const handleDeletePost = async (postId: string) => {
    try {
      await markdownManager.deletePost(postId);
      message.success('文章已刪除');
      setBlogPosts(blogPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('刪除文章失敗:', error);
      message.error('刪除文章失敗');
    }
  };

  // 處理表單提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 確保coverImage是有效的數據
      if (!values.coverImage) {
        message.error('請上傳文章縮圖');
        return;
      }
      
      const postData = {
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        content: values.content,
        summary: values.summary,
        template: values.template,
        coverImage: values.coverImage // 現在coverImage已經是Base64數據，可以直接使用
      };

      if (currentPost) {
        // 更新文章
        await markdownManager.updatePost(currentPost.id, postData);
        const updatedPost = await markdownManager.getPostById(currentPost.id);
        if (updatedPost) {
          setBlogPosts(prev => prev.map(post => 
            post.id === currentPost.id ? updatedPost : post
          ));
        }
        message.success('文章已更新');
      } else {
        // 新增文章
        await markdownManager.createPost(postData);
        const posts = await markdownManager.getAllPosts();
        setBlogPosts(posts);
        message.success('文章已發布');
      }

      setIsModalVisible(false);
      form.resetFields();
      setCurrentPost(null);
    } catch (error) {
      console.error('保存文章失敗:', error);
      message.error('保存文章失敗');
    }
  };

  // 切換編輯模式
  const toggleEditMode = () => {
    if (editMode) {
      // 退出編輯模式不需要密碼
      setEditMode(false);
    } else if (!isAuthenticated) {
      // 未認證時，顯示密碼輸入框
      setIsPasswordModalVisible(true);
    } else {
      // 已認證，直接進入編輯模式
      setEditMode(true);
    }
  };
  
  // 處理密碼驗證
  const handlePasswordSubmit = () => {
    passwordForm.validateFields().then(values => {
      // 這裡設置一個簡單的密碼，實際應用中應該使用更安全的方式
      const correctPassword = "admin123";
      
      if (values.password === correctPassword) {
        setIsAuthenticated(true);
        setIsPasswordModalVisible(false);
        setEditMode(true);
        message.success('驗證成功，已進入編輯模式');
      } else {
        message.error('密碼錯誤，請重試');
      }
    });
  };

  // 預覽功能
  const handlePreview = () => {
    form.validateFields().then(() => {
      const content = form.getFieldValue('content');
      if (content) {
        const html = marked(content).toString();
        setHtmlContent(html);
      }
      setPreviewMode(!previewMode);
    }).catch(error => {
      console.error('表單驗證失敗:', error);
      message.error('請先完成必填欄位');
    });
  };

  // 處理模板變更
  const handleTemplateChange = (e: RadioChangeEvent) => {
    setSelectedTemplate(e.target.value);
  };

  return (
    <div style={{ 
      padding: '100px 24px 50px',
      background: 'linear-gradient(to bottom, #e6f7ff 0%, #ffffff 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <Button
            type="default"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={getButtonStyle('default')}
            className="nav-button"
            onMouseEnter={(e) => getHoverEffects(e.currentTarget)}
            onMouseLeave={(e) => getLeaveEffects(e.currentTarget)}
          >
            返回首頁
          </Button>
          
          <Space>
            <Button 
              type={editMode ? "primary" : "default"} 
              onClick={toggleEditMode}
              icon={<EditOutlined />}
              style={getButtonStyle(editMode ? 'primary' : 'default')}
              className="nav-button"
              onMouseEnter={(e) => !editMode && getHoverEffects(e.currentTarget)}
              onMouseLeave={(e) => !editMode && getLeaveEffects(e.currentTarget)}
            >
              {editMode ? '退出編輯' : '進入編輯'}
            </Button>
            
            {editMode && (
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={handleAddPost}
                style={getButtonStyle('primary')}
                className="nav-button"
              >
                新增文章
              </Button>
            )}
          </Space>
        </div>
        
        <Title 
          level={1} 
          style={{
            fontSize: '2.5rem',
            fontWeight: 600,
            marginBottom: '40px',
            background: 'linear-gradient(45deg, #1890ff 30%, #096dd9 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          我的網誌
        </Title>
        
        <Row gutter={[24, 24]}>
          {blogPosts.map(post => (
            <Col xs={24} md={12} lg={8} key={post.id}>
              <div className="blog-card" onClick={() => navigate(`/blog/post/${post.id}`)} style={{ 
                cursor: 'pointer',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                overflow: 'hidden'
              }}>
                <div className="blog-card-image-container">
                  <LazyImage
                    alt={post.title}
                    src={post.coverImage || '/avatar-placeholder.jpg'}
                    className="blog-card-cover"
                    style={{ width: '100%', height: '100%' }}
                    placeholderSrc="/avatar-placeholder.jpg"
                    onError={() => handleImageError(post.id)}
                  />
                </div>
                <div className="blog-card-content" style={{ padding: '24px' }}>
                  <div className="blog-card-title" style={{ 
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                    background: 'linear-gradient(45deg, #1890ff 30%, #096dd9 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>{post.title}</div>
                  <div className="blog-card-date">{dayjs(post.date).format('YYYY年MM月DD日')}</div>
                  <div className="blog-card-summary">{post.summary}</div>
                </div>
                {editMode && (
                  <div className="blog-card-actions">
                    <EditOutlined onClick={(e) => {
                      e.stopPropagation();
                      handleEditPost(post);
                    }} />
                    <DeleteOutlined onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id);
                    }} />
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
        
        {/* 編輯/新增文章的模態框 */}
        <Modal
          title={currentPost ? '編輯文章' : '新增文章'}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width="90%"
          style={{
            borderRadius: '8px',
            overflow: 'hidden'
          }}
          destroyOnClose
        >
          <Tabs
            activeKey={previewMode ? 'preview' : 'edit'}
            items={[
              {
                key: 'edit',
                label: '編輯',
                children: (
                  <Form
                    form={form}
                    layout="vertical"
                    style={{ maxWidth: '100%' }}
                    onFinish={handleSubmit}
                    name="blogPostForm"
                  >
                    <Form.Item
                      name="template"
                      label="選擇模板"
                      initialValue="standard"
                    >
                      <Radio.Group onChange={handleTemplateChange} value={selectedTemplate}>
                        <Space direction="vertical">
                          <Radio value="standard">標準文章</Radio>
                          <Radio value="photo">圖文並茂</Radio>
                          <Radio value="tech">專業技術文章</Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {/* 隱藏字段用於存儲圖片數據 */}
                    <Form.Item
                      name="coverImageData"
                      hidden
                    >
                      <Input />
                    </Form.Item>
                    
                    <Form.Item
                      name="coverImage"
                      label="文章縮圖"
                      rules={[{ required: true, message: '請上傳文章縮圖' }]}
                    >
                      <Upload
                        accept="image/*"
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={false}
                        fileList={[]} // 使用fileList代替value
                        beforeUpload={async (file) => {
                          try {
                            // 使用修改後的uploadImage方法獲取Base64圖片數據
                            const imageData = await markdownManager.uploadImage(file);
                            if (!imageData || typeof imageData !== 'string') {
                              throw new Error('Invalid image data returned');
                            }
                            
                            // 直接設置coverImage字段為Base64數據
                            form.setFieldsValue({
                              coverImage: imageData
                            });
                            
                            // 強制更新表單，確保UI顯示更新
                            form.validateFields(['coverImage']);
                            
                            message.success('圖片上傳成功');
                            return false; // 阻止默認上傳行為
                          } catch (error) {
                            console.error('圖片上傳失敗:', error);
                            message.error('圖片上傳失敗：' + (error instanceof Error ? error.message : '未知錯誤'));
                            return false;
                          }
                        }}
                        onRemove={() => {
                          form.setFieldsValue({ coverImage: undefined });
                          return true;
                        }}
                      >
                        {form.getFieldValue('coverImage') ? (
                          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <LazyImage
                              src={form.getFieldValue('coverImage')}
                              alt="文章縮圖"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              placeholderSrc="/avatar-placeholder.jpg"
                              onError={() => {
                                console.error('圖片預覽載入失敗');
                                // 不显示错误消息，直接使用默认图片，避免用户体验不佳
                                // 當圖片載入失敗時，自動使用預設圖片
                                const defaultImage = '/avatar-placeholder.jpg';
                                form.setFieldsValue({ coverImage: defaultImage });
                                // 确保表单验证并更新UI
                                setTimeout(() => {
                                  form.validateFields(['coverImage']);
                                }, 0);
                              }}
                            />
                            <div 
                              style={{ 
                                position: 'absolute', 
                                top: 0, 
                                right: 0, 
                                background: 'rgba(0,0,0,0.5)', 
                                color: '#fff',
                                padding: '2px 8px',
                                cursor: 'pointer',
                                borderRadius: '0 0 0 4px'
                              }}
                              onClick={() => {
                                form.setFieldsValue({ coverImage: undefined });
                                form.validateFields(['coverImage']);
                              }}
                            >
                              移除
                            </div>
                          </div>
                        ) : (
                          <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>上傳圖片</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                    
                    <Form.Item
                      name="title"
                      label="標題"
                      rules={[{ required: true, message: '請輸入文章標題' }]}
                    >
                      <Input placeholder="請輸入文章標題" />
                    </Form.Item>
                    
                    <Form.Item
                      name="date"
                      label="發布日期"
                      rules={[{ required: true, message: '請選擇發布日期' }]}
                    >
                      <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    
                    <Form.Item
                      name="summary"
                      label="摘要"
                      rules={[{ required: true, message: '請輸入文章摘要' }]}
                    >
                      <TextArea rows={3} placeholder="請輸入文章摘要" />
                    </Form.Item>
                    
                    <Form.Item
                      name="content"
                      label="內容"
                      rules={[{ required: true, message: '請輸入文章內容' }]}
                    >
                      <TextArea
                        placeholder="使用Markdown格式編寫文章內容"
                        autoSize={{ minRows: 15, maxRows: 30 }}
                        style={{ fontFamily: 'monospace' }}
                      />
                    </Form.Item>
                    
                    <Form.Item>
                      <Space>
                        <Button 
                          type="primary" 
                          icon={<SaveOutlined />} 
                          htmlType="submit"
                          style={getButtonStyle('primary')}
                        >
                          保存
                        </Button>
                        <Button 
                          icon={<EyeOutlined />} 
                          onClick={handlePreview}
                          style={getButtonStyle('default')}
                          onMouseEnter={(e) => getHoverEffects(e.currentTarget)}
                          onMouseLeave={(e) => getLeaveEffects(e.currentTarget)}
                        >
                          預覽
                        </Button>
                        <Button 
                          onClick={() => setIsModalVisible(false)}
                          style={getButtonStyle('default')}
                          onMouseEnter={(e) => getHoverEffects(e.currentTarget)}
                          onMouseLeave={(e) => getLeaveEffects(e.currentTarget)}
                        >
                          取消
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                ),
              },
              {
                key: 'preview',
                label: '預覽',
                children: previewMode && (
                  <div className="preview-container" style={{ padding: '20px' }}>
                    <Title level={2}>{form.getFieldValue('title')}</Title>
                    <Text type="secondary">{form.getFieldValue('date')?.format('YYYY-MM-DD')}</Text>
                    <div style={{ margin: '20px 0', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                      <Text strong>摘要：</Text>
                      <Paragraph>{form.getFieldValue('summary')}</Paragraph>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <div className={`blog-content blog-template-${selectedTemplate}`} 
                        dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                    <Button 
                      type="primary" 
                      onClick={() => setPreviewMode(false)} 
                      style={{ ...getButtonStyle('primary'), marginTop: '20px' }}
                    >
                      返回編輯
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </Modal>
      </div>
      
      {/* 密碼驗證模態框 */}
      <Modal
        title="請輸入管理員密碼"
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsPasswordModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handlePasswordSubmit}>
            確認
          </Button>
        ]}
      >
        <Form form={passwordForm} layout="vertical" name="passwordForm">
          <Form.Item
            name="password"
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password placeholder="請輸入管理員密碼" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Blog;