import React from 'react';
import { Card, Tag, Typography, Row, Col } from 'antd';
import Section from './Section';
import styled from '@emotion/styled';
import { cardStyles } from '../styles/animations';

// 定義樣式常量
const CARD_HEAD_STYLE = {
  fontSize: '1.5rem',
  color: '#f58220',
  marginBottom: '16px',
  fontWeight: 600
};

// 定義標籤樣式常量
const TAG_STYLE = {
  fontSize: '0.9rem',
  padding: '4px 12px',
  borderRadius: '12px',
  backgroundColor: '#fff7e6',
  color: '#f58220',
  border: '1px solid #f58220',
  fontWeight: 500
};

// 定義技能項樣式常量
const SKILL_ITEM_STYLE = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0'
};

// 定義技能列表容器樣式
const SKILLS_CONTAINER_STYLE = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px'
};

const StyledCard = styled(Card)`
  ${cardStyles.base}
  ${cardStyles.skills}
  &:hover {
    ${cardStyles.base['&:hover']}
    box-shadow: ${cardStyles.skills.hoverBoxShadow};
    background: ${cardStyles.skills.hoverBackground};
  }
`;

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
    <Section id={id} title="專業技能" backgroundColor="#fff7e6">
      <Row gutter={[24, 24]}>
        {skillCategories.map((category, index) => (
          <Col xs={24} md={8} key={index}>
            <StyledCard
              title={category.title}
              headStyle={CARD_HEAD_STYLE}
              className="skill-card"
            >
              <div style={SKILLS_CONTAINER_STYLE}>
                {category.skills.map((skill) => (
                  <div key={skill.name} style={SKILL_ITEM_STYLE}>
                    <Text strong style={{ fontSize: '1.1rem' }}>{skill.name}</Text>
                    <Tag style={TAG_STYLE}>
                      {getStarRating(skill.level)}
                    </Tag>
                  </div>
                ))}
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Skills;