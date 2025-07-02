import React, { useState } from 'react';
import './Login.css';
import { loginApi } from '../../api/authApi';

const Login = ({ onLoginSuccess, onSignup }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleApiCall = async (apiFunction, onSuccess, onError) => {
        try {
            const response = await apiFunction();
            if (response.success) {
                onSuccess(response);
            } else {
                onError(response.message);
            }
        } catch (err) {
            console.error('API Error:', err);
            onError('서버 오류');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        handleApiCall(
            () => loginApi(userId, password),
            (response) => onLoginSuccess(response.data.token, response.data.role),
            (message) => setError(message)
        );
    };

    const handleSignup = () => {
        onSignup();
    };

    return (
        <div className="card">
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">로그인</button>
            </form>
            <button onClick={handleSignup} className="secondary">회원가입</button>
        </div>
    );
};

export default Login;
