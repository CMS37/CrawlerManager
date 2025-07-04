import React, { useState } from 'react';
import './OliveYoungRanking.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
    RankingType,
    Gender,
    AgeGroup,
    RankingPeriod,
    Category
} from '../../../data/platforms';

const OliveYoungRanking = ({ onBack }) => {
    const [rankingType, setRankingType] = useState('판매 랭킹');
    const [rankingPeriod, setRankingPeriod] = useState('실시간 랭킹');
    const [category, setCategory] = useState('전체');
    const [gender, setGender] = useState('성별 전체');
    const [ageGroups, setAgeGroups] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isCrawling, setIsCrawling] = useState(false);

    const handleRankingTypeChange = (value) => {
        setRankingType(value);
        if (value === '브랜드 랭킹') {
            setRankingPeriod('일간 랭킹');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rankingType !== '브랜드 랭킹' && ageGroups.length === 0) {
            alert('연령대를 최소 1개 이상 선택하세요.');
            return;
        }

        const data = {
            rankingType: rankingType,
            rankingPeriod: rankingPeriod,
            category: rankingType === '판매 랭킹' ? category : undefined,
            gender: rankingType === '판매 랭킹' ? gender : undefined,
            ageGroup: rankingType === '판매 랭킹' ? ageGroups.map(age => age) : undefined,
        };

        setIsCrawling(true);
        setProgress(0);

        try {
            const response = await window.ipcRenderer.invoke('fetch-oliveyoung-ranking', data);
            console.log('크롤링 결과:', response);
        } catch (error) {
            console.error('크롤링 오류:', error);
        } finally {
            setIsCrawling(false);
        }
    };

    return (
        <div className="oliveyoung-ranking">
            <button className="back-button" onClick={onBack}>
				<FontAwesomeIcon icon={faArrowLeft} />서비스 선택으로
			</button>
            <div className="card">
                <h2>올리브영 랭킹</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>랭킹 타입</label>
                        <select value={rankingType} onChange={(e) => handleRankingTypeChange(e.target.value)}>
                            {Object.values(RankingType).map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {rankingType === '판매 랭킹' && (
                        <>
                            <div className="form-group">
                                <label>랭킹 기간</label>
                                <select value={rankingPeriod} onChange={(e) => setRankingPeriod(e.target.value)}>
                                    {Object.values(RankingPeriod).map((period) => (
                                        <option key={period} value={period}>{period}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>카테고리</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {Object.values(Category).map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>성별</label>
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    {Object.values(Gender).map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>연령대</label>
                                <div className="checkbox-group">
                                    {Object.values(AgeGroup).map((age) => (
                                        <label key={age}>
                                            <input
                                                type="checkbox"
                                                value={age}
                                                checked={ageGroups.includes(age)}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setAgeGroups((prev) =>
                                                        prev.includes(value)
                                                            ? prev.filter((v) => v !== value)
                                                            : [...prev, value]
                                                    );
                                                }}
                                            />
                                            {age}
                                        </label>
                                    ))}
                                </div>
                            </div>

                        </>
                    )}

                    {rankingType === '브랜드 랭킹' && (
                        <div className="form-group">
                            <label>랭킹 기간</label>
                            <select value={rankingPeriod} onChange={(e) => setRankingPeriod(e.target.value)}>
                                <option value="일간 랭킹">일간 랭킹</option>
                                <option value="주간 랭킹">주간 랭킹</option>
                            </select>
                        </div>
                    )}

                    <button type="submit" disabled={isCrawling}>
                        {isCrawling ? '크롤링 중...' : '크롤링 시작'}
                    </button>
                </form>

                {isCrawling && (
                    <div className="progress">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OliveYoungRanking;
