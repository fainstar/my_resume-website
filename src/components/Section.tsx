import React from 'react';
import { Card } from 'antd';
import '../styles/animations.css';
import { UserOutlined, TrophyOutlined, BookOutlined, ExperimentOutlined, ContactsOutlined, HomeOutlined } from '@ant-design/icons';

const sectionIcons: { [key: string]: React.ReactNode } = {
  hero: <HomeOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />,
  about: <UserOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />,
  skills: <ExperimentOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />,
  education: <BookOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />,
  experience: <ExperimentOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />,
  achievement: <TrophyOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />,
  contact: <ContactsOutlined style={{ fontSize: '2rem', marginRight: '12px' }} />
};

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  backgroundColor?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, backgroundColor = '#ffffff' }) => {
  const getBackgroundGradient = (id: string) => {
    switch (id) {
      case 'hero':
        return 'linear-gradient(to bottom, #e6f7ff 0%, #ffffff 100%)';
      case 'about':
        return 'linear-gradient(to bottom, #f9f0ff 0%, #ffffff 100%)';
      case 'skills':
        return 'linear-gradient(to bottom, #fff7e6 0%, #ffffff 100%)';
      case 'education':
        return 'linear-gradient(to bottom, #e6f4ff 0%, #ffffff 100%)';
      case 'experience':
        return 'linear-gradient(to bottom, #fff0f6 0%, #ffffff 100%)';
      case 'achievement':
        return 'linear-gradient(to bottom, #f6ffed 0%, #ffffff 100%)';
      case 'contact':
        return 'linear-gradient(to bottom, #e6fffb 0%, #ffffff 100%)';
      default:
        return `linear-gradient(to bottom, ${backgroundColor} 0%, #ffffff 100%)`;
    }
  };

  return (
    <section
      id={id}
      style={{
        padding: '80px 24px',
        background: getBackgroundGradient(id),
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.5s ease'
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <h2 className="section-title" style={{
          fontSize: '2.5rem',
          fontWeight: 600,
          marginBottom: '48px',
          textAlign: 'left',
          background: id === 'experience' ? 'linear-gradient(45deg, #ff4d94 30%, #d4237a 90%)'
            : id === 'achievement' ? 'linear-gradient(45deg, #389e0d 30%, #237804 90%)'
            : id === 'hero' ? 'linear-gradient(45deg, #2b4acb 30%, #0d47a1 90%)'
            : id === 'about' ? 'linear-gradient(45deg, #531dab 30%, #391085 90%)'
            : id === 'skills' ? 'linear-gradient(45deg, #ff7a45 30%, #ff9a45 90%)'
            : id === 'education' ? 'linear-gradient(45deg, #096dd9 30%, #003a8c 90%)'
            : id === 'contact' ? 'linear-gradient(45deg, #08979c 30%, #006d75 90%)'
            : 'linear-gradient(45deg, #2b4acb 30%, #0d47a1 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          paddingLeft: '20px'
        }}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {sectionIcons[id]}
            {title}
          </span>
        </h2>
        <Card
          style={{
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            border: 'none'
          }}
        >
          {children}
        </Card>
      </div>
    </section>
  );
};

export default Section;