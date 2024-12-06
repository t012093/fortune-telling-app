export type MessageType = 'text' | 'fortune' | 'compatibility' | 'timing' | 'advice';

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'bot';
  type: MessageType;
  timestamp: Date;
  metadata?: {
    fortuneType?: string;
    targetDate?: string;
    compatibility?: {
      sign1: string;
      sign2: string;
      score: number;
    };
    suggestions?: string[];
  };
}

export type FortuneType = {
  type: 'general' | 'love' | 'work' | 'money' | 'health';
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly';
};

export interface ChatContext {
  lastFortuneType?: FortuneType;
  lastQuestion?: string;
  consecutiveQuestions: number;
}