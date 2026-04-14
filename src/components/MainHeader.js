import React, { useState } from 'react';
import { Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../assets/imgs/logo-senac.png';
import NavigationDrawer from './NavigationDrawer';
import './MainHeader.css';

const { Header } = Layout;

const MainHeader = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Header className="main-header">
        <MenuOutlined className="header-menu-icon" onClick={showDrawer} />
        <img src={logo} alt="Senac Logo" className="header-logo" />
      </Header>
      
      <NavigationDrawer visible={drawerVisible} onClose={closeDrawer} />
    </>
  );
};

export default MainHeader;
