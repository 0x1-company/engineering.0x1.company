# リファクタリング計画

このドキュメントは、0x1 Companyエンジニアリングブログのコードベースに対する包括的なリファクタリング計画を示します。

## 概要

現在のコードベースは機能していますが、保守性、拡張性、パフォーマンスの観点から改善の余地があります。このリファクタリング計画は、段階的に実施可能な改善案を優先度順に整理しています。

## 1. コンポーネント構造の改善

### 現状の課題
- コンポーネントのプロップ型定義が不完全
- 責任の分離が不明確
- 再利用性が低い

### 改善案

#### 1.1 ArticleCard.tsxの改善
```typescript
// Before
export default function ArticleCard({ article, className }: ArticleCardProps)

// After
export interface ArticleCardProps {
  article: Article;
  className?: string;
  onClick?: () => void;
  priority?: 'high' | 'low'; // 画像の遅延読み込み制御
}
```

#### 1.2 コンポーネントの責任分離
- `ArticleCard`: 表示専用コンポーネント
- `ArticleListItem`: リスト内での振る舞いを管理
- `ArticlePreview`: プレビュー表示用

### 実装優先度: 高

## 2. 型定義の強化

### 現状の課題
- 一部の型定義が不完全
- 型の再利用が不十分
- 実行時エラーのリスク

### 改善案

#### 2.1 記事型の拡張
```typescript
// app/types/article.ts
export interface Article {
  slug: string;
  frontmatter: Frontmatter;
  readingTime?: number; // 新規追加
  relatedArticles?: string[]; // 新規追加
  lastModified?: string; // 新規追加
}

// フロントマターのバリデーション
export const validateFrontmatter = (data: unknown): Frontmatter => {
  // Zodなどを使用した実行時バリデーション
};
```

#### 2.2 ユーティリティ型の追加
```typescript
// app/types/utils.ts
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
```

### 実装優先度: 高

## 3. パフォーマンス最適化

### 現状の課題
- 全記事を常にメモリに読み込んでいる
- 画像の最適化が不十分
- バンドルサイズの最適化余地

### 改善案

#### 3.1 記事の遅延読み込み
```typescript
// app/lib/articles.ts
export async function getArticlesByPage(page: number, limit: number = 10) {
  const articles = await getAllArticles();
  const start = (page - 1) * limit;
  const end = start + limit;
  return articles.slice(start, end);
}

// キャッシュ戦略の実装
const articleCache = new Map<string, Article>();
```

#### 3.2 画像最適化
- WebP形式への自動変換
- レスポンシブ画像の生成
- 遅延読み込みの実装

#### 3.3 コード分割
```typescript
// 動的インポートの活用
const ArticleEditor = lazy(() => import('./components/ArticleEditor'));
```

### 実装優先度: 中

## 4. エラーハンドリングの改善

### 現状の課題
- エラーハンドリングが不統一
- ユーザーフレンドリーでないエラーメッセージ
- エラーの追跡が困難

### 改善案

#### 4.1 統一エラーハンドリング
```typescript
// app/lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}
```

#### 4.2 エラーバウンダリの実装
```typescript
// app/components/ErrorBoundary.tsx
export function ErrorBoundary({ children }: { children: ReactNode }) {
  // エラー処理ロジック
}
```

### 実装優先度: 中

## 5. ファイル構造の再編成

### 現状の課題
- 機能ごとの整理が不十分
- 関連ファイルが分散している

### 改善案

```
app/
├── features/           # 機能ベースのディレクトリ
│   ├── articles/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types.ts
│   ├── auth/
│   └── search/
├── shared/            # 共通コンポーネント・ユーティリティ
│   ├── components/
│   ├── hooks/
│   └── utils/
└── config/            # 設定ファイル
```

### 実装優先度: 低

## 6. テスト戦略

### 現状の課題
- テストが存在しない
- 品質保証プロセスが手動

### 改善案

#### 6.1 ユニットテスト
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
  },
});
```

#### 6.2 テスト対象
- ユーティリティ関数: 100%カバレッジ目標
- コンポーネント: 主要な振る舞いをテスト
- ルーティング: 統合テスト

### 実装優先度: 高

## 7. 開発環境の改善

### 現状の課題
- リンター設定が不足
- コード品質の自動チェックなし

### 改善案

#### 7.1 ESLint/Biome設定
```json
{
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error"
  }
}
```

#### 7.2 プレコミットフック
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

### 実装優先度: 中

## 8. アクセシビリティ改善

### 現状の課題
- ARIA属性が不足
- キーボードナビゲーションの考慮不足

### 改善案

#### 8.1 セマンティックHTML
- 適切な見出しレベルの使用
- ランドマークの追加
- フォーカス管理の改善

#### 8.2 ARIA属性の追加
```tsx
<article role="article" aria-labelledby={`article-${article.slug}`}>
  <h2 id={`article-${article.slug}`}>{article.title}</h2>
</article>
```

### 実装優先度: 中

## 実装ロードマップ

### フェーズ1（1-2週間）
1. 型定義の強化
2. 基本的なテスト環境のセットアップ
3. 重要なコンポーネントのリファクタリング

### フェーズ2（2-3週間）
1. エラーハンドリングの統一
2. パフォーマンス最適化の実施
3. 開発環境の改善

### フェーズ3（3-4週間）
1. ファイル構造の再編成
2. アクセシビリティの改善
3. 包括的なテストカバレッジの達成

## 成功指標

- TypeScriptエラー: 0
- テストカバレッジ: 80%以上
- Lighthouseスコア: 95以上
- ビルド時間: 30%短縮
- バンドルサイズ: 20%削減

## まとめ

このリファクタリング計画は、コードベースの品質向上と長期的な保守性を目的としています。各フェーズは独立して実施可能であり、ビジネス要件に応じて優先順位を調整できます。
