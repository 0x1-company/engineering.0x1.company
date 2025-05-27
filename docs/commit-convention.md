# コミットメッセージ規約

このドキュメントは、engineering.0x1.companyリポジトリにおけるコミットメッセージの規約を定めています。

## 基本フォーマット

```
<type>: <subject>

<body>

<footer>
```

## Type（必須）

コミットの種類を表すプレフィックスです。以下から選択してください：

- **feat**: 新機能の追加
- **fix**: バグ修正
- **docs**: ドキュメントの変更
- **style**: コードの意味に影響しない変更（空白、フォーマット、セミコロンなど）
- **refactor**: バグ修正や機能追加を伴わないコードの変更
- **perf**: パフォーマンスを向上させるコードの変更
- **test**: テストの追加や既存テストの修正
- **build**: ビルドシステムや外部依存関係に影響する変更
- **ci**: CI設定ファイルやスクリプトの変更
- **chore**: その他の変更（ビルドプロセスやツールの変更など）
- **revert**: 以前のコミットを取り消す

## Subject（必須）

- 50文字以内で変更内容を要約
- **日本語で記述**する
- 文末に句点（。）は付けない
- 命令形ではなく、変更内容を説明する形で記述

### 良い例
```
feat: 記事一覧にページネーション機能を追加
fix: 記事詳細ページの404エラーを修正
docs: コミットメッセージ規約を追加
refactor: ArticleListコンポーネントを分割
```

### 悪い例
```
feat: ページネーションを実装しました。  # 句点は不要
fix: バグ修正  # 具体的でない
Update README  # typeが無い
feat: implemented pagination  # 英語ではなく日本語で
```

## Body（オプション）

- 変更の詳細な説明が必要な場合に記載
- 何を、なぜ変更したかを説明
- 箇条書きも使用可能
- 各行は72文字以内に収める

### 例
```
feat: 記事一覧にページネーション機能を追加

- 1ページあたり10記事を表示
- URLパラメータでページ番号を管理
- 最初と最後のページへのリンクを追加
- アクセシビリティを考慮したARIA属性を設定
```

## Footer（オプション）

### Issue番号の参照
```
Close #123
Ref #456
```

### Breaking Change
後方互換性のない変更がある場合は必ず記載：
```
BREAKING CHANGE: APIのレスポンス形式を変更
旧: { articles: [...] }
新: { data: { articles: [...] }, meta: { ... } }
```

## 実例

### シンプルなコミット
```
docs: READMEにインストール手順を追加
```

### 詳細な説明付きコミット
```
feat: 記事のOGP画像自動生成機能を実装

- Satoriを使用してSVGからOGP画像を生成
- 記事タイトルと説明文を含むデザイン
- ビルド時に自動的に画像を生成
- public/ogps/ディレクトリに保存

Close #89
```

### Breaking Changeを含むコミット
```
refactor: 記事データの取得方法を変更

getArticlesの戻り値を変更し、ページネーション情報を含むように修正

BREAKING CHANGE: getArticlesの戻り値が変更されました
旧: Article[]
新: { articles: Article[], total: number, page: number }
```

## Gitの設定

コミットメッセージテンプレートを使用する場合：

```bash
git config --local commit.template .gitmessage
```

## 参考資料

この規約は[Conventional Commits](https://www.conventionalcommits.org/)をベースに、日本語での運用に最適化したものです。