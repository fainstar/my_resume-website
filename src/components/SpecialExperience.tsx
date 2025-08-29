import React, { useState } from 'react'; // 引入React核心和useState鉤子
import { Card, Typography, Row, Col, Modal, Image } from 'antd'; // 引入Ant Design組件
import { TrophyOutlined, PictureOutlined, FileProtectOutlined } from '@ant-design/icons'; // 引入圖標組件
import { useTranslation } from 'react-i18next'; // 引入i18n翻譯功能
import Section from './Section'; // 引入自定義Section組件
import styled from '@emotion/styled'; // 引入emotion樣式庫

import { cardStyles, trophyShine } from '../styles/animations'; // 引入動畫樣式

/**
 * 自定義卡片組件，使用emotion樣式庫進行樣式設定
 * 繼承了成就卡片的樣式，並添加了證書特有的樣式
 */
const StyledCard = styled(Card)`
  ${cardStyles.base} // 應用基本卡片樣式
  ${cardStyles.achievement} // 應用成就卡片樣式
  cursor: pointer; // 設置滑鼠指針為手型，表示可點擊

  &:hover {
    ${cardStyles.base['&:hover']} // 應用基本卡片懸停樣式
    box-shadow: ${cardStyles.achievement.hoverBoxShadow}; // 懸停時的陰影效果
    background: ${cardStyles.achievement.hoverBackground}; // 懸停時的背景色
  }

  .certificate-icon { // 證書圖標樣式
    color: #1890ff; // 藍色
    font-size: 24px; // 圖標大小
    margin-bottom: 16px; // 底部間距
    animation: ${trophyShine} 2s infinite; // 應用閃爍動畫效果
  }
  
  .picture-icon { // 圖片圖標樣式
    color: #1890ff; // 藍色
    font-size: 16px; // 圖標大小
    margin-left: 8px; // 左側間距
  }
`;

/**
 * 特殊經歷組件的屬性接口
 */
interface SpecialExperienceProps {
  id: string; // 組件ID，用於導航和定位
}

/**
 * 證書數據接口，定義證書的基本信息結構
 */
interface Certificate {
  date: string; // 獲得日期
  title: string; // 證書名稱
  issuer: string; // 發行機構
  imageSrc?: string; // 證書圖片路徑（可選）
  description?: string; // 證書描述（可選）
}

/**
 * 特殊經歷組件，用於展示個人證書和特殊經歷
 * @param id - 組件ID，用於導航和定位
 */
const SpecialExperience: React.FC<SpecialExperienceProps> = ({ id }) => {
  // 從Typography中解構出需要的組件
  const { Title, Text } = Typography;
  // 使用i18n hook獲取翻譯功能
  const { t } = useTranslation();
  // 管理模態框開關狀態
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 管理當前選中的證書
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  /**
   * 證書數據數組，使用i18n翻譯鍵獲取多語言內容
   * 包含三個證書：勞動部證照、微軟AI-900證照和日本實習證明
   */
  const certificates: Certificate[] = [
    {
      date: t('specialExperience.date1'), // 獲得日期
      title: t('specialExperience.title1'), // 證書名稱
      issuer: t('specialExperience.issuer1'), // 發行機構
      imageSrc: '/labor_certificate.jpg', // 證書圖片路徑
      description: t('specialExperience.description1') // 證書描述
    },
    {
      date: t('specialExperience.date2'),
      title: t('specialExperience.title2'),
      issuer: t('specialExperience.issuer2'),
      imageSrc: '/AI-900.jpg', 
      description: t('specialExperience.description2')
    },
    {
      date: t('specialExperience.date3'),
      title: t('specialExperience.title3'),
      issuer: t('specialExperience.issuer3'),
      imageSrc: '/Japan.jpg', 
      description: t('specialExperience.description3')
    }
  ];
  

  /**
   * 處理卡片點擊事件，打開模態框並設置當前選中的證書
   * @param certificate - 被點擊的證書對象
   */
  const handleCardClick = (certificate: Certificate) => {
    setSelectedCertificate(certificate); // 設置當前選中的證書
    setIsModalOpen(true); // 打開模態框
  };

  /**
   * 處理模態框關閉事件
   */
  const handleModalClose = () => {
    setIsModalOpen(false); // 關閉模態框
  };

  return (
    <>
      {/* 使用Section組件作為容器，設置ID、標題和背景色 */}
      <Section id={id} title={t('nav.specialExperience')} backgroundColor="#e6f7ff">
        {/* 使用Row和Col組件創建響應式網格佈局 */}
        <Row gutter={[24, 24]}>
          {/* 遍歷證書數組，為每個證書創建一個卡片 */}
          {certificates.map((certificate, index) => (
            <Col xs={24} sm={12} md={8} key={index}> {/* 響應式列寬設置 */}
              {/* 自定義卡片組件，點擊時觸發handleCardClick函數 */}
              <StyledCard onClick={() => handleCardClick(certificate)}>
                {/* 證書圖標 */}
                <FileProtectOutlined className="certificate-icon" />
                {/* 證書標題 */}
                <Title level={5} style={{ color: '#1890ff', marginBottom: '8px' }}>
                  {certificate.title}
                  {/* 如果有圖片，顯示圖片圖標 */}
                  {certificate.imageSrc && <PictureOutlined className="picture-icon" />}
                </Title>
                {/* 發行機構 */}
                <Text strong style={{ fontSize: '1.1em', color: '#1890ff', display: 'block', marginBottom: '8px' }}>
                  {certificate.issuer}
                </Text>
                {/* 獲得日期 */}
                <Text type="secondary" style={{ fontSize: '0.9em' }}>
                  {certificate.date}
                </Text>
              </StyledCard>
            </Col>
          ))}
        </Row>
      </Section>
      
      {/* 模態框組件，用於顯示證書詳細信息 */}
      <Modal 
        title={selectedCertificate?.title} // 模態框標題為證書名稱
        open={isModalOpen} // 控制模態框顯示狀態
        onCancel={handleModalClose} // 關閉按鈕點擊事件
        footer={null} // 不顯示底部按鈕
        width={800} // 設置模態框寬度
      >
        {/* 條件渲染：如果有圖片則顯示圖片和詳細信息，否則顯示無圖片提示 */}
        {selectedCertificate?.imageSrc ? (
          <div style={{ textAlign: 'center' }}>
            {/* 證書圖片 */}
            <Image
              src={selectedCertificate.imageSrc}
              alt={selectedCertificate.title}
              style={{ maxWidth: '100%', maxHeight: '500px' }}
            />
            {/* 如果有描述則顯示描述 */}
            {selectedCertificate.description && (
              <Typography.Paragraph style={{ marginTop: '16px', fontSize: '16px' }}>
                {selectedCertificate.description}
              </Typography.Paragraph>
            )}
            {/* 顯示發行機構和日期信息 */}
            <Typography.Paragraph type="secondary" style={{ marginTop: '8px' }}>
              <strong>{t('specialExperience.issuerLabel')}:</strong> {selectedCertificate.issuer} | <strong>{t('specialExperience.dateLabel')}:</strong> {selectedCertificate.date}
            </Typography.Paragraph>
          </div>
        ) : (
          /* 無圖片時顯示的內容 */
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Typography.Title level={4}>{t('specialExperience.noImage')}</Typography.Title>
            <Typography.Paragraph>
              <strong>{t('specialExperience.issuerLabel')}:</strong> {selectedCertificate?.issuer} | <strong>{t('specialExperience.dateLabel')}:</strong> {selectedCertificate?.date}
            </Typography.Paragraph>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SpecialExperience;