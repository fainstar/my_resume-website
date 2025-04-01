import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { TrophyOutlined } from '@ant-design/icons';
import Section from './Section';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  background: linear-gradient(145deg, #ffffff 0%, #f6ffed 100%);
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(0);
  opacity: 1;
  animation: slideIn 0.8s ease-out;
  transition: all 0.3s ease-in-out;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(82, 196, 26, 0.15);
    background: linear-gradient(145deg, #ffffff 0%, #e6ffe6 100%);
  }

  .trophy-icon {
    color: #52c41a;
    font-size: 24px;
    margin-bottom: 16px;
    animation: trophyShine 2s infinite;
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

  @keyframes trophyShine {
    0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
    50% { transform: scale(1.2) rotate(10deg); filter: brightness(1.3); }
    100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
  }
`;

interface AchievementProps {
  id: string;
}

const Achievement: React.FC<AchievementProps> = ({ id }) => {
  const { Title, Text } = Typography;

  const achievements = [
    {
      date: '2025年3月',
      title: '資工系黑克松',
      award: '第二名'
    },
    {
      date: '2024年4月',
      title: '資工系黑客松',
      award: '第一名'
    },
    {
      date: '2024年4月',
      title: '逢甲大學 112 學年度創新創意 iDEA 簡報大賽',
      award: '創新優勝獎'
    },
    {
      date: '2024年4月',
      title: '技職盃黑克松競賽 (全國賽)',
      award: '佳作'
    },
    {
      date: '2024年4月',
      title: '技職盃黑克松競賽 (南區分區賽)',
      award: '佳作'
    },
    {
      date: '2023年11月',
      title: '黑客松賽前賽',
      award: '最佳創造價值獎'
    },
    {
      date: '2023年11月',
      title: '中山醫學大學全國大專院校創新、創意及創業競賽',
      award: '初賽佳作'
    },
    {
      date: '2023年3月',
      title: '黑客松團體競賽',
      award: '第一名'
    },
    {
      date: '2022年3月',
      title: '全國高級中等學校電機與電子群 111 年專題及創意製作競賽',
      award: '專題組 佳作'
    },
    {
      date: '2021年11月',
      title: '全國高級中等學校工業類學生技藝競賽',
      award: '工業電子 優勝'
    }
  ];

  return (
    <Section id={id} title="競賽成就" backgroundColor="#f6ffed">
      <Row gutter={[24, 24]}>
        {achievements.map((achievement, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <StyledCard>
              <TrophyOutlined className="trophy-icon" />
              <Title level={5} style={{ color: '#389e0d', marginBottom: '8px' }}>
                {achievement.title}
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
  );
};

export default Achievement;