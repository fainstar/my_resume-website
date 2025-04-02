import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Typography, Space, Drawer } from 'antd';
import { MenuOutlined, UserOutlined, TrophyOutlined, BookOutlined, ExperimentOutlined, ContactsOutlined, HomeOutlined, HistoryOutlined } from '@ant-design/icons';
import '../styles/animations.css';

const sectionIcons: { [key: string]: React.ReactNode } = {
  hero: <HomeOutlined />,
  about: <UserOutlined />,
  skills: <ExperimentOutlined />,
  education: <BookOutlined />,
  experience: <HistoryOutlined />,
  achievement: <TrophyOutlined />,
  contact: <ContactsOutlined />,
  blog: <BookOutlined />
};
import { useMediaQuery } from 'react-responsive';

interface HeaderProps {
  sections: { id: string; title: string }[];
  onSectionClick: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ sections, onSectionClick }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      const sections = document.querySelectorAll('section');
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (id: string) => {
    onSectionClick(id);
    setActiveSection(id);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  return (
    <Layout.Header 
      style={{
        background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(248,250,255,0.95))',
        padding: '0 24px',
        boxShadow: '0 4px 12px rgba(74, 107, 255, 0.12)',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        transition: 'all 0.3s',
        backdropFilter: 'blur(8px)',
        height: '80px',
        lineHeight: '80px'
      }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Typography.Title level={4} style={{ margin: 0, color: '#1a1a1a', fontWeight: 600 }}>
          </Typography.Title>
          
          {isMobile ? (
            <>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={handleDrawerToggle}
              />
              <Drawer
                placement="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                width={250}
              >
                <Menu mode="vertical">
                  {sections.map((section) => (
                    <Menu.Item 
                      key={section.id} 
                      onClick={() => handleSectionClick(section.id)} 
                      icon={sectionIcons[section.id]}
                      className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                    >
                      {section.title}
                    </Menu.Item>
                  ))}
                </Menu>
              </Drawer>
            </>
          ) : (
            <Space size="middle" style={{ justifyContent: 'center' }}>
              {sections.map((section) => (
                <Button
                  key={section.id}
                  type="text"
                  onClick={() => handleSectionClick(section.id)}
                  icon={sectionIcons[section.id]}
                  style={{
                    fontSize: '18px',
                    padding: '8px 24px',
                    transition: 'all 0.3s',
                    color: section.id === activeSection ? '#4a6bff' : '#1a1a1a',
                    fontWeight: 500,
                    background: section.id === activeSection ? 'rgba(74, 107, 255, 0.08)' : 'transparent'
                  }}
                  className="nav-button"
                >
                  {section.title}
                </Button>
              ))}
            </Space>
          )}
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;