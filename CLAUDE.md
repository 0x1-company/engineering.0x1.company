# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイダンスを提供します。

## ビルドコマンド

```bash
# ホットリロード付き開発サーバー
bun dev

# 本番用ビルド（SSG）
bun run build

# 本番サーバー起動
bun start

# 型チェック
bunx tsc --noEmit
```

## プロジェクトアーキテクチャ

このプロジェクトは、Next.js、TypeScript、MDXで構築されたエンジニアリングブログです。パフォーマンスとSEOのために静的サイト生成（SSG）を使用しています。

### パッケージマネージャー
このプロジェクトは**Bun**で管理されています。`yarn.lock`や`package-lock.json`は使用しません。常に`bun install`を使用してください。

### 技術スタック

#### フレームワーク & ランタイム
- **Next.js 15**: App Router を使用したReactフレームワーク（SSG対応）
- **React 19**: UIライブラリ
- **TypeScript 5.8**: 型安全性のための言語
- **Bun**: JavaScriptランタイム & パッケージマネージャー

#### スタイリング
- **TailwindCSS 3**: ユーティリティファーストCSSフレームワーク
- **PostCSS**: CSSトランスフォーマー
- **Autoprefixer**: ベンダープレフィックス自動付与

#### コンテンツ管理
- **MDX**: JSXコンポーネントを含むマークダウン
- **next-mdx-remote**: 動的MDXコンテンツレンダリング
- **gray-matter**: フロントマター解析
- **remark/rehype**: マークダウン処理パイプライン
- **shiki**: シンタックスハイライト
- **budoux**: 日本語改行処理

#### OGP画像生成
- **satori**: SVGからOGP画像生成
- **@resvg/resvg-js**: SVGラスタライズ
- **sharp**: 画像処理

#### 開発ツール
- **ESLint**: コード品質チェック（Next.js設定）
- **TypeScript**: 型チェック

### ディレクトリ構造

```
/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # ルートレイアウト
│   ├── page.tsx                 # ホームページ
│   ├── global.css               # グローバルスタイル
│   ├── articles/                # 記事ルーティング
│   │   └── [slug]/              # 動的記事ルート
│   │       └── page.tsx         # 記事詳細ページ
│   ├── components/              # UIコンポーネント（Atomic Design）
│   │   ├── atoms/               # 基本要素
│   │   │   ├── Button.tsx
│   │   │   ├── Icon.tsx
│   │   │   ├── Image.tsx
│   │   │   ├── Link.tsx
│   │   │   ├── Text.tsx
│   │   │   └── index.ts
│   │   ├── molecules/           # 複合コンポーネント
│   │   │   ├── ArticleDate.tsx
│   │   │   ├── ArticleDescription.tsx
│   │   │   ├── ArticleImage.tsx
│   │   │   ├── ArticleTitle.tsx
│   │   │   ├── FooterNavLink.tsx
│   │   │   ├── NavLink.tsx
│   │   │   ├── ReadMoreLink.tsx
│   │   │   ├── SocialIcon.tsx
│   │   │   └── index.ts
│   │   ├── organisms/           # セクション/機能単位
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleList.tsx
│   │   │   ├── ArticlePreview.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── NotFound.tsx
│   │   │   └── index.ts
│   │   └── templates/           # ページテンプレート
│   │       ├── HomeTemplate.tsx
│   │       ├── PageLayout.tsx
│   │       └── index.ts
│   ├── lib/                     # ユーティリティ
│   │   ├── articles.ts          # 記事データ取得
│   │   ├── authors.ts           # 著者データ
│   │   ├── date.ts              # 日付ユーティリティ
│   │   ├── fetchOgp.ts          # OGP取得
│   │   ├── mdx-components.tsx   # MDXコンポーネント定義
│   │   └── mdxComponents/       # カスタムMDXコンポーネント
│   │       ├── anchorLink.tsx
│   │       ├── articleImage.tsx
│   │       └── externalOgp.tsx
│   ├── types/                   # TypeScript型定義
│   │   ├── article.ts
│   │   ├── frontmatter.ts
│   │   └── index.ts
│   └── utils/                   # 汎用ユーティリティ
│       └── getEntryNameFromPath/
├── articles/                    # MDX記事ファイル（ルートレベル）
│   └── YYYY/                    # 年ごとのフォルダ
│       └── MMDD/                # 月日ごとのフォルダ
│           └── *.mdx            # MDX記事ファイル
├── assets/                      # 記事用静的アセット（ルートレベル）
│   └── YYYY/MMDD/article-name/  # 記事ごとの画像フォルダ
├── public/                      # 静的ファイル
│   ├── favicon.ico
│   ├── tomokisun.png           # 著者アバター
│   └── assets/                 # ビルド時コピーされる画像
├── scripts/                     # ビルドスクリプト
│   ├── generateOgpImages.ts     # OGP画像生成
│   └── generateDefaultOgp.ts    # デフォルトOGP生成
├── lib/                         # shadcn/ui用（新規追加）
│   └── utils.ts                # クラス名ユーティリティ
├── components.json              # shadcn/ui設定
├── tailwind.config.js           # Tailwind設定
├── tsconfig.json                # TypeScript設定
├── next.config.js               # Next.js設定
├── package.json                 # 依存関係
├── bun.lockb                    # Bunロックファイル
└── vercel.json                  # Vercelデプロイ設定
```

### コンテンツ管理

#### 記事ファイル
記事は`articles/YYYY/MMDD/filename.mdx`にあるMDXファイルで、フロントマターを含みます：

```mdx
---
title: "記事タイトル"
description: "簡潔な説明"
date: "YYYY-MM-DD"
author: "author-id"
---
```

#### URLスラッグ生成
- ファイルパス: `articles/2025/0127/my-article.mdx`
- 生成されるURL: `/articles/my-article`
- スラッグはファイル名から自動生成（拡張子除く）

#### 著者情報
著者情報は`app/lib/authors.ts`で管理：
- `tomokisun`: Tomoki Sunのプロフィール情報

### URL管理
レガシーURLは`vercel.json`のrewritesで処理されます。新しいrewritesを追加する際：
1. 特定のルートを一般的なパターンより前に配置
2. 必要に応じて宛先にファイル拡張子を含める
3. 元のURLを保持するためにrewritesを使用（redirectsではなく）

### MDXコンポーネント
MDXコンポーネント（`app/lib/mdx-components.tsx`）はオブジェクトを直接エクスポートします：
```typescript
const mdxComponents = {
  // コンポーネント定義
};
export default mdxComponents;
```

MDXで利用可能なカスタムコンポーネント：
- `<ExternalOgp url="...">`: リッチリンクプレビュー
- `<img>`: 適切なalt textを含む自動スタイル付き画像

### テスト
現在、自動化されたテストは設定されていません。開発サーバーを介した手動テストが主な方法です。

### デプロイメント
サイトは静的エクスポート（`output: 'export'`）を使用してビルドされ、任意の静的ホスティングサービスにデプロイできます。

- ビルド出力: `./dist`ディレクトリ
- ホスティング: Vercel（推奨）
- ドメイン: `https://engineering.0x1.company`

### APIルート
- `/`: ホームページ（記事一覧）
- `/articles/[slug]`: 記事詳細ページ
- `/ogps/[slug]`: OGP画像エンドポイント（内部使用）
- `/robots.txt`: SEO用robots.txt

## ライティングガイドライン

記事は以下の規約に従う必要があります：
- 主要言語：日本語
- 一人称複数形には「わたしたち」を使用
- 技術用語は英語のまま（Swift、TCAなど）
- すべての画像に説明的なalt textを含める
- 適切な場合は外部リンクに`<ExternalOgp>`を使用
- 画像は`/assets/YYYY/MMDD/article-name/`に保存

## コンポーネント開発ガイドライン

### Atomic Designの原則
1. **Atoms**: 最小単位のコンポーネント（Button、Text、Linkなど）
   - 単一の責任を持つ
   - 他のコンポーネントに依存しない
   - スタイルはTailwindクラスで制御

2. **Molecules**: Atomsを組み合わせた小さな機能単位
   - 2-3個のAtomsで構成
   - 特定の機能を提供（ArticleDate、SocialIconなど）

3. **Organisms**: 独立した機能を持つセクション
   - 複数のMoleculesやAtomsで構成
   - ビジネスロジックを含む場合がある（ArticleList、HeroSectionなど）

4. **Templates**: ページ全体のレイアウト
   - Organismsを配置
   - ページ固有のロジックを持つ

### コンポーネント作成のベストプラクティス
- コンポーネントはUIの再利用性と一貫性を最大化するために設計する
- コンポーネントは可能な限りステートレスで、propsを通じて設定する
- UIコンポーネントは`/app/components/`以下に配置
- アクセシビリティと型安全性を常に考慮する
- 各コンポーネントディレクトリには`index.ts`を作成し、exportを管理
- TypeScriptの型定義を必ず行う
- Tailwindのクラス名はcn()関数で条件付き適用を行う（shadcn/ui互換）

### スタイリング規則
- TailwindCSSのユーティリティクラスを使用
- カスタムCSSは極力避ける
- レスポンシブデザインを前提とする（mobile-first）
- ダークモード対応は将来的に検討

## 開発フロー

1. **新機能開発時**
   - 必要なコンポーネントをAtomic Designの階層で分類
   - 既存コンポーネントの再利用を優先
   - 新規コンポーネントは適切な階層に作成

2. **記事追加時**
   - `articles/YYYY/MMDD/`にMDXファイルを作成
   - 画像は`assets/YYYY/MMDD/article-name/`に配置
   - フロントマターを正しく設定

3. **ビルド前チェック**
   - `bunx tsc --noEmit`で型チェック
   - `bun run build`でビルドエラーがないか確認

## トラブルシューティング

### よくある問題
1. **ビルドエラー**: 型エラーの場合は`bunx tsc --noEmit`で詳細確認
2. **画像が表示されない**: パスが正しいか、public/assetsにコピーされているか確認
3. **MDXエラー**: フロントマターの形式、コンポーネントのインポートを確認

## Pull Request作成ガイドライン

### 重要な規則
Pull Requestを作成する際は、**必ず以下の規則に従ってください**：

1. **言語**: タイトルと説明は**必ず日本語**で記述する
2. **テンプレート**: GitHubのPRテンプレート（`.github/pull_request_template.md`）を**必ず使用**する
3. **フォーマット**: テンプレートの全てのセクションを適切に埋める

### gh prコマンドの使用方法
```bash
# 正しい例：日本語でPRを作成
gh pr create --title "feat: Next.js 15への移行" --body "$(cat <<'EOF'
## 概要
<!-- 変更の概要を簡潔に記述 -->
Next.js 15 App Routerへの移行を実施

## 変更内容
<!-- 主な変更点をリスト形式で記述 -->
- HonoXからNext.js 15への移行
- コンポーネントをReactに変換
- ビルド設定の更新

## テスト
<!-- 実施したテストを記述 -->
- [ ] `bun dev`で開発サーバーが起動することを確認
- [ ] `bun run build`でビルドが成功することを確認
- [ ] 全ての記事ページが正しく表示されることを確認

## レビューポイント
<!-- レビュアーに特に見てほしい箇所 -->
- ルーティングの変更が適切か
- パフォーマンスに影響がないか

## その他
<!-- その他の情報があれば記述 -->
- shadcn/uiの設定を追加（将来の拡張のため）

🤖 Generated with [Claude Code](https://claude.ai/code)
EOF
)"
```

### PRテンプレートの内容
`.github/pull_request_template.md`が存在する場合は、その内容に従ってPRの説明を記述してください。一般的に以下のセクションが含まれます：

- **概要**: 変更の目的と背景
- **変更内容**: 具体的な変更点のリスト
- **テスト**: 実施したテストのチェックリスト
- **レビューポイント**: レビュアーに注目してほしい箇所
- **その他**: 追加情報や注意事項

### 禁止事項
- 英語でのPR作成は**禁止**
- テンプレートを無視したPR作成は**禁止**
- 不完全な情報でのPR作成は**禁止**
