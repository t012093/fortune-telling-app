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

function computeEnhancedAstrologyContext(): string {
  // Placeholder enhanced astrology logic.
  // In the future, you can include dynamic computations based on planetary positions and aspects.
  return `
【強化された占星術ロジック】
・惑星の配置とアスペクトから、リーダーシップを発揮するタイミングが近づいている可能性があります。
・第10ハウスの影響により、キャリアにおける新たなチャンスが生まれる兆しがあります。
`;
}

const getOpenAIResponse = async (
  message: string,
  conversationHistory: { role: 'user' | 'model' | 'system' | 'assistant'; content: string }[],
  currentTime: Date,
  personalInfo?: { fourPillars?: any }
) => {
  try {
    const systemPrompt = {
      role: 'system' as const,
      content: `あなたは占星術と四柱推命の専門家であり、同時に親身な相談相手として振る舞ってください。両方の占術を組み合わせて、より深い洞察を提供します：

【鑑定の基本姿勢】
• クライアントに寄り添い、その人の状況や感情を深く理解した上でアドバイスを行う
• 占星術と四柱推命の両方の視点から、総合的な解釈を提供
• 形式的な解説を避け、具体例を交えながら分かりやすく説明

【複合的な占術アプローチ】
1. 西洋占星術による解釈
   - 惑星の配置と運行
   - ハウスとアスペクトの影響
   - 現在のトランジットの意味

2. 四柱推命からの視点
   - 日柱・月柱・年柱・時柱の組み合わせ
   - 五行のバランス
   - 運勢の流れと変化の時期

【回答の構成】
1. まず相手の質問や状況に共感を示す
2. 両占術からの総合的な見解
   - 西洋占星術からの解釈
   - 四柱推命からの視点
   - 両者の共通点や相違点から導き出される洞察
3. 具体的なアドバイス
   • 吉方位や開運アクション
   • タイミングの選び方
   • 注意点や活かすべきポイント
   • 具体的な行動提案：
     - 「新月の日に○○をする」
     - 「五行の○○を強化するために△△を心がける」
     - 「運気の流れに乗るために□□を試してみる」
     - 「この時期だからこそ効果的な◇◇」

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

    // 四柱推命の情報を文字列に変換
    const fourPillarsInfo = conversationHistory[0].content.includes('四柱推命データ：')
      ? '以前の四柱推命データを継続して参照'
      : personalInfo?.fourPillars
        ? `
【四柱推命データ】
■ 年柱：${personalInfo.fourPillars.year.stem.name}${personalInfo.fourPillars.year.branch.name}
■ 月柱：${personalInfo.fourPillars.month.stem.name}${personalInfo.fourPillars.month.branch.name}
■ 日柱：${personalInfo.fourPillars.day.stem.name}${personalInfo.fourPillars.day.branch.name}
■ 時柱：${personalInfo.fourPillars.hour.stem.name}${personalInfo.fourPillars.hour.branch.name}`
        : '四柱推命データなし（生年月日時が不完全）';

    // Compute enhanced astrology context and append it to the reference data
    const enhancedAstrologyContext = computeEnhancedAstrologyContext();

    const userPrompt = {
      role: 'user' as const,
      content: `質問：${message}\n\n現在の日時：${currentTime.toLocaleDateString()}\n\n参照データ：
【ハウス】${JSON.stringify(astrologyHouses)}
【星座】${JSON.stringify(astrologySigns)}
【惑星】${JSON.stringify(astrologyPlanets)}
【アスペクト】${JSON.stringify(astrologyAspects)}
【感受点】${JSON.stringify(astrologyPoints)}
【黄道十二宮の区分】${JSON.stringify(zodiacQualities)}
${JSON.stringify(zodiacElements)}
【惑星の支配】${JSON.stringify(planetRulers)}

${fourPillarsInfo}

${enhancedAstrologyContext}`
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
      max_tokens: 5000, // より詳細な回答を可能に
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
      } else if (error.message.includes('Rate limit')) {
        errorMessage = '申し訳ありません。一時的にサービスが混雑しています。しばらく待ってから再度お試しください。';
      } else {
        errorMessage = `申し訳ありません。エラーが発生しました：${error.message}`;
      }
    }
    throw new Error(errorMessage);
  }
};

export default openai;
export { getOpenAIResponse };