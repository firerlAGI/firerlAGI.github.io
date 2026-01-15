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
    icon: '🧠',
    title: '第二大脑',
    description: 'AI 驱动的个人知识管理系统，帮助你构建高效的知识网络，提升学习与创造效率。',
    techBadges: ['AI', '知识图谱', 'NLP', '机器学习'],
    size: 'large',
    image: '/images/projects/second-brain.svg',
    cta: '查看项目',
    ctaHref: 'https://github.com/firerlAGI/second-brain'
  },
  {
    id: 'github-home',
    icon: '🏠',
    title: 'GitHub Home',
    description: '个人作品集网站，展示项目和技术能力，响应式设计，支持深色模式。',
    techBadges: ['Astro', 'TypeScript', 'Tailwind CSS'],
    size: 'small',
    image: '/images/projects/github-home.svg',
    cta: '查看项目',
    ctaHref: 'https://github.com/firerlAGI/githubhome'
  },
  {
    id: 'ai-assistant',
    icon: '🤖',
    title: 'AI 助手',
    description: '智能对话助手，支持多轮对话、上下文理解，提供个性化的建议和帮助。',
    techBadges: ['LLM', 'Python', 'FastAPI'],
    size: 'small',
    image: '/images/projects/ai-assistant.svg',
    cta: '查看项目',
    ctaHref: '#',
    note: '项目开发中'
  },
  {
    id: 'data-viz',
    icon: '📊',
    title: '数据可视化',
    description: '交互式数据可视化工具，支持多种图表类型，实时数据更新和导出功能。',
    techBadges: ['D3.js', 'React', 'TypeScript'],
    size: 'small',
    image: '/images/projects/data-viz.svg',
    cta: '查看项目',
    ctaHref: '#',
    note: '项目规划中'
  },
  {
    id: 'task-manager',
    icon: '✅',
    title: '任务管理器',
    description: '高效的任务管理工具，支持拖拽排序、标签分类、团队协作等功能。',
    techBadges: ['Vue.js', 'Node.js', 'MongoDB'],
    size: 'small',
    image: '/images/projects/task-manager.svg',
    cta: '查看项目',
    ctaHref: '#',
    note: '项目规划中'
  }
]
