import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import Section from './Section';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  background: linear-gradient(145deg, #ffffff 0%, #fff0f6 100%);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(0);
  opacity: 1;
  animation: slideIn 0.8s ease-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

interface ExperienceProps {
  id: string;
}

const Experience: React.FC<ExperienceProps> = ({ id }) => {
  const { Title, Text } = Typography;
  
  const experiences = [
    {
      company: '鴻勁精密',
      position: '工讀生',
      period: '2024年7月 - 2024年9月',
      description: [
        '協助組裝FT-Handler、CP-Prober等設備',
        '學習工業設備組裝流程和品質管控',
        '培養團隊合作和實務操作能力',
        '累積工業製造領域的實務經驗'
      ]
    },
    {
      company: '大智通',
      position: '工讀生',
      period: '2023年7月 - 2023年9月',
      description: [
        '負責包裹分類、貨物搬運、倉儲管理、文件處理等',
        '學習物流作業流程和效率優化方法',
        '培養細心、耐心和時間管理能力',
        '提升在快節奏環境中工作的能力'
      ]
    },
    {
      company: '全國加油站',
      position: '工讀生',
      period: '2022年6月 - 2022年9月',
      description: [
        '提供顧客加油服務和相關諮詢',
        '負責收銀和帳務處理',
        '維護加油站環境清潔和安全',
        '學習與不同顧客溝通和應對的技巧',
        '培養責任感和細節導向的工作態度'
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