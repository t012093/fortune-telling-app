import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { usePersonalInfo } from '../context/PersonalInfoContext';
import { Message, ChatContext } from '../types/chat';
import { getOpenAIResponse } from '../utils/openai';

const SUGGESTIONS = [
  "今日の運勢を教えて",
  "恋愛運が知りたいです",
  "仕事でのアドバイスをください",
  "金運アップの方法は？",
  "健康運はどうですか？",
  "いつが転機となりそう？",
] as const;


export default function AstrologyChatBot() {
  const { personalInfo } = usePersonalInfo();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [chatContext, setChatContext] = useState<ChatContext>({
    consecutiveQuestions: 0,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // チャットの初期メッセージを設定
  useEffect(() => {
    if (messages.length === 0 && personalInfo) {
      const initialMessage: Message = {
        id: 1,
        content: `こんにちは、${personalInfo.name}さん！\n${personalInfo.zodiacSign}の視点から、あなたの運勢についてお話しできることを嬉しく思います。\n\n気になることについて、お気軽にお尋ねください。`,
        sender: 'bot',
        type: 'text',
        timestamp: new Date(),
        metadata: {
          suggestions: SUGGESTIONS,
        },
      };
      setMessages([initialMessage]);
    }
  }, [personalInfo]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const analyzeSuggestions = (userInput: string): string[] => {
    const suggestions: string[] = [];
    
    if (userInput.includes('恋愛')) {
      suggestions.push(
        "理想の相手は近くにいますか？",
        "出会いのベストなタイミングは？",
        "恋愛運を上げるためのアドバイスをください"
      );
    } else if (userInput.includes('仕事')) {
      suggestions.push(
        "転職のタイミングは？",
        "職場での人間関係について",
        "昇進のチャンスはありますか？"
      );
    } else if (userInput.includes('金運')) {
      suggestions.push(
        "投資のタイミングは？",
        "金運を上げる方法を教えて",
        "今月の臨時収入の可能性は？"
      );
    } else {
      suggestions.push(...SUGGESTIONS.slice(0, 3));
    }

    return suggestions;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const now = new Date(); // 現在の時刻を取得

    const userMessage: Message = {
      id: Date.now(),
      content: input,
      sender: 'user',
      type: 'text',
      timestamp: now,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      // 最新の5組の会話を取得（最大10メッセージ：ユーザーの質問と応答のペア）
      const recentMessages = messages.slice(-10);
      const conversationHistory: { role: 'user' | 'assistant' | 'system'; content: string }[] = recentMessages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      // 会話の文脈を要約して追加
      // 文脈の要約をより詳細に
      const contextSummary = {
        role: 'system' as const,
        content: `これまでの会話の文脈：${personalInfo?.name}さん（${personalInfo?.zodiacSign}座）との会話です。
直近の話題：${chatContext.lastQuestion || 'まだ会話が始まったばかりです'}`
      };

      // personalInfoを渡して応答を生成（文脈を含める）
      const response = await getOpenAIResponse(input, [contextSummary, ...conversationHistory], now, undefined);

      const newSuggestions = analyzeSuggestions(input);

      const botMessage: Message = {
        id: Date.now() + 1,
        content: response,
        sender: 'bot',
        type: 'fortune',
        timestamp: new Date(),
        metadata: {
          suggestions: newSuggestions,
        },
      };

      setMessages(prev => [...prev, botMessage]);
      setChatContext(prev => ({
        ...prev,
        lastQuestion: input,
        consecutiveQuestions: prev.consecutiveQuestions + 1,
      }));
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: error instanceof Error ? error.message : '申し訳ありません。一時的な問題が発生しました。もう一度お試しください。',
        sender: 'bot',
        type: 'error',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowSuggestions(true), 1000);
    }
  };

  return (
    <div className="h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user'
                    ? 'bg-purple-500'
                    : 'bg-indigo-600'
                }`}
              >
                {message.sender === 'user' ? (
                  <User size={16} className="text-white" />
                ) : (
                  <Bot size={16} className="text-white" />
                )}
              </div>
              <div className="space-y-2 max-w-[80%]">
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-purple-500 text-white'
                      : message.type === 'error'
                      ? 'bg-red-500/50 text-red-50 border border-red-400'
                      : 'bg-indigo-600/50 text-purple-50'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>

                {message.sender === 'bot' && message.metadata?.suggestions && (messages.length > 1 ? showSuggestions : true) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.metadata.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(suggestion)}
                        className="text-sm px-3 py-1 rounded-full bg-purple-900/30 text-purple-200 hover:bg-purple-800/30 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-purple-300"
          >
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
            <span className="text-sm">占いの神託を読み解いています...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="運勢や気になることを聞いてください..."
          className="w-full bg-purple-900/30 text-purple-100 placeholder-purple-300/50 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-colors
            ${isLoading 
              ? 'bg-purple-500/50 cursor-not-allowed' 
              : 'bg-purple-500 hover:bg-purple-600'
            }`}
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
