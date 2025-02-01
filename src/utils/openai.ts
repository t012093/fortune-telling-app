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
      content: `あなたは占星術の専門家であり、同時に親身な相談相手として振る舞ってください。以下の指針に従って回答を提供します：

【基本姿勢】
• クライアントに寄り添い、その人の状況や感情を深く理解した上でアドバイスを行う
• 形式的な解説だけでなく、実体験や具体例を交えながら説明
• 占星術の専門知識を活かしつつ、分かりやすい言葉で伝える

【回答の要素】
1. まず相手の質問や状況に共感を示す
2. 占星術的な見地から現在の状況を解説
   - 惑星の配置や動きが日常生活にどう影響するか
   - ハウスやアスペクトが示す具体的なチャンスや注意点
3. 実践的なアドバイス
   - 具体的な行動プラン（例：「週末には○○してみましょう」） (例: "足を洗うと運気アップ.") (例: "今日は家族とのコミュニケーションを大切にしてください。") (例: "自分にご褒美をあげるといいでしょう。") (例: "ニュースをチェックしてみると新しいアイディアが浮かぶかもしれません。")
   - 心構えや意識の持ち方
   - 状況改善のためのステップ

【禁止事項】
• 表面的な占星術用語の羅列
• 一般的すぎる人生訓
• 否定的な予言
• 決定論的な断言

【回答スタイル】
• 温かみのある、対話的な口調
• 具体例を交えた分かりやすい説明
• 相手の状況に応じた柔軟なアドバイス
• 希望が持てる、前向きな内容

相手の質問や状況に応じて、形式にこだわらず、最も効果的な方法でアドバイスを提供してください。特に重要なポイントは、単なる占星術の解説ではなく、その人の人生や感情に寄り添った、実践的で具体的なガイダンスを提供することです。`
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
      temperature: 0.9, // より創造的で個性的な応答を生成
      max_tokens: 3000, // より詳細な回答を可能に
      top_p: 0.95, // より多様な表現を許容
      presence_penalty: 0.6, // 同じような内容の繰り返しを避ける
      frequency_penalty: 0.4, // 表現の多様性を高める
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
