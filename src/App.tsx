import React, { useState } from 'react';
import { Moon, Sparkles } from 'lucide-react';
import ChatBot from './components/ChatBot';
import TarotReader from './components/TarotReader';
import HomePage from './components/HomePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'astrology' | 'tarot'>('home');

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900">
        {currentPage === 'home' ? (
          <HomePage onNavigate={setCurrentPage} />
        ) : (
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-amber-200 mb-2">
                神秘の占い
              </h1>
              <p className="text-purple-200 text-lg">運命の導きを探る</p>
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
            </div>

            <div className="bg-purple-950/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-800/30 p-6">
              {currentPage === 'astrology' ? <ChatBot /> : <TarotReader />}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;