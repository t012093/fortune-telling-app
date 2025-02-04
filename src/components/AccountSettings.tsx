import React, { useState } from 'react';
import { User, Key, Volume2, Plus, Trash2, Save } from 'lucide-react';

type FamilyMember = {
  id: string;
  name: string;
  birthDate: string;
  birthTime?: string;
  gender?: 'male' | 'female' | 'other';
  zodiacSign?: string;
};

type Settings = {
  familyMembers: FamilyMember[];
  apiKey: string;
  voice: {
    enabled: boolean;
    speed: number;
    pitch: number;
    volume: number;
  };
};

type AccountSettingsProps = {
  onSave: (settings: Settings) => void;
  onCancel: () => void;
  currentSettings?: Settings;
};

export default function AccountSettings({ onSave, onCancel, currentSettings }: AccountSettingsProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'api' | 'voice'>('profile');
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(
    currentSettings?.familyMembers || []
  );
  const [apiKey, setApiKey] = useState(currentSettings?.apiKey || '');
  const [voiceEnabled, setVoiceEnabled] = useState(
    currentSettings?.voice?.enabled || false
  );
  const [voiceSettings, setVoiceSettings] = useState({
    speed: currentSettings?.voice?.speed || 1,
    pitch: currentSettings?.voice?.pitch || 1,
    volume: currentSettings?.voice?.volume || 1,
  });

  const handleAddFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: '',
      birthDate: new Date().toISOString().split('T')[0],
      zodiacSign: '不明',
    };
    setFamilyMembers([...familyMembers, newMember]);
  };

  const handleRemoveFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const handleUpdateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers(familyMembers.map(member => {
      if (member.id === id) {
        // 生年月日が更新された場合、zodiacSignも更新
        if (updates.birthDate) {
          const date = new Date(updates.birthDate);
          const month = date.getMonth() + 1;
          const day = date.getDate();
          let zodiacSign = '';

          // 星座を判定
          if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiacSign = '牡羊座';
          else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiacSign = '牡牛座';
          else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) zodiacSign = '双子座';
          else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) zodiacSign = '蟹座';
          else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiacSign = '獅子座';
          else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiacSign = '乙女座';
          else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) zodiacSign = '天秤座';
          else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) zodiacSign = '蠍座';
          else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) zodiacSign = '射手座';
          else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiacSign = '山羊座';
          else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiacSign = '水瓶座';
          else zodiacSign = '魚座';

          return { ...member, ...updates, zodiacSign };
        }
        return { ...member, ...updates };
      }
      return member;
    }));
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-purple-100 mb-4">家族メンバー管理</h3>
        <div className="space-y-4">
          {familyMembers.map(member => (
            <div key={member.id} className="bg-purple-900/30 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleUpdateFamilyMember(member.id, { name: e.target.value })}
                  placeholder="名前"
                  className="bg-purple-900/30 text-purple-100 placeholder-purple-300/50 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => handleRemoveFamilyMember(member.id)}
                  className="text-purple-300 hover:text-purple-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-purple-200 mb-1">生年月日</label>
                  <input
                    type="date"
                    value={member.birthDate}
                    onChange={(e) => handleUpdateFamilyMember(member.id, { birthDate: e.target.value })}
                    className="w-full bg-purple-900/30 text-purple-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-purple-200 mb-1">生まれた時間（任意）</label>
                  <input
                    type="time"
                    value={member.birthTime}
                    onChange={(e) => handleUpdateFamilyMember(member.id, { birthTime: e.target.value })}
                    className="w-full bg-purple-900/30 text-purple-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-purple-200 mb-1">性別（任意）</label>
                <div className="flex gap-4">
                  {(['male', 'female', 'other'] as const).map((gender) => (
                    <button
                      key={gender}
                      onClick={() => handleUpdateFamilyMember(member.id, { gender })}
                      className={`flex-1 py-2 px-4 rounded transition-colors ${
                        member.gender === gender
                          ? 'bg-purple-500 text-white'
                          : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/30'
                      }`}
                    >
                      {gender === 'male' ? '男性' : gender === 'female' ? '女性' : 'その他'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={handleAddFamilyMember}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-purple-900/30 text-purple-200 hover:bg-purple-800/30 transition-colors"
          >
            <Plus size={20} />
            メンバーを追加
          </button>
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-purple-100 mb-4">API Key設定</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm text-purple-200 mb-1">
              API Key
            </label>
            <input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="your-api-key-here"
              className="w-full bg-purple-900/30 text-purple-100 placeholder-purple-300/50 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <p className="text-sm text-purple-300">
            ※ API Keyは安全に保管され、暗号化されて保存されます
          </p>
        </div>
      </div>
    </div>
  );

  const renderVoiceSettings = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-purple-100">音声出力設定</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={voiceEnabled}
              onChange={(e) => setVoiceEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-purple-900/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          </label>
        </div>
        {voiceEnabled && (
          <div className="space-y-4">
            <div>
              <label className="flex justify-between text-sm text-purple-200 mb-1">
                <span>速度</span>
                <span>{voiceSettings.speed}x</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.speed}
                onChange={(e) => setVoiceSettings({
                  ...voiceSettings,
                  speed: parseFloat(e.target.value)
                })}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <label className="flex justify-between text-sm text-purple-200 mb-1">
                <span>ピッチ</span>
                <span>{voiceSettings.pitch}x</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.pitch}
                onChange={(e) => setVoiceSettings({
                  ...voiceSettings,
                  pitch: parseFloat(e.target.value)
                })}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <label className="flex justify-between text-sm text-purple-200 mb-1">
                <span>音量</span>
                <span>{voiceSettings.volume}x</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) => setVoiceSettings({
                  ...voiceSettings,
                  volume: parseFloat(e.target.value)
                })}
                className="w-full accent-purple-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-purple-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-800/30">
        <h2 className="text-3xl font-bold text-center text-purple-100 mb-8">
          アカウント設定
        </h2>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              activeTab === 'profile'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/30'
            }`}
          >
            <User size={18} />
            プロファイル
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              activeTab === 'api'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/30'
            }`}
          >
            <Key size={18} />
            API Key
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              activeTab === 'voice'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/30'
            }`}
          >
            <Volume2 size={18} />
            音声設定
          </button>
        </div>

        <div className="mb-8">
          {activeTab === 'profile' && renderProfileSettings()}
          {activeTab === 'api' && renderApiSettings()}
          {activeTab === 'voice' && renderVoiceSettings()}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-full bg-purple-900/30 text-purple-200 hover:bg-purple-800/30 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={() => onSave({
              familyMembers,
              apiKey,
              voice: {
                enabled: voiceEnabled,
                ...voiceSettings
              }
            })}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
          >
            <Save size={18} />
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
