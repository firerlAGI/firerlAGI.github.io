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
]
