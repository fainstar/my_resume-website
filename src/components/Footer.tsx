import React from 'react';
import { Layout, Typography, Divider, Space } from 'antd';

const Footer: React.FC = () => {
  
  return (
    <Layout.Footer style={{ padding: '24px 0', marginTop: 'auto', backgroundColor: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Divider />
        <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Text type="secondary">
            ©自家伺服器.
          </Typography.Text>
        </Space>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
