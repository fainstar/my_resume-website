import React from 'react';
import { Card, Row, Col, Typography, Tag, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import Section from './Section';

interface EducationProps {
  id: string;
}

const Education: React.FC<EducationProps> = ({ id }) => {
  const educations = [
    {
      school: '國立高雄科技大學',
      degree: '資訊工程學系學士',
      period: '2022年9月 - 2026年6月',
      description: '專注於網路安全和人工智能的研究，開發創新的AI DDOS防禦系統作為畢業專題。在學期間積極參與各類競賽，展現專業技能與團隊合作能力。',
      courses: ['演算法', '資料結構', '網路安全', '人工智慧', '機器學習', '資料庫系統'],
      image: '/university-placeholder.jpg'
    }
  ];

  const { Title, Text, Paragraph } = Typography;

  return (
    <Section id={id} title="教育背景" backgroundColor="#e6fffb">
      <Row gutter={[24, 24]}>
        {educations.map((edu, index) => (
          <Col xs={24} md={12} key={index}>
            <Card
              style={{
                height: '100%',
                background: 'linear-gradient(145deg, #ffffff 0%, #e6fffb 100%)',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease-in-out',
                transform: 'translateY(0)'
              }}
              hoverable
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <BookOutlined 
                  style={{ 
                    fontSize: '24px', 
                    color: '#13c2c2', 
                    marginRight: '12px',
                    transition: 'all 0.3s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(19, 194, 194, 0.5))';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'none';
                  }}
                />
                <div>
                  <Title level={4} style={{ margin: 0, color: '#1a1a1a' }}>{edu.school}</Title>
                  <Text type="secondary">{edu.period}</Text>
                </div>
              </div>
              
              <Title level={5} style={{ margin: '0 0 16px 0', color: '#13c2c2' }}>
                {edu.degree}
              </Title>
              
              <Paragraph style={{ color: '#595959', marginBottom: '16px' }}>
                {edu.description}
              </Paragraph>
              
              <div>
                <Text strong style={{ display: 'block', marginBottom: '8px', color: '#1a1a1a' }}>
                  主修課程：
                </Text>
                <Space size={[8, 16]} wrap>
                  {edu.courses.map((course, idx) => (
                    <Tag
                      key={idx}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: 'linear-gradient(45deg, #e6fffb 30%, #b5f5ec 90%)',
                        border: 'none',
                        color: '#006d75'
                      }}
                    >
                      {course}
                    </Tag>
                  ))}
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Education;