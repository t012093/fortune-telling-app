interface FortuneSection {
  emoji: string;
  title: string;
  content: string[] | string;
}

export interface FortuneReading {
  introduction: string;
  sections: FortuneSection[];
  conclusion: string;
  followUp?: string;
}

export const generateLoveFortuneTemplate = (
  zodiacSign: string,
  aspects: string[]
): FortuneReading => ({
  introduction: `${zodiacSign}のあなたの恋愛運を占わせていただきます。神秘的なタロットカードを引かせていただきます...\n*カードを引く時間*\n...興味深いカードが出てまいりました。${zodiacSign}のあなたの恋愛運について、以下のようなメッセージが届いています：`,
  sections: [
    {
      emoji: '🌟',
      title: '現在の運勢',
      content: aspects.slice(0, 3)
    },
    {
      emoji: '💕',
      title: 'アドバイス',
      content: aspects.slice(3, 6)
    },
    {
      emoji: '⚠️',
      title: '注意点',
      content: aspects.slice(6, 8)
    },
    {
      emoji: '✨',
      title: 'これからの展開',
      content: aspects.slice(8)
    }
  ],
  conclusion: 'この運勢を最大限活かすためには、自分らしさを大切にしながら、積極的なコミュニケーションを心がけることをお勧めします。',
  followUp: '何か具体的に気になることはございますか？'
});

export const formatFortuneReading = (reading: FortuneReading): string => {
  let formattedReading = reading.introduction + '\n\n';

  reading.sections.forEach(section => {
    formattedReading += `${section.emoji} ${section.title}\n`;
    if (Array.isArray(section.content)) {
      section.content.forEach(item => {
        formattedReading += `* ${item}\n`;
      });
    } else {
      formattedReading += section.content + '\n';
    }
    formattedReading += '\n';
  });

  formattedReading += reading.conclusion + '\n\n';
  if (reading.followUp) {
    formattedReading += reading.followUp;
  }

  return formattedReading;
};