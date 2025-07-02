import React, { useState, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMagnifyingGlass, faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { fetchPendingList, fetchUserList } from '../api/adminApi';

const AdminMenu = ({ onBack }) => {
    const [currentSection, setCurrentSection] = useState('menu');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedApproval, setSelectedApproval] = useState(null);
    const [approvalList, setApprovalList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentSection === 'approval') {
            fetchPendingListHandler();
        } else if (currentSection === 'search') {
            fetchUserListHandler();
        }
    }, [currentSection]);

    const fetchPendingListHandler = async () => {
        setLoading(true);
        try {
            const authToken = localStorage.getItem('authToken');
            const data = await fetchPendingList(authToken);
            const mappedData = data.map(item => ({ ...item, id: item.userId }));
            setApprovalList(mappedData);
        } catch (error) {
            console.error('Error fetching approval list:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserListHandler = async () => {
        setLoading(true);
        try {
            const authToken = localStorage.getItem('authToken');
            const data = await fetchUserList(authToken);
            const mappedData = data.map(user => ({ ...user, id: user.userId }));
            setUserList(mappedData);
        } catch (error) {
            console.error('Error fetching user list:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-menu">
            <h2>관리자 메뉴</h2>
            <button className="back-button" onClick={onBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> 플랫폼 선택으로
            </button>
            <div className="menu-card-container">
                <div className="menu-card" onClick={() => setCurrentSection('approval')}>
                    <FontAwesomeIcon icon={faCheck} className="menu-icon" />
                    <p>가입자 승인</p>
                </div>
                <div className="menu-card" onClick={() => setCurrentSection('search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="menu-icon" />
                    <p>사용자 검색</p>
                </div>
            </div>
            {loading && <p>로딩 중...</p>}
            {currentSection === 'approval' && (
                <div className="approval-section">
                    <h3>승인 대기 목록</h3>
                    <ul className="user-list">
                        {approvalList.map((item) => (
                            <li
                                key={item.id}
                                className={`user-item ${selectedApproval === item.id ? 'selected' : ''}`}
                                onClick={() => setSelectedApproval(selectedApproval === item.id ? null : item.id)}
                            >
                                <span>{item.name} ({item.id})</span>
                                {selectedApproval === item.id && (
                                    <div className="action-buttons">
                                        <button
                                            className="approve-button"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                 const authToken = localStorage.getItem('authToken');
                                                await window.ipcRenderer.invoke('approve-user', { authToken, userId: item.id });
                                                fetchPendingListHandler();
                                                setSelectedApproval(null);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        <button
                                            className="reject-button"
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                 const authToken = localStorage.getItem('authToken');
                                                await window.ipcRenderer.invoke('reject-user', { authToken, userId: item.id });
                                                fetchPendingListHandler();
                                                setSelectedApproval(null);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {currentSection === 'search' && (
                <div className="search-section">
                    <h3>가입자 이름 검색</h3>
                    <input
                        type="text"
                        placeholder="이름 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="user-list">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                className={`user-item ${selectedUser === user.id ? 'selected' : ''}`}
                                onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                            >
                                <span>{user.name} ({user.id})</span>
                                {selectedUser === user.id && (
                                    <button
                                        className="delete-button"
                                        onClick={async () => {
                                            if (window.confirm(`${user.name}(${user.id})을(를) 삭제하시겠습니까?`)) {
                                                 const authToken = localStorage.getItem('authToken');
                                                await window.ipcRenderer.invoke('remove-user', { authToken, userId: user.id });
                                                fetchUserListHandler();
                                                setSelectedUser(null);
                                            }
                                        }}
                                    >
                                        삭제
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminMenu;
