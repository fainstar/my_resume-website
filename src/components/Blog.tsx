import React, { useState, useEffect, useRef } from 'react';
import { Typography, Row, Col, Button, Modal, Form, Input, DatePicker, Space, Tabs, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, PlusOutlined, SaveOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/animations.css';
import dayjs from 'dayjs';
import { dbManager, BlogPost } from '../utils/database';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/blog.css';
import { useParams, useNavigate } from 'react-router-dom';

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
  const { id } = useParams();
  const navigate = useNavigate();
  const { Title, Paragraph, Text } = Typography;
  const { TextArea } = Input;
  const quillRef = useRef<ReactQuill>(null);

  // Quill編輯器的工具欄配置
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];
  const [form] = Form.useForm();

  // 初始化資料庫連接並載入文章
  useEffect(() => {
    const initDatabase = async () => {
      try {
        await dbManager.connect();
        const posts = await dbManager.getAllPosts();
        setBlogPosts(posts);
        
        if (id) {
          const post = posts.find(p => p.id === parseInt(id));
          if (post) {
            // 删除未定义的状态更新
            // setReadingPost(post);
            // setIsReadingMode(true);
          } else {
            message.error('找不到該文章');
            navigate('/blog');
          }
        }
      } catch (error) {
        console.error('初始化資料庫失敗:', error);
        message.error('載入文章失敗');
      }
    };
    initDatabase();
  }, [id, navigate]);
  
  // 狀態管理
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  
  
  // 密碼保護相關狀態
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordForm] = Form.useForm();
  
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // 處理新增文章
  const handleAddPost = () => {
    setCurrentPost(null);
    form.resetFields();
    setIsModalVisible(true);
    setPreviewMode(false);
  };

  // 處理編輯文章
  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    form.setFieldsValue({
      title: post.title,
      date: dayjs(post.date),
      summary: post.summary,
      content: post.content
    });
    setIsModalVisible(true);
    setPreviewMode(false);
  };

  // 處理刪除文章
  const handleDeletePost = (postId: number) => {
    Modal.confirm({
      title: '確定要刪除這篇文章嗎？',
      content: '刪除後將無法恢復',
      okText: '確定',
      cancelText: '取消',
      onOk: async () => {
        try {
          await dbManager.deletePost(postId);
          setBlogPosts(blogPosts.filter(post => post.id !== postId));
          message.success('文章已刪除');
        } catch (error) {
          console.error('刪除文章失敗:', error);
          message.error('刪除文章失敗');
        }
      }
    });
  };

  // 處理表單提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const postData = {
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        summary: values.summary,
        content: quillRef.current?.getEditor().root.innerHTML || ''
      };

      if (currentPost) {
        await dbManager.updatePost({
          ...postData,
          id: currentPost.id
        });
        setBlogPosts(blogPosts.map(post => post.id === currentPost.id ? { ...postData, id: currentPost.id } : post));
        message.success('文章已更新');
      } else {
        const newPostId = await dbManager.addPost(postData);
        setBlogPosts([{ ...postData, id: newPostId }, ...blogPosts]);
        message.success('文章已發布');
      }

      setIsModalVisible(false);
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
      setPreviewMode(!previewMode);
    }).catch(error => {
      // 如果表單驗證失敗，顯示錯誤信息
      console.error('表單驗證失敗:', error);
      message.error('請先完成必填欄位');
    });
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
                  <img
                    alt={post.title}
                    src={post.coverImage || '/avatar-placeholder.jpg'}
                    className="blog-card-cover"
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
          width={800}
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
                  >
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
                      <ReactQuill
                        ref={quillRef}
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        style={{ height: '300px', marginBottom: '50px' }}
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
                      <div className="blog-content" dangerouslySetInnerHTML={{ __html: quillRef.current?.getEditor().root.innerHTML || '' }} />
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
        title="請輸入密碼"
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordSubmit}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: '請輸入密碼' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="請輸入密碼"
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button 
                onClick={() => setIsPasswordModalVisible(false)}
                style={getButtonStyle('default')}
                onMouseEnter={(e) => getHoverEffects(e.currentTarget)}
                onMouseLeave={(e) => getLeaveEffects(e.currentTarget)}
              >
                取消
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                style={getButtonStyle('primary')}
              >
                確認
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>


    </div>
  );
};

export default Blog;