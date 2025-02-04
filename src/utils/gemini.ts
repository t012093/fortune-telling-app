import { GoogleGenerativeAI } from '@google/generative-ai';

// Types
interface AstrologyInfo {
  zodiacSign: string;
  birthDate: string;
  birthTime?: string;
}

// State
let genAI: GoogleGenerativeAI | null = null;

// APIクライアントを作成する関数
const createGeminiClient = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

// APIキーを設定する関数
const setGeminiApiKey = (apiKey: string) => {
  genAI = createGeminiClient(apiKey);
};

// APIキーをクリアする関数
const clearGeminiApiKey = () => {
  genAI = null;
};

const getIntegratedReading = async (
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
  if (!genAI) {
    throw new Error('Gemini APIキーが設定されていません。アカウント設定からAPIキーを設定してください。');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
あなたは40年以上の経験を持つタロット占いの大家として、以下の役割を担います：

1. タロットカードの解釈：
   - カードの象徴的意味の深い理解
   - 正位置/逆位置の微妙な違いの解説
   - カードの図像に描かれた象徴の詳細な分析

2. 占星術との統合：
   - タロットと占星術の相互関係の解明
   - クライアントの星座特性との関連付け
   - 現在の天体の動きとの関連性

提供された情報：
━━━━━━━━━━━━━━━━━━━━━━
【タロットカード】
カード：${tarotCard.nameJp}${isReversed ? '（逆位置）' : '（正位置）'}
意味：${tarotCard.description}
キーワード：${isReversed ? tarotCard.attribute.reversed.join('、') : tarotCard.attribute.upright.join('、')}

【占星術データ】
星座：${astrologyInfo.zodiacSign}
生年月日：${astrologyInfo.birthDate}
${astrologyInfo.birthTime ? `出生時刻：${astrologyInfo.birthTime}` : ''}

鑑定日：${new Date().toLocaleDateString('ja-JP')}
━━━━━━━━━━━━━━━━━━━━━━

以下の構造で、プロフェッショナルな鑑定結果を提供してください：

【神秘からの啓示】
※タロットカードが映し出す、相談者の現在の状況と内なる真実について、象徴的かつ具体的に解説。

【カードの深層解釈】
1. シンボリズムの分析
   - カードに描かれた重要な象徴の意味
   - 現在の状況への関連性

2. エネルギーの流れ
   - カードが示す精神的・感情的なエネルギーの状態
   - 潜在的な可能性と課題

【占星術との共鳴】
• 星座の特質との関係性
• 現在の惑星配置の影響
• カードの象徴と天体の調和

【具体的なガイダンス】
1. 精神面：[具体的な実践方法]
2. 実践面：[具体的な行動指針]
3. 対人関係：[人間関係における注意点]
4. 意識の方向性：[focus すべき重要な側面]

【開運のために】
❍ 推奨される瞑想的実践：[具体的な瞑想や意識の持ち方]
❍ 儀式的アプローチ：[開運のための具体的な行動や習慣]
❍ ラッキーエレメント
  ■ 色：[具体的な色と、その選択理由]
  ■ 道具：[具体的なアイテムと、その選択理由]
  ■ 場所：[具体的な場所や方角と、その選択理由]
  ■ 時間帯：[具体的な時間帯と、その選択理由]

※回答は必ず以下の条件を満たすこと：
- 象徴的表現と具体的アドバイスのバランスを保つ
- 単なる一般的なアドバイスを避け、タロットと占星術の専門的知見に基づく解釈を提供
- 逆位置のカードは「警告」ではなく「成長の機会」「新しい視点」として解釈
- すべての解釈を前向きで建設的な観点から提示
- 課題があっても、それを乗り越えるための具体的な方法と、その先にある可能性を示す
- ネガティブな予言は絶対に避け、必ず希望と解決の道筋を示す
- 神秘的な雰囲気を保ちながら、明確で理解しやすい表現を使用

【逆位置の場合の追加指針】
- 逆位置は単なる「悪い状態」ではなく、通常とは異なる角度からの気づきや、内なる成長のチャンスとして解釈
- 問題点の指摘ではなく、新たな可能性や隠れたチャンスの発見として表現
- より深い自己理解や、想定外の展開がもたらす思わぬ恩恵に焦点を当てる
- 通常の解釈にとらわれない、創造的で前向きな視点を提供`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return '申し訳ありません。神秘の知識の読み解きに一時的な障壁が生じました。深い洞察をお届けするため、しばらく時間を置いてから再度お試しください。';
  }
};

// Exports
export type { AstrologyInfo };
export {
  createGeminiClient,
  setGeminiApiKey,
  clearGeminiApiKey,
  getIntegratedReading
};
