import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/imgs/logo-senac.png';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src={logo} alt="Senac Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
