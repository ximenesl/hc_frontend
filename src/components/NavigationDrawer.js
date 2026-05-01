import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Avatar, Typography } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  FileSearchOutlined,
  TeamOutlined,
  SettingOutlined,
  MessageOutlined,
  LogoutOutlined,
  BookOutlined,
  SolutionOutlined,
  LockOutlined
} from '@ant-design/icons';

import useAuth from '../hooks/useAuth';
import './NavigationDrawer.css';

const { Title, Text } = Typography;

const NavigationDrawer = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { userName, userRole, isAdmin, logout } = useAuth();

  const handleNavigation = (path) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    handleNavigation('/login');
  };

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      open={visible}
      width={320}
      styles={{
        body: {
          padding: 0,
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <div className="drawer-profile">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          className="profile-avatar"
        />
        <div className="profile-info">
          <Title level={4} className="profile-name">{userName}</Title>
          <Text className="profile-role">{userRole}</Text>
        </div>
      </div>

      <div className="drawer-menu">
        <div className="drawer-menu-item" onClick={() => handleNavigation('/home')}>
          <HomeOutlined className="drawer-icon" />
          <Text className="drawer-text">Home</Text>
        </div>
        <div className="drawer-divider" />

        <div className="drawer-menu-item" onClick={() => handleNavigation('/validation')}>
          <FileSearchOutlined className="drawer-icon" />
          <Text className="drawer-text">Validar Certificados</Text>
        </div>
        <div className="drawer-divider" />

        <div className="drawer-menu-item" onClick={() => handleNavigation('/students')}>
          <TeamOutlined className="drawer-icon" />
          <Text className="drawer-text">Gestão de Alunos</Text>
        </div>
        <div className="drawer-divider" />

        <div className="drawer-menu-item" onClick={() => handleNavigation('/courses')}>
          <BookOutlined className="drawer-icon" />
          <Text className="drawer-text">Gestão de Cursos</Text>
        </div>
        <div className="drawer-divider" />

        {isAdmin && (
          <>
            <div className="drawer-menu-item" onClick={() => handleNavigation('/coordinators')}>
              <SolutionOutlined className="drawer-icon" />
              <Text className="drawer-text">Gestão de Coordenadores</Text>
            </div>
            <div className="drawer-divider" />
          </>
        )}

        <div className="drawer-menu-item" onClick={() => handleNavigation('/rules')}>
          <SettingOutlined className="drawer-icon" />
          <Text className="drawer-text">Regras de Validação</Text>
        </div>
        <div className="drawer-divider" />

        <div className="drawer-menu-item" onClick={() => handleNavigation('/change-password')}>
          <LockOutlined className="drawer-icon" />
          <Text className="drawer-text">Redefinir Senha</Text>
        </div>
        <div className="drawer-divider" />

        <div className="drawer-menu-item" onClick={handleLogout}>
          <LogoutOutlined className="drawer-icon" />
          <Text className="drawer-text">Sair</Text>
        </div>

      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
