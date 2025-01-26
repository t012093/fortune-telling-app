import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, RotateCcw } from 'lucide-react';
import { getTarotReading, TarotReading } from '../utils/tarot';
import { AstrologyInfo } from '../utils/gemini';
import { majorArcana } from '../data/tarotCards';
import '../styles/card.css';

// Viteでの画像インポート
import backCardImage from '../image/ar_zur_Design_a_tarot_card_back_with_intricate_mystical_symbols_398e0bb9-d9af-455a-9b5e-ceebf05fa2a9.png';

interface TarotReaderProps {
  userInfo: AstrologyInfo;
}

// タイピングアニメーションコンポーネント
const TypingText: React.FC<{ text: string; delay?: number }> = ({ 
  text, 
  delay = 500 
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [startTyping, setStartTyping] = useState(false);

  const lines = text.split('\n').filter(line => line.trim());

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    const timer = setInterval(() => {
      setCurrentLineIndex(prev => {
        if (prev < lines.length - 1) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [startTyping, lines.length]);

  return (
    <div className="whitespace-pre-wrap text-left space-y-4">
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: lineIndex <= currentLineIndex ? 1 : 0,
            y: lineIndex <= currentLineIndex ? 0 : 10
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

/* 残りのコンポーネントコードは変更なし */
const TarotReader: React.FC<TarotReaderProps> = ({ userInfo }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [showReading, setShowReading] = useState(false);
  const [dailyReadingUsed, setDailyReadingUsed] = useState(() => {
    const lastReading = localStorage.getItem('lastTarotReading');
    if (!lastReading) return false;
    return new Date(lastReading).toDateString() === new Date().toDateString();
  });
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCardSelect = async () => {
    if (!isSubscribed && dailyReadingUsed) return;
    
    setIsGenerating(true);
    
    // バックグラウンドで占い結果を取得
    try {
      const newReading = await getTarotReading(userInfo);
      const randomIndex = Math.floor(Math.random() * majorArcana.length);
      
      if (!isSubscribed) {
        setDailyReadingUsed(true);
        localStorage.setItem('lastTarotReading', new Date().toISOString());
      }

      setSelectedCard(randomIndex);
      setReading(newReading);
      
      // カードフリップ
      setTimeout(() => {
        setIsFlipped(true);
        setTimeout(() => {
          setShowReading(true);
        }, 600);
      }, 500);
    } catch (error) {
      console.error('Error getting tarot reading:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetReading = () => {
    setSelectedCard(null);
    setReading(null);
    setShowReading(false);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-purple-100 mb-4">
          Daily Tarot Reading
        </h2>
        <p className="text-purple-200 text-lg mb-8">
          {isSubscribed
            ? 'Draw a card for your reading'
            : dailyReadingUsed
            ? 'You\'ve used your free reading for today'
            : 'Draw a card for your free daily reading'}
        </p>
      </div>

      <div className="w-full max-w-xs mx-auto">
        <div className="relative">
          <AnimatePresence mode="wait">
            {!selectedCard ? (
              <motion.div
                key="draw-card"
                className={`relative cursor-pointer ${
                  (!isSubscribed && dailyReadingUsed) || isGenerating ? 'pointer-events-none' : ''
                } ${!isSubscribed && dailyReadingUsed ? 'opacity-50' : ''}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                whileHover={!isGenerating ? { scale: 1.02 } : undefined}
                onClick={!isGenerating ? handleCardSelect : undefined}
              >
                <div className="aspect-[2/3] bg-gradient-to-br from-purple-700 to-indigo-900 rounded-xl shadow-2xl">
                  <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
                    <motion.div 
                      className="w-20 h-20 border-4 border-purple-300 rounded-full flex items-center justify-center"
                      animate={isGenerating ? {
                        rotate: 360,
                        transition: {
                          duration: 2,
                          ease: "linear",
                          repeat: Infinity
                        }
                      } : undefined}
                    >
                      <span className="text-purple-100 text-lg font-semibold">
                        {isGenerating ? "Reading..." : "Draw"}
                      </span>
                    </motion.div>
                  </div>
                  <img
                    src={backCardImage}
                    alt="Tarot Card Back"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {!isSubscribed && dailyReadingUsed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <Lock className="text-purple-200 w-12 h-12" />
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="card-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="card-container"
              >
                <div 
                  className={`card ${isFlipped ? 'is-flipped' : ''}`}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="cardface cardface__front">
                    <img
                      src={backCardImage}
                      alt="Tarot Card Back"
                    />
                  </div>
                  <div className="cardface cardface__back">
                    {reading && (
                      <img
                        src={reading.card.image}
                        alt={reading.card.nameJp}
                        className={reading.isReversed ? 'rotate-180' : ''}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedCard && reading && showReading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <div className="text-purple-100 text-lg leading-[2] tracking-wide mb-6 whitespace-pre-wrap max-w-2xl mx-auto text-left h-80 overflow-y-auto px-6 py-4 rounded-lg bg-purple-900/20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-purple-500/50 [&::-webkit-scrollbar-track]:bg-purple-900/30">
                <TypingText 
                  text={reading.message
                    .split('\n')
                    .filter(line => line.trim())
                    .join('\n\n')
                  } 
                />
              </div>
              <button
                onClick={resetReading}
                className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={20} />
                <span>Draw Another Card</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {!isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm mx-auto mt-8 p-6 bg-purple-800/30 rounded-xl text-center"
        >
          <h3 className="text-xl font-semibold text-purple-100 mb-2">
            Unlock Unlimited Readings
          </h3>
          <p className="text-purple-200 mb-4">
            Get unlimited tarot readings for just $10/week
          </p>
          <button
            onClick={() => setIsSubscribed(true)}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-900 rounded-full font-semibold hover:from-amber-500 hover:to-amber-600 transition-colors flex items-center gap-2 mx-auto"
          >
            <Sparkles size={20} />
            Subscribe Now
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default TarotReader;
