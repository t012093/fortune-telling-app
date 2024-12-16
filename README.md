# Fortune Telling App 🔮

タロットカードと星占いを提供する占いアプリケーション。

## ✨ 機能

### タロットカード占い
- アニメーション付きのカードドロー
- 詳細な解説付き
- 1日1回の無料占い

### 星占い
- 12星座対応
- 対話形式の占い結果
- 複数の運勢カテゴリー（恋愛、仕事、健康など）

## 🛠 技術スタック

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide Icons
- Google Gemini API

## 🚀 開始方法

```bash
# リポジトリのクローン
git clone https://github.com/t012093/fortune-telling-app.git

# プロジェクトディレクトリに移動
cd fortune-telling-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 📝 環境設定

### Google Gemini APIキーの取得

1. **Google Cloud Consoleへのアクセス**
   - [Google Cloud Console](https://console.cloud.google.com/) にアクセス
   - Googleアカウントでログイン
   - 必要に応じて新規プロジェクトを作成

2. **Gemini APIの有効化**
   - 左側メニュー → 「APIとサービス」 → 「ライブラリ」を選択
   - 「Gemini API」を検索
   - APIを有効化

3. **APIキーの作成**
   - 左側メニュー → 「APIとサービス」 → 「認証情報」を選択
   - 「認証情報を作成」 → 「APIキー」を選択
   - 生成されたAPIキーをコピー

4. **環境変数の設定**
   - プロジェクトのルートディレクトリに`.env`ファイルを作成
   - 以下の内容を追加：
     ```env
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - `your_api_key_here`を実際のAPIキーに置き換え

### セキュリティ注意事項
- `.env`ファイルは必ず`.gitignore`に追加してください
- APIキーは公開しないよう、適切に管理してください

## 📜 ライセンス

MIT