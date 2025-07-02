import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

const ApprovalSection = ({ approvalList, selectedApproval, setSelectedApproval, handleApproveUser, handleRejectUser }) => {
    return (
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleApproveUser(item.id);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button
                                    className="reject-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRejectUser(item.id);
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
    );
};

export default ApprovalSection;
