import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateContextualSuggestions } from '../utils/suggestionsGenerator';

interface SuggestionTabsProps {
  lastMessage: string;
  zodiacSign: string;
  onSuggestionClick: (suggestion: string) => void;
  isLoading: boolean;
}

export default function SuggestionTabs({
  lastMessage,
  zodiacSign,
  onSuggestionClick,
  isLoading
}: SuggestionTabsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([
    "今日の運勢を教えて",
    "恋愛運が知りたいです",
    "仕事でのアドバイスをください"
  ]);

  useEffect(() => {
    const updateSuggestions = async () => {
      if (!isLoading && lastMessage) {
        try {
          const newSuggestions = await generateContextualSuggestions(lastMessage, zodiacSign);
          setSuggestions(newSuggestions);
        } catch (error) {
          console.error('Failed to generate suggestions:', error);
        }
      }
    };

    updateSuggestions();
  }, [lastMessage, zodiacSign, isLoading]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex flex-wrap gap-2 justify-center mt-4"
      >
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion + index}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-4 py-2 bg-purple-900/30 text-purple-200 rounded-full 
                     hover:bg-purple-800/40 transition-colors disabled:opacity-50"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {suggestion}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}