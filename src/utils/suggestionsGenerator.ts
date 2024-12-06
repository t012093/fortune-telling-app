import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateContextualSuggestions(
  lastMessage: string,
  zodiacSign: string
): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.7,
        topK: 20,
        maxOutputTokens: 1024,
      },
    });

    const prompt = `占星術師として、以下のメッセージに関連する3つの具体的なフォローアップ質問を生成してください。
前のメッセージ: "${lastMessage}"
星座: ${zodiacSign}

ルール：
- 各質問は30文字以内
- 具体的で実用的な質問
- 前のメッセージの内容に関連した質問
- 相談者が答えやすい質問
- 占いに関連する質問

フォーマット：
質問1
質問2
質問3

注意：
- 箇条書きや番号は付けない
- 各質問は1行で
- 余計な説明は不要`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // 改行で分割して配列に変換
    return response
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 3); // 最大3つまで

  } catch (error) {
    console.error('Error generating suggestions:', error);
    // デフォルトの質問を返す
    return [
      "今日の運勢を教えて",
      "恋愛運が知りたいです",
      "仕事でのアドバイスをください"
    ];
  }
}