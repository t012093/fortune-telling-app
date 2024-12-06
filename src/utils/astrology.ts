// 星座を計算する関数
export const calculateZodiacSign = (birthDate: string): string => {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 月日から星座を判定
  const zodiacSigns = [
    { name: '山羊座', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: '水瓶座', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: '魚座', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: '牡羊座', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: '牡牛座', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: '双子座', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
    { name: '蟹座', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
    { name: '獅子座', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: '乙女座', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: '天秤座', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
    { name: '蠍座', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
    { name: '射手座', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 }
  ];

  for (const sign of zodiacSigns) {
    if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      return sign.name;
    }
  }

  // デフォルトケース（エラー防止）
  return '不明';
};

// 月星座を計算する関数（簡易版）
export const calculateMoonSign = (birthDate: string, birthTime: string): string | undefined => {
  if (!birthTime) return undefined;
  // より詳細な計算が必要ですが、ここでは簡易版を実装
  return undefined;
};

// 上昇宮を計算する関数（簡易版）
export const calculateAscendant = (birthDate: string, birthTime: string): string | undefined => {
  if (!birthTime) return undefined;
  // より詳細な計算が必要ですが、ここでは簡易版を実装
  return undefined;
};

// 相性を計算する関数
export const calculateCompatibility = (sign1: string, sign2: string): {
  score: number;
  description: string;
} => {
  const elements = {
    '牡羊座': '火', '獅子座': '火', '射手座': '火',
    '牡牛座': '土', '乙女座': '土', '山羊座': '土',
    '双子座': '風', '天秤座': '風', '水瓶座': '風',
    '蟹座': '水', '蠍座': '水', '魚座': '水'
  };

  const sign1Element = elements[sign1 as keyof typeof elements];
  const sign2Element = elements[sign2 as keyof typeof elements];

  if (sign1Element === sign2Element) {
    return {
      score: 90,
      description: '同じ元素を持つ星座同士で、とても相性が良いです。'
    };
  }

  const compatiblePairs = {
    '火': '風',
    '風': '火',
    '土': '水',
    '水': '土'
  };

  if (compatiblePairs[sign1Element as keyof typeof compatiblePairs] === sign2Element) {
    return {
      score: 80,
      description: '互いを高め合える良い関係性が期待できます。'
    };
  }

  return {
    score: 60,
    description: '少し異なる性質を持っていますが、それぞれの良さを活かすことで良い関係を築けます。'
  };
};

// 天体の位置による運勢の補正（簡易版）
export const getAstrologicalAspects = (date: Date = new Date()): {
  lucky_days: number[];
  power_spots: string[];
  lucky_colors: string[];
  advice: string;
} => {
  // 実際にはより複雑な天体計算が必要ですが、ここでは簡易版を実装
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return {
    lucky_days: [day, (day + 7) % 28, (day + 14) % 28],
    power_spots: ['東', '南', '西', '北'][Math.floor(month / 3) % 4],
    lucky_colors: ['赤', '青', '黄', '緑', '紫', '白'][Math.floor(day / 5) % 6],
    advice: '宇宙のリズムに身を委ねることで、より良い結果が得られるでしょう。'
  };
};