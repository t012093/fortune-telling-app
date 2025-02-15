import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Menu, X, User } from 'lucide-react';
import { PersonalInfoProvider, usePersonalInfo } from './context/PersonalInfoContext';
import { ApiKeyProvider, useApiKeys } from './context/ApiKeyContext';
import { setOpenAIApiKey } from './utils/openai';
import { setGeminiApiKey } from './utils/gemini';
import TarotReader from './components/TarotReader';
import PersonalInfoOnboarding from './components/PersonalInfoOnboarding';
import HomePage from './components/HomePage';
import AstrologyChatBot from './components/AstrologyChatBot';
import FortuneRanking from './components/FortuneRanking';

// APIキーの初期化を行うコンポーネント
function ApiKeyInitializer({ children }: { children: React.ReactNode }) {
  const { apiKeys } = useApiKeys();

  useEffect(() => {
    if (apiKeys.openai) {
      setOpenAIApiKey(apiKeys.openai);
    }
    if (apiKeys.gemini) {
      setGeminiApiKey(apiKeys.gemini);
    }
  }, [apiKeys]);

  return <>{children}</>;
}

interface MainContentProps {
  onNavigate: (page: Page) => void;
}

function MainContent({ onNavigate }: MainContentProps) {
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
      <TarotReader 
        userInfo={defaultUserInfo}
        onNavigate={onNavigate}
      />
    </div>
  );
}

import AccountSettings from './components/AccountSettings';

export type Page = 'home' | 'tarot' | 'astrology' | 'ranking' | 'personalInfoOnboarding' | 'accountSettings';

function AppContent() {
  const [page, setPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOnboardingComplete, setPersonalInfo, personalInfo } = usePersonalInfo();
  const handleNavigation = (p: Page) => setPage(p);

  const renderAccountSettingsPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 pt-20">
      <AccountSettings
        onSave={() => setPage('home')}
        onCancel={() => setPage('home')}
      />
    </div>
  );

  const renderPersonalInfoOnboarding = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 pt-20">
      <PersonalInfoOnboarding
        onComplete={(info) => {
          setPersonalInfo(info);
          setPage('home');
        }}
        onSkip={() => {
          setPersonalInfo({
            name: 'ゲスト',
            birthDate: new Date().toISOString().split('T')[0],
            birthTime: '',
            gender: '',
            zodiacSign: '不明'
          });
          setPage('home');
        }}
        existingData={personalInfo || undefined}
      />
    </div>
  );


  const renderPage = () => {
    if (!isOnboardingComplete || page === 'personalInfoOnboarding') {
      return renderPersonalInfoOnboarding();
    }

    switch (page) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'tarot':
        return <MainContent onNavigate={handleNavigation} />;
      case 'astrology':
        return <AstrologyChatBot />;
      case 'ranking':
        return <FortuneRanking />;
      case 'accountSettings':
        return renderAccountSettingsPage();
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
      <header className="fixed top-0 left-0 right-0 bg-purple-900/80 backdrop-blur-sm p-4 flex justify-between md:justify-center items-center z-50">
          {/* ハンバーガーメニュー（モバイル） */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-purple-200 hover:text-purple-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex gap-4">
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

          {/* モバイルメニュー */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-purple-900/95 backdrop-blur-sm md:hidden">
              <div className="flex flex-col p-4 gap-2">
                <button
                  onClick={() => {
                    handleNavigation('home');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
                >
                  ホーム
                </button>
                <button
                  onClick={() => {
                    handleNavigation('tarot');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
                >
                  タロット
                </button>
                <button
                  onClick={() => {
                    handleNavigation('astrology');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
                >
                  星占い
                </button>
                <button
                  onClick={() => {
                    handleNavigation('ranking');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
                >
                  ランキング
                </button>
                <button
                  onClick={() => {
                    handleNavigation('accountSettings');
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 rounded-full bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors flex items-center justify-center gap-2"
                >
                  <User size={18} />
                  アカウント設定
                </button>
              </div>
            </div>
          )}

          {/* デスクトップアカウント設定ボタン */}
          <button
            onClick={() => handleNavigation('accountSettings')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-200 hover:text-purple-100 md:flex items-center gap-2 hidden"
          >
            <User size={24} />
          </button>
      </header>
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ApiKeyProvider>
        <ApiKeyInitializer>
          <PersonalInfoProvider>
            <AppContent />
          </PersonalInfoProvider>
        </ApiKeyInitializer>
      </ApiKeyProvider>
    </ThemeProvider>
  );
}

export default App;
