import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PersonalInfoProvider, usePersonalInfo } from './context/PersonalInfoContext';
import TarotReader from './components/TarotReader';
import PersonalInfoOnboarding from './components/PersonalInfoOnboarding';
import HomePage from './components/HomePage';
import AstrologyChatBot from './components/AstrologyChatBot';
import FortuneRanking from './components/FortuneRanking';

function MainContent() {
  const { personalInfo, setPersonalInfo, isOnboardingComplete } = usePersonalInfo();

  // オンボーディングが完了していない場合は、PersonalInfoOnboardingを表示
  if (!isOnboardingComplete) {
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

  // ユーザー情報がない場合のフォールバック
  const defaultUserInfo = {
    zodiacSign: personalInfo?.zodiacSign || '不明',
    birthDate: personalInfo?.birthDate || new Date().toISOString().split('T')[0],
    birthTime: personalInfo?.birthTime || ''
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <TarotReader userInfo={defaultUserInfo} />
    </div>
  );
}

type Page = 'home' | 'tarot' | 'astrology' | 'ranking' | 'personalInfoOnboarding';

function App() {
  const [page, setPage] = useState<Page>('home');
  const handleNavigation = (p: Page) => setPage(p);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'tarot':
        return <MainContent />;
      case 'astrology':
        return <AstrologyChatBot />;
      case 'ranking':
        return <FortuneRanking />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider>
      <PersonalInfoProvider>
        <div className="fixed top-0 left-0 right-0 bg-purple-900/80 backdrop-blur-sm p-4 flex justify-center gap-4 z-50">
          <button
            onClick={() => handleNavigation('home')}
            className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
          >
            ホーム
          </button>
          <button
            onClick={() => handleNavigation('tarot')}
            className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
          >
            タロット
          </button>
          <button
            onClick={() => handleNavigation('astrology')}
            className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
          >
            星占い
          </button>
          <button
            onClick={() => handleNavigation('ranking')}
            className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
          >
            ランキング
          </button>
        </div>
        {renderPage()}
      </PersonalInfoProvider>
    </ThemeProvider>
  );
}

export default App;
