import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import Section from './Section';
import styled from '@emotion/styled';
import { cardStyles } from '../styles/animations';

const StyledCard = styled(Card)`
  ${cardStyles.base}
  ${cardStyles.experience}
  &:hover {
    ${cardStyles.base['&:hover']}
    box-shadow: ${cardStyles.experience.hoverBoxShadow};
    background: ${cardStyles.experience.hoverBackground};
  }
`;

interface ExperienceProps {
  id: string;
}

const Experience: React.FC<ExperienceProps> = ({ id }) => {
  const { Title, Text } = Typography;
  
  const experiences = [
    {
      company: "鴻勁精密",
      position: "工讀生",
      period: "2024年7月 - 2024年9月",
      description: [
        "協助精密設備如 FT-Handler、CP-Prober 的組裝作業"
      ]
    },
    {
      company: "大智通",
      position: "工讀生",
      period: "2023年7月 - 2023年9月",
      description: [
        "參與物流流程，包括包裹分類、貨物搬運與倉儲整理"
      ]
    },
    {
      company: "全國加油站",
      position: "工讀生",
      period: "2022年6月 - 2022年9月",
      description: [
        "協助加油與收銀，接觸各類顧客、累積現場服務經驗"
      ]
    }
  ];

  return (
    <Section id={id} title="工作經驗" backgroundColor="#fff0f6">
      <Row gutter={[24, 24]}>
        {experiences.map((exp, index) => (
          <Col xs={24} sm={24} md={8} key={index}>
            <StyledCard>
              <Title level={4} style={{ margin: '0 0 8px 0', color: '#eb2f96' }}>
                {exp.position}
              </Title>
              <Title level={5} style={{ margin: '0 0 8px 0', color: '#666666' }}>
                {exp.company}
              </Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: '16px', fontSize: '0.9rem' }}>
                {exp.period}
              </Text>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                {exp.description.map((item, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: '#595959' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </StyledCard>
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Experience;