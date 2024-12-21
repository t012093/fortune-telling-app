import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles, RotateCcw } from 'lucide-react';
import { getTarotReading } from '../utils/tarot';

const BACK_CARD_IMAGE = "/src/image/ar_zur_Design_a_tarot_card_back_with_intricate_mystical_symbols_398e0bb9-d9af-455a-9b5e-ceebf05fa2a9.png";
const CARD_IMAGE = "/src/image/sample.jpg"


const TarotReader = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [reading, setReading] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [dailyReadingUsed, setDailyReadingUsed] = useState(() => {
    const lastReading = localStorage.getItem('lastTarotReading');
    if (!lastReading) return false;
    return new Date(lastReading).toDateString() === new Date().toDateString();
  });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleCardSelect = async () => {
    if (!isSubscribed && dailyReadingUsed) return;
    
    setIsDrawing(true);
    const randomIndex = Math.floor(Math.random() * 8);
    const newReading = getTarotReading();
    
    // カードを即座に選択
    setSelectedCard(randomIndex);
    
    // アニメーション完了を待つ
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1.67秒から1秒に短縮
    
    setReading(newReading);
    
    if (!isSubscribed) {
      setDailyReadingUsed(true);
      localStorage.setItem('lastTarotReading', new Date().toISOString());
    }

    // 読み解きテキストをより早く表示
    setTimeout(() => {
      setShowReading(true);
      setIsDrawing(false); // アニメーション完了後に isDrawing を false に設定
    }, 500); // 800msから500msに短縮
  };

  const resetReading = () => {
    setSelectedCard(null);
    setReading('');
    setIsDrawing(false);
    setShowReading(false);
  };

  const deckVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 } // 0.3秒から0.2秒に短縮
    }
  };

  const cardVariants = {
    initial: { 
      rotateY: 0,
      x: 0,
      y: 0,
      scale: 1
    },
    drawing: {
      rotateY: 180,
      x: [0, -100, 0],
      y: [0, -50, 0],
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        times: [0, 0.4, 1],
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-100 mb-4">
          Daily Tarot Reading
        </h2>
        <p className="text-purple-200 text-lg">
          {isSubscribed
            ? 'Draw a card for your reading'
            : dailyReadingUsed
            ? 'You\'ve used your free reading for today'
            : 'Draw a card for your free daily reading'}
        </p>
      </div>

      <div className="relative w-full max-w-xs">
        {!selectedCard ? (
          <motion.div
            className={`relative cursor-pointer ${
              !isSubscribed && dailyReadingUsed ? 'opacity-50 pointer-events-none' : ''
            }`}
            variants={deckVariants}
            whileHover="hover"
            onClick={handleCardSelect}
          >
            <div className="aspect-[2/3] bg-gradient-to-br from-purple-700 to-indigo-900 rounded-xl shadow-2xl">
              <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-purple-300 rounded-full flex items-center justify-center">
                  <span className="text-purple-100 text-lg font-semibold">Draw</span>
                </div>
              </div>
              <img
                src={BACK_CARD_IMAGE}
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
          <div className="perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                className="relative transform-gpu"
                initial="initial"
                animate="drawing"
                variants={cardVariants}
                style={{ transformStyle: 'preserve-3d' }}
              >
                      <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl backface-hidden">
                        {/* isDrawingがtrueの間は裏面を表示、falseになったら表面を表示 */}
                        {isDrawing ? (
                          <motion.img
                            key="back"
                            src={BACK_CARD_IMAGE}
                            alt="Tarot Card Back"
                            className="w-full h-full object-cover"
                            style={{ rotateY: 0 }}
                          />
                        ) : (
                          <motion.img
                            key="front"
                            src={CARD_IMAGE}
                            alt="Selected Tarot Card"
                            className="w-full h-full object-cover"
                            style={{ rotateY: 180 }}
                          />
                        )}
                      </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showReading ? 1 : 0, y: showReading ? 0 : 20 }}
              transition={{ delay: 0.3 }} // 0.5秒から0.3秒に短縮
              className="mt-8 text-center"
            >
              <p className="text-purple-100 text-lg leading-relaxed mb-6">{reading}</p>
              <button
                onClick={resetReading}
                className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RotateCcw size={20} />
                Draw Another Card
              </button>
            </motion.div>
          </div>
        )}
      </div>

      {!isSubscribed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }} // 0.3秒から0.2秒に短縮
          className="mt-8 p-6 bg-purple-800/30 rounded-xl text-center max-w-sm w-full"
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