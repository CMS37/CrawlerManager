import React, { useState, useEffect } from 'react';
import './Admin.css';
import '../../styles/common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMagnifyingGlass, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { fetchPendingList, fetchUserList, approveUser, rejectUser, removeUser } from '../../api/adminApi';
import ApprovalSection from './ApprovalSection';
import SearchSection from './SearchSection';

const AdminMenu = ({ onBack }) => {
    const [currentSection, setCurrentSection] = useState('menu');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedApproval, setSelectedApproval] = useState(null);
    const [approvalList, setApprovalList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchDataHandler = async (fetchFunction, setData) => {
        setLoading(true);
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await fetchFunction(authToken);
            const mappedData = response.success && Array.isArray(response.data)
                ? response.data.map(item => ({ ...item, id: item.userId }))
                : [];
            setData(mappedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentSection === 'approval') {
            fetchDataHandler(fetchPendingList, setApprovalList);
        } else if (currentSection === 'search') {
            fetchDataHandler(fetchUserList, setUserList);
        }
    }, [currentSection]);

    const handleApproveUser = async (userId) => {
        const authToken = localStorage.getItem('authToken');
        await approveUser(authToken, userId);
        fetchDataHandler(fetchPendingList, setApprovalList);
        setSelectedApproval(null);
    };

    const handleRejectUser = async (userId) => {
        const authToken = localStorage.getItem('authToken');
        await rejectUser(authToken, userId);
        fetchDataHandler(fetchPendingList, setApprovalList);
        setSelectedApproval(null);
    };

    const handleRemoveUser = async (userId, userName) => {
        if (window.confirm(`${userName}(${userId})을(를) 삭제하시겠습니까?`)) {
            const authToken = localStorage.getItem('authToken');
            await removeUser(authToken, userId);
            fetchDataHandler(fetchUserList, setUserList);
            setSelectedUser(null);
        }
    };

    const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

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
                <ApprovalSection
                    approvalList={approvalList}
                    selectedApproval={selectedApproval}
                    setSelectedApproval={setSelectedApproval}
                    handleApproveUser={handleApproveUser}
                    handleRejectUser={handleRejectUser}
                />
            )}
            {currentSection === 'search' && (
                <SearchSection
                    filteredUsers={filteredUsers}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    handleRemoveUser={handleRemoveUser}
                    searchTerm={searchTerm}
                    onSearchTermChange={handleSearchTermChange}
                />
            )}
        </div>
    );
};

export default AdminMenu;
