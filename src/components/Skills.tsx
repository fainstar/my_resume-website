import React from 'react';
import { Card, Tag, Typography, Row, Col } from 'antd';
import Section from './Section';
import styled from '@emotion/styled';
import { cardStyles } from '../styles/animations';

// 定義樣式常量
// 定義卡片標題樣式常量
const CARD_STYLES = {
  header: {
    fontSize: '1.5rem',
    color: '#f58220',
    marginBottom: '16px',
    fontWeight: 600
  }
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
  flexDirection: 'column' as const,
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
        { name: 'React', level: '★★★☆☆' },
        { name: 'Swift', level: '★★★☆☆' },
        { name: 'Flutter', level: '★★★☆☆' },
      ]
    },
    {
      title: '後端開發',
      skills: [
        { name: 'Django', level: '★★★★★' },
        { name: 'Flask', level: '★★★☆☆' },
      ]
    },
    {
      title: '基礎設施',
      skills: [
        { name: 'Git', level: '★★★★★' },
        { name: 'Nginx', level: '★★★☆☆' },
        { name: 'Docker', level: '★★★☆☆' },
        { name: 'AWS', level: '★☆☆☆☆' },
      ]
    },
    {
      title: 'IoT硬體平台',
      skills: [
        { name: 'ESP32/ESP8266', level: '★★★★★' },
        { name: 'STM32', level: '★★★☆☆' },
        { name: 'AMB82-mini', level: '★★★☆☆' },
        { name: 'TTGO Display', level: '★★★☆☆' }
      ]
    },
    {
      title: 'IoT開發環境',
      skills: [
        { name: 'MicroPython', level: '★★★★★' },
        { name: 'Arduino IDE', level: '★★★★★' },
        { name: 'Keil IDE', level: '★★★☆☆' }
      ]
    }
  ];

  return (
    <Section id={id} title="專業技能" backgroundColor="#fff7e6">
      <Row gutter={[24, 24]}>
        {skillCategories.map((category, index) => (
          <Col xs={24} md={8} key={index}>
            <StyledCard
              title={category.title}
              styles={{ header: CARD_STYLES.header }}
              className="skill-card"
            >
              <div style={SKILLS_CONTAINER_STYLE}>
                {category.skills.map((skill) => (
                  <div key={skill.name} style={SKILL_ITEM_STYLE}>
                    <Text strong style={{ fontSize: '1.1rem' }}>{skill.name}</Text>
                    <Tag style={TAG_STYLE}>
                      {skill.level}
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