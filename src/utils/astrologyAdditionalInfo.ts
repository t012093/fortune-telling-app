export const astrologyAspects = [
  { name: 'コンジャンクション', symbol: '☌', meaning: '統合、強調' },
  { name: 'セクスタイル', symbol: ' sextile', meaning: '機会、調和' },
  { name: 'スクエア', symbol: '□', meaning: '緊張、挑戦' },
  { name: 'トライン', symbol: '△', meaning: '才能、容易さ' },
  { name: 'オポジション', symbol: '☍', meaning: '対立、 осознание' }
];

export const astrologyPoints = [
  { name: 'アセンダント', abbreviation: 'ASC', meaning: '自己の始まり、 внешний вид' },
  { name: 'ディセンダント', abbreviation: 'DSC', meaning: '人間関係、 パートナーシップ' },
  { name: 'MC', abbreviation: 'MC', meaning: '社会的な目標、 天職' },
  { name: 'IC', abbreviation: 'IC', meaning: 'ルーツ、 家庭環境' }
];

export const zodiacQualities = [
  { name: '活動宮', signs: ['おひつじ座', 'かに座', 'てんびん座', 'やぎ座'], meaning: '開始、 активный' },
  { name: '不動宮', signs: ['おうし座', 'しし座', 'さそり座', 'みずがめ座'], meaning: '持続、 упорный' },
  { name: '柔軟宮', signs: ['ふたご座', 'おとめ座', 'いて座', 'うお座'], meaning: '変化、 адаптивный' }
];

export const zodiacElements = [
  { name: '火', signs: ['おひつじ座', 'しし座', 'いて座'], meaning: '情熱、 エネルギー' },
  { name: '地', signs: ['おうし座', 'おとめ座', 'やぎ座'], meaning: '現実的、 安定' },
  { name: '風', signs: ['ふたご座', 'てんびん座', 'みずがめ座'], meaning: '知的、 коммуникабельный' },
  { name: '水', signs: ['かに座', 'さそり座', 'うお座'], meaning: '感情的、 интуитивный' }
];

export const planetRulers = [
  { planet: '火星', signs: ['おひつじ座'] },
  { planet: '金星', signs: ['おうし座', 'てんびん座'] },
  { planet: '水星', signs: ['ふたご座', 'おとめ座'] },
  { planet: '月', signs: ['かに座'] },
  { planet: '太陽', signs: ['しし座'] },
  { planet: '冥王星', signs: ['さそり座'] },
  { planet: '木星', signs: ['いて座'] },
  { planet: '土星', signs: ['やぎ座'] },
  { planet: '天王星', signs: ['みずがめ座'] },
  { planet: '海王星', signs: ['うお座'] }
];
