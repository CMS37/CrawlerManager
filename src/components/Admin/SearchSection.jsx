import React from 'react';

const SearchSection = ({ filteredUsers, selectedUser, setSelectedUser, handleRemoveUser, searchTerm, onSearchTermChange }) => {
    return (
        <div className="search-section">
            <h3>가입자 이름 검색</h3>
            <input
                type="text"
                placeholder="이름 검색"
                value={searchTerm}
                onChange={onSearchTermChange}
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
                                onClick={() => handleRemoveUser(user.id, user.name)}
                            >
                                삭제
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchSection;
