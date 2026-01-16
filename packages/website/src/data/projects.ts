export interface Project {
  id: string
  icon: string
  title: string
  description: string
  techBadges: string[]
  size: 'large' | 'small'
  image?: string
  cta?: string
  ctaHref?: string
  note?: string
}

export const projects: Project[] = [
  {
    id: 'second-brain',
    icon: 'Brain',
    title: 'Second Brain',
    description: 'AI-powered personal knowledge management system, helping you build an efficient knowledge network to boost learning and creativity.',
    techBadges: ['AI', 'Knowledge Graph', 'NLP', 'Machine Learning'],
    size: 'large',
    image: '/images/projects/second-brain.svg',
    cta: 'VIEW PROJECT',
    ctaHref: 'https://github.com/firerlAGI/second-brain',
    note: 'VIEW PROJECT'
  },
  {
    id: 'github-home',
    icon: 'Home',
    title: 'GitHub Home',
    description: 'Personal portfolio website showcasing projects and technical skills, responsive design with dark mode support.',
    techBadges: ['Astro', 'TypeScript', 'Tailwind CSS'],
    size: 'small',
    image: '/images/projects/github-home.svg',
    cta: 'VIEW PROJECT',
    ctaHref: 'https://github.com/firerlAGI/githubhome',
    note: 'VIEW PROJECT'
  },
  {
    id: 'ai-assistant',
    icon: 'Bot',
    title: 'AI Assistant',
    description: 'Intelligent conversational assistant supporting multi-turn dialogue and context understanding, providing personalized suggestions and help.',
    techBadges: ['LLM', 'Python', 'FastAPI'],
    size: 'small',
    image: '/images/projects/ai-assistant.svg',
    cta: 'VIEW PROJECT',
    ctaHref: '#',
    note: 'IN DEVELOPMENT'
  },
  {
    id: 'data-viz',
    icon: 'BarChart3',
    title: 'Data Visualization',
    description: 'Interactive data visualization tool supporting various chart types, real-time data updates, and export functionality.',
    techBadges: ['D3.js', 'React', 'TypeScript'],
    size: 'small',
    image: '/images/projects/data-viz.svg',
    cta: 'VIEW PROJECT',
    ctaHref: '#',
    note: 'PLANNING'
  },
  {
    id: 'task-manager',
    icon: 'CheckSquare',
    title: 'Task Manager',
    description: 'Efficient task management tool supporting drag-and-drop sorting, tag classification, and team collaboration.',
    techBadges: ['Vue.js', 'Node.js', 'MongoDB'],
    size: 'small',
    image: '/images/projects/task-manager.svg',
    cta: 'VIEW PROJECT',
    ctaHref: '#',
    note: 'PLANNING'
  }
]
