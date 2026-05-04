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
        0: 'rgba(255, 255, 255, 0.05)',
        1: 'rgba(255, 255, 255, 0.2)',
        2: 'rgba(255, 255, 255, 0.4)',
        3: 'rgba(255, 255, 255, 0.6)',
        4: 'rgba(255, 255, 255, 0.9)',
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
        <h2 className="text-4xl md:text-5xl font-bold text-[#f5f5f7] mb-4">
          {t('skills.title')}
        </h2>
      </div>

      <div className="bg-[#1d1d1f] border border-white/5 p-0 overflow-hidden rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="bg-white/[0.02] border-b border-white/5 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <ActivityIcon size={20} className="text-slate-300" />
            <h3 className="text-[1.1rem] font-sans font-semibold tracking-tight text-[#f5f5f7]">
              {t('skills.sync')} // DASHBOARD
            </h3>
          </div>
          <div className="flex gap-4 text-xs font-mono text-slate-500">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
              {t('skills.status')}
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full uppercase tracking-wider">
              {t('skills.latency')}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-grow xl:w-2/3">
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[11px] text-slate-400 flex items-center gap-2 uppercase tracking-[0.12em]">
                  <GitCommit size={14} /> {t('skills.github')}
                </span>
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-[0.12em]">
                  {t('skills.quarter')}
                </span>
              </div>
              
              <div className="w-full overflow-x-auto pb-3 custom-scrollbar">
                {loading ? (
                  <div className="h-40 w-full flex flex-col items-center justify-center font-mono text-[11px] text-slate-500 uppercase tracking-[0.16em]">
                    <ActivityIcon className="animate-spin mb-3 text-slate-400" size={20} />
                    LOADING DATA STREAM...
                  </div>
                ) : (
                  <div className="activity-calendar" id="activity-calendar"></div>
                )}
              </div>
            </div>

            <div className="xl:w-1/3 flex flex-col justify-between gap-4 border-t xl:border-t-0 xl:border-l border-white/5 pt-8 xl:pt-0 xl:pl-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 h-full">
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
                  <div className="absolute right-4 top-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    <Code size={16} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
                  </div>
                  <div className="text-3xl font-sans font-semibold text-[#f5f5f7] mb-1">
                    {loading ? '...' : stats.loc.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 tracking-[0.12em] uppercase">
                    {t('skills.loc')}
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
                  <div className="absolute right-4 top-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    <CalendarIcon size={16} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
                  </div>
                  <div className="text-3xl font-sans font-semibold text-[#f5f5f7] mb-1">
                    {loading ? '...' : stats.days}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 tracking-[0.12em] uppercase">
                    {t('skills.activeDays')}
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl hover:bg-white/[0.04] transition-colors group relative overflow-hidden">
                  <div className="absolute right-4 top-4 opacity-30 group-hover:opacity-100 transition-opacity">
                    <GitCommit size={16} className="text-slate-400 group-hover:text-slate-200 transition-colors" />
                  </div>
                  <div className="text-3xl font-sans font-semibold text-[#f5f5f7] mb-1">
                    {loading ? '...' : stats.contribs.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 tracking-[0.12em] uppercase">
                    {t('skills.contribs')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-black/20 p-3 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-500 px-6 uppercase tracking-widest">
          <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
          <span>{t('skills.secure')}</span>
        </div>
      </div>
    </div>
  );
};

export default SkillsContent;
