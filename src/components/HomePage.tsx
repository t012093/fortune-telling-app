import React from 'react';
import { Moon, Sparkles, ArrowRight, Star, Compass, ScrollText, Users, Award, LogIn, UserPlus, Settings } from 'lucide-react';

type HomePageProps = {
  onNavigate: (page: 'home' | 'astrology' | 'tarot' | 'personalInfoOnboarding') => void;
};

const features = [
  { icon: Star, text: '占星術の専門家による監修' },
  { icon: Users, text: '95%以上の利用者満足度' },
  { icon: Compass, text: '風水と四柱推命との統合分析' },
  { icon: Award, text: '独自のAIアルゴリズム' },
];

const plans = [
  {
    name: 'フリープラン',
    price: '無料',
    features: ['1日1回の占い', '基本的な運勢診断', 'AIチャットボット'],
  },
  {
    name: 'プレミアムプラン',
    price: '¥1,980/月',
    features: ['無制限の占い', '詳細な運命診断', '専門家によるアドバイス', '全占術へのアクセス'],
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* Header with Auth Buttons */}
      <div className="w-full max-w-7xl flex justify-end mb-8 px-4">
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 text-purple-200 hover:bg-purple-800/50 transition-colors">
            <LogIn size={18} />
            <span>ログイン</span>
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/50 text-purple-200 hover:bg-purple-800/50 transition-colors"
            onClick={() => onNavigate('personalInfoOnboarding')}
          >
            <Settings size={18} />
            <span>アカウント設定</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors">
            <UserPlus size={18} />
            <span>新規登録</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-200 mb-4">
          神秘の占い
        </h1>
        <p className="text-xl text-purple-200 mb-8">AI技術と占術の専門家による、究極の運命診断</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-purple-900/30 px-4 py-2 rounded-full">
              <feature.icon size={16} className="text-purple-300" />
              <span className="text-purple-200 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divination Methods */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full mb-16">
        <div
          onClick={() => onNavigate('astrology')}
          className="group cursor-pointer bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 hover:bg-purple-800/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <Moon size={32} className="text-purple-300" />
            <ArrowRight size={24} className="text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
          </div>
          <h2 className="text-2xl font-semibold text-purple-100 mb-2">星占い</h2>
          <p className="text-purple-300">
            最新のAI技術と占星術の専門家による、
            あなただけの運命診断。西洋占星術と四柱推命を組み合わせた独自の分析。
          </p>
        </div>

        <div
          onClick={() => onNavigate('tarot')}
          className="group cursor-pointer bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 hover:bg-purple-800/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <Sparkles size={32} className="text-purple-300" />
            <ArrowRight size={24} className="text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300" />
          </div>
          <h2 className="text-2xl font-semibold text-purple-100 mb-2">タロット占い</h2>
          <p className="text-purple-300">
            伝統的なタロット占いとAIの予測を組み合わせた、
            高精度な運命診断。風水の要素も取り入れた総合的なアドバイス。
          </p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-bold text-center text-purple-100 mb-8">料金プラン</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30 flex flex-col">
              <h3 className="text-xl font-semibold text-purple-100 mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-purple-200 mb-4">
                {plan.price}
              </p>
              <ul className="space-y-3">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-purple-200">
                    <Star size={16} className="text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full mt-auto px-6 py-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors">
                選択する
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-purple-100 mb-8">利用者の声</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
            <p className="text-purple-200 mb-4">
              「AIと専門家の組み合わせで、驚くほど的確なアドバイスをいただけました。人生の重要な決断に役立っています。」
            </p>
            <p className="text-purple-300 text-sm">- Aさん（会社員）</p>
          </div>
          <div className="bg-purple-900/30 backdrop-blur-sm rounded-2xl p-6 max-w-sm">
            <p className="text-purple-200 mb-4">
              「毎日の運勢チェックが習慣になっています。精神的な支えになっていて、とても感謝しています。」
            </p>
            <p className="text-purple-300 text-sm">- Bさん（自営業）</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center">
        <p className="text-purple-200 text-lg mb-4">
          あなたの運命の扉が開かれるのを待っています
        </p>
        <div className="flex gap-2 justify-center text-purple-300 text-sm">
          <span>✧</span>
          <span>占い</span>
          <span>✧</span>
          <span>運命</span>
          <span>✧</span>
          <span>未来</span>
          <span>✧</span>
        </div>
      </div>
    </div>
  );
}