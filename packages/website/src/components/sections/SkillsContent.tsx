import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Activity as ActivityIcon, GitCommit, Code, Calendar as CalendarIcon } from 'lucide-react';

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface SkillsContentProps {
  data: Activity[];
  stats: {
    contribs: number;
    days: number;
    loc: number;
  };
}

const SkillsContent: React.FC<SkillsContentProps> = ({ data, stats }) => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calendarContainer = document.getElementById('activity-calendar');
    if (calendarContainer && data.length > 0) {
      const theme = {
        0: '#0f172a',
        1: '#064e3b',
        2: '#059669',
        3: '#10b981',
        4: '#34d399',
      };
      
      const weeks: any[][] = [];
      let currentWeek: any[] = [];
      let currentDayOfWeek = new Date(data[0].date).getDay();
      
      const startOffset = currentDayOfWeek;
      for (let i = 0; i < startOffset; i++) {
        currentWeek.push(null);
      }
      
      data.forEach((day) => {
        currentWeek.push(day);
        const dayOfWeek = new Date(day.date).getDay();
        if (dayOfWeek === 6) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      });
      
      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
      
      let calendarHTML = '<div class="activity-calendar-grid">';
      
      const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      calendarHTML += '<div class="activity-weekdays">';
      dayLabels.forEach(day => {
        calendarHTML += `<div class="activity-day-label">${day}</div>`;
      });
      calendarHTML += '</div>';
      
      calendarHTML += '<div class="activity-weeks">';
      weeks.forEach(week => {
        calendarHTML += '<div class="activity-week">';
        week.forEach(day => {
          if (day) {
            calendarHTML += `
              <div 
                class="activity-day level-${day.level}" 
                title="${day.date}: ${day.count} contributions"
                style="background-color: ${theme[day.level]}"
              ></div>
            `;
          } else {
            calendarHTML += '<div class="activity-day empty"></div>';
          }
        });
        calendarHTML += '</div>';
      });
      calendarHTML += '</div>';
      
      const offlineLabel = language === 'zh' ? '离线' : 'OFFLINE';
      const maxLoadLabel = language === 'zh' ? '最大负载' : 'MAX_LOAD';
      
      calendarHTML += `
        <div class="activity-legend">
          <span class="legend-label">${offlineLabel}</span>
          <div class="legend-colors">
            ${[0, 1, 2, 3, 4].map(level => `
              <div 
                class="legend-color" 
                style="background-color: ${theme[level]}"
              ></div>
            `).join('')}
          </div>
          <span class="legend-label">${maxLoadLabel}</span>
        </div>
      `;
      
      calendarHTML += '</div>';
      calendarContainer.innerHTML = calendarHTML;
    }
  }, [data, language]);

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t('skills.title')}
        </h2>
        <div className="h-1 w-24 bg-fuchsia-500" />
      </div>

      <div className="bg-black/40 border border-cyan-500/30 p-0 overflow-hidden rounded-lg">
        <div className="bg-cyan-950/30 border-b border-cyan-500/30 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <ActivityIcon size={24} className="text-cyan-400 animate-pulse" />
            <h3 className="text-xl font-cyber text-cyan-100 tracking-widest">
              {t('skills.sync')} // DASHBOARD
            </h3>
          </div>
          <div className="flex gap-4 text-xs font-mono text-cyan-600">
            <span className="px-2 py-1 bg-cyan-900/20 border border-cyan-800 rounded">
              {t('skills.status')}
            </span>
            <span className="px-2 py-1 bg-cyan-900/20 border border-cyan-800 rounded">
              {t('skills.latency')}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-grow xl:w-2/3">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-sm text-fuchsia-400 flex items-center gap-2">
                  <GitCommit size={16} /> {t('skills.github')}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  {t('skills.quarter')}
                </span>
              </div>
              
              <div className="w-full overflow-x-auto pb-2 custom-scrollbar flex justify-center lg:justify-start">
                {loading ? (
                  <div className="h-40 w-full flex flex-col items-center justify-center font-mono text-cyan-500/50">
                    <ActivityIcon className="animate-spin mb-2" />
                    LOADING DATA STREAM...
                  </div>
                ) : (
                  <div className="activity-calendar" id="activity-calendar"></div>
                )}
              </div>
            </div>

            <div className="xl:w-1/3 flex flex-col justify-between gap-4 border-t xl:border-t-0 xl:border-l border-cyan-900/50 pt-8 xl:pt-0 xl:pl-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 h-full">
                <div className="bg-black/40 border border-fuchsia-500/20 p-4 rounded hover:bg-fuchsia-900/10 transition-colors group relative overflow-hidden">
                  <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <Code size={16} className="text-fuchsia-400" />
                  </div>
                  <div className="text-3xl font-cyber text-white mb-1 group-hover:text-fuchsia-300 transition-colors">
                    {loading ? '...' : stats.loc.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-fuchsia-500/70 tracking-widest uppercase">
                    {t('skills.loc')}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-fuchsia-500 w-0 group-hover:w-full transition-all duration-500" />
                </div>

                <div className="bg-black/40 border border-cyan-500/20 p-4 rounded hover:bg-cyan-900/10 transition-colors group relative overflow-hidden">
                  <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <CalendarIcon size={16} className="text-cyan-400" />
                  </div>
                  <div className="text-3xl font-cyber text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {loading ? '...' : stats.days}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-500/70 tracking-widest uppercase">
                    {t('skills.activeDays')}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-500 w-0 group-hover:w-full transition-all duration-500" />
                </div>

                <div className="bg-black/40 border border-cyan-500/20 p-4 rounded hover:bg-cyan-900/10 transition-colors group relative overflow-hidden">
                  <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <GitCommit size={16} className="text-white" />
                  </div>
                  <div className="text-3xl font-cyber text-cyan-200 mb-1 group-hover:text-white transition-colors">
                    {loading ? '...' : stats.contribs.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                    {t('skills.contribs')}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-black/50 p-2 border-t border-cyan-900/50 flex justify-between items-center text-[10px] font-mono text-gray-600 px-6">
          <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          <span>{t('skills.secure')}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsContent;
