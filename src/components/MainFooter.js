import React from 'react';
import { Layout } from 'antd';
import { 
  HomeFilled, 
  FileSearchOutlined, 
  TeamOutlined 
} from '@ant-design/icons';
import './MainFooter.css';

const { Footer } = Layout;

const MainFooter = ({ activeKey = 'home' }) => {
  return (
    <Footer className="main-footer">
      <div className={`nav-item ${activeKey === 'home' ? 'active' : ''}`}>
        <HomeFilled />
        <span>Home</span>
      </div>
      <div className={`nav-item ${activeKey === 'validation' ? 'active' : ''}`}>
        <FileSearchOutlined />
        <span>Validação</span>
      </div>
      <div className={`nav-item ${activeKey === 'students' ? 'active' : ''}`}>
        <TeamOutlined />
        <span>Alunos</span>
      </div>
    </Footer>
  );
};

export default MainFooter;
