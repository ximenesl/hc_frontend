import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import SplashScreen from './components/SplashScreen';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import HomeContainer from './containers/HomeContainer';
import ValidationContainer from './containers/ValidationContainer';
import StudentsContainer from './containers/StudentsContainer';
import CoursesContainer from './containers/CoursesContainer';
import RulesContainer from './containers/RulesContainer';
import CourseFormContainer from './containers/CourseFormContainer';
import CoordinatorFormContainer from './containers/CoordinatorFormContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import CodeVerificationContainer from './containers/CodeVerificationContainer';
import ResetPasswordContainer from './containers/ResetPasswordContainer';
import './App.css';

const theme = {
  token: {
    colorPrimary: '#F59120',
    borderRadius: 16,
    colorTextPlaceholder: 'rgba(255, 255, 255, 0.6)',
    colorBgContainer: 'transparent',
    colorBorder: 'rgba(255, 255, 255, 0.8)',
    colorText: '#ffffff',
    fontFamily: 'Outfit, sans-serif',
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
  return (
    <ConfigProvider theme={theme}>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/forgot-password" element={<ForgotPasswordContainer />} />
            <Route path="/verify-code" element={<CodeVerificationContainer />} />
            <Route path="/reset-password" element={<ResetPasswordContainer />} />
            <Route path="/register" element={<RegisterContainer />} />
            <Route path="/home" element={<HomeContainer />} />
            <Route path="/validation" element={<ValidationContainer />} />
            <Route path="/students" element={<StudentsContainer />} />
            <Route path="/courses" element={<CoursesContainer />} />
            <Route path="/courses/new" element={<CourseFormContainer />} />
            <Route path="/courses/edit/:id" element={<CourseFormContainer />} />
            <Route path="/coordinators/new" element={<CoordinatorFormContainer />} />
            <Route path="/rules" element={<RulesContainer />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
