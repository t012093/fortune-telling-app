import React, { useState } from 'react';
import { Star, Trophy, Calendar, Crown, Sparkles, Heart } from 'lucide-react';

interface RankingUser {
  name: string;
  zodiacSign: string;
  fortuneScore: number;
  luckyStreak: number;
  thanksCount: number;
  avatarUrl: string;
}

const mockWeeklyRanking: RankingUser[] = [
  {
    name: "さくら",
    zodiacSign: "さそり座",
    fortuneScore: 95,
    luckyStreak: 7,
    thanksCount: 42,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"
  },
  {
    name: "ハルカ",
    zodiacSign: "おうし座",
    fortuneScore: 88,
    luckyStreak: 5,
    thanksCount: 35,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"
  },
  {
    name: "ユウキ",
    zodiacSign: "てんびん座",
    fortuneScore: 85,
    luckyStreak: 4,
    thanksCount: 28,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
  },
];

const mockMonthlyRanking: RankingUser[] = [
  {
    name: "カナ",
    zodiacSign: "みずがめ座",
    fortuneScore: 92,
    luckyStreak: 15,
    thanksCount: 156,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=4"
  },
  {
    name: "トモヤ",
    zodiacSign: "おひつじ座",
    fortuneScore: 89,
    luckyStreak: 12,
    thanksCount: 145,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=5"
  },
  {
    name: "ミユ",
    zodiacSign: "ふたご座",
    fortuneScore: 87,
    luckyStreak: 10,
    thanksCount: 128,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=6"
  },
];

const FortuneRanking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  const getRankingIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <Star className="w-6 h-6 text-purple-400" />;
    }
  };

  const currentRanking = activeTab === 'weekly' ? mockWeeklyRanking : mockMonthlyRanking;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-purple-900 to-indigo-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-200 mb-8">
          運勢ランキング
        </h1>

        {/* タブ切り替え */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === 'weekly'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50'
            }`}
          >
            <Calendar size={20} />
            <span>週間ランキング</span>
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
              activeTab === 'monthly'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50'
            }`}
          >
            <Crown size={20} />
            <span>月間ランキング</span>
          </button>
        </div>

        {/* ランキングリスト */}
        <div className="space-y-4">
          {currentRanking.map((user, index) => (
            <div
              key={index}
              className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-purple-700/30"
            >
              <div className="flex-shrink-0">
                {getRankingIcon(index)}
              </div>
              <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-purple-100">
                    {user.name}
                  </span>
                  <span className="text-sm text-purple-300">
                    {user.zodiacSign}
                  </span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-purple-200">
                      運気スコア: {user.fortuneScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-purple-200">
                      ラッキーストリーク: {user.luckyStreak}日
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-purple-200">
                      {activeTab === 'weekly' ? '週間' : '月間'}ありがとう数: {user.thanksCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ランキング説明 */}
        <div className="mt-8 p-6 bg-purple-800/20 rounded-xl">
          <h2 className="text-xl font-semibold text-purple-100 mb-4">
            ランキングについて
          </h2>
          <div className="space-y-3 text-purple-200">
            <p>
              • 運気スコアは、占い結果の的中率や日々の運勢をもとに算出されます
            </p>
            <p>
              • ラッキーストリークは、連続して良い運勢が続いている日数を表します
            </p>
            <p>
              • ありがとう数は、占い結果に対して送られた感謝の数を表します
            </p>
            <p>
              • 週間ランキングは毎週月曜日に、月間ランキングは毎月1日にリセットされます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneRanking;
