export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  imageUrl: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'ai' | 'tools';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  BLOG = 'blog',
  CONTACT = 'contact'
}