import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Achievement from '../components/Achievement';
import SpecialExperience from '../components/SpecialExperience';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * 首頁組件
 * 包含個人履歷的主要內容區塊
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // 定義網站各區塊
  const sections = [
    { id: 'about', title: t('nav.about') },
    { id: 'skills', title: t('nav.skills') },
    { id: 'experience', title: t('nav.experience') },
    { id: 'education', title: t('nav.education') },
    { id: 'achievement', title: t('nav.achievement') },
    { id: 'specialExperience', title: t('nav.specialExperience') },
    { id: 'contact', title: t('nav.contact') }
  ];

  // 處理區塊點擊事件，滾動到對應區塊
  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 64; // 頂部導航欄高度
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ErrorBoundary>
      <ConfigProvider>
        <Layout style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          background: '#fff'
        }}>
          <Header sections={sections} onSectionClick={handleSectionClick} />
          
          {/* 主要內容區域，添加頂部間距以避免被Header覆蓋 */}
          <Layout.Content style={{ flex: 1, paddingTop: 80 }}>
            <About id="about" />
            <Skills id="skills" />
            <Experience id="experience" />
            <Education id="education" />
            <Achievement id="achievement" />
            <SpecialExperience id="specialExperience" />
            <Contact id="contact" />
          </Layout.Content>
          
          <Footer />
        </Layout>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default HomePage;