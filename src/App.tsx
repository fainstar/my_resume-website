import { ConfigProvider, Layout } from 'antd';
import './App.css';
// import theme from './theme';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Achievement from './components/Achievement';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// 主頁面組件
const HomePage = () => {
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
  );
}

// 博客頁面組件包裝器
const BlogPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/');
  return <Blog onBack={handleBack} />;
}

// 主應用組件
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/post/:id" element={<BlogPost />} />
      </Routes>
    </Router>
  );
}

export default App;
