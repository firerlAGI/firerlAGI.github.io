import React, { useEffect, useState } from 'react';
import CyberCard from './CyberCard';
import GlitchText from './GlitchText';
import { useLanguage } from '../contexts/LanguageContext';
import ActivityCalendar, { Activity } from 'react-activity-calendar';
import { Code, Calendar as CalendarIcon, GitCommit, Activity as ActivityIcon } from 'lucide-react';

const Skills: React.FC = () => {
  const { t } = useLanguage();
  const [data, setData] = useState<Activity[]>([]);
  const [stats, setStats] = useState({ loc: 0, days: 0, contribs: 0 });
  const [loading, setLoading] = useState(true);

  // Workaround for TypeScript error: JSX element type 'ActivityCalendar' does not have any construct or call signatures.
  const Calendar = ActivityCalendar as any;

  // Cyberpunk theme for the graph
  const theme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#0f172a', '#064e3b', '#059669', '#10b981', '#34d399'],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch real data (last year)
        const username = 'firerlagi';
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
        const json = await res.json();
        const contributions: Activity[] = json.contributions || [];

        // 1. Get the last ~90 days of REAL activity data (or mock if empty)
        // We take the end of the array to get the most recent data
        const recentActivity = contributions.slice(-90);

        // 2. Map this data to the future date range: 2026-01-01 to 2026-03-31
        // We create a new array for Q1 2026
        const startDate = new Date('2026-01-01');
        const q1Data: Activity[] = [];
        
        // Helper to format date as YYYY-MM-DD
        const formatDate = (d: Date) => d.toISOString().split('T')[0];

        let totalContribs = 0;
        let activeDays = 0;

        for (let i = 0; i < 90; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          
          // Use real count if available, otherwise 0
          // If the real data is shorter than 90 days, we might get undefined, handle that.
          const realDataPoint = recentActivity[i];
          const count = realDataPoint ? realDataPoint.count : 0;
          const level = realDataPoint ? realDataPoint.level : 0;

          q1Data.push({
            date: formatDate(currentDate),
            count: count,
            level: level as 0 | 1 | 2 | 3 | 4,
          });

          totalContribs += count;
          if (count > 0) activeDays++;
        }

        setData(q1Data);
        setStats({
          contribs: totalContribs,
          days: activeDays,
          // Estimate LOC: Avg 25 lines per commit/contribution for simulation
          loc: totalContribs * 25
        });
      } catch (error) {
        console.error("Failed to fetch github data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12">
        <GlitchText text={t.skills.title} as="h2" className="text-4xl md:text-5xl font-bold text-white mb-4" />
        <div className="h-1 w-24 bg-fuchsia-500" />
      </div>

      {/* Merged Dashboard CyberCard */}
      <CyberCard glowColor="cyan" className="p-0 overflow-hidden">
        
        {/* Dashboard Header */}
        <div className="bg-cyan-950/30 border-b border-cyan-500/30 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
             <ActivityIcon size={24} className="text-cyan-400 animate-pulse" />
             <h3 className="text-xl font-cyber text-cyan-100 tracking-widest">{t.skills.sync} // DASHBOARD</h3>
          </div>
          <div className="flex gap-4 text-xs font-mono text-cyan-600">
             <span className="px-2 py-1 bg-cyan-900/20 border border-cyan-800 rounded">SYS.STATUS: ONLINE</span>
             <span className="px-2 py-1 bg-cyan-900/20 border border-cyan-800 rounded">NET.LATENCY: 12ms</span>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 md:p-8">
            <div className="flex flex-col xl:flex-row gap-8">
                
                {/* Left: Heatmap Section (Takes more space) */}
                <div className="flex-grow xl:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <span className="font-mono text-sm text-fuchsia-400 flex items-center gap-2">
                           <GitCommit size={16} /> GITHUB_MAINNET
                        </span>
                        <span className="text-xs font-mono text-gray-500">{t.skills.quarter}</span>
                    </div>
                    
                    <div className="w-full overflow-x-auto pb-2 custom-scrollbar flex justify-center lg:justify-start">
                        {loading ? (
                            <div className="h-40 w-full flex flex-col items-center justify-center font-mono text-cyan-500/50">
                                <ActivityIcon className="animate-spin mb-2" />
                                LOADING DATA STREAM...
                            </div>
                        ) : (
                            <Calendar 
                                data={data}
                                theme={theme}
                                fontSize={14}
                                blockSize={14}
                                blockMargin={4}
                                blockRadius={2}
                                showWeekdayLabels
                                hideColorLegend={false}
                                labels={{
                                    legend: {
                                        less: 'OFFLINE',
                                        more: 'MAX_LOAD'
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Right: Stats Grid (Compact on desktop, row on mobile) */}
                <div className="xl:w-1/3 flex flex-col justify-between gap-4 border-t xl:border-t-0 xl:border-l border-cyan-900/50 pt-8 xl:pt-0 xl:pl-8">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-4 h-full">
                        {/* LOC Stat */}
                        <div className="bg-black/40 border border-fuchsia-500/20 p-4 rounded hover:bg-fuchsia-900/10 transition-colors group relative overflow-hidden">
                           <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
                               <Code size={16} className="text-fuchsia-400" />
                           </div>
                           <div className="text-3xl font-cyber text-white mb-1 group-hover:text-fuchsia-300 transition-colors">
                                {loading ? '...' : stats.loc.toLocaleString()}
                           </div>
                           <div className="text-[10px] font-mono text-fuchsia-500/70 tracking-widest uppercase">
                                {t.skills.loc}
                           </div>
                           <div className="absolute bottom-0 left-0 h-[2px] bg-fuchsia-500 w-0 group-hover:w-full transition-all duration-500" />
                        </div>

                        {/* Active Days Stat */}
                        <div className="bg-black/40 border border-cyan-500/20 p-4 rounded hover:bg-cyan-900/10 transition-colors group relative overflow-hidden">
                            <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
                               <CalendarIcon size={16} className="text-cyan-400" />
                           </div>
                           <div className="text-3xl font-cyber text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                {loading ? '...' : stats.days}
                           </div>
                           <div className="text-[10px] font-mono text-cyan-500/70 tracking-widest uppercase">
                                {t.skills.activeDays}
                           </div>
                           <div className="absolute bottom-0 left-0 h-[2px] bg-cyan-500 w-0 group-hover:w-full transition-all duration-500" />
                        </div>

                        {/* Contributions Stat */}
                        <div className="bg-black/40 border border-cyan-500/20 p-4 rounded hover:bg-cyan-900/10 transition-colors group relative overflow-hidden">
                            <div className="absolute right-2 top-2 opacity-20 group-hover:opacity-100 transition-opacity">
                               <GitCommit size={16} className="text-white" />
                           </div>
                           <div className="text-3xl font-cyber text-cyan-200 mb-1 group-hover:text-white transition-colors">
                                {loading ? '...' : stats.contribs.toLocaleString()}
                           </div>
                           <div className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">
                                {t.skills.contribs}
                           </div>
                           <div className="absolute bottom-0 left-0 h-[2px] bg-white w-0 group-hover:w-full transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Footer Detail */}
        <div className="bg-black/50 p-2 border-t border-cyan-900/50 flex justify-between items-center text-[10px] font-mono text-gray-600 px-6">
            <span>ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
            <span>SECURE_CONNECTION</span>
        </div>

      </CyberCard>
    </section>
  );
};

export default Skills;