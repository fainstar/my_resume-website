import React from 'react';
import { Layout, Typography, Divider, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout.Footer style={{
      padding: '24px 0', 
      marginTop: 'auto', 
      backgroundColor: '#f0f0f0', 
      boxShadow: '0px -2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <Divider />
        <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Text type="secondary">
            {t('footer.copyright')}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ fontStyle: 'italic' }}>
            Powered by Next.js & Ant Design | Delivered with love.
          </Typography.Text>
        </Space>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
