const platforms = [
    { id: 1, name: '올리브영', image: './assets/Olive_Young_Logo.svg' },
    { id: 2, name: '큐텐', image: './assets/Qoo10_logo.svg' },
];

export const RankingType = {
    SALES: '판매 랭킹',
    BRAND: '브랜드 랭킹',
};

export const Category = {
    ALL: '전체',
    SKINCARE: '스킨케어',
    MASKPACK: '마스크팩',
    CLEANSING: '클렌징',
    SUNCARE: '선케어',
    MAKEUP: '메이크업',
    NAIL: '네일',
    BEAUTY_TOOL: '뷰티소품',
    DERMO_COSMETIC: '더모 코스메틱',
    MENS_CARE: '맨즈케어',
    PERFUME: '향수/디퓨저',
    HAIRCARE: '헤어케어',
    BODYCARE: '바디케어',
    HEALTH_SUPPLEMENT: '건강식품',
    FOOD: '푸드',
    ORAL: '구강용품',
    HEALTH_GOODS: '헬스/건강용품',
    HYGIENE: '위생용품',
    FASHION: '패션',
    LIVING: '리빙/가전',
    HOBBY: '취미/팬시',
};

export const CATEGORY_CODE_MAP = {
    [Category.ALL]: '',
    [Category.SKINCARE]: '10000010001',
    [Category.MASKPACK]: '10000010009',
    [Category.CLEANSING]: '10000010010',
    [Category.SUNCARE]: '10000010011',
    [Category.MAKEUP]: '10000010002',
    [Category.NAIL]: '10000010012',
    [Category.BEAUTY_TOOL]: '10000010006',
    [Category.DERMO_COSMETIC]: '10000010008',
    [Category.MENS_CARE]: '10000010007',
    [Category.PERFUME]: '10000010005',
    [Category.HAIRCARE]: '10000010004',
    [Category.BODYCARE]: '10000010003',
    [Category.HEALTH_SUPPLEMENT]: '10000020001',
    [Category.FOOD]: '10000020002',
    [Category.ORAL]: '10000020003',
    [Category.HEALTH_GOODS]: '10000020005',
    [Category.HYGIENE]: '10000020004',
    [Category.FASHION]: '10000030007',
    [Category.LIVING]: '10000030005',
    [Category.HOBBY]: '10000030006',
};

export const Gender = {
    ALL: '성별 전체',
    MALE: '남성',
    FEMALE: '여성',
};

export const GENDER_MAP = {
    [Gender.ALL]: '',
    [Gender.MALE]: 'MALE',
    [Gender.FEMALE]: 'FEMALE',
};

export const AgeGroup = {
    ALL: '연령대 전체',
    TEENAGER: '10대',
    TWENTIES: '20대',
    THIRTIES: '30대',
    OVER_FORTIES: '40대 이상',
};

export const AGE_MAP = {
    [AgeGroup.ALL]: '',
    [AgeGroup.TEENAGER]: 'TEENAGER',
    [AgeGroup.TWENTIES]: 'TWENTIES',
    [AgeGroup.THIRTIES]: 'THIRTIES',
    [AgeGroup.OVER_FORTIES]: 'OVER_FORTIES',
};

export const RankingPeriod = {
    REALTIME: '실시간 랭킹',
    DAY: '일간 랭킹',
    WEEK: '주간 랭킹',
    MONTH: '월간 랭킹',
};

export const PERIOD_MAP = {
    [RankingPeriod.REALTIME]: 'REALTIME',
    [RankingPeriod.DAY]: 'DAY',
    [RankingPeriod.WEEK]: 'WEEK',
    [RankingPeriod.MONTH]: 'MONTH',
};

export const InputSchema = {
    startRank: 1,
    endRank: 100,
    rankingType: undefined,
    category: undefined,
    gender: undefined,
    ageGroup: undefined,
    rankingPeriod: undefined,
};

export default platforms;
