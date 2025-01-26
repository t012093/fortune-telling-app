import { majorArcana } from '../data/tarotCards';
import { getIntegratedReading, AstrologyInfo } from './gemini';

export interface TarotReading {
  card: typeof majorArcana[0];
  isReversed: boolean;
  message: string;
}

export const getTarotReading = async (astrologyInfo: AstrologyInfo): Promise<TarotReading> => {
  // ランダムにカードを選択
  const randomCard = majorArcana[Math.floor(Math.random() * majorArcana.length)];
  
  // カードが逆位置かどうかをランダムに決定
  const isReversed = Math.random() < 0.5;

  // Geminiを使用して総合的な解釈を生成
  const message = await getIntegratedReading(
    randomCard,
    isReversed,
    astrologyInfo
  );

  return {
    card: randomCard,
    isReversed,
    message
  };
};
