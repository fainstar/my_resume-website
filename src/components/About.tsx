import React from 'react';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import Section from './Section';
import ProfileInfo from './ProfileInfo';
import SelfIntroduction from './SelfIntroduction';

interface AboutProps {
  id: string;
}

const About: React.FC<AboutProps> = ({ id }) => {
  const { t } = useTranslation();
  const profile = {
    name: t('about.name'),
    title: t('about.title'),
    avatar: '/my-photo.jpg',
    bio: t('about.bio'),
    email: 'xomaybeox@gmail.com',
    phone: '0909262309',
    tags: ['Nginx', 'Django', 'Swift', 'Flask', 'React', 'Docker', 'AWS', 'Machine Learning'],
  };

  return (
    <Section id={id} title={t('nav.about')} backgroundColor="#ffffff">
      <Row gutter={[32, 32]} align="top">
        <Col xs={24} sm={8} style={{ padding: '24px' }}>
          {/* 基本資料區塊 */}
          <ProfileInfo name={profile.name} avatar={profile.avatar} email={profile.email} phone={profile.phone} />
        </Col>
        <Col xs={24} sm={16}>
          {/* 自我介紹區塊 */}
          <SelfIntroduction title={profile.title} bio={profile.bio} tags={profile.tags} />
        </Col>
      </Row>
    </Section>
  );
};

export default About;