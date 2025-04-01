import React, { useState } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined, SendOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Section from './Section';

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = ({ id }) => {
  const [form] = Form.useForm();
  const { Text } = Typography;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    content: string;
    icon: React.ReactNode;
    okText: string;
  }>({ title: '', content: '', icon: null, okText: '' });

  // 處理表單提交
  const onFinish = async (values: any) => {
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
        title: '傳送中',
        content: '正在傳送您的訊息，請稍候...',
        icon: <SendOutlined style={{ color: '#1890ff', fontSize: '24px' }} />,
        okText: '請稍候'
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
        title: '傳送成功',
        content: '您的訊息已成功傳送！我們會盡快回覆您。',
        icon: <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />,
        okText: '確定'
      });
      form.resetFields();
    } catch (error) {
      console.error('提交表單時發生錯誤:', error);
      setModalConfig({
        title: '傳送失敗',
        content: '很抱歉，傳送失敗。請稍後再試！',
        icon: <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />,
        okText: '關閉'
      });
    }
  };

  // 聯絡資訊數據
  const contactInfo = [
    {
      icon: <MailOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      title: '電子郵件',
      content: 'xomaybeox@gmail.com'
    },
    {
      icon: <PhoneOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      title: '聯絡電話',
      content: '0909262309'
    }
  ];

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Section id={id} title="聯絡我" backgroundColor="#f0f5ff">
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
                    label="姓名"
                    rules={[{ required: true, message: '請輸入您的稱呼' }]}
                  >
                    <Input size="large" placeholder="請輸入您的稱呼" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="電子郵件"
                    rules={[
                      { required: true, message: '請輸入您的電子郵件' },
                      { type: 'email', message: '請輸入有效的電子郵件地址' }
                    ]}
                  >
                    <Input size="large" placeholder="請輸入您的電子郵件" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="subject"
                label="主旨"
                rules={[{ required: true, message: '請輸入主旨' }]}
              >
                <Input size="large" placeholder="請輸入主旨" />
              </Form.Item>

              <Form.Item
                name="message"
                label="訊息內容"
                rules={[{ required: true, message: '請輸入訊息內容' }]}
              >
                <Input.TextArea
                  size="large"
                  rows={4}
                  placeholder="請輸入您想傳達的訊息"
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
                  送出訊息
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