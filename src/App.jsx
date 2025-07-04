import React, { useState } from 'react';
import './styles/common.css';
import './styles/theme.css';
import PlatformSelection from './components/Platform/PlatformSelection';
import Login from './components/Login/Login';
import ServiceList from './components/Platform/ServiceList';
import platforms from './data/platforms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import AdminMenu from './components/Admin/AdminMenu';
import Signup from './components/Login/Signup';
import OliveYoungRanking from './components/Platform/OliveYoung/OliveYoungRanking';

function App() {
	const [currentView, setCurrentView] = useState('login');
	const [selectedPlatform, setSelectedPlatform] = useState(null);
	const [selectedPlatformName, setSelectedPlatformName] = useState('');
	const [userRole, setUserRole] = useState('user');

	const handleLoginSuccess = (token, role) => {
		localStorage.setItem('authToken', token);
		setUserRole(role);
		setCurrentView('platform-selection');
	};

	const handleViewChange = (view) => {
		setCurrentView(view);
	};

	const handlePlatformSelection = (platformId) => {
		const platform = platforms.find((p) => p.id === platformId);
		setSelectedPlatform(platformId);
		setSelectedPlatformName(platform.name);
		handleViewChange('service-list');
	};

	const handleSelectService = (serviceId) => {
		handleViewChange(`service-${serviceId}`);
	};

	return (
		<div className="app-container">
			{userRole === 'admin' && (
				<FontAwesomeIcon
					icon={faGear}
					className="admin-icon"
					onClick={() => handleViewChange('admin-menu')}
				/>
			)}
			{currentView === 'login' && (
				<Login
					onLoginSuccess={handleLoginSuccess}
					onSignup={() => handleViewChange('signup')}
				/>
			)}
			{currentView === 'platform-selection' && (
				<PlatformSelection
					onSelectPlatform={handlePlatformSelection}
					userRole={userRole}
				/>
			)}
			{currentView === 'service-list' && (
				<ServiceList
					platformId={selectedPlatform}
					platformName={selectedPlatformName}
					onSelectService={handleSelectService}
					onBack={() => handleViewChange('platform-selection')}
				/>
			)}
			{currentView === 'admin-menu' && (
				<AdminMenu onBack={() => handleViewChange('platform-selection')} />
			)}
			{currentView === 'signup' && (
				<Signup
					onSignupSuccess={() => handleViewChange('login')}
					onBackToLogin={() => handleViewChange('login')}
				/>
			)}
			{currentView === 'service-1' && (
				<OliveYoungRanking onBack={() => handleViewChange('service-list')} />
			)}
		</div>
	);
}

export default App;
