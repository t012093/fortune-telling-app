import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PersonalInfoProvider, usePersonalInfo } from './context/PersonalInfoContext';
import TarotReader from './components/TarotReader';
import PersonalInfoOnboarding from './components/PersonalInfoOnboarding';
import HomePage from './components/HomePage';
import AstrologyChatBot from './components/AstrologyChatBot';

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

function App() {
  const [page, setPage] = useState('home');
  const handleNavigation = (p: string) => setPage(p);

  const renderPage = () => {
    switch (page) {
      // ...existing code...
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
case 'tarot':
  return <MainContent />;
case 'astrology':
  return <AstrologyChatBot />;
default:
  return <HomePage onNavigate={handleNavigation} />;
// ...existing code...
    }
  };

  return (
    <ThemeProvider>
      <PersonalInfoProvider>
        <div>
          <button onClick={() => handleNavigation('home')}>Home</button>
          <button onClick={() => handleNavigation('tarot')}>Tarot</button>
          <button onClick={() => handleNavigation('astrology')}>Astrology</button>
        </div>
        {renderPage()}
      </PersonalInfoProvider>
    </ThemeProvider>
  );
}

export default App;
