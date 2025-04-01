import React from 'react';
import { Row, Col, Avatar, Typography, Tag, Space } from 'antd';
import Section from './Section';

interface AboutProps {
  id: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  const profile = {
    name: '蔡尚儒',
    title: '',
    avatar: '/my-photo.jpg',
    bio: `
      我最初接觸是因為想和朋友一起玩遊戲，於是上網自學 Minecraft Server，
    這讓我第一次認識到 伺服器架構與網路技術。直到 高中課堂上接觸IoT，
    我才真正對科技產生濃厚興趣，並開始深入學習 前後端開發。

      在這個過程中，我掌握了 Django 和 Flask 來開發後端，並使用 React 和
    Swift 開發前端。同時，學習使用 Nginx 來讓我的網站有個名字，並運用
    AWS 搭建 即時影像串流服務平台。此外，我也運用 Docker 來容器化應
    用，提升開發與部署效率。

      在競賽中，我通常負責 IoT 相關的電路設計與程式開發，包括 電源供應方
    案、繼電器控制等。未來，我希望結合 IoT 和 AI，開發智慧化應用來解決
    實際問題，同時深入研究 高效能後端架構與分散式系統技術。
    `,
    // email: 'xomaybeox@gmail.com',
    // phone: '0909262398',
    tags: ['Nginx', 'Django', 'Swift', 'Flask', 'React', 'Docker', 'AWS', 'Machine Learning', 'Network Security'],
  };

  const { Title } = Typography;

  return (
    <Section id={id} title="關於我" backgroundColor="#ffffff">
      <Row gutter={[32, 32]} align="top">
        <Col xs={24} sm={8} style={{ padding: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px', padding: '16px' }}>
            <Title level={2} style={{ 
              margin: '0 0 32px 0',
              color: '#1a1a1a',
              fontWeight: 600,
              lineHeight: 1.2
            }}>
              {profile.name}
            </Title>
            
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              size={200}
              style={{
                border: '4px solid white',
                borderRadius: '50%',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                transform: 'scale(1.05)',
                margin: '0 auto'
              }}
            />
          </div>
        </Col>
        <Col xs={24} sm={16}>
          <Title level={3} style={{ margin: '0 0 24px 0', color: '#4a6bff', fontWeight: 500 }}>
            {profile.title}
          </Title>
          <div style={{ fontSize: '18px', color: '#666666' }}>
            {profile.bio.split('\n\n').map((paragraph, index) => (
              <div 
                key={index}
                style={{ 
                  marginBottom: index < profile.bio.split('\n\n').length - 1 ? '16px' : '0',
                  lineHeight: 1.8
                }}
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            ))}
          </div>
          
          <div style={{ marginTop: '32px' }}>
            <Space size={[8, 16]} wrap>
              {profile.tags.map((tag) => (
                <Tag
                  key={tag}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '24px',
                    fontSize: '15px',
                    background: 'rgba(74, 107, 255, 0.12)',
                    border: '1px solid rgba(74, 107, 255, 0.3)',
                    color: '#4a6bff',
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
        </Col>
      </Row>
    </Section>
  );
};

export default About;