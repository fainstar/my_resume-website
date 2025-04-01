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
      company: '鴻勁精密',
      position: '工讀生',
      period: '2024年7月 - 2024年9月',
      description: [
        '負責FT-Handler、CP-Prober等精密設備的組裝與測試',
        '嚴格執行工業設備組裝SOP流程，確保產品品質符合標準',
        '與團隊成員協同作業，優化組裝效率並提升產能',
        '累積工業製造領域的專業知識與實務經驗'
      ]
    },
    {
      company: '大智通',
      position: '工讀生',
      period: '2023年7月 - 2023年9月',
      description: [
        '負責包裹分類、貨物搬運、倉儲管理等物流作業',
        '優化倉儲空間利用率，提升物流作業效率20%',
        '嚴格執行貨品盤點與文件管理，確保帳物相符',
        '在快節奏工作環境中展現高效執行力與應變能力'
      ]
    },
    {
      company: '全國加油站',
      position: '工讀生',
      period: '2022年6月 - 2022年9月',
      description: [
        '提供專業加油服務與油品諮詢，提升顧客滿意度',
        '準確執行收銀作業與現金管理，帳務零誤差',
        '維護加油站環境整潔與安全，通過所有安檢評核',
        '累積豐富的顧客服務經驗與溝通協調能力',
        '培養高度責任心與注重細節的工作態度'
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