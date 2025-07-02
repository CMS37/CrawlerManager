import React from 'react';
import '../App.css';
import platforms from '../data/platforms';

const PlatformSelection = ({ onSelectPlatform}) => {
    return (
        <div className="platform-selection">
            <div className="platform-header">
                <h2>플랫폼 선택</h2>
            </div>
            <div className="platform-list">
                {platforms.map((platform) => (
                    <div
                        key={platform.id}
                        className="platform-card"
                        onClick={() => onSelectPlatform(platform.id)}
                    >
                        <img src={platform.image} alt={platform.name} className="platform-image" />
                        <p>{platform.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlatformSelection;
