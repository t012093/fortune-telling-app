import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Star, Clock, User, Save } from 'lucide-react';
import { calculateZodiacSign } from '../utils/astrology';

export type PersonalInfo = {
  name: string;
  birthDate: string;
  birthTime?: string;
  gender?: 'male' | 'female' | 'other' | '';
  zodiacSign?: string;
};

type Props = {
  onComplete: (info: PersonalInfo) => void;
  onSkip: () => void;
  existingData?: PersonalInfo;
};

export default function PersonalInfoOnboarding({ onComplete, onSkip, existingData }: Props) {
  const [step, setStep] = useState(1);
  const [info, setInfo] = useState<PersonalInfo>(existingData || {
    name: '',
    birthDate: '',
    birthTime: '',
    gender: '',
  });

  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<PersonalInfo> = {};
    
    switch (currentStep) {
      case 1:
        if (!info.name.trim()) {
          newErrors.name = 'お名前を入力してください';
        }
        break;
      case 2:
        if (!info.birthDate) {
          newErrors.birthDate = '生年月日を選択してください';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleComplete = () => {
    if (validateStep(step)) {
      const birthDate = new Date(info.birthDate);
      const zodiacSign = calculateZodiacSign(birthDate);
      onComplete({ ...info, zodiacSign });
    }
  };

  const steps = [
    {
      title: 'あなたのお名前',
      icon: <User className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="お名前（ニックネーム可）"
            value={info.name}
            onChange={e => setInfo({ ...info, name: e.target.value })}
            className="w-full bg-purple-900/30 text-purple-100 placeholder-purple-300/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name}</p>
          )}
        </div>
      )
    },
    {
      title: '生年月日',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <input
            type="date"
            value={info.birthDate}
            onChange={e => setInfo({ ...info, birthDate: e.target.value })}
            className="w-full bg-purple-900/30 text-purple-100 placeholder-purple-300/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.birthDate && (
            <p className="text-red-400 text-sm">{errors.birthDate}</p>
          )}
        </div>
      )
    },
    {
      title: '生まれた時間（任意）',
      icon: <Clock className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <input
            type="time"
            value={info.birthTime}
            onChange={e => setInfo({ ...info, birthTime: e.target.value })}
            className="w-full bg-purple-900/30 text-purple-100 placeholder-purple-300/50 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <p className="text-purple-300 text-sm">
            ※より詳細な占いのために使用されます
          </p>
        </div>
      )
    },
    {
      title: '性別（任意）',
      icon: <User className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div className="flex gap-4">
            {['male', 'female', 'other'].map((gender) => (
              <button
                key={gender}
                onClick={() => setInfo({ ...info, gender: gender as PersonalInfo['gender'] })}
                className={`flex-1 py-3 px-4 rounded-lg transition-colors ${
                  info.gender === gender
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-900/30 text-purple-200 hover:bg-purple-800/30'
                }`}
              >
                {gender === 'male' ? '男性' : gender === 'female' ? '女性' : 'その他'}
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-md mx-auto bg-purple-950/50 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-800/30 p-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-purple-100 mb-2">
          パーソナル占い設定
        </h2>
        <p className="text-purple-300">
          より正確な占い結果のために、あなたの情報を教えてください
        </p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              {steps[step - 1].icon}
              <h3 className="text-xl font-semibold text-purple-100">
                {steps[step - 1].title}
              </h3>
            </div>
            {steps[step - 1].content}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <button
            onClick={step === 1 ? onSkip : handleBack}
            className="px-4 py-2 text-purple-300 hover:text-purple-100 transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 1 ? 'スキップ' : '戻る'}
          </button>
          
          <button
            onClick={step === steps.length ? handleComplete : handleNext}
            className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors flex items-center gap-2"
          >
            {step === steps.length ? (
              <>
                <Save className="w-4 h-4" />
                完了
              </>
            ) : (
              <>
                次へ
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i + 1 === step ? 'bg-purple-500' : 'bg-purple-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
