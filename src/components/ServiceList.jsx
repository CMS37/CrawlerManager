import React from 'react';
import '../App.css';
import servicesByPlatform from '../data/services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ServiceList = ({ platformId, platformName, onSelectService, onBack }) => {
    const services = servicesByPlatform[platformId] || [];

    return (
        <div className="service-list">
            <div className="service-header">
                <h2>{platformName}</h2>
            </div>
			<button className="back-button" onClick={onBack}>
				<FontAwesomeIcon icon={faArrowLeft} />
				플랫폼 선택으로
			</button>
            <div className="service-list-container">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="service-card"
                        onClick={() => onSelectService(service.id)}
                    >
                        <p>{service.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceList;
