import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface GithubStats {
  repositories: number;
  stars: number;
  forks: number;
  followers: number;
  following: number;
  recentActivity?: Array<{
    type: string;
    repo: string;
    created_at: string;
  }>;
}

interface GithubContentProps {
  stats: GithubStats;
}

const GithubContent: React.FC<GithubContentProps> = ({ stats }) => {
  const { t, language } = useLanguage();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getActivityText = (type: string, repo: string) => {
    const repoName = repo?.split('/')[1] || repo;
    const textsEn: Record<string, string> = {
      PushEvent: `Pushed to ${repoName}`,
      CreateEvent: `Created ${repoName}`,
      DeleteEvent: `Deleted ${repoName}`,
      WatchEvent: `Starred ${repoName}`,
      ForkEvent: `Forked ${repoName}`,
      IssuesEvent: `Created issue in ${repoName}`,
      IssueCommentEvent: `Commented on issue in ${repoName}`,
      PullRequestEvent: `Opened PR in ${repoName}`,
      ReleaseEvent: `Released ${repoName}`,
    };
    const textsZh: Record<string, string> = {
      PushEvent: `推送到 ${repoName}`,
      CreateEvent: `创建了 ${repoName}`,
      DeleteEvent: `删除了 ${repoName}`,
      WatchEvent: `Star 了 ${repoName}`,
      ForkEvent: `Fork 了 ${repoName}`,
      IssuesEvent: `在 ${repoName} 创建了 Issue`,
      IssueCommentEvent: `在 ${repoName} 评论了 Issue`,
      PullRequestEvent: `在 ${repoName} 提交了 PR`,
      ReleaseEvent: `发布了 ${repoName}`,
    };
    return language === 'zh' ? (textsZh[type] || `在 ${repoName} 进行了操作`) : (textsEn[type] || `Performed action on ${repoName}`);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return language === 'zh' ? '刚刚' : 'just now';
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return language === 'zh' ? `${mins} 分钟前` : `${mins} minute${mins > 1 ? 's' : ''} ago`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return language === 'zh' ? `${hours} 小时前` : `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return language === 'zh' ? `${days} 天前` : `${days} day${days > 1 ? 's' : ''} ago`;
    }
    return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US');
  };

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      PushEvent: '📝',
      CreateEvent: '✨',
      DeleteEvent: '🗑️',
      WatchEvent: '⭐',
      ForkEvent: '🔱',
      IssuesEvent: '❓',
      IssueCommentEvent: '💬',
      PullRequestEvent: '🔀',
      ReleaseEvent: '🎉',
    };
    return icons[type] || '📦';
  };

  return (
    <div>
      <h2 className="section-title">{t('github.title')}</h2>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <span className="stat-value">{stats.repositories}</span>
          <span className="stat-label">{t('github.repos')}</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <span className="stat-value">{formatNumber(stats.stars)}</span>
          <span className="stat-label">{t('github.stars')}</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <span className="stat-value">{formatNumber(stats.forks)}</span>
          <span className="stat-label">{t('github.forks')}</span>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <span className="stat-value">{stats.followers}</span>
          <span className="stat-label">{t('github.followers')}</span>
        </div>
      </div>
      
      {stats.recentActivity && stats.recentActivity.length > 0 && (
        <div className="activity-section">
          <h3 className="activity-title">{t('github.recent')}</h3>
          <div className="activity-list">
            {stats.recentActivity.slice(0, 5).map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-type">{getActivityIcon(activity.type)}</span>
                <div className="activity-content">
                  <span className="activity-text">
                    {getActivityText(activity.type, activity.repo)}
                  </span>
                  <span className="activity-time">
                    {formatTime(activity.created_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="github-links">
        <a href="https://github.com/firerlAGI" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          {t('github.visit')}
        </a>
      </div>
    </div>
  );
};

export default GithubContent;
