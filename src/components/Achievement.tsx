import React, { useState } from 'react';
import { Card, Typography, Row, Col, Modal, Image } from 'antd';
import { TrophyOutlined, PictureOutlined } from '@ant-design/icons';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const achievements: Achievement[] = [
    {
      date: '2025年4月',
      title: '技職盃黑克松競賽 (南區分區賽)',
      award: '佳作',
      imageSrc: '/202504南區黑.jpg', 
      description: '開發冷氣節能方案，依據教室課表自動控制冷氣開關，達成節能與成本效益。'
    },
    {
      date: '2025年3月',
      title: '資工系黑克松',
      award: '第二名',
      imageSrc: '', 
      description: ''
    },
    {
      date: '2024年4月',
      title: '資工系黑客松',
      award: '第一名',
      imageSrc: '/202405高科資.jpg', 
      description: '提出校園智慧降溫系統，提升教室環境舒適度與能源使用效率。'
    },
    {
      date: '2024年4月',
      title: '逢甲大學 112 學年度創新創意 iDEA 簡報大賽',
      award: '創新優勝獎',
      imageSrc: '/202405逢甲創.PNG', 
      description: '以創新簡報形式，展示未來科技發展的願景與創意構想。'
    },
    {
      date: '2024年4月',
      title: '技職盃黑克松競賽 (全國賽)',
      award: '佳作',
      imageSrc: '/202406全國黑.jpg',
      description: ''
    },
    {
      date: '2024年4月',
      title: '技職盃黑克松競賽 (南區分區賽)',
      award: '佳作',
      imageSrc: '/202405南區黑.jpg',
      description: '開發「深山求救盒」，具備即時求救與定位功能，協助迷途者迅速脫困。'
    },
    {
      date: '2023年11月',
      title: '黑客松賽前賽',
      award: '最佳創造價值獎',
      imageSrc: '', 
      description: ''
    },
    {
      date: '2023年11月',
      title: '中山醫學大學全國大專院校創新、創意及創業競賽',
      award: '初賽佳作',
      imageSrc: '/202311中山醫.jpg', 
      description: '與高山茶農深度訪談後，設計智能農業解決方案，提升茶葉產量與品質。'
    },
    {
      date: '2023年3月',
      title: '黑客松團體競賽',
      award: '第一名',
      imageSrc: '/202303高科資.png',
      description: '開發校園室內導航系統，協助新生快速找到教室與資源。'
    },
    {
      date: '2022年3月',
      title: '全國高級中等學校電機與電子群111年專題及創意製作競賽',
      award: '專題組 佳作',
      imageSrc: '/202203高資專.png',
      description: '設計智能聲控檯燈，結合語音模組與省電功能。'
    },
    {
      date: '2021年11月',
      title: '全國高級中等學校工業類學生技藝競賽',
      award: '工業電子 優勝',
      imageSrc: '/202111高工電.png',
      description: '以 STM32 為核心，實作工業電子控制應用。'
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
      <Section id={id} title="競賽成就" backgroundColor="#f6ffed">
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
              <strong>獎項:</strong> {selectedAchievement.award} | <strong>日期:</strong> {selectedAchievement.date}
            </Typography.Paragraph>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography.Title level={4}>暫無相關圖片</Typography.Title>
            <Typography.Paragraph>
              <strong>獎項:</strong> {selectedAchievement?.award} | <strong>日期:</strong> {selectedAchievement?.date}
            </Typography.Paragraph>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Achievement;