import React from 'react';
import { Typography, Tag, Space } from 'antd';

interface SelfIntroductionProps {
  title: string;
  bio: string;
  tags: string[];
}

const SelfIntroduction: React.FC<SelfIntroductionProps> = ({ title, bio, tags }) => {
  const { Title } = Typography;

  return (
    <div>
      <Title level={3} style={{ margin: '0 0 24px 0', color: '#4a6bff', fontWeight: 500 }}>
        {title}
      </Title>
      <div style={{ fontSize: '18px', color: '#666666' }}>
        {bio.split(/\n\n/).map((paragraph, index) => (
          <div 
            key={index}
            style={{ 
              marginBottom: index < bio.split(/\n\n/).length - 1 ? '24px' : '0',
              lineHeight: 1.8,
              textIndent: '0em',
              whiteSpace: 'pre-wrap'
            }}
            dangerouslySetInnerHTML={{
              __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }}
          />
        ))}
      </div>
      
      <div style={{ marginTop: '32px' }}>
        <Space size={[8, 16]} wrap>
          {tags.map((tag) => (
            <Tag
              key={tag}
              style={{
                padding: '8px 16px',
                borderRadius: '24px',
                fontSize: '15px',
                background: 'rgba(83, 29, 171, 0.12)',
                border: '1px solid rgba(83, 29, 171, 0.3)',
                color: '#531dab',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              className="hover-effect"
            >
              {tag}
            </Tag>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default SelfIntroduction;