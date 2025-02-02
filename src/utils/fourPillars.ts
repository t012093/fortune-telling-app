import { DateTime } from 'luxon';

// 十干（じっかん）
export const celestialStems = [
  { name: '甲', element: '木', yin_yang: '陽' },
  { name: '乙', element: '木', yin_yang: '陰' },
  { name: '丙', element: '火', yin_yang: '陽' },
  { name: '丁', element: '火', yin_yang: '陰' },
  { name: '戊', element: '土', yin_yang: '陽' },
  { name: '己', element: '土', yin_yang: '陰' },
  { name: '庚', element: '金', yin_yang: '陽' },
  { name: '辛', element: '金', yin_yang: '陰' },
  { name: '壬', element: '水', yin_yang: '陽' },
  { name: '癸', element: '水', yin_yang: '陰' },
] as const;

// 十二支（じゅうにし）
export const earthlyBranches = [
  { name: '子', element: '水', direction: '北' },
  { name: '丑', element: '土', direction: '北北東' },
  { name: '寅', element: '木', direction: '東北東' },
  { name: '卯', element: '木', direction: '東' },
  { name: '辰', element: '土', direction: '東南東' },
  { name: '巳', element: '火', direction: '南南東' },
  { name: '午', element: '火', direction: '南' },
  { name: '未', element: '土', direction: '南南西' },
  { name: '申', element: '金', direction: '西南西' },
  { name: '酉', element: '金', direction: '西' },
  { name: '戌', element: '土', direction: '西北西' },
  { name: '亥', element: '水', direction: '北北西' },
] as const;

export interface FourPillars {
  year: {
    stem: typeof celestialStems[number];
    branch: typeof earthlyBranches[number];
  };
  month: {
    stem: typeof celestialStems[number];
    branch: typeof earthlyBranches[number];
  };
  day: {
    stem: typeof celestialStems[number];
    branch: typeof earthlyBranches[number];
  };
  hour: {
    stem: typeof celestialStems[number];
    branch: typeof earthlyBranches[number];
  };
}

// 五行の相性
export const elementRelations = {
  相生: [
    { from: '木', to: '火' },
    { from: '火', to: '土' },
    { from: '土', to: '金' },
    { from: '金', to: '水' },
    { from: '水', to: '木' },
  ],
  相剋: [
    { from: '木', to: '土' },
    { from: '土', to: '水' },
    { from: '水', to: '火' },
    { from: '火', to: '金' },
    { from: '金', to: '木' },
  ],
};

export const calculateFourPillars = (birthDate: DateTime): FourPillars => {
  // 年柱の計算
  const year = birthDate.year;
  const yearStemIndex = (year - 4) % 10;
  const yearBranchIndex = (year - 4) % 12;

  // 月柱の計算（簡易版 - 実際はもっと複雑）
  const monthIndex = birthDate.month - 1;
  const monthStemIndex = (yearStemIndex * 2 + monthIndex) % 10;
  const monthBranchIndex = monthIndex;

  // 日柱の計算（簡易版）
  const daysSince1900 = birthDate.diff(DateTime.fromObject({ year: 1900 }), 'days').days;
  const dayStemIndex = Math.floor(daysSince1900 % 10);
  const dayBranchIndex = Math.floor(daysSince1900 % 12);

  // 時柱の計算
  const hour = birthDate.hour;
  const hourBranchIndex = Math.floor(hour / 2);
  const hourStemIndex = (dayStemIndex * 2 + hourBranchIndex) % 10;

  return {
    year: {
      stem: celestialStems[yearStemIndex],
      branch: earthlyBranches[yearBranchIndex],
    },
    month: {
      stem: celestialStems[monthStemIndex],
      branch: earthlyBranches[monthBranchIndex],
    },
    day: {
      stem: celestialStems[dayStemIndex],
      branch: earthlyBranches[dayBranchIndex],
    },
    hour: {
      stem: celestialStems[hourStemIndex],
      branch: earthlyBranches[hourBranchIndex],
    },
  };
};

export const analyzeElementBalance = (pillars: FourPillars) => {
  const elementCount = {
    木: 0,
    火: 0,
    土: 0,
    金: 0,
    水: 0,
  };

  // 各柱の干支の五行をカウント
  [pillars.year, pillars.month, pillars.day, pillars.hour].forEach(pillar => {
    elementCount[pillar.stem.element]++;
    elementCount[pillar.branch.element]++;
  });

  return elementCount;
};

export const findLuckyElements = (pillars: FourPillars) => {
  const balance = analyzeElementBalance(pillars);
  const weakestElements = Object.entries(balance)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 2)
    .map(([element]) => element);

  // 弱い五行を補う方位と時間帯を提案
  const recommendations = weakestElements.map(element => {
    const luckyDirections = earthlyBranches
      .filter(branch => branch.element === element)
      .map(branch => branch.direction);

    return {
      element,
      directions: luckyDirections,
      timing: getTiming(element),
    };
  });

  return recommendations;
};

const getTiming = (element: string) => {
  const timings = {
    木: '早朝（午前5時～7時）',
    火: '正午（午前11時～午後1時）',
    土: '季節の変わり目',
    金: '夕方（午後5時～7時）',
    水: '夜（午後9時～11時）',
  };
  return timings[element as keyof typeof timings];
};
