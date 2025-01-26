import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface AstrologyInfo {
  zodiacSign: string;
  birthDate: string;
  birthTime?: string;
}

export const getIntegratedReading = async (
  tarotCard: {
    nameJp: string;
    description: string;
    attribute: {
      upright: string[];
      reversed: string[];
    };
  },
  isReversed: boolean,
  astrologyInfo: AstrologyInfo
) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
あなたは熟練の占い師です。以下の情報を元に、その人の運勢と今日のアドバイスを導き出してください。

タロットカード情報：
- カード：${tarotCard.nameJp}${isReversed ? '（逆位置）' : ''}
- カードの意味：${tarotCard.description}
- キーワード：${isReversed ? tarotCard.attribute.reversed.join('、') : tarotCard.attribute.upright.join('、')}

占星術情報：
- 星座：${astrologyInfo.zodiacSign}
- 生年月日：${astrologyInfo.birthDate}
${astrologyInfo.birthTime ? `- 生まれた時間：${astrologyInfo.birthTime}` : ''}

今日の日付：${new Date().toLocaleDateString('ja-JP')}

以下の形式で詳細な鑑定結果を提供してください：

\n\nタロットカードが示すこと\n\n
[タロットカードの解釈と、現在の状況への示唆]

\n\n**占星術的な視点**\n\n
[星座の特徴と現在の惑星の影響について]

\n\n**総合的なアドバイス**\n\n
[タロットと占星術の両方の視点を組み合わせた、具体的なアドバイスをいくつかの要点に分けて記載。各アドバイスは以下の形式で記載：]

\n\n**感情と理性をバランスさせる**\n\n[具体的なアドバイス]
\n\n**他人からの意見に耳を傾ける**\n\n[具体的なアドバイス]
\n\n**柔軟性を保つ**\n\n[具体的なアドバイス]
\n\n**自己信頼を高める**\n\n[具体的なアドバイス]

\n\n**ラッキーポイント**\n\n
■ ラッキーカラー：[色]\n
■ ラッキーアイテム：[アイテム]\n
■ 開運アクション：[具体的な行動]

※アドバイスは具体的で実践的なものを心がけ、占い師らしい神秘的な雰囲気を保ちながらも、前向きで建設的な内容にしてください。`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return '申し訳ありません。読み解きを生成できませんでした。もう一度お試しください。';
  }
};
