import React from 'react';
import { Typography, Button, Space } from 'antd';
import Section from './Section';

const { Title, Paragraph } = Typography;

interface HeroProps {
  id: string;
}

const Hero: React.FC<HeroProps> = ({ id }) => {
  return (
    <div
      style={{
        backgroundImage: `url('/ai-defense-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Section 
        id={id}         title=""
      >
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '800px',
          padding: '40px 24px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
        }}>
          <Title 
            level={1} 
            style={{ 
              fontSize: '3rem',
              marginBottom: '24px',
              color: '#1a1a1a'
            }}
          >
            專攻AI資安防禦技術
          </Title>
          
          <Paragraph style={{ 
            fontSize: '1.1rem',
            marginBottom: '40px',
            color: '#434343'
          }}>
            國立高雄科技大學 資訊工程系畢業
            專題研究：AI DDOS防禦系統開發
            擅長網路安全架構與機器學習應用
          </Paragraph>
          
          <Space size="large">
            <Button 
              type="primary" 
              size="large"
              style={{ 
                background: '#1890ff',
                borderColor: '#1890ff',
                borderRadius: '8px',
                height: '48px',
                padding: '0 32px'
              }}
            >
              查看專題成果
            </Button>
          </Space>
        </div>
      </Section>
    </div>
  );
};

export default Hero;