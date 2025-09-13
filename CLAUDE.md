# ADHD 診断 Web アプリ開発計画

## 🎯 プロジェクト概要

16personalities.com のようなモダンで直感的なデザインを採用した ADHD スクリーニング Web アプリケーションの開発計画書。

### 📋 基本情報

- **目的**: ADHD 症状のセルフチェック・スクリーニングツール
- **対象**: 成人（18 歳以上）
- **位置づけ**: 医学的診断の補助ツール（診断の代替ではない）
- **デザイン**: 16personalities.com 風のモダン UI/UX

## ⚖️ 法的・医学的コンプライアンス

### 🛡️ 免責事項・法的位置づけ

- **重要**: このアプリは医学的診断の代替ではない
- ADHD の正式診断は医師のみが実施可能
- 「参考情報」「スクリーニングツール」として明確に位置づけ
- 利用規約・プライバシーポリシーの整備
- 専門医への相談を強く推奨

### 🏥 医学的基準

- **診断基準**: DSM-5（Diagnostic and Statistical Manual of Mental Disorders, 5th Edition）
- **参考スケール**:
  - ADHD-RS（ADHD Rating Scale）
  - 成人 ADHD 自己記入式症状チェックリスト（ASRS）
- **医学的監修**: 可能であれば精神科医による監修を取得

### 🔒 データプライバシー

- GDPR・個人情報保護法準拠
- 最小限のデータ収集
- 匿名化された統計のみ保存
- ローカルストレージ活用（サーバーに個人情報を保存しない）
- ユーザーの明示的同意取得

## 🎨 デザイン要件

### 🎯 デザインコンセプト

- **参考**: 16personalities.com のデザインシステム
- **色彩**: 落ち着いた医療アプリに適した色パレット
- **タイポグラフィ**: 可読性重視、アクセシブルなフォント選択
- **レイアウト**: クリーンでモダン、直感的なナビゲーション

### 📱 レスポンシブデザイン

- **モバイルファースト**: スマートフォン最適化
- **タブレット対応**: 中間画面サイズの最適化
- **デスクトップ**: 大画面での快適な利用
- **タッチインターフェース**: タップ・スワイプ操作対応

### ♿ アクセシビリティ

- **WCAG 2.1 AA 準拠**: 国際的なアクセシビリティ基準
- **キーボードナビゲーション**: マウス不要な操作
- **スクリーンリーダー対応**: 視覚障害者への配慮
- **色覚異常対応**: 色のみに依存しないデザイン
- **適切なコントラスト比**: 視認性の確保

## 🛠️ 技術スタック

### 💻 フロントエンド

- **React 18** + **TypeScript**: 型安全性、保守性
- **Next.js 14**: SSR/SSG、SEO 最適化、パフォーマンス
- **Tailwind CSS**: 高速開発、一貫性、レスポンシブデザイン
- **Framer Motion**: スムーズなアニメーション・トランジション

### 🎯 状態管理

- **React Context + useReducer**: シンプルなアプリには十分
- **Zustand**: 必要に応じて軽量な状態管理ライブラリ

### 🧩 UI コンポーネント

- **Radix UI**: アクセシビリティ重視、unstyled components
- **React Hook Form**: フォーム管理、バリデーション
- **Recharts**: データビジュアライゼーション（結果チャート）

### 🚀 デプロイメント

- **Vercel**: Next.js との相性、簡単デプロイ、CDN
- **代替**: Netlify

### 📊 分析・モニタリング

- **Vercel Analytics**: パフォーマンス監視
- **Google Analytics**: 匿名化されたユーザー行動分析

## 🏗️ アプリケーション構造

### 📋 診断アルゴリズム

- **質問数**: DSM-5 ベースの 18 項目
  - 不注意症状: 9 項目
  - 多動性・衝動性症状: 9 項目
- **評価スケール**: 5 点リッカートスケール（0=全くない ～ 4=とてもよくある）
- **スコアリング**: 重み付けスコア、年齢・性別による正規化

### 🗂️ 質問カテゴリ

1. **不注意症状**

   - 集中困難、注意散漫
   - 忘れっぽさ、物の紛失
   - 整理整頓の困難
   - 指示の聞き逃し

2. **多動性症状**

   - 落ち着きのなさ
   - 過度の身体活動
   - 静かな活動の困難

3. **衝動性症状**
   - 順番を待てない
   - 会話への割り込み
   - 即座の判断・行動

### 📊 結果表示

- **視覚的スコア表示**: 円グラフ、プログレスバー、ゲージ
- **カテゴリ別分析**: 不注意・多動性・衝動性の詳細
- **パーソナライズされた説明**: スコアに基づく個別解説
- **推奨アクション**: 専門医相談、生活改善提案
- **PDF 出力機能**: 専門医面談時の資料として活用

## 👤 ユーザーフロー

### 1. ランディングページ

- サービス概要説明
- 免責事項・利用規約への同意
- 開始ボタン

### 2. 基本情報入力

- 年齢、性別（任意）
- 診断目的（任意）

### 3. 診断質問

- 複数ページに分割（3-4 ページ）
- プログレスバー表示
- 前のページに戻る機能
- 一時保存機能（ローカルストレージ）

### 4. 結果表示

- スコア計算・表示
- カテゴリ別詳細分析
- 推奨事項

### 5. リソースページ

- 専門医検索情報
- ADHD 関連リソース
- 参考文献・サイト

## 📁 プロジェクト構造

```
adhd-diagnostic-app/
├── src/
│   ├── components/
│   │   ├── ui/               # 基本UIコンポーネント
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Progress.tsx
│   │   │   └── ...
│   │   ├── forms/            # 質問フォーム関連
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── QuestionnaireForm.tsx
│   │   │   └── ...
│   │   ├── charts/           # 結果表示チャート
│   │   │   ├── ScoreChart.tsx
│   │   │   ├── CategoryChart.tsx
│   │   │   └── ...
│   │   └── layout/           # レイアウトコンポーネント
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Layout.tsx
│   ├── pages/                # Next.jsページ
│   │   ├── index.tsx         # ランディングページ
│   │   ├── questionnaire.tsx # 診断ページ
│   │   ├── results.tsx       # 結果ページ
│   │   └── resources.tsx     # リソースページ
│   ├── hooks/                # カスタムフック
│   │   ├── useQuestionnaire.ts
│   │   ├── useScoring.ts
│   │   └── useLocalStorage.ts
│   ├── utils/                # ユーティリティ関数
│   │   ├── scoring.ts        # スコア計算
│   │   ├── validation.ts     # バリデーション
│   │   └── analytics.ts      # 分析機能
│   ├── data/                 # 質問データ、診断ロジック
│   │   ├── questions.ts      # 質問データベース
│   │   ├── scoring-algorithm.ts
│   │   └── constants.ts
│   ├── types/                # TypeScript型定義
│   │   ├── questionnaire.ts
│   │   ├── scoring.ts
│   │   └── index.ts
│   └── styles/               # スタイル関連
│       ├── globals.css
│       └── components/
├── public/
│   ├── images/               # 画像ファイル
│   ├── icons/                # アイコンファイル
│   └── favicon.ico
├── docs/                     # ドキュメント
│   ├── medical-review.md     # 医学的監修記録
│   ├── accessibility-audit.md
│   └── user-testing.md
├── tests/                    # テストファイル
│   ├── components/
│   ├── utils/
│   └── integration/
└── config/                   # 設定ファイル
    ├── eslint.config.js
    ├── tailwind.config.js
    └── next.config.js
```

## 🔧 開発ツール・品質管理

### 🧪 テスト

- **Jest**: ユニットテスト
- **React Testing Library**: コンポーネントテスト
- **Playwright**: E2E テスト
- **Jest-axe**: アクセシビリティテスト

### 📏 コード品質

- **ESLint**: コード規約チェック
- **Prettier**: コードフォーマット
- **TypeScript**: 型安全性
- **Husky**: Git pre-commit フック
- **Lint-staged**: ステージされたファイルのみリント

### 📊 パフォーマンス監視

- **Lighthouse CI**: 継続的パフォーマンス監視
- **Web Vitals**: Core Web Vitals 測定
- **Bundle Analyzer**: バンドルサイズ分析

## ⚠️ リスク管理

### 🚨 主要リスク要因

1. **医学的責任・法的リスク**

   - 対策: 明確な免責事項、医学的監修の取得
   - 定期的な法的レビュー

2. **ユーザープライバシー**

   - 対策: データ最小化、ローカルストレージ活用
   - プライバシーバイデザイン原則

3. **アクセシビリティ要件**

   - 対策: 開発初期から WCAG 準拠
   - 自動テスト導入、専門家レビュー

4. **パフォーマンス・スケーラビリティ**
   - 対策: 静的サイト生成、CDN 活用
   - 継続的パフォーマンス監視

### ✅ 成功要因

1. **医学的妥当性**: DSM-5 準拠、医学的監修
2. **優れた UX**: 16personalities レベルの使いやすさ
3. **アクセシビリティ**: 包括的な利用者への配慮
4. **モバイル最適化**: スマートフォンでの快適利用
5. **明確な法的位置づけ**: 責任範囲の明確化

### 🛡️ 品質保証

- **医療従事者による監修**: 内容の医学的妥当性確認
- **アクセシビリティ専門家レビュー**: WCAG 準拠確認
- **ユーザビリティテスト**: 実際のユーザーによる検証
- **セキュリティ監査**: データ保護・プライバシー確認
- **法的レビュー**: 免責事項・利用規約の適切性確認

## 🎯 成功指標（KPI）

### 📊 ユーザー体験

- **完了率**: 診断を最後まで完了するユーザーの割合（目標: >80%）
- **離脱率**: 質問途中での離脱率（目標: <20%）
- **満足度**: ユーザー満足度スコア（目標: 4.0/5.0 以上）

### ⚡ パフォーマンス

- **Core Web Vitals**: Largest Contentful Paint < 2.5s
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1
- **Lighthouse スコア**: 90 点以上（全カテゴリ）

### ♿ アクセシビリティ

- **WCAG 2.1 AA 準拠率**: 100%
- **スクリーンリーダー対応**: 完全対応
- **キーボードナビゲーション**: 全機能利用可能

### 🛡️ セキュリティ・プライバシー

- **データ漏洩**: 0 件
- **プライバシー侵害**: 0 件
- **セキュリティ脆弱性**: 致命的脆弱性 0 件

## 📚 参考文献・リソース

### 🏥 医学的資料

- DSM-5（Diagnostic and Statistical Manual of Mental Disorders, 5th Edition）
- ADHD-RS（ADHD Rating Scale）
- 成人 ADHD 自己記入式症状チェックリスト（ASRS）
- 日本 ADHD 学会ガイドライン

### 🎨 デザイン参考

- [16personalities.com](https://www.16personalities.com/) - デザインリファレンス
- [Material Design Guidelines](https://material.io/design) - アクセシビリティ指針
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) - UX 原則

### ⚖️ 法的・コンプライアンス

- WCAG 2.1 ガイドライン
- GDPR（General Data Protection Regulation）
- 個人情報保護法
- 医療機器プログラム規制

### 🛠️ 技術文書

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Platform Documentation](https://vercel.com/docs)

---

**📝 注意事項**: この計画書は開発の指針として作成されています。実際の開発過程で法的要件や技術的制約により修正が必要な場合があります。特に医学的内容については、必ず専門医による監修を受けることを強く推奨します。
