import React, { useState, useEffect } from 'react';

const UpdateProgress = ({ onUpdateComplete }) => {
    const [status, setStatus] = useState('checking');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        window.electronAPI.onUpdateStatus((event, newStatus) => {
            setStatus(newStatus);
            if (newStatus === 'downloaded') {
                onUpdateComplete();
            }
        });

        window.electronAPI.onUpdateProgress((event, percent) => {
            setProgress(percent);
        });
    }, [onUpdateComplete]);

    return (
        <div className="update-progress">
            {status === 'checking' && <p>업데이트 확인 중...</p>}
            {status === 'available' && <p>업데이트 다운로드 중: {progress}%</p>}
            {status === 'none' && <p>최신 버전입니다.</p>}
            {status === 'downloaded' && <p>업데이트 완료! 재시작합니다...</p>}
        </div>
    );
};

export default UpdateProgress;
