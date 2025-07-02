import React, { useState } from 'react';
import { signupApi } from '../api/signupApi';

const Signup = ({ onSignupSuccess, onBackToLogin }) => {
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        try {
            const response = await signupApi({ name, userId, password });
            if (response.success) {
                onSignupSuccess();
            } else {
                setError(response.message || '회원가입에 실패했습니다.');
            }
        } catch {
            setError('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="card">
            <h2>회원가입</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
            }}>
				<input
					type="text"
					placeholder="이름"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
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
                <button type="submit">회원가입</button>
            </form>
            <button onClick={onBackToLogin} className="secondary">로그인 화면으로</button>
        </div>
    );
};

export default Signup;
