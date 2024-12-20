const TAROT_READINGS = [
  "大きな変化への準備が整っています。この変化を受け入れる勇気を持ちましょう。",
  "内なる声に耳を傾けることで、深い気づきが得られるでしょう。",
  "新しい機会があなたを待っています。心を開いて受け入れましょう。",
  "あなたの進む道は、運命と調和しています。自信を持って進んでください。",
  "試練は、実は disguised blessing（隠れた祝福）かもしれません。",
  "直感が特に鋭くなっている時期です。内なる声に従いましょう。",
  "古い cycle（周期）が終わり、新しい始まりが近づいています。",
  "創造的なエネルギーに満ちています。自由に表現してください。",
  "バランスと調和があなたの人生のキーワードとなっています。",
  "重要な決断の時期です。心の声を信じてください。"
];

export function getTarotReading(): string {
  return TAROT_READINGS[Math.floor(Math.random() * TAROT_READINGS.length)];
}