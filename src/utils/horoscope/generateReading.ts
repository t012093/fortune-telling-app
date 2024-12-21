import { ZODIAC_SIGNS, ASPECTS, LUCKY_ITEMS, GENERAL_ADVICE } from './mockData';

// ユーティリティ関数：配列からランダムな要素を取得
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// 星座を検出する関数
const detectZodiacSign = (input: string): string | null => {
  return Object.keys(ZODIAC_SIGNS).find(sign => input.includes(sign)) || null;
};

// 運勢の種類を検出する関数
const detectAspect = (input: string): string | null => {
  return Object.keys(ASPECTS).find(aspect => input.includes(aspect)) || null;
};

// AIモードかどうかを判定（環境変数で設定）
const isAIMode = () => {
  return import.meta.env.VITE_USE_AI === 'true' && import.meta.env.VITE_GEMINI_API_KEY;
};

export const generateHoroscopeReading = async (
  input: string,
  conversationHistory: { role: string; content: string; }[]
): Promise<string> => {
  const zodiacSign = detectZodiacSign(input);
  const aspect = detectAspect(input);

  // 星座が検出できない場合
  if (!zodiacSign) {
    return "申し訳ありません。星座を教えていただけますか？\n例：「牡羊座の恋愛運を教えて」のように質問してください。";
  }

  // AIモードの場合（Gemini API使用）
  if (isAIMode()) {
    try {
      const response = await import('../gemini').then(module => 
        module.getGeminiResponse(input, conversationHistory)
      );
      return response;
    } catch (error) {
      console.error('AI Response Error:', error);
      // エラーの場合はフォールバックとしてモックデータを使用
    }
  }

  // モックデータを使用した応答生成
  const sign = ZODIAC_SIGNS[zodiacSign as keyof typeof ZODIAC_SIGNS];
  let reading = '';

  // 基本情報
  reading += `${zodiacSign}（${sign.en}）の運勢\n`;
  reading += `時期：${sign.period} / 元素：${sign.element}\n\n`;

  // 特定の運勢についての質問の場合
  if (aspect && ASPECTS[aspect as keyof typeof ASPECTS]) {
    const aspectData = ASPECTS[aspect as keyof typeof ASPECTS];
    reading += `${aspect}運 ${aspectData.emoji}\n`;
    reading += getRandomItem(aspectData.responses);
  } else {
    // 総合運
    reading += "総合運：\n";
    reading += getRandomItem(GENERAL_ADVICE);
  }

  // ラッキーアイテム
  reading += `\n\n🎁 ラッキーアイテム：${getRandomItem(LUCKY_ITEMS)}`;

  return reading;
};