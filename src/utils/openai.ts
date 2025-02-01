import OpenAI from 'openai';
import { astrologySigns, astrologyPlanets } from './astrologyData';
import { astrologyAspects, astrologyPoints, zodiacQualities, zodiacElements, planetRulers } from './astrologyAdditionalInfo';

const astrologyHouses = [
  { id: 1, name: '第1ハウス', meaning: '自己、外見、始まり' },
  { id: 2, name: '第2ハウス', meaning: '金銭、価値観、所有物' },
  { id: 3, name: '第3ハウス', meaning: 'コミュニケーション、学習、兄弟姉妹' },
  { id: 4, name: '第4ハウス', meaning: '家族、家、ルーツ' },
  { id: 5, name: '第5ハウス', meaning: '創造性、子供、娯楽' },
  { id: 6, name: '第6ハウス', meaning: '健康、仕事、日常' },
  { id: 7, name: '第7ハウス', meaning: 'パートナーシップ、結婚、関係' },
  { id: 8, name: '第8ハウス', meaning: '変容、危機、遺産' },
  { id: 9, name: '第9ハウス', meaning: '高等教育、旅行、哲学' },
  { id: 10, name: '第10ハウス', meaning: 'キャリア、地位、達成' },
  { id: 11, name: '第11ハウス', meaning: '友人、コミュニティ、希望' },
  { id: 12, name: '第12ハウス', meaning: '潜在意識、秘密、霊性' }
];

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getOpenAIResponse = async (
  message: string,
  conversationHistory: { role: 'user' | 'model'; content: string }[],
  currentTime: Date
) => {
  try {
    const systemPrompt = {
      role: 'system' as const,
      content: `あなたは占星術の専門家として以下の役割を担います：

1. 常に占星術の専門用語と知識を活用して回答を提供します
2. 回答は必ず以下の要素を含めます：
   - 現在の惑星の位置や動きに基づく解釈
   - ハウスとアスペクトの影響
   - 具体的なアドバイスや推奨される行動
3. 回答の形式：
   ■ 全体的な運勢：[簡潔な概要]
   ■ 重要な惑星の影響：[主要な惑星の動きとその意味]
   ■ アドバイス：[具体的な行動提案]
4. 応答は常に親しみやすく、かつ専門的な裏付けのある内容とします
5. ネガティブな予言は避け、建設的なアドバイスを提供します

禁止事項：
- 一般的な占い師の口調を使用すること
- 占星術以外の要素での解釈
- 曖昧な表現や一般的なアドバイス`
    };

    const userPrompt = {
      role: 'user' as const,
      content: `質問：${message}\n\n現在の日時：${currentTime.toLocaleDateString()}\n\n参照データ：\n【ハウス】${JSON.stringify(astrologyHouses)}\n【星座】${JSON.stringify(astrologySigns)}\n【惑星】${JSON.stringify(astrologyPlanets)}\n【アスペクト】${JSON.stringify(astrologyAspects)}\n【感受点】${JSON.stringify(astrologyPoints)}\n【黄道十二宮の区分】${JSON.stringify(zodiacQualities)}\n${JSON.stringify(zodiacElements)}\n【惑星の支配】${JSON.stringify(planetRulers)}`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        systemPrompt,
        ...conversationHistory.map(msg =>
          msg.role === 'model'
            ? { role: 'assistant' as const, content: msg.content }
            : { role: 'user' as const, content: msg.content }
        ),
        userPrompt
      ],
      temperature: 0.8, // 創造性と一貫性のバランスを取る
      max_tokens: 1000, // 十分な長さの回答を保証
      top_p: 0.9, // 出力の多様性を確保
    });
    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API エラー:', error);
    let errorMessage = '申し訳ありません。OpenAIとの通信でエラーが発生しました。';
    if (error instanceof Error) {
      // APIキーに関するエラーの場合
      if (error.message.includes('API key')) {
        errorMessage = '申し訳ありません。APIキーの認証に問題が発生しました。システム管理者にお問い合わせください。';
      }
      // レートリミットに関するエラーの場合
      else if (error.message.includes('Rate limit')) {
        errorMessage = '申し訳ありません。一時的にサービスが混雑しています。しばらく待ってから再度お試しください。';
      }
      // その他のエラーの場合
      else {
        errorMessage = `申し訳ありません。エラーが発生しました：${error.message}`;
      }
    }
    throw new Error(errorMessage);
  }
};

export default openai;
export { getOpenAIResponse };
