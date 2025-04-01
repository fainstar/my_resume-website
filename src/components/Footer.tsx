import React from 'react';
import { Layout, Typography, Space, Divider } from 'antd';
import { LinkedinOutlined, GithubOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Layout.Footer style={{ padding: '24px 0', marginTop: 'auto', backgroundColor: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Divider />
        <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Text type="secondary">
            ©自家伺服器.
          </Typography.Text>
          <Space>
    
            <a href="https://github.com/fainstar" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <GithubOutlined style={{ fontSize: '20px', margin: '0 8px' }} />
            </a>
            <a href="https://www.instagram.com/ru.0811" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '20px', margin: '0 8px' }} />
            </a>
          </Space>
        </Space>
      </div>
    </Layout.Footer>
  );
};

export default Footer;