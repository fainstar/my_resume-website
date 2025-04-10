import React from 'react';
import { Avatar, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

interface ProfileInfoProps {
  name: string;
  avatar: string;
  email?: string;
  phone?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, avatar, email, phone }) => {
  const { Text } = Typography;

  return (
    <div style={{ textAlign: 'center', marginBottom: '48px', padding: '16px' }}>
      <Avatar
        src={avatar}
        alt={name}
        size={200}
        style={{
          border: '4px solid white',
          borderRadius: '50%',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          transform: 'scale(1.05)',
          margin: '0 auto 24px'
        }}
      />
      
      <Space direction="vertical" size={12} style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>{name}</Text>
        </div>
        
        {email && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MailOutlined style={{ marginRight: '8px', color: '#531dab' }} />
            <Text style={{ fontSize: '20px', color: '#666' }}>{email}</Text>
          </div>
        )}
        {phone && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PhoneOutlined style={{ marginRight: '8px', color: '#531dab' }} />
            <Text style={{ fontSize: '20px', color: '#666' }}>{phone}</Text>
          </div>
        )}
      </Space>
    </div>
  );
};

export default ProfileInfo;