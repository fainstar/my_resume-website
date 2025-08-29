import React from 'react';
import { Card, Row, Col, Typography, Tag, Space } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Section from './Section';

interface EducationProps {
  id: string;
}

const Education: React.FC<EducationProps> = ({ id }) => {
  const { t } = useTranslation();
  
  const educations = [
    {
      school: t('education.school'),
      degree: t('education.degree'),
      period: t('education.period'),
      description: t('education.description'),
      courses: [
        t('education.course1'),
        t('education.course2'),
        t('education.course3'),
        t('education.course4'),
        t('education.course5'),
        t('education.course6')
      ],
      image: '/university-placeholder.jpg'
    }
  ];

  const { Title, Text, Paragraph } = Typography;

  return (
    <Section id={id} title={t('nav.education')} backgroundColor="#e6fffb">
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
                  {t('education.mainCourses')}:
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