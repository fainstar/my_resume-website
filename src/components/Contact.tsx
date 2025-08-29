import React, { useState } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined, SendOutlined, CheckCircleOutlined, CloseCircleOutlined, GithubOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Section from './Section';

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = ({ id }) => {
  interface FormValues {
    name: string;
    email: string;
    message: string;
    subject: string; 
  }
  
  const [form] = Form.useForm<FormValues>();
  const { Text } = Typography;
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    content: string;
    icon: React.ReactNode;
    okText: string;
  }>({ title: '', content: '', icon: null, okText: '' });

  // 處理表單提交
  const onFinish = async (values: FormValues) => {
    const { name, email, subject, message: messageContent } = values;
     
    // 構建Google表單提交URL
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfgWype8_GbiDZDhciipjgta51srtsPkyBWVofQ6zrkZRYOKQ/formResponse';
    const formData = new FormData();
    formData.append('entry.1298446987', name);
    formData.append('entry.2013687626', email);
    formData.append('entry.965733187', subject);
    formData.append('entry.1305536463', messageContent);

    try {
      // 顯示提交中的狀態
      setModalConfig({
        title: t('contact.sending', '傳送中'),
        content: t('contact.sendingMessage', '正在傳送您的訊息，請稍候...'),
        icon: <SendOutlined style={{ color: '#1890ff', fontSize: '24px' }} />,
        okText: t('contact.pleaseWait', '請稍候')
      });
      setIsModalVisible(true);
      
      // 使用fetch提交表單
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // 由於Google表單的跨域限制
        body: formData
      });

      // 由於no-cors模式，我們無法獲取具體的響應狀態
      // 但如果沒有拋出錯誤，就認為提交成功
      setModalConfig({
        title: t('contact.sendSuccess', '傳送成功'),
        content: t('contact.successMessage', '您的訊息已成功傳送！我們會盡快回覆您。'),
        icon: <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />,
        okText: t('contact.confirm', '確定')
      });
      form.resetFields();
    } catch (error) {
      console.error('提交表單時發生錯誤:', error);
      setModalConfig({
        title: t('contact.sendFailed', '傳送失敗'),
        content: t('contact.failedMessage', '很抱歉，傳送失敗。請稍後再試！'),
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />,
        okText: t('contact.close', '關閉')
      });
    }
  };

  // 聯絡資訊數據
  const contactInfo = [
    {
      icon: <MailOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: t('contact.email'),
      content: <a href="mailto:xomaybeox@gmail.com" style={{ color: '#1890ff', textDecoration: 'none', fontWeight: 500 }}>xomaybeox@gmail.com</a>
    },
    {
      icon: <PhoneOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      title: t('contact.phone', '聯絡電話'),
      content: <a href="tel:(886)909262309" style={{ color: '#52c41a', textDecoration: 'none', fontWeight: 500 }}>(886)909262309</a>
    },
    {
      icon: <GithubOutlined style={{ fontSize: '24px', color: '#333' }} />,
      title: 'GitHub',
      content: <a href="https://github.com/fainstar" target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none', fontWeight: 500 }}>fainstar</a>
    },
    // {
    //   icon: <InstagramOutlined style={{ fontSize: '24px', color: '#e1306c' }} />,
    //   title: 'Instagram',
    //   content: <a href="https://instagram.com/ru.0811" target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', textDecoration: 'none', fontWeight: 500 }}>ru.0811</a>
    // }
  ];

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Section id={id} title={t('nav.contact')} backgroundColor="#f0f5ff">
      <Modal
        title={modalConfig.title}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        okText={modalConfig.okText}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
      >
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          {modalConfig.icon}
          <Typography.Text style={{ display: 'block', marginTop: '16px' }}>
            {modalConfig.content}
          </Typography.Text>
        </div>
      </Modal>
      <Row gutter={[24, 24]}>
        {/* 聯絡資訊卡片 */}
        <Col xs={24} md={8}>
          <Card
            style={{
              height: '100%',
              background: 'linear-gradient(145deg, #ffffff 0%, #f0f5ff 100%)',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}
          >
            <Space direction="vertical" size={24} style={{ width: '100%' }}>
              {contactInfo.map((info, index) => (
                <Space key={index} size={16} align="start">
                  {info.icon}
                  <div>
                    <Text type="secondary" style={{ display: 'block', marginBottom: '4px' }}>
                      {info.title}
                    </Text>
                    <Text strong>{info.content}</Text>
                  </div>
                </Space>
              ))}
            </Space>
          </Card>
        </Col>

        {/* 聯絡表單 */}
        <Col xs={24} md={16}>
          <Card
            style={{
              background: 'linear-gradient(145deg, #ffffff 0%, #f0f5ff 100%)',
              border: 'none',
              borderRadius: '16px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              style={{ width: '100%' }}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label={t('contact.name')}
                    rules={[{ required: true, message: t('contact.nameRequired', '請輸入您的稱呼') }]}
                  >
                    <Input size="large" placeholder={t('contact.namePlaceholder', '請輸入您的稱呼')} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label={t('contact.email')}
                    rules={[
                      { required: true, message: t('contact.emailRequired', '請輸入您的電子郵件') },
                      { type: 'email', message: t('contact.emailInvalid', '請輸入有效的電子郵件地址') }
                    ]}
                  >
                    <Input size="large" placeholder={t('contact.emailPlaceholder', '請輸入您的電子郵件')} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="subject"
                label={t('contact.subject', '主旨')}
                rules={[{ required: true, message: t('contact.subjectRequired', '請輸入主旨') }]}
              >
                <Input size="large" placeholder={t('contact.subjectPlaceholder', '請輸入主旨')} />
              </Form.Item>

              <Form.Item
                name="message"
                label={t('contact.message')}
                rules={[{ required: true, message: t('contact.messageRequired', '請輸入訊息內容') }]}
              >
                <Input.TextArea
                  size="large"
                  rows={4}
                  placeholder={t('contact.messagePlaceholder', '請輸入您想傳達的訊息')}
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SendOutlined />}
                  style={{
                    background: 'linear-gradient(45deg, #1890ff 30%, #69c0ff 90%)',
                    border: 'none',
                    borderRadius: '8px',
                    height: '48px',
                    padding: '0 32px'
                  }}
                >
                  {t('contact.send')}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Section>
  );
};

export default Contact;