import { GoogleGenerativeAI } from '@google/generative-ai';
import { PersonalInfo } from '../components/PersonalInfoOnboarding';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const safeGenerateContent = async (
  model: any,
  prompt: string
) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Content generation error:', error);
    throw error;
  }
};

export async function getGeminiResponse(
  userInput: string,
  conversationHistory: { role: string; content: string; }[],
  personalInfo?: PersonalInfo
): Promise<string> {
  try {
    if (!personalInfo) {
      return "申し訳ありません。星座を教えていただけますか？（例：「牡羊座の運勢を教えて」）";
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    // 初回の挨拶の場合
    if (conversationHistory.length === 0) {
      const initialPrompt = `占星術師として、${personalInfo.name}さん（${personalInfo.zodiacSign}）への初めての挨拶と導入を行ってください。
以下の要素を含めてください：
- 現在の惑星の動きから見た${personalInfo.zodiacSign}の概況
- どのような相談ができるかの例（3つ程度）
- 親しみやすく、かつ専門家としての信頼感のある口調
- 適切な絵文字の使用

制約：
- 200文字程度
- 具体的な例示を含める
- 前向きな内容であること`;

      return await safeGenerateContent(model, initialPrompt);
    }

    // 通常の占い相談の場合
    const consultationPrompt = `占星術師として、${personalInfo.name}さん（${personalInfo.zodiacSign}）からの質問「${userInput}」について回答してください。

以下の要素を含めて回答を構築してください：

1. 質問の文脈を踏まえた導入
2. ${personalInfo.zodiacSign}の現在の運勢状況
3. 具体的なアドバイス（3つ以上）
4. 今後の展望
5. フォローアップの質問

制約：
- 専門的かつ親しみやすい口調
- 具体的な例示を含める
- 前向きで実践的なアドバイス
- 適切な絵文字の使用
- 箇条書きと文章を適切に組み合わせる`;

    return await safeGenerateContent(model, consultationPrompt);

  } catch (error) {
    console.error('Gemini API Error:', error);
    return "申し訳ありません。一時的な問題が発生しました。しばらくしてから再度お試しください。";
  }
}