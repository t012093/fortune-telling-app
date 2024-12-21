import React, { useState } from 'react';
import { Moon, Sparkles, Wrench, Settings } from 'lucide-react';
import AstrologyChatBot from './components/AstrologyChatBot';
import TarotReader from './components/TarotReader';
import HomePage from './components/HomePage';
import GeminiTest from './components/GeminiTest';
import PersonalInfoOnboarding from './components/PersonalInfoOnboarding';
import { ThemeProvider } from './context/ThemeContext';
import { PersonalInfoProvider, usePersonalInfo } from './context/PersonalInfoContext';

function MainContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'astrology' | 'tarot' | 'test'>('home');
  const { personalInfo, setPersonalInfo, clearPersonalInfo, isOnboardingComplete } = usePersonalInfo();
  const [showSettings, setShowSettings] = useState(false);

  if (!isOnboardingComplete && currentPage !== 'home') {
    return (
      <PersonalInfoOnboarding
        onComplete={(info) => {
          setPersonalInfo(info);
        }}
        onSkip={() => {
          setPersonalInfo({
            name: 'ゲスト',
            birthDate: new Date().toISOString().split('T')[0],
            birthTime: '',
            gender: '',
            zodiacSign: '不明'
          });
        }}
        existingData={personalInfo || undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      {currentPage === 'home' ? (
        <HomePage onNavigate={setCurrentPage} />
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="relative text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-200 mb-2">
              神秘の占い
            </h1>
            {personalInfo && (
              <>
                <p className="text-purple-200 text-lg">
                  {personalInfo.name}さん（{personalInfo.zodiacSign}）の運命の導き
                </p>
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="absolute right-4 top-4 p-2 rounded-full hover:bg-purple-800/30 transition-colors"
                >
                  <Settings className="text-purple-200" size={24} />
                </button>
                {showSettings && (
                  <div className="absolute right-4 top-16 bg-purple-900/90 rounded-lg shadow-xl border border-purple-700/50 p-4 text-left z-50">
                    <button
                      onClick={() => {
                        setShowSettings(false);
                        clearPersonalInfo();
                      }}
                      className="text-purple-200 hover:text-white transition-colors"
                    >
                      プロフィールをリセット
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setCurrentPage('astrology')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                currentPage === 'astrology'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              <Moon size={20} />
              <span>星占い</span>
            </button>
            <button
              onClick={() => setCurrentPage('tarot')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                currentPage === 'tarot'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50'
              }`}
            >
              <Sparkles size={20} />
              <span>タロット</span>
            </button>
            {import.meta.env.DEV && (
              <button
                onClick={() => setCurrentPage('test')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  currentPage === 'test'
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50'
                }`}
              >
                <Wrench size={20} />
                <span>テスト</span>
              </button>
            )}
          </div>

          <div className="bg-purple-950/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-800/30 p-6">
            {currentPage === 'astrology' && <AstrologyChatBot />}
            {currentPage === 'tarot' && <TarotReader />}
            {currentPage === 'test' && <GeminiTest />}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PersonalInfoProvider>
        <MainContent />
      </PersonalInfoProvider>
    </ThemeProvider>
  );
}

export default App;