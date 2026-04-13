import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import './App.css';

const theme = {
  token: {
    colorPrimary: '#F59120', // Senac Orange
    borderRadius: 16,
    colorTextPlaceholder: 'rgba(255, 255, 255, 0.6)',
    colorBgContainer: 'transparent',
    colorBorder: 'rgba(255, 255, 255, 0.8)',
    colorText: '#ffffff',
  },
  components: {
    Input: {
      activeBorderColor: '#ffffff',
      hoverBorderColor: '#ffffff',
      colorBgContainer: 'transparent',
      colorText: '#ffffff',
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.6)',
      paddingBlock: 12,
    },
    Button: {
      colorPrimary: '#F59120',
      colorPrimaryHover: '#e68112',
      controlHeight: 48,
      fontWeight: 600,
    }
  }
};

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <div className="app-container">
        {showSplash ? <SplashScreen /> : <LoginScreen />}
      </div>
    </ConfigProvider>
  );
}

export default App;
