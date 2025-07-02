import React, { useState } from 'react';
import './App.css';
import PlatformSelection from './components/PlatformSelection';
import Login from './components/Login';
import ServiceList from './components/ServiceList';
import platforms from './data/platforms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import AdminMenu from './components/AdminMenu';
import Signup from './components/Signup';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedPlatformName, setSelectedPlatformName] = useState('');
  const [userRole, setUserRole] = useState('user');

  const handleLoginSuccess = (token, role, name) => {
      localStorage.setItem('authToken', token);
      setUserRole(role);
      console.log('로그인 성공:', token, role, name);
      setCurrentView('platform-selection');
  };

  const handleSelectPlatform = (platformId) => {
      const platform = platforms.find((p) => p.id === platformId);
      setSelectedPlatform(platformId);
      setSelectedPlatformName(platform.name);
      setCurrentView('service-list');
  };

  const handleSelectService = (serviceId) => {
      console.log(`Selected service: ${serviceId}`);
      // 서비스별 옵션 입력 화면으로 이동 로직 추가 예정
  };

  const handleBackToPlatformSelection = () => {
        console.log('뒤로가기: 플랫폼 선택 화면으로 이동');
        setCurrentView('platform-selection');
    };

  return (
    <div className="app-container">
      {userRole === 'admin' && (
        <FontAwesomeIcon
          icon={faGear}
          className="admin-icon"
          onClick={() => {
            console.log('관리자 메뉴로 이동');
            console.log('현재 userRole:', userRole);
            setCurrentView('admin-menu');
          }}
        />
      )}
      {currentView === 'login' && (
          <Login 
              onLoginSuccess={handleLoginSuccess} 
              onSignup={() => setCurrentView('signup')} 
          />
      )}
      {currentView === 'platform-selection' && (
          <PlatformSelection 
              onSelectPlatform={handleSelectPlatform} 
              userRole={userRole}
          />
      )}
      {currentView === 'service-list' && (
          <ServiceList
              platformId={selectedPlatform}
              platformName={selectedPlatformName}
              onSelectService={handleSelectService}
              onBack={handleBackToPlatformSelection}
          />
      )}
      {currentView === 'admin-menu' && (
          <AdminMenu 
              onBack={() => setCurrentView('platform-selection')} 
          />
      )}
      {currentView === 'signup' && (
          <Signup 
              onSignupSuccess={() => setCurrentView('login')} 
              onBackToLogin={() => setCurrentView('login')} 
          />
      )}
    </div>
  );
}

export default App;
