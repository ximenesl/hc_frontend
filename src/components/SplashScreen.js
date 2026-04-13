import React from 'react';
import logo from '../assets/imgs/logo-senac.png';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src={logo} alt="Senac Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
