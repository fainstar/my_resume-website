import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Achievement from '../components/Achievement';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * 首頁組件
 * 包含個人履歷的主要內容區塊
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // 定義網站各區塊
  const sections = [
    { id: 'about', title: '關於我' },
    { id: 'skills', title: '專業技能' },
    { id: 'experience', title: '工作經驗' },
    { id: 'education', title: '教育背景' },
    { id: 'achievement', title: '競賽成就' },
    { id: 'contact', title: '聯絡我' },
    { id: 'blog', title: '網誌' },
  ];

  // 處理區塊點擊事件，滾動到對應區塊或導航到其他頁面
  const handleSectionClick = (id: string) => {
    if (id === 'blog') {
      navigate('/blog');
      return;
    }
    
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
            <Contact id="contact" />
          </Layout.Content>
          
          <Footer />
        </Layout>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default HomePage;