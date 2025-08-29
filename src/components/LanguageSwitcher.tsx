import React from 'react';
import { useTranslation } from 'react-i18next'; // 引入i18n翻譯功能
import { Select } from 'antd'; // 引入Ant Design的Select組件
import { GlobalOutlined } from '@ant-design/icons'; // 引入全球圖標

const { Option } = Select; // 從Select中解構Option組件

/**
 * 語言切換組件
 * 允許用戶在繁體中文、簡體中文、日文和韓文之間切換
 * 使用Ant Design的Select組件實現下拉選單
 * 使用i18next進行多語言支持
 * 將選擇的語言保存在localStorage中以便持久化
 */
const LanguageSwitcher: React.FC = () => {
  // 使用i18n hook獲取翻譯功能和當前語言
  const { i18n, t } = useTranslation();

  /**
   * 處理語言變更的函數
   * @param value - 選擇的語言代碼 (zh-TW, zh-CN, ja, ko)
   */
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value); // 變更應用程式的當前語言
    // 將選擇的語言保存到本地存儲，以便在頁面刷新後保持語言設置
    localStorage.setItem('i18nextLng', value);
  };

  return (
    <div className="language-switcher" style={{ marginLeft: 16 }}>
      {/* 語言選擇下拉選單 */}
      <Select
        defaultValue={i18n.language} // 設置默認值為當前語言
        onChange={handleLanguageChange} // 當選擇變更時調用處理函數
        style={{ width: 120 }} // 設置選擇器寬度
        suffixIcon={<GlobalOutlined />} // 使用全球圖標作為後綴
        dropdownStyle={{ zIndex: 2000 }} // 確保下拉選單顯示在其他元素之上
      >
        {/* 語言選項，使用翻譯鍵獲取當前語言環境下的語言名稱 */}
        <Option value="zh-TW">{t('language.zh-TW')}</Option> {/* 繁體中文選項 */}
        <Option value="zh-CN">{t('language.zh-CN')}</Option> {/* 簡體中文選項 */}
        <Option value="ja">{t('language.ja')}</Option> {/* 日文選項 */}
        <Option value="ko">{t('language.ko')}</Option> {/* 韓文選項 */}
      </Select>
    </div>
  );
};

export default LanguageSwitcher;