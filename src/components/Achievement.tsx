import React, { useState } from 'react';
import { Card, Typography, Row, Col, Modal, Image } from 'antd';
import { TrophyOutlined, PictureOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import styled from '@emotion/styled';

import { cardStyles, trophyShine } from '../styles/animations';

const StyledCard = styled(Card)`
  ${cardStyles.base}
  ${cardStyles.achievement}
  cursor: pointer;

  &:hover {
    ${cardStyles.base['&:hover']}
    box-shadow: ${cardStyles.achievement.hoverBoxShadow};
    background: ${cardStyles.achievement.hoverBackground};
  }

  .trophy-icon {
    color: #52c41a;
    font-size: 24px;
    margin-bottom: 16px;
    animation: ${trophyShine} 2s infinite;
  }
  
  .picture-icon {
    color: #1890ff;
    font-size: 16px;
    margin-left: 8px;
  }
`;

interface AchievementProps {
  id: string;
}

interface Achievement {
  date: string;
  title: string;
  award: string;
  imageSrc?: string;
  description?: string;
}

const Achievement: React.FC<AchievementProps> = ({ id }) => {
  const { Title, Text } = Typography;
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      date: t('achievement.date1'),
      title: t('achievement.title1'),
      award: t('achievement.award1'),
      imageSrc: '/202504南區黑.jpg', 
      description: t('achievement.description1')
    },
    {
      date: t('achievement.date2'),
      title: t('achievement.title2'),
      award: t('achievement.award2'),
      imageSrc: '', 
      description: ''
    },
    {
      date: t('achievement.date3'),
      title: t('achievement.title3'),
      award: t('achievement.award3'),
      imageSrc: '/202405高科資.jpg', 
      description: t('achievement.description3')
    },
    {
      date: t('achievement.date4'),
      title: t('achievement.title4'),
      award: t('achievement.award4'),
      imageSrc: '/202405逢甲創.PNG', 
      description: t('achievement.description4')
    },
    {
      date: t('achievement.date5'),
      title: t('achievement.title5'),
      award: t('achievement.award5'),
      imageSrc: '/202406全國黑.jpg',
      description: ''
    },
    {
      date: t('achievement.date6'),
      title: t('achievement.title6'),
      award: t('achievement.award6'),
      imageSrc: '/202405南區黑.jpg',
      description: t('achievement.description6')
    },
    {
      date: t('achievement.date7'),
      title: t('achievement.title7'),
      award: t('achievement.award7'),
      imageSrc: '', 
      description: ''
    },
    {
      date: t('achievement.date8'),
      title: t('achievement.title8'),
      award: t('achievement.award8'),
      imageSrc: '/202311中山醫.jpg', 
      description: t('achievement.description8')
    },
    {
      date: t('achievement.date9'),
      title: t('achievement.title9'),
      award: t('achievement.award9'),
      imageSrc: '/202303高科資.png',
      description: t('achievement.description9')
    },
    {
      date: t('achievement.date10'),
      title: t('achievement.title10'),
      award: t('achievement.award10'),
      imageSrc: '/202203高資專.png',
      description: t('achievement.description10')
    },
    {
      date: t('achievement.date11'),
      title: t('achievement.title11'),
      award: t('achievement.award11'),
      imageSrc: '/202111高工電.png',
      description: t('achievement.description11')
    }
  ];
  

  const handleCardClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Section id={id} title={t('nav.achievement')} backgroundColor="#f6ffed">
        <Row gutter={[24, 24]}>
          {achievements.map((achievement, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <StyledCard onClick={() => handleCardClick(achievement)}>
                <TrophyOutlined className="trophy-icon" />
                <Title level={5} style={{ color: '#389e0d', marginBottom: '8px' }}>
                  {achievement.title}
                  {achievement.imageSrc && <PictureOutlined className="picture-icon" />}
                </Title>
                <Text strong style={{ fontSize: '1.1em', color: '#52c41a', display: 'block', marginBottom: '8px' }}>
                  {achievement.award}
                </Text>
                <Text type="secondary" style={{ fontSize: '0.9em' }}>
                  {achievement.date}
                </Text>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Section>
      
      <Modal 
        title={selectedAchievement?.title} 
        open={isModalOpen} 
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedAchievement?.imageSrc ? (
          <div style={{ textAlign: 'center' }}>
            <Image
              src={selectedAchievement.imageSrc}
              alt={selectedAchievement.title}
              style={{ maxWidth: '100%', maxHeight: '500px' }}
            />
            {selectedAchievement.description && (
              <Typography.Paragraph style={{ marginTop: '16px', fontSize: '16px' }}>
                {selectedAchievement.description}
              </Typography.Paragraph>
            )}
            <Typography.Paragraph type="secondary" style={{ marginTop: '8px' }}>
              <strong>{t('achievement.awardLabel')}:</strong> {selectedAchievement.award} | <strong>{t('achievement.dateLabel')}:</strong> {selectedAchievement.date}
            </Typography.Paragraph>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography.Title level={4}>{t('achievement.noImage')}</Typography.Title>
            <Typography.Paragraph>
              <strong>{t('achievement.awardLabel')}:</strong> {selectedAchievement?.award} | <strong>{t('achievement.dateLabel')}:</strong> {selectedAchievement?.date}
            </Typography.Paragraph>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Achievement;