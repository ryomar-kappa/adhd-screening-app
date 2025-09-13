# ADHD 診断 Web アプリ - プロジェクト構成ドキュメント

## 📋 プロジェクト概要

16personalities.com のようなモダンなデザインを採用したADHD症状のセルフチェック・スクリーニングツール

- **プロジェクト名**: ADHD 診断 Web アプリ
- **技術スタック**: React 19 + TypeScript + Vite + Tailwind CSS
- **UI ライブラリ**: Radix UI + カスタムコンポーネント
- **現在のバージョン**: 0.0.0 (開発版)

## 🏗️ ディレクトリ構成

```
adhd/
├── 📋 設定・ドキュメントファイル
│   ├── CLAUDE.md                 # プロジェクト開発計画書
│   ├── README.md                 # プロジェクト基本情報
│   ├── PROJECT_STRUCTURE.md      # このファイル - プロジェクト構成
│   ├── 質問一覧.md              # 質問データ一覧
│   └── Google_AdSense_準備ガイド.md
│
├── ⚙️ 設定ファイル
│   ├── package.json              # プロジェクト依存関係
│   ├── tsconfig.json             # TypeScript設定 (ルート)
│   ├── tsconfig.app.json         # アプリ用TypeScript設定
│   ├── tsconfig.node.json        # Node.js用TypeScript設定
│   ├── vite.config.ts            # Vite設定
│   ├── tailwind.config.js        # Tailwind CSS設定
│   ├── postcss.config.js         # PostCSS設定
│   └── eslint.config.js          # ESLint設定
│
├── 🌐 public/                    # 静的アセット
│   └── vite.svg                  # Viteロゴ
│
└── 📂 src/                       # アプリケーションソースコード
    ├── 🎯 エントリーポイント
    │   ├── main.tsx              # Reactアプリエントリーポイント
    │   ├── App.tsx               # アプリケーションルートコンポーネント
    │   ├── App.css               # アプリケーション固有スタイル
    │   ├── index.css             # グローバルスタイル
    │   └── vite-env.d.ts         # Vite環境型定義
    │
    ├── 🧩 components/            # Reactコンポーネント
    │   ├── PersonalityTest.tsx   # メイン診断テストコンポーネント
    │   ├── ResultsPage.tsx       # 結果表示ページ
    │   │
    │   ├── 📝 forms/             # フォーム関連コンポーネント
    │   │   └── QuestionCard.tsx  # 質問カード表示コンポーネント
    │   │
    │   ├── 🎨 ui/                # 基本UIコンポーネント (Radix UI ベース)
    │   │   ├── Button.tsx        # ボタンコンポーネント
    │   │   ├── Card.tsx          # カードコンポーネント
    │   │   ├── Progress.tsx      # プログレスバー
    │   │   ├── RadioGroup.tsx    # ラジオボタングループ
    │   │   └── index.ts          # UIコンポーネント統合エクスポート
    │   │
    │   └── 📐 layout/            # レイアウトコンポーネント
    │       └── Header.tsx        # ヘッダーコンポーネント
    │
    ├── 📊 data/                  # アプリケーションデータ
    │   ├── questions.ts          # 診断質問データ (60問)
    │   └── personalityTypes.ts   # 性格タイプ定義データ
    │
    ├── 🔧 utils/                 # ユーティリティ関数
    │   ├── cn.ts                 # Tailwind CSS クラス名統合
    │   └── scoring.ts            # 診断スコア計算ロジック
    │
    ├── 📋 types/                 # TypeScript型定義
    │   └── index.ts              # 全型定義統合ファイル
    │
    └── 🎨 assets/                # 静的リソース
        └── react.svg             # Reactロゴ
```

## 🛠️ 技術スタック詳細

### フロントエンド フレームワーク
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **React** | 19.1.1 | UIライブラリ |
| **TypeScript** | 5.8.3 | 型安全性 |
| **Vite** | 5.4.20 | ビルドツール |

### スタイリング
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Tailwind CSS** | 3.4.17 | CSS フレームワーク |
| **PostCSS** | 8.5.6 | CSS プロセッサ |
| **Autoprefixer** | 10.4.21 | ベンダープリフィックス自動付与 |

### UIコンポーネント
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **Radix UI Progress** | 1.1.7 | プログレスバー |
| **Radix UI Radio Group** | 1.3.8 | ラジオボタン |
| **Radix UI Slot** | 1.2.3 | スロットパターン |
| **Lucide React** | 0.544.0 | アイコンライブラリ |

### ユーティリティ
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **clsx** | 2.1.1 | 条件付きクラス名 |
| **class-variance-authority** | 0.7.1 | バリアント管理 |
| **tailwind-merge** | 3.3.1 | Tailwind クラス統合 |

### 開発ツール
| 技術 | バージョン | 用途 |
|------|-----------|------|
| **ESLint** | 9.33.0 | コード品質チェック |
| **TypeScript ESLint** | 8.39.1 | TypeScript 専用リント |

## 📝 主要コンポーネント説明

### 🎯 PersonalityTest.tsx
メイン診断テストコンポーネント。診断フローの全体制御を担当。

**機能**:
- 3段階のステート管理: `intro` → `test` → `results`
- 質問の自動進行 (300ms遅延)
- 回答データ管理
- スコア計算とテスト完了処理

**主要ステート**:
```typescript
const [currentStep, setCurrentStep] = useState<'intro' | 'test' | 'results'>('intro');
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [answers, setAnswers] = useState<Answer[]>([]);
const [result, setResult] = useState<PersonalityResult | null>(null);
```

### 📋 QuestionCard.tsx
個別質問表示コンポーネント。質問とラジオボタン選択肢を表示。

**機能**:
- 7段階リッカートスケール表示
- プログレス表示 (現在位置/総数)
- アニメーション付きトランジション

### 🎨 UI コンポーネント
Radix UIをベースにしたカスタマイズ可能なコンポーネントライブラリ。

**特徴**:
- アクセシビリティ対応 (WCAG準拠)
- バリアント管理システム
- Tailwind CSSとの完全統合

## 📊 データ構造

### Question 型
```typescript
interface Question {
  id: number;              // 質問ID (1-60)
  text: string;            // 質問文 (日本語)
  category: 'E/I' | 'S/N' | 'T/F' | 'J/P';  // MBTIカテゴリ
}
```

### Answer 型
```typescript
interface Answer {
  questionId: number;      // 質問ID
  value: AnswerValue;      // 回答値 (-3 to +3)
}

type AnswerValue = -3 | -2 | -1 | 0 | 1 | 2 | 3;
```

### PersonalityResult 型
```typescript
interface PersonalityResult {
  type: string;            // 性格タイプ (例: "ENFP")
  percentages: {
    E: number; I: number;  // 外向性 vs 内向性
    S: number; N: number;  // 現実感覚 vs 直感
    T: number; F: number;  // 思考 vs 感情
    J: number; P: number;  // 判断 vs 認知
  };
}
```

## 🧮 診断ロジック

### 質問構成 (60問)
- **E/I (外向性/内向性)**: 15問 (質問ID: 1, 6, 7, 13, 19, 23, 25, 31, 36, 37, 43, 48, 49, 55, 60)
- **S/N (現実感覚/直感)**: 15問 (質問ID: 2, 8, 11, 14, 17, 20, 26, 29, 32, 38, 41, 44, 50, 53, 56)
- **T/F (思考/感情)**: 15問 (質問ID: 3, 5, 9, 12, 15, 21, 24, 27, 33, 39, 42, 45, 51, 54, 57)
- **J/P (判断/認知)**: 15問 (質問ID: 4, 10, 16, 18, 22, 28, 30, 34, 35, 40, 46, 47, 52, 58, 59)

### スコアリング方式
- **回答スケール**: -3 (全く思わない) ～ +3 (強く思う)
- **中立値**: 0 (分からない)
- **計算方法**: カテゴリ別に回答値を合計し、百分率で正規化

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: Blue (青系統) - 信頼性と安定性
- **セカンダリ**: Purple (紫系統) - 創造性と洞察
- **アクセント**: Green/Yellow - ポジティブなフィードバック
- **ニュートラル**: Gray スケール - 背景とテキスト

### レスポンシブデザイン
- **モバイルファースト**: 320px～
- **タブレット**: 768px～
- **デスクトップ**: 1024px～

### アクセシビリティ
- **WCAG 2.1 AA準拠**
- **キーボードナビゲーション対応**
- **スクリーンリーダー対応**
- **適切なコントラスト比**

## 🚀 開発・デプロイ

### 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# コード品質チェック
npm run lint

# プレビューサーバー
npm run preview
```

### ビルド成果物
- **出力ディレクトリ**: `dist/`
- **最適化**: Vite による自動最適化
- **コード分割**: 自動チャンク分割
- **静的アセット**: ハッシュ付きファイル名

## 📈 現在の開発状況

### ✅ 完了済み機能
- [x] 基本UI/UXフレームワーク
- [x] 質問データ構造 (60問完備)
- [x] 診断フロー実装
- [x] リアルタイム回答処理
- [x] 自動質問遷移
- [x] レスポンシブデザイン
- [x] アクセシビリティ基盤

### 🔧 技術的課題と解決
- **モジュール解決エラー**: `verbatimModuleSyntax` 設定を調整して解決
- **Radix UI統合**: カスタムコンポーネントで成功
- **型安全性**: 全コンポーネントでTypeScript完全対応

### 🚧 開発中・予定機能
- [ ] スコア計算とMBTI判定ロジック完成
- [ ] 結果表示ページ詳細実装
- [ ] 性格タイプ詳細データ
- [ ] PDF出力機能
- [ ] データ永続化 (localStorage)
- [ ] パフォーマンス最適化

## 🎯 今後の拡張計画

### 短期目標 (1-2週間)
1. **診断結果システム完成**
   - スコア計算ロジックの最終調整
   - 結果表示ページの完全実装
   - 診断レポート生成機能

2. **データ管理強化**
   - LocalStorage による永続化
   - 診断履歴管理
   - データ インポート/エクスポート

### 中期目標 (1ヶ月)
1. **医学的妥当性向上**
   - DSM-5基準への準拠確認
   - 医療従事者によるレビュー
   - 免責事項の法的確認

2. **パフォーマンス最適化**
   - Core Web Vitals改善
   - バンドルサイズ最適化
   - アクセシビリティ監査

### 長期目標 (2-3ヶ月)
1. **本格運用準備**
   - SEO最適化
   - プロダクション環境構築
   - 継続的監視システム

2. **機能拡張**
   - 多言語対応 (英語対応)
   - カスタマイズ可能テーマ
   - 診断データ分析機能

---

## 📚 参考情報

### ドキュメント参照
- [CLAUDE.md](./CLAUDE.md) - 詳細な開発計画・要件
- [質問一覧.md](./質問一覧.md) - 全60問の質問データ
- [README.md](./README.md) - プロジェクト基本情報

### 技術資料
- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

---

**📝 最終更新**: 2025年9月13日  
**📧 担当**: Claude Code AI Assistant  
**🔄 次回更新予定**: 機能実装完了時