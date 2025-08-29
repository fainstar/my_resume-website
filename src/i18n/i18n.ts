import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  // 使用http後端加載翻譯文件
  .use(Backend)
  // 檢測用戶語言
  .use(LanguageDetector)
  // 將i18n實例傳遞給react-i18next
  .use(initReactI18next)
  // 初始化i18next
  .init({
    fallbackLng: 'zh-TW', // 默認語言
    supportedLngs: ['zh-TW', 'zh-CN', 'ja', 'ko'], // 支持的語言
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // 不需要為React轉義
    },
    
    // 語言檢測選項
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    
    // 後端配置
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 翻譯文件路徑
    },
  });

export default i18n;