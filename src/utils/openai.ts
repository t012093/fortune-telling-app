import OpenAI from 'openai';
import { astrologySigns, astrologyPlanets } from './astrologyData';
import { astrologyAspects, astrologyPoints, zodiacQualities, zodiacElements, planetRulers } from './astrologyAdditionalInfo';

const astrologyHouses = [
  { id: 1, name: '第1ハウス', meaning: '自己、 внешний вид、 начинания' },
  { id: 2, name: '第2ハウス', meaning: ' финансовый、 ценности、 имущество' },
  { id: 3, name: '第3ハウス', meaning: 'общение、 обучение、 братья и сестры' },
  { id: 4, name: '第4ハウス', meaning: 'семья、 дом、 корни' },
  { id: 5, name: '第5ハウス', meaning: 'творчество、 дети、 развлечения' },
  { id: 6, name: '第6ハウス', meaning: 'здоровье、 работа、 рутина' },
  { id: 7, name: '第7ハウス', meaning: 'партнерство、 брак、 отношения' },
  { id: 8, name: '第8ハウス', meaning: 'трансформация、 кризисы、 наследство' },
  { id: 9, name: '第9ハウス', meaning: 'высшее образование、 путешествия、 философия' },
  { id: 10, name: '第10ハウス', meaning: 'карьера、 статус、 достижения' },
  { id: 11, name: '第11ハウス', meaning: 'друзья、 сообщество、 надежды' },
  { id: 12, name: '第12ハウス', meaning: 'подсознание、 тайны、 духовность' }
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
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // またはその他の適切なモデル
      messages: conversationHistory.map(msg =>
        msg.role === 'model'
          ? { role: 'assistant' as const, content: msg.content, name: 'assistant' as const }
          : { role: 'user' as const, content: msg.content }
      ).concat({ role: 'user', content: `あなたは占星術の知識を持つ占い師として振る舞ってください。一般的な回答は避けて、占星術の視点から回答してください。\n\nユーザーの質問：${message}\n\n現在の日時：${currentTime.toLocaleDateString()}。\n\n追加の占星術情報：\n【ハウス】${JSON.stringify(astrologyHouses)}\n【星座】${JSON.stringify(astrologySigns)}\n【惑星】${JSON.stringify(astrologyPlanets)}\n【アスペクト】${JSON.stringify(astrologyAspects)}\n【感受点】${JSON.stringify(astrologyPoints)}\n【黄道十二宮の区分】${JSON.stringify(zodiacQualities)}\n${JSON.stringify(zodiacElements)}\n【惑星の支配】${JSON.stringify(planetRulers)}` }),
    });
    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('OpenAI API エラー:', error);
    return '申し訳ありません。OpenAIとの通信でエラーが発生しました。';
  }
};

export default openai;
export { getOpenAIResponse };
