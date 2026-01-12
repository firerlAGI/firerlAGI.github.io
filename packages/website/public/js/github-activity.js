const CACHE_KEY = 'github_activity_firerlAGI';
const DEFAULT_CACHE_DURATION = 10 * 60 * 1000;
const CACHE_DURATION = parseInt(localStorage.getItem('cache_duration')) || DEFAULT_CACHE_DURATION;
const MAX_EVENTS = 20;
const DISPLAY_LIMIT = 15;
const REQUEST_TIMEOUT = 10000;
const MAX_CACHE_SIZE = 50000;

const MONTHS_TO_DISPLAY = 12;

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

const MOBILE_BREAKPOINT = 768;
const ANIMATION_FRAME_MS = 16;
const ANIMATION_DURATION_MS = 1000;
const CONTRIBUTION_LEVEL_LOW = 3;
const CONTRIBUTION_LEVEL_MEDIUM = 9;

const storage = (function() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return localStorage;
  } catch (e) {
    console.warn('localStorage不可用，使用内存缓存');
    return {
      _cache: {},
      getItem: function(key) {
        return this._cache[key];
      },
      setItem: function(key, value) {
        this._cache[key] = value;
      },
      removeItem: function(key) {
        delete this._cache[key];
      }
    };
  }
})();

function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new Error('请求超时，请检查网络连接'));
    }, timeout);

    fetch(url, {
      ...options,
      signal: controller.signal
    })
      .then(response => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          reject(new Error('请求超时，请检查网络连接'));
        } else {
          reject(error);
        }
      });
  });
}

async function fetchGitHubActivity() {
  try {
    const cached = getCachedData();
    if (cached) return cached;

    const response = await fetchWithTimeout(
      `https://api.github.com/users/firerlAGI/events?per_page=${MAX_EVENTS}`,
      {},
      REQUEST_TIMEOUT
    );
    
    if (response.status === 429) {
      throw new Error('请求过于频繁，请10分钟后再试');
    }
    
    if (response.status === 403) {
      throw new Error('访问受限，请检查网络连接');
    }
    
    if (!response.ok) {
      const errorMessage = response.status >= 500 
        ? 'GitHub服务暂时不可用，请稍后再试'
        : `请求失败 (${response.status})`;
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('返回数据格式异常');
    }
    
    setCachedData(data);
    return data;
  } catch (error) {
    console.error('获取GitHub活动失败:', error);
    
    if (error.message.includes('超时')) {
      throw new Error('网络连接超时，请检查您的网络设置');
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('无法连接到 GitHub，请检查网络连接');
    }
    
    throw error;
  }
}

function getCachedData() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_DURATION) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  
  return data;
}

function setCachedData(data) {
  try {
    const cacheString = JSON.stringify({
      data,
      timestamp: Date.now()
    });
    
    if (cacheString.length > MAX_CACHE_SIZE) {
      console.warn('缓存数据过大，跳过缓存');
      return;
    }
    
    localStorage.setItem(CACHE_KEY, cacheString);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.warn('localStorage 空间不足，跳过缓存');
    } else {
      console.error('设置缓存失败:', error);
    }
  }
}

function calculateStats(activities) {
  if (!Array.isArray(activities)) {
    console.warn('activities不是数组');
    return { commits: 0, repos: 0, stars: 0 };
  }
  
  const stats = {
    commits: 0,
    repos: new Set(),
    stars: 0
  };
  
  activities.forEach(activity => {
    if (!activity || !activity.type) return;
    
    try {
      if (activity.type === 'PushEvent' && Array.isArray(activity.payload?.commits)) {
        stats.commits += activity.payload.commits.length;
      }
      if (activity.repo?.name) {
        stats.repos.add(activity.repo.name);
      }
      if (activity.type === 'WatchEvent') {
        stats.stars++;
      }
    } catch (e) {
      console.warn('计算统计数据时出错:', e, activity);
    }
  });
  
  return {
    commits: stats.commits,
    repos: stats.repos.size,
    stars: stats.stars
  };
}

function renderActivities(activities) {
  const container = document.getElementById('github-activities');
  if (!container) {
    console.error('找不到github-activities容器');
    return;
  }
  
  const fragment = document.createDocumentFragment();
  
  activities.slice(0, DISPLAY_LIMIT).forEach(activity => {
    const item = createActivityItem(activity);
    fragment.appendChild(item);
  });
  
  container.innerHTML = '';
  container.appendChild(fragment);
}

function createActivityItem(activity) {
  const div = document.createElement('div');
  div.className = 'activity-item';
  
  const icon = getActivityIcon(activity.type);
  const title = escapeHtml(getActivityTitle(activity));
  const time = escapeHtml(formatTime(activity.created_at));
  
  div.innerHTML = `
    <div class="activity-icon">${icon}</div>
    <div class="activity-content">
      <div class="activity-title">${title}</div>
      <div class="activity-time">${time}</div>
    </div>
  `;
  
  return div;
}

function getActivityIcon(type) {
  const icons = {
    'PushEvent': '📝',
    'CreateEvent': '➕',
    'WatchEvent': '⭐',
    'ForkEvent': '🍴',
    'IssuesEvent': '🐛',
    'IssueCommentEvent': '💬',
    'PullRequestEvent': '🔀',
    'DeleteEvent': '🗑️',
    'ReleaseEvent': '🎉'
  };
  return icons[type] || '📌';
}

function getActivityTitle(activity) {
  const repoName = activity.repo?.name || '未知仓库';
  
  switch (activity.type) {
    case 'PushEvent':
      const commits = activity.payload.commits?.length || 1;
      return `向 ${repoName} 提交了 ${commits} 次代码`;
    case 'CreateEvent':
      return `创建了 ${repoName}`;
    case 'WatchEvent':
      return `关注了 ${repoName}`;
    case 'ForkEvent':
      return `Fork了 ${repoName}`;
    case 'IssuesEvent':
      return `在 ${repoName} 创建了 Issue`;
    case 'IssueCommentEvent':
      return `在 ${repoName} 评论了 Issue`;
    case 'PullRequestEvent':
      return `在 ${repoName} 创建了 Pull Request`;
    case 'DeleteEvent':
      return `删除了 ${repoName}`;
    case 'ReleaseEvent':
      return `在 ${repoName} 发布了版本`;
    default:
      return `在 ${repoName} 进行了活动`;
  }
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  return date.toLocaleDateString('zh-CN');
}

function showLoading() {
  const container = document.getElementById('github-activities');
  if (!container) {
    console.error('找不到github-activities容器');
    return;
  }
  container.innerHTML = '<div class="loading">加载中...</div>';
}

function showError(message) {
  const container = document.getElementById('github-activities');
  if (!container) {
    console.error('找不到github-activities容器');
    return;
  }
  const escapedMessage = escapeHtml(message);
  container.innerHTML = `
    <div class="error">
      <div class="error-icon">⚠️</div>
      <div class="error-message">${escapedMessage}</div>
      <button class="retry-button" onclick="retryFetch()">重试</button>
    </div>
  `;
}

function retryFetch() {
  storage.removeItem(CACHE_KEY);
  showLoading();
  fetchGitHubActivity()
    .then(activities => {
      if (!activities || activities.length === 0) {
        showEmpty();
        return;
      }
      renderStats(activities);
      renderActivities(activities);
    })
    .catch(error => {
      showError(error.message);
    });
}

function showEmpty(type = 'default') {
  const container = document.getElementById('github-activities');
  if (!container) {
    console.error('找不到github-activities容器');
    return;
  }
  
  const emptyMessages = {
    'default': '暂无活动数据',
    'filtered': '该类型暂无活动数据',
    'loading': '正在加载...',
    'error': '加载失败'
  };
  
  const message = emptyMessages[type] || emptyMessages['default'];
  const escapedMessage = escapeHtml(message);
  container.innerHTML = `<div class="empty">${escapedMessage}</div>`;
}

function renderStats(activities) {
  const stats = calculateStats(activities);
  
  const statElements = {
    'stat-commits': stats.commits,
    'stat-repos': stats.repos,
    'stat-stars': stats.stars
  };
  
  Object.entries(statElements).forEach(([elementId, value]) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`找不到统计元素: ${elementId}`);
      return;
    }
    animateValue(elementId, 0, value, ANIMATION_DURATION_MS);
  });
}

function updateStats(activities) {
  const stats = calculateStats(activities);
  
  const statElements = {
    'stat-commits': stats.commits,
    'stat-repos': stats.repos,
    'stat-stars': stats.stars
  };
  
  Object.entries(statElements).forEach(([elementId, value]) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`找不到统计元素: ${elementId}`);
      return;
    }
    element.textContent = value;
  });
}

const animationTimers = {};
let isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

function animateValue(elementId, start, end, duration) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  if (animationTimers[elementId]) {
    clearInterval(animationTimers[elementId]);
  }
  
  const range = end - start;
  const increment = range / (duration / ANIMATION_FRAME_MS);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
      delete animationTimers[elementId];
    }
    element.textContent = Math.floor(current);
  }, ANIMATION_FRAME_MS);
  
  animationTimers[elementId] = timer;
}

function generateHeatmapData(activities) {
  const commitsByDate = {};
  
  activities.forEach(activity => {
    if (activity.type === 'PushEvent' && activity.payload?.commits) {
      const date = activity.created_at.split('T')[0];
      commitsByDate[date] = (commitsByDate[date] || 0) + activity.payload.commits.length;
    }
  });
  
  const monthlyHeatmaps = [];
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - (MONTHS_TO_DISPLAY - 1));
  startDate.setDate(1);
  
  for (let i = 0; i < MONTHS_TO_DISPLAY; i++) {
    const monthDate = new Date(startDate);
    monthDate.setMonth(startDate.getMonth() + i);
    
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const monthName = `${year}年${month + 1}月`;
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthData = {
      year,
      month,
      monthName,
      daysInMonth,
      firstDayOfWeek: new Date(year, month, 1).getDay(),
      dailyData: []
    };
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const commits = commitsByDate[dateStr] || 0;
      const level = getContributionLevel(commits);
      
      monthData.dailyData.push({
        day,
        date: dateStr,
        commits,
        level
      });
    }
    
    monthlyHeatmaps.push(monthData);
  }
  
  return monthlyHeatmaps;
}

function getContributionLevel(commits) {
  if (commits === 0) return 0;
  if (commits <= CONTRIBUTION_LEVEL_LOW) return 1;
  if (commits <= CONTRIBUTION_LEVEL_MEDIUM) return 2;
  return 3;
}

function renderHeatmap(monthlyHeatmaps) {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  monthlyHeatmaps.forEach((monthData) => {
    const monthCard = document.createElement('div');
    monthCard.className = 'heatmap-month-card';
    
    const monthTitle = document.createElement('div');
    monthTitle.className = 'heatmap-month-title';
    monthTitle.textContent = monthData.monthName;
    monthCard.appendChild(monthTitle);
    
    const monthGrid = document.createElement('div');
    monthGrid.className = 'heatmap-month-grid';
    
    const paddingDays = monthData.firstDayOfWeek === 0 ? 6 : monthData.firstDayOfWeek - 1;
    
    for (let i = 0; i < paddingDays; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'heatmap-cell empty';
      monthGrid.appendChild(emptyCell);
    }
    
    monthData.dailyData.forEach((dayData) => {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.dataset.date = dayData.date;
      cell.dataset.commits = dayData.commits;
      cell.dataset.level = dayData.level;
      cell.dataset.day = dayData.day;
      
      if (dayData.level > 0) {
        cell.classList.add(`level-${dayData.level}`);
      }
      
      monthGrid.appendChild(cell);
    });
    
    monthCard.appendChild(monthGrid);
    grid.appendChild(monthCard);
  });
}

function renderHeatmapLabels() {
  const labelsContainer = document.getElementById('heatmap-labels-weeks');
  if (!labelsContainer) return;
  
  labelsContainer.innerHTML = '';
}

function formatTooltipDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${days[date.getDay()]})`;
}

function showTooltip(cell) {
  const tooltip = document.getElementById('heatmap-tooltip');
  if (!tooltip || !cell.dataset.date) return;
  
  const date = formatTooltipDate(cell.dataset.date);
  const commits = cell.dataset.commits;
  
  const tooltipDate = tooltip.querySelector('.tooltip-date');
  const tooltipCommits = tooltip.querySelector('.tooltip-commits');
  
  if (tooltipDate) {
    tooltipDate.textContent = date;
  }
  if (tooltipCommits) {
    tooltipCommits.textContent = `贡献次数：${commits} 次提交`;
  }
  
  const cellRect = cell.getBoundingClientRect();
  const containerRect = cell.closest('.contribution-heatmap').getBoundingClientRect();
  
  const tooltipLeft = cellRect.left - containerRect.left + cellRect.width / 2;
  const tooltipTop = cellRect.top - containerRect.top;
  
  tooltip.style.left = `${tooltipLeft}px`;
  tooltip.style.top = `${tooltipTop}px`;
  tooltip.style.transform = 'translate(-50%, -8px)';
  tooltip.style.opacity = '1';
}

function hideTooltip() {
  const tooltip = document.getElementById('heatmap-tooltip');
  if (!tooltip) return;
  
  tooltip.style.opacity = '0';
  tooltip.style.transform = 'translate(-50%, 8px)';
}

let tooltipHandlersInstalled = false;

function cleanupTooltipHandlers() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid || !tooltipHandlersInstalled) return;
  tooltipHandlersInstalled = false;
}

function setupTooltipHandlers() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid || tooltipHandlersInstalled) return;
  
  grid.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('heatmap-cell') && !e.target.classList.contains('empty')) {
      showTooltip(e.target);
    }
  }, true);
  
  grid.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('heatmap-cell')) {
      hideTooltip();
    }
  }, true);
  
  grid.addEventListener('mousemove', function(e) {
    if (e.target.classList.contains('heatmap-cell') && !e.target.classList.contains('empty')) {
      showTooltip(e.target);
    }
  }, true);
  
  grid.addEventListener('click', function(e) {
    if (isMobile && e.target.classList.contains('heatmap-cell') && !e.target.classList.contains('empty')) {
      if (e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        hideTooltip();
      } else {
        document.querySelectorAll('.heatmap-cell.active').forEach(cell => {
          cell.classList.remove('active');
        });
        e.target.classList.add('active');
        showTooltip(e.target);
      }
    } else if (isMobile && !e.target.closest('.heatmap-cell')) {
      document.querySelectorAll('.heatmap-cell.active').forEach(cell => {
        cell.classList.remove('active');
      });
      hideTooltip();
    }
  }, true);
  
  tooltipHandlersInstalled = true;
}

window.addEventListener('resize', function() {
  const newIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
  }
});

function hideHeatmap() {
  const heatmap = document.getElementById('contribution-heatmap');
  if (!heatmap) {
    console.warn('找不到contribution-heatmap元素');
    return;
  }
  heatmap.style.display = 'none';
}

function showHeatmap() {
  const heatmap = document.getElementById('contribution-heatmap');
  if (!heatmap) {
    console.warn('找不到contribution-heatmap元素');
    return;
  }
  heatmap.style.display = 'block';
}

function clearStats() {
  const statElements = ['stat-commits', 'stat-repos', 'stat-stars'];
  
  statElements.forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = '0';
    }
  });
}

function handleFilterChange(e) {
  const filterType = e.target.value;
  const cachedData = getCachedData();
  
  if (!cachedData) return;
  
  const filtered = filterType === 'all' 
    ? cachedData 
    : cachedData.filter(activity => activity.type === filterType);
  
  if (filtered.length === 0) {
    showEmpty('filtered');
    hideHeatmap();
    clearStats();
  } else {
    renderActivities(filtered);
    updateStats(filtered);
    
    if (filterType === 'all' || filterType === 'PushEvent') {
      cleanupTooltipHandlers();
      const heatmapData = generateHeatmapData(filtered);
      renderHeatmap(heatmapData);
      setupTooltipHandlers();
      showHeatmap();
    } else {
      hideHeatmap();
    }
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const activitiesContainer = document.getElementById('github-activities');
  const filterSelect = document.getElementById('event-filter');
  
  if (!activitiesContainer || !filterSelect) return;
  
  try {
    showLoading();
    
    const activities = await fetchGitHubActivity();
    
    if (!activities || activities.length === 0) {
      showEmpty();
      return;
    }
    
    renderStats(activities);
    renderActivities(activities);
    
    const heatmapData = generateHeatmapData(activities);
    renderHeatmap(heatmapData);
    renderHeatmapLabels();
    setupTooltipHandlers();
    
  } catch (error) {
    showError(error.message);
  }
  
  filterSelect.addEventListener('change', handleFilterChange);
});

function cleanup() {
  Object.values(animationTimers).forEach(timer => clearInterval(timer));
}

window.addEventListener('beforeunload', cleanup);
