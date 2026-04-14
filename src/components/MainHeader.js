import React from 'react';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../assets/imgs/logo-senac.png';
import './MainHeader.css';

const { Header } = Layout;

const MainHeader = () => {
  return (
    <Header className="main-header">
      <MenuOutlined className="header-menu-icon" />
      <img src={logo} alt="Senac Logo" className="header-logo" />
    </Header>
  );
};

export default MainHeader;
