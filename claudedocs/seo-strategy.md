# SEO対策ガイド - ADHD診断Webアプリ

## 🎯 SEO戦略概要

ADHD診断Webアプリが検索結果で上位表示されるための包括的SEO対策ガイド

## 🔍 キーワード戦略

### 🎯 プライマリキーワード
- [ ] `ADHD 診断`
- [ ] `ADHD チェック`
- [ ] `ADHD セルフチェック`
- [ ] `ADHD 症状 診断`
- [ ] `注意欠陥多動性障害 診断`

### 🎯 セカンダリキーワード
- [ ] `ADHD テスト 無料`
- [ ] `ADHD 大人 診断`
- [ ] `ADHD 自己診断`
- [ ] `注意力散漫 診断`
- [ ] `集中力 診断テスト`

### 🎯 ロングテールキーワード
- [ ] `ADHD かもしれない 診断`
- [ ] `大人の ADHD セルフチェック`
- [ ] `ADHD 症状 チェックリスト`
- [ ] `注意欠陥多動性障害 無料診断`
- [ ] `ADHD 診断 オンライン 無料`

## 📄 ページ最適化

### 🏠 ランディングページ（/）
- [x] タイトルタグ最適化
```html
<title>ADHD診断・セルフチェック | 無料オンライン診断ツール</title>
```
- [x] メタディスクリプション最適化
```html
<meta name="description" content="ADHD（注意欠陥多動性障害）の無料セルフチェック診断。DSM-5基準に基づく18項目の質問で症状を評価。専門医監修の信頼できる診断ツールです。">
```
- [ ] キーワード密度調整（2-3%）
- [ ] 見出し構造最適化
  - [ ] h1: ADHD診断・セルフチェック
  - [ ] h2: ADHDとは？症状と特徴
  - [ ] h3: 不注意症状
  - [ ] h3: 多動性・衝動性症状
  - [ ] h2: 診断の流れ
  - [ ] h2: よくある質問

### 📝 診断ページ（/questionnaire）
- [x] タイトルタグ最適化
```html
<title>ADHD診断テスト | 18項目の詳細チェック</title>
```
- [x] メタディスクリプション最適化
```html
<meta name="description" content="DSM-5基準に基づくADHD診断テスト。18項目の質問で不注意、多動性、衝動性を評価します。約5分で完了する無料診断。">
```

### 📊 結果ページ（/results）
- [x] タイトルタグ最適化
```html
<title>ADHD診断結果 | 症状評価と推奨アクション</title>
```
- [x] メタディスクリプション最適化
```html
<meta name="description" content="ADHD診断テストの結果表示。症状の詳細分析と専門医への相談推奨。個別化された結果レポートをPDFでダウンロード可能。">
```

### 📚 リソースページ（/resources）
- [x] タイトルタグ最適化
```html
<title>ADHD情報・専門医検索 | 診断後のサポート</title>
```
- [x] メタディスクリプション最適化
```html
<meta name="description" content="ADHD診断後の情報とサポート。専門医検索、治療法解説、生活改善のヒント。信頼できる医療機関の紹介。">
```

## 🏗️ 技術的SEO対策

### ⚡ Core Web Vitals最適化
- [x] Next.js画像最適化設定
- [x] WebP/AVIF形式対応
- [x] 画像レスポンシブ対応
- [x] 圧縮設定有効化
- [x] powered-by-headerの無効化
```javascript
// Next.js設定例
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
  poweredByHeader: false,
}
```

### 🗺️ サイトマップ生成
- [ ] XMLサイトマップ作成
- [ ] 優先度設定
- [ ] 最終更新日設定
- [ ] 自動生成機能実装
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://adhd-check.app/</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://adhd-check.app/questionnaire</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://adhd-check.app/resources</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>
```

### 🤖 robots.txt
- [ ] robots.txt作成
- [ ] クロール許可設定
- [ ] 管理画面のブロック
- [ ] サイトマップの参照設定
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://adhd-check.app/sitemap.xml
```

### 📱 構造化データ（Schema.org）
- [ ] MedicalWebPageスキーマ実装
- [ ] 医療コンテンツのマークアップ
- [ ] 組織情報の構造化
- [ ] 検索結果リッチスニペット対応
```json
{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "ADHD診断・セルフチェック",
  "description": "ADHD（注意欠陥多動性障害）の無料セルフチェック診断",
  "url": "https://adhd-check.app/",
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  },
  "about": {
    "@type": "MedicalCondition",
    "name": "ADHD",
    "alternateName": "注意欠陥多動性障害"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ADHD診断アプリ",
    "url": "https://adhd-check.app/"
  }
}
```

## 📝 コンテンツ戦略

### 📚 教育的コンテンツ
1. **ADHDの基礎知識**
   - 症状の詳細説明
   - 原因と遺伝要因
   - 年齢別の症状変化

2. **診断プロセス**
   - 医師による診断手順
   - 自己診断の限界
   - 専門医の選び方

3. **治療と管理**
   - 薬物療法の種類
   - 行動療法のアプローチ
   - 生活習慣の改善

### 🎯 ユーザー意図別コンテンツ

**情報収集段階**:
- "ADHDとは何か"
- "ADHD症状チェックリスト"
- "ADHDの原因と治療法"

**評価段階**:
- "ADHD診断テスト比較"
- "信頼できるADHD診断サイト"
- "ADHD診断の精度について"

**行動段階**:
- "ADHD診断を受ける方法"
- "専門医への相談準備"
- "ADHD治療の始め方"

## 🔗 リンク戦略

### 📥 内部リンク最適化
- [ ] ランディングページ → 診断ページ（強い内部リンク）
- [ ] 診断ページ → 結果ページ（自然な流れ）
- [ ] 結果ページ → リソースページ（関連情報）
- [ ] 全ページ → FAQページ（ヘルプリンク）

### 📤 外部リンク獲得戦略

**権威サイトとの連携**:
- [ ] 日本ADHD学会
- [ ] 精神科医師会
- [ ] 大学病院の精神科
- [ ] 発達障害支援センター

**コンテンツマーケティング**:
- [ ] ADHD関連ブログへの記事提供
- [ ] 医療従事者向けセミナー資料
- [ ] 患者会での情報提供

**プレスリリース**:
- [ ] 新しい診断アルゴリズムの発表
- [ ] 医師監修の信頼性アピール
- [ ] アクセシビリティ対応の取り組み

## 📱 ローカルSEO対策

### 🏥 地域密着戦略
**地域キーワード例**:
- [ ] "東京 ADHD 診断"
- [ ] "大阪 ADHD 専門医"
- [ ] "名古屋 発達障害 相談"

### 📍 Googleマイビジネス
- [ ] 事業者情報の正確な登録
- [ ] 定期的な投稿とアップデート
- [ ] ユーザーレビューへの適切な返信

## 📊 パフォーマンス監視

### 🔍 SEOツール活用
- [ ] **Google Search Console**
  - [ ] 検索クエリ分析
  - [ ] インデックス状況確認
  - [ ] クリック率改善

- [ ] **Google Analytics**
  - [ ] オーガニック流入分析
  - [ ] ユーザー行動追跡
  - [ ] コンバージョン測定

- [ ] **第三者ツール**
  - [ ] Ahrefs: 競合分析
  - [ ] SEMrush: キーワード調査
  - [ ] Screaming Frog: 技術的監査

### 📈 KPI設定
**検索順位目標**:
- [ ] "ADHD 診断": TOP 3
- [ ] "ADHD チェック": TOP 5
- [ ] "ADHD セルフチェック": TOP 3

**流入目標**:
- [ ] オーガニック流入: 月間10,000セッション
- [ ] 診断完了率: 80%以上
- [ ] 専門医紹介クリック率: 15%以上

## 🚀 継続的改善

### 📅 定期的な最適化
**月次作業**:
- [ ] キーワード順位チェック
- [ ] コンテンツの更新
- [ ] 新しいFAQの追加

**四半期作業**:
- [ ] 競合分析の実施
- [ ] SEO戦略の見直し
- [ ] 新しいキーワードの発掘

**年次作業**:
- [ ] サイト全体の技術監査
- [ ] コンテンツ戦略の大幅見直し
- [ ] UXとSEOの統合改善

### 🔄 アルゴリズム対応
- [ ] Googleアップデートの監視
- [ ] E-A-T（専門性・権威性・信頼性）強化
- [ ] ユーザー体験の継続的改善

## ⚖️ 医療サイト特有の注意事項

### 🛡️ YMYL（Your Money or Your Life）対応
- [ ] 医師による監修情報の明記
- [ ] 引用文献の正確な記載
- [ ] 免責事項の適切な配置
- [ ] 最新医学情報への定期更新

### 📋 コンプライアンス
- [ ] 薬機法（旧薬事法）遵守
- [ ] 医療広告ガイドライン準拠
- [ ] 誤解を招く表現の回避
- [ ] 専門医への相談推奨の強調

---

**📝 実装優先度**:
1. 🔴 高優先度: タイトル・メタ最適化、Core Web Vitals
2. 🟡 中優先度: 構造化データ、内部リンク最適化
3. 🟢 低優先度: 外部リンク獲得、ローカルSEO

この戦略を段階的に実装することで、ADHD診断アプリの検索順位向上が期待できます。