# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイダンスを提供します。

## ビルドコマンド

```bash
# ホットリロード付き開発サーバー
bun dev

# 本番用ビルド（クライアントとSSG）
bun run build

# 型チェック
bunx tsc --noEmit
```

## プロジェクトアーキテクチャ

このプロジェクトは、TypeScript、MDX、Viteで構築されたHonoXベースのエンジニアリングブログです。パフォーマンスとSEOのために静的サイト生成（SSG）を使用しています。

### 主要技術
- **HonoX**: Hono + Viteで構築されたフルスタックフレームワーク
- **MDX**: JSXコンポーネントを含むリッチなコンテンツ作成
- **TailwindCSS v4**: スタイリング用
- **Vite**: SSG機能を備えたビルドツール
- **TypeScript**: コードベース全体の完全な型安全性

### ディレクトリ構造
- `app/articles/`: 日付（YYYY/MMDD形式）で整理されたMDXコンテンツ
- `app/assets/`: 記事用の静的アセット
- `app/components/`: 再利用可能なUIコンポーネント（ArticleCard、ArticleListなど）
- `app/routes/`: ファイルベースのルーティングシステム
  - `index.tsx`: 記事一覧のホームページ
  - `articles/[slug].tsx`: 個別の記事ページ
  - `ogps/[slug].tsx`: OGP画像生成
- `app/lib/`: ユーティリティとMDXコンポーネントプロバイダー
- `app/types/`: TypeScript型定義

### コンテンツ管理
記事は`app/articles/YYYY/MMDD/filename.mdx`にあるMDXファイルで、フロントマターを含みます：
```mdx
---
title: "記事タイトル"
description: "簡潔な説明"
date: "YYYY-MM-DD"
author: "author-id"
---
```

### URL管理
レガシーURLは`vercel.json`のrewritesで処理されます。新しいrewritesを追加する際：
1. 特定のルートを一般的なパターンより前に配置
2. 必要に応じて宛先にファイル拡張子を含める
3. 元のURLを保持するためにrewritesを使用（redirectsではなく）

### MDXコンポーネント
MDXコンポーネントプロバイダー（`app/lib/mdx-components.tsx`）は関数を直接エクスポートする必要があります：
```typescript
export default useMDXComponents  // 正しい
// 誤り: export default { useMDXComponents }
```

MDXで利用可能なカスタムコンポーネント：
- `<ExternalOgp url="...">`: リッチリンクプレビュー
- `<img>`: 適切なalt textを含む自動スタイル付き画像

### テスト
現在、自動化されたテストは設定されていません。開発サーバーを介した手動テストが主な方法です。

### デプロイメント
サイトはCloudflare Workers/Pagesにデプロイされます。ビルド出力は`./dist`ディレクトリです。

## ライティングガイドライン

記事は以下の規約に従う必要があります：
- 主要言語：日本語
- 一人称複数形には「わたしたち」を使用
- 技術用語は英語のまま（Swift、TCAなど）
- すべての画像に説明的なalt textを含める
- 適切な場合は外部リンクに`<ExternalOgp>`を使用
- 画像は`/app/assets/YYYY/MMDD/article-name/`に保存

## コンポーネントメモ
- コンポーネントはUIの再利用性と一貫性を最大化するために設計する
- コンポーネントは可能な限りステートレスで、propsを通じて設定する
- UIコンポーネントは`/app/components/`以下に配置
- アクセシビリティと型安全性を常に考慮する
