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
    bio: '我最初接觸是因為想和朋友一起玩遊戲，於是上網自學 Minecraft Server，這讓我第一次認識到伺服器架構與網路技術。在高中課堂上接觸IoT後，我對科技產生濃厚興趣，開始深入學習前後端開發。我掌握了Django和Flask來開發後端，並使用React和Swift開發前端，同時學習使用Nginx和AWS搭建即時影像串流服務平台。在競賽中，我主要負責IoT相關的電路設計與程式開發。未來，我希望結合IoT和AI，開發智慧化應用來解決實際問題，同時深入研究高效能後端架構與分散式系統技術。',
    email: 'xomaybeox@gmail.com',
    phone: '0909262398',
    tags: ['Nginx', 'Django', 'Swift', 'Flask', 'React', 'Docker', 'AWS', 'Machine Learning', 'Network Security'],
  };

  const { Title, Paragraph } = Typography;

  return (
    <Section id={id} title="關於我" backgroundColor="#ffffff">
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
          <Avatar
            src={profile.avatar}
            alt={profile.name}
            size={200}
            style={{ 
              border: '4px solid white',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
            }}
          />
        </Col>
        <Col xs={24} sm={16}>
          <Title level={2} style={{ margin: '0 0 8px 0', color: '#1a1a1a', fontWeight: 600 }}>
            {profile.name}
          </Title>
          <Title level={3} style={{ margin: '0 0 24px 0', color: '#4a6bff', fontWeight: 500 }}>
            {profile.title}
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666666', marginBottom: '24px' }}>
            {profile.bio}
          </Paragraph>
          
          <div style={{ marginTop: '16px' }}>
            <Space size={[8, 16]} wrap>
              {profile.tags.map((tag) => (
                <Tag
                  key={tag}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                    background: 'rgba(74, 107, 255, 0.08)',
                    border: '1px solid rgba(74, 107, 255, 0.2)',
                    color: '#4a6bff',
                    fontWeight: 500
                  }}
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