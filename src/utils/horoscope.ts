const ZODIAC_SIGNS = [
  'おひつじ座', '牡牛座', '双子座', '蟹座',
  '獅子座', '乙女座', '天秤座', '蠍座',
  '射手座', '山羊座', '水瓶座', '魚座',
  'aries', 'taurus', 'gemini', 'cancer',
  'leo', 'virgo', 'libra', 'scorpio',
  'sagittarius', 'capricorn', 'aquarius', 'pisces'
];

const ASPECTS = [
  '恋愛', '仕事', '健康', '金運',
  '人間関係', '自己成長'
];

const PREDICTIONS = [
  '今日はあなたの運気が特に高まる日です。',
  '思いがけない出会いがあなたを待っています。',
  '直感を信じて行動することで、良い結果が得られるでしょう。',
  '自分自身を大切にすることで、周りとの関係も良好になります。',
  '新しい機会との出会いがあります。チャンスを逃さないように。',
  'クリエイティブなエネルギーが満ちています。',
  '長期的な目標について考えるのに適した時期です。',
  '日常の小さな変化が、大きな幸せを運んでくれるでしょう。',
  'あなたの努力が実を結ぶ時期が近づいています。',
  '心の声に耳を傾けることで、正しい道が見えてくるでしょう。'
];

export function getHoroscope(input: string): string {
  const lowercaseInput = input.toLowerCase();
  
  const matchedSign = ZODIAC_SIGNS.find(sign => 
    lowercaseInput.includes(sign.toLowerCase()) || input.includes(sign)
  );
  
  const matchedAspect = ASPECTS.find(aspect => input.includes(aspect));
  
  if (!matchedSign) {
    return "星座を教えていただけますか？（例：おひつじ座、蟹座など）";
  }
  
  const randomPrediction = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];
  
  if (matchedAspect) {
    return `${matchedSign}の${matchedAspect}について：${randomPrediction}`;
  }
  
  return `${matchedSign}の今日の運勢：${randomPrediction}`;
}