import React from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  HomeFilled,
  FileSearchOutlined,
  TeamOutlined
} from '@ant-design/icons';
import './MainFooter.css';

const { Footer } = Layout;

const MainFooter = ({ activeKey = 'home' }) => {
  const navigate = useNavigate();

  return (
    <Footer className="main-footer">
      <div
        className={`nav-item ${activeKey === 'home' ? 'active' : ''}`}
        onClick={() => navigate('/home')}
      >
        <HomeFilled />
        <span>Home</span>
      </div>
      <div
        className={`nav-item ${activeKey === 'validation' ? 'active' : ''}`}
        onClick={() => navigate('/validation')}
      >
        <FileSearchOutlined />
        <span>Validação</span>
      </div>
      <div
        className={`nav-item ${activeKey === 'students' ? 'active' : ''}`}
        onClick={() => navigate('/students')}
      >
        <TeamOutlined />
        <span>Alunos</span>
      </div>
    </Footer>
  );
};

export default MainFooter;
