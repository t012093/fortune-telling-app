const ZODIAC_SIGNS = [
  'おひつじ座', '牡牛座', '双子座', '蟹座',
  '獅子座', '乙女座', '天秤座', '蠍座',
  '射手座', '山羊座', '水瓶座', '魚座'
];

const ASPECTS = ['恋愛', '仕事', '健康', '金運', '学業', '人間関係'];

const RESPONSES = {
  恋愛: [
    "素敵な出会いのチャンスが訪れそうです。積極的に行動してみましょう。",
    "現在の関係が深まるタイミングです。心を開いて接すると良い結果が待っています。",
    "相手の気持ちを理解することで、関係が大きく進展する可能性があります。"
  ],
  仕事: [
    "新しいプロジェクトでリーダーシップを発揮できそうです。自信を持って進めましょう。",
    "同僚との協力関係が特に良好です。チームワークを活かした成果が期待できます。",
    "創造力が高まっている時期です。新しいアイデアを積極的に提案してみましょう。"
  ],
  健康: [
    "運動を始めるのに最適な時期です。新しい習慣を取り入れてみましょう。",
    "心身のバランスが良好です。リフレッシュ活動を楽しむと更に良いでしょう。",
    "食生活を見直すことで、大きな健康効果が期待できます。"
  ],
  金運: [
    "思わぬ収入がある可能性が高まっています。臨時収入に期待が持てます。",
    "投資や資産運用について考えるのに良い時期です。慎重に検討してみましょう。",
    "支出を見直すことで、家計の改善につながりそうです。"
  ],
  学業: [
    "集中力が高まり、学習効率が上がっています。新しい分野にチャレンジするのも良いでしょう。",
    "努力が実を結ぶ時期です。諦めずに続けることで、良い結果が得られそうです。",
    "グループ学習が特に効果的です。仲間と協力して目標に向かいましょう。"
  ],
  人間関係: [
    "新しい出会いが人生の転機となりそうです。積極的に交流を持ちましょう。",
    "周囲からの信頼が深まる時期です。率直なコミュニケーションを心がけましょう。",
    "古い友人との再会や、関係の修復のチャンスがありそうです。"
  ]
};

const GENERAL_MESSAGES = [
  "全体的に運気の上昇が期待できる時期です。",
  "新しいことにチャレンジすると、良い結果が得られそうです。",
  "直感を信じて行動することで、幸運が訪れるでしょう。",
  "周囲との協力関係が特に良好な時期です。",
  "自己成長のための良い機会が訪れています。"
];

export async function getGeminiResponse(
  userInput: string,
  conversationHistory: { role: string, content: string }[]
): Promise<string> {
  // 入力内容から星座と運勢の種類を判断
  const matchedSign = ZODIAC_SIGNS.find(sign => 
    userInput.toLowerCase().includes(sign.toLowerCase())
  );
  
  const matchedAspect = ASPECTS.find(aspect => 
    userInput.includes(aspect)
  );

  // 応答を生成
  let response = '';

  if (!matchedSign) {
    return "申し訳ありません。星座を教えていただけますか？（例：「おひつじ座の恋愛運を教えて」のように質問してください）";
  }

  if (matchedAspect) {
    const aspectResponses = RESPONSES[matchedAspect];
    const randomResponse = aspectResponses[Math.floor(Math.random() * aspectResponses.length)];
    response = `${matchedSign}の${matchedAspect}について：${randomResponse}`;
  } else {
    const generalResponse = GENERAL_MESSAGES[Math.floor(Math.random() * GENERAL_MESSAGES.length)];
    response = `${matchedSign}の今日の運勢：${generalResponse}`;
  }

  // 文脈に応じた追加メッセージ
  const additionalMessages = [
    "他に気になることはありますか？",
    "もっと詳しく知りたい分野はありますか？",
    "特に気になる出来事はありますか？"
  ];

  const randomAdditional = additionalMessages[Math.floor(Math.random() * additionalMessages.length)];
  
  return `${response}\n\n${randomAdditional}`;
}