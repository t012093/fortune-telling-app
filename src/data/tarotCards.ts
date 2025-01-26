interface TarotCard {
  id: number;
  name: string;
  nameJp: string;
  image: string;
  meaning: string;
  description: string;
  attribute: {
    upright: string[];
    reversed: string[];
  };
}

export const majorArcana: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    nameJp: "愚者",
    image: "/cards/fool.jpg",
    meaning: "新しい始まり、冒険、純粋さ",
    description: "人生の新しい段階の始まりを示唆します。冒険への一歩を踏み出す勇気と、純粋な心を持って進むことの大切さを教えてくれます。",
    attribute: {
      upright: ["新しい始まり", "冒険", "自由", "無邪気", "可能性"],
      reversed: ["無謀", "リスク", "軽率な決定", "立ち止まるべき時"]
    }
  },
  {
    id: 1,
    name: "The Magician",
    nameJp: "魔術師",
    image: "/cards/magician.jpg",
    meaning: "創造力、意志力、熟練",
    description: "あなたの中にある可能性と力を示しています。目標に向かって意識的に行動を起こすときです。",
    attribute: {
      upright: ["創造力", "熟練", "意志力", "手腕", "自信"],
      reversed: ["見せかけ", "欺瞞", "能力の無駄遣い", "未熟"]
    }
  },
  {
    id: 2,
    name: "The High Priestess",
    nameJp: "女教皇",
    image: "/cards/priestess.jpg",
    meaning: "直感、神秘、内なる声",
    description: "あなたの直感と内なる声に耳を傾けるべき時です。表面的なものを超えた深い理解が得られるでしょう。",
    attribute: {
      upright: ["直感", "神秘", "内なる声", "潜在意識", "知恵"],
      reversed: ["秘密", "混乱", "表面的な判断", "直感の無視"]
    }
  },
  {
    id: 3,
    name: "The Empress",
    nameJp: "女帝",
    image: "/cards/empress.jpg",
    meaning: "豊かさ、創造性、母性",
    description: "創造性と豊かさの時期です。周囲との調和を大切にし、愛情深く接することで良い結果が得られるでしょう。",
    attribute: {
      upright: ["豊かさ", "創造性", "母性", "愛情", "調和"],
      reversed: ["依存", "過保護", "創造性の欠如", "不安定"]
    }
  },
  {
    id: 4,
    name: "The Emperor",
    nameJp: "皇帝",
    image: "/cards/emperor.jpg",
    meaning: "権威、指導力、安定",
    description: "リーダーシップを発揮し、計画的に物事を進めるべき時です。安定と秩序をもたらす力があります。",
    attribute: {
      upright: ["権威", "指導力", "安定", "秩序", "父性"],
      reversed: ["独裁", "過度の支配", "柔軟性の欠如", "未熟な指導"]
    }
  },
  {
    id: 5,
    name: "The Hierophant",
    nameJp: "教皇",
    image: "/cards/hierophant.jpg",
    meaning: "教え、伝統、信念",
    description: "伝統的な価値観や教えに従うことで、正しい導きが得られる時期です。精神的な成長が期待できます。",
    attribute: {
      upright: ["教え", "伝統", "信念", "精神性", "知識"],
      reversed: ["反抗", "形式主義", "制約", "独断"]
    }
  }
  // 残りのカードも同様に追加...
];
