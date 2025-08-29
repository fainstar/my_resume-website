import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
  const experiences = [
    {
      company: t('experience.company1'),
      position: t('experience.position1'),
      period: t('experience.period1'),
      description: [
        t('experience.description1')
      ]
    },
    {
      company: t('experience.company2'),
      position: t('experience.position2'),
      period: t('experience.period2'),
      description: [
        t('experience.description2')
      ]
    },
    {
      company: t('experience.company3'),
      position: t('experience.position3'),
      period: t('experience.period3'),
      description: [
        t('experience.description3')
      ]
    }
  ];

  return (
    <Section id={id} title={t('nav.experience')} backgroundColor="#fff0f6">
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