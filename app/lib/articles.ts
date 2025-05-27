import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, Frontmatter } from '../types'
import { getEntryNameFromPath } from '../utils';

const getArticleFiles = () => {
  const articlesDirectory = path.join(process.cwd(), 'app/articles');
  
  const getAllMdxFiles = (dir: string): string[] => {
    const files: string[] = [];
    const entries = fs.readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...getAllMdxFiles(fullPath));
      } else if (entry.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
    
    return files;
  };
  
  return getAllMdxFiles(articlesDirectory);
};

const sortByDateDesc = (
  a: { frontmatter: Frontmatter },
  b: { frontmatter: Frontmatter }
) => {
  const aDate = new Date(a.frontmatter.date);
  const bDate = new Date(b.frontmatter.date);
  return bDate.getTime() - aDate.getTime();
};

export const getArticles = async (): Promise<Article[]> => {
  const files = getArticleFiles();
  
  const articles = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContent);
    const entryName = getEntryNameFromPath(filePath);
    
    return {
      entryName,
      frontmatter: frontmatter as Frontmatter,
      path: filePath,
    };
  });
  
  return articles.sort(sortByDateDesc);
};

export const getArticleByEntryName = async (entryName: string) => {
  const posts = await getArticles();
  return posts.find((post) => post.entryName === entryName);
}

export const getLatestArticlesWithoutTargetArticle = async (entryName: string) => {
  const posts = await getArticles();
  return posts.filter((post) => post.entryName !== entryName).slice(0, 4);
}

