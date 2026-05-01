import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import SplashScreen from './components/SplashScreen';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginContainer from './containers/LoginContainer';

import HomeContainer from './containers/HomeContainer';
import ValidationContainer from './containers/ValidationContainer';
import StudentsContainer from './containers/StudentsContainer';
import CoursesContainer from './containers/CoursesContainer';
import RulesCourseSelectionContainer from './containers/RulesCourseSelectionContainer';
import RulesContainer from './containers/RulesContainer';
import CourseFormContainer from './containers/CourseFormContainer';
import CourseTurmasContainer from './containers/CourseTurmasContainer';
import CoordinatorFormContainer from './containers/CoordinatorFormContainer';
import CoordinatorsContainer from './containers/CoordinatorsContainer';
import ForgotPasswordContainer from './containers/ForgotPasswordContainer';
import StudentFormContainer from './containers/StudentFormContainer';
import StudentDashboardContainer from './containers/StudentDashboardContainer';
import ChangePasswordContainer from './containers/ChangePasswordContainer';
import PublicChangePasswordContainer from './containers/PublicChangePasswordContainer';
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
            <Route path="/redefine-password" element={<PublicChangePasswordContainer />} />


            <Route path="/home" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><HomeContainer /></ProtectedRoute>} />
            <Route path="/student-dashboard" element={<ProtectedRoute allowedRoles={['ALUNO']}><StudentDashboardContainer /></ProtectedRoute>} />
            <Route path="/validation" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><ValidationContainer /></ProtectedRoute>} />
            <Route path="/change-password" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR', 'ALUNO']}><ChangePasswordContainer /></ProtectedRoute>} />

            <Route path="/students" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><StudentsContainer /></ProtectedRoute>} />
            <Route path="/students/new" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><StudentFormContainer /></ProtectedRoute>} />
            <Route path="/students/edit/:id" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><StudentFormContainer /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><CoursesContainer /></ProtectedRoute>} />
            <Route path="/courses/new" element={<ProtectedRoute allowedRoles={['ADMIN']}><CourseFormContainer /></ProtectedRoute>} />
            <Route path="/courses/edit/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><CourseFormContainer /></ProtectedRoute>} />

            <Route path="/courses/:id/turmas" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><CourseTurmasContainer /></ProtectedRoute>} />
            <Route path="/coordinators/new" element={<ProtectedRoute allowedRoles={['ADMIN']}><CoordinatorFormContainer /></ProtectedRoute>} />
            <Route path="/coordinators" element={<ProtectedRoute allowedRoles={['ADMIN']}><CoordinatorsContainer /></ProtectedRoute>} />
            <Route path="/rules" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><RulesCourseSelectionContainer /></ProtectedRoute>} />
            <Route path="/rules/:courseId" element={<ProtectedRoute allowedRoles={['ADMIN', 'COORDENADOR']}><RulesContainer /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
