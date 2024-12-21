/**
 * 生まれた日付に基づいて星座を計算します。
 * @param {Date} birthDate - 生まれた日付
 * @returns {string} 星座
 */
export const getZodiacSign = (birthDate: Date): string => {
  const month = birthDate.getMonth() + 1; // getMonth()は0から始まるため+1
  const day = birthDate.getDate();

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "山羊座";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "水瓶座";
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "魚座";
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "牡羊座";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "牡牛座";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return "双子座";
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return "蟹座";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "獅子座";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "乙女座";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    return "天秤座";
  } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
    return "蠍座";
  } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    return "射手座";
  }

  return ""; // 対象の日付が存在しない場合は空文字を返す
};

/**
 * 生まれた日付に基づいて星座を計算します。
 * @param {Date} birthDate - 生まれた日付
 * @returns {string} 星座
 */
export const calculateZodiacSign = (birthDate: Date): string => {
  const month = birthDate.getMonth() + 1; // getMonth()は0から始まるため+1
  const day = birthDate.getDate();

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return "山羊座";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return "水瓶座";
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return "魚座";
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return "牡羊座";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return "牡牛座";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
    return "双子座";
  } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
    return "蟹座";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return "獅子座";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return "乙女座";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
    return "天秤座";
  } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
    return "蠍座";
  } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
    return "射手座";
  }

  return ""; // 対象の日付が存在しない場合は空文字を返す
};

/**
 * 星座の開始日と終了日を定義します。
 */
const zodiacDates = {
  "山羊座": { startMonth: 12, startDate: 22, endMonth: 1, endDate: 19 },
  "水瓶座": { startMonth: 1, startDate: 20, endMonth: 2, endDate: 18 },
  "魚座": { startMonth: 2, startDate: 19, endMonth: 3, endDate: 20 },
  "牡羊座": { startMonth: 3, startDate: 21, endMonth: 4, endDate: 19 },
  "牡牛座": { startMonth: 4, startDate: 20, endMonth: 5, endDate: 20 },
  "双子座": { startMonth: 5, startDate: 21, endMonth: 6, endDate: 21 },
  "蟹座": { startMonth: 6, startDate: 22, endMonth: 7, endDate: 22 },
  "獅子座": { startMonth: 7, startDate: 23, endMonth: 8, endDate: 22 },
  "乙女座": { startMonth: 8, startDate: 23, endMonth: 9, endDate: 22 },
  "天秤座": { startMonth: 9, startDate: 23, endMonth: 10, endDate: 23 },
  "蠍座": { startMonth: 10, startDate: 24, endMonth: 11, endDate: 22 },
  "射手座": { startMonth: 11, startDate: 23, endMonth: 12, endDate: 21 },
};

/**
 * 星座の元素を定義します。
 */
const zodiacElements: { [key: string]: string } = {
  "牡羊座": "火",
  "牡牛座": "土",
  "双子座": "風",
  "蟹座": "水",
  "獅子座": "火",
  "乙女座": "土",
  "天秤座": "風",
  "蠍座": "水",
  "射手座": "火",
  "山羊座": "土",
  "水瓶座": "風",
  "魚座": "水",
};

/**
 * 2つの星座の相性を計算します。
 * @param {string} zodiacSign1 - 1つ目の星座
 * @param {string} zodiacSign2 - 2つ目の星座
 * @returns {number} 相性度 (0〜100)
 */
export const calculateCompatibility = (
  zodiacSign1: string,
  zodiacSign2: string
): number => {
  if (!zodiacSign1 || !zodiacSign2) {
    return 0;
  }

  const element1 = zodiacElements[zodiacSign1];
  const element2 = zodiacElements[zodiacSign2];

  if (element1 === element2) {
    return 90;
  } else if (
    (element1 === "火" && element2 === "風") ||
    (element1 === "風" && element2 === "火") ||
    (element1 === "土" && element2 === "水") ||
    (element1 === "水" && element2 === "土")
  ) {
    return 80;
  } else {
    return 60;
  }
};

/**
 * アスペクトの種類を定義します。
 */
export type Aspect =
  | "コンジャンクション"
  | "セクスタイル"
  | "スクエア"
  | "トライン"
  | "オポジション";

/**
 * 惑星の種類を定義します。
 */
export type Planet =
  | "太陽"
  | "月"
  | "水星"
  | "金星"
  | "火星"
  | "木星"
  | "土星"
  | "天王星"
  | "海王星"
  | "冥王星";

/**
 * 月星座の型定義
 */
export type MoonSign = string;

/**
 * 上昇宮の型定義
 */
export type RisingSign = string;

/**
 * 天体の情報をまとめる型。
 */
export type CelestialBodyInfo = {
  planet: Planet;
  zodiacSign: string;
  moonSign?: MoonSign;
  risingSign?: RisingSign;
};

/**
 * ネイタルチャートのデータ型 (仮定義)
 */
export type NatalChartData = any;

/**
 * ハウスのデータ型 (仮定義)
 */
export type HouseData = any;

/**
 * トランジットのデータ型 (仮定義)
 */
export type TransitData = any;

/**
 * ホロスコープ分析関数の出力型
 */
export type HoroscopeAnalysisResult = {
  natalChart: NatalChartData;
  majorAspects: Aspect[];
  houses: HouseData;
  transits: TransitData;
  transitAspects: Aspect[];
  dailyFortune: string;
  moonSign?: MoonSign;
  risingSign?: RisingSign;
};

/**
 * 個人向けの運勢を生成します。
 * @param {Date} birthDate - 生まれた日付
 * @returns {string} 個人向けの運勢
 */
export const generatePersonalFortune = (birthDate: Date): string => {
  // ここに運勢生成ロジックを実装します
  return "今日は良い日になるでしょう。"; // 仮のメッセージ
};
