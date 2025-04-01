import React from 'react';
import { Card, Tag, Typography, Row, Col } from 'antd';
import Section from './Section';
import '../styles/animations.css';

interface SkillProps {
  id: string;
}

const Skills: React.FC<SkillProps> = ({ id }) => {
  const { Text } = Typography;

  const skillCategories = [
    {
      title: '前端開發',
      skills: [
        { name: 'React', level: '專精' },
        { name: 'Swift', level: '普通' },
      ]
    },
    {
      title: '後端開發',
      skills: [
        { name: 'Django', level: '專精' },
        { name: 'Flask', level: '普通' },
      ]
    },
    {
      title: '基礎設施',
      skills: [
        { name: 'Git', level: '專精' },
        { name: 'Nginx', level: '普通' },
        { name: 'Docker', level: '普通' },
        { name: 'AWS', level: '初學' },
      ]
    },
    {
      title: 'IoT硬體平台',
      skills: [
        { name: 'ESP32/ESP8266', level: '專精' },
        { name: 'STM32', level: '普通' },
        { name: 'AMB82-mini', level: '普通' },
        { name: 'TTGO Display', level: '普通' }
      ]
    },
    {
      title: 'IoT開發環境',
      skills: [
        { name: 'MicroPython', level: '專精' },
        { name: 'Arduino IDE', level: '專精' },
        { name: 'Keil IDE', level: '普通' }
      ]
    }
  ];

  const getStarRating = (level: string) => {
    switch (level) {
      case '專精': return '★★★★★';
      case '普通': return '★★★☆☆';
      case '初學': return '★☆☆☆☆';
      default: return '☆☆☆☆☆';
    }
  };

  return (
    <Section id={id} title="專業技能" backgroundColor="#f7f0ff">
      <Row gutter={[24, 24]}>
        {skillCategories.map((category, index) => (
          <Col xs={24} md={8} key={index}>
            <Card
              title={category.title}
              headStyle={{
                fontSize: '1.5rem',
                background: 'linear-gradient(45deg, #722ed1 30%, #eb2f96 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              className="skill-card"
              style={{
                height: '100%',
                background: 'linear-gradient(145deg, #ffffff 0%, #f7f0ff 100%)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {category.skills.map((skill) => (
                  <div key={skill.name} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0'
                  }}>
                    <Text strong style={{ fontSize: '1.1rem' }}>{skill.name}</Text>
                    <Tag style={{
                      fontSize: '0.9rem',
                      padding: '4px 12px',
                      borderRadius: '12px'
                    }}>
                      {getStarRating(skill.level)}
                    </Tag>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Skills;