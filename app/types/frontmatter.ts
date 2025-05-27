export interface Frontmatter {
  title: string;
  date: string;
  description: string;
  author?: string;
  tags?: string[];
  updated?: string;
}

export interface ExtendedFrontmatter extends Frontmatter {
  slug?: string;
  published?: boolean;
  category?: string;
  readingTime?: number;
}
