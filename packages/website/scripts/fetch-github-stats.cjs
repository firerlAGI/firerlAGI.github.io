#!/usr/bin/env node

/**
 * GitHub Stats Fetcher
 * Fetches GitHub user stats and generates a static JSON file for deployment
 */

const https = require('https');

const USERNAME = 'firerlAGI';
const OUTPUT_FILE = './public/github-stats.json';
const CONTRIBUTIONS_FILE = './public/github-contributions.json';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function fetch(url) {
  return new Promise((resolve, reject) => {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'firerlAGI-portfolio',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    https.get(url, { headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('📊 Fetching GitHub stats for', USERNAME);

  try {
    // Fetch user data
    const userData = await fetch(`https://api.github.com/users/${USERNAME}`);
    console.log('✓ User data fetched');

    // Fetch repos
    const reposData = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`
    );
    console.log(`✓ Fetched ${reposData.length} repositories`);

    // Fetch events
    const eventsData = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=30`
    );
    console.log(`✓ Fetched ${eventsData.length} recent events`);

    // Fetch contributions for the last 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const fromDate = ninetyDaysAgo.toISOString().split('T')[0];
    
    const contributionsData = await fetch(
      `https://api.github.com/search/commits?q=author:${USERNAME}+author-date:>${fromDate}&per_page=100`
    );
    console.log(`✓ Fetched ${contributionsData.total_count || contributionsData.items?.length || 0} contributions in the last 90 days`);

    // Calculate stats
    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

    const stats = {
      repositories: userData.public_repos,
      stars: totalStars,
      forks: totalForks,
      followers: userData.followers,
      following: userData.following,
      recentActivity: eventsData.map((event) => ({
        type: event.type,
        repo: event.repo?.name,
        created_at: event.created_at,
        payload: {
          action: event.payload?.action,
          ref: event.payload?.ref,
          ref_type: event.payload?.ref_type,
        },
      })),
      updatedAt: new Date().toISOString(),
    };

    // Process contributions data for heatmap
    const contributionCalendar = {};
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    
    // Initialize all days with 0
    for (let i = 0; i < 90; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      contributionCalendar[dateStr] = 0;
    }
    
    // Count contributions per day
    if (contributionsData.items) {
      contributionsData.items.forEach(commit => {
        const commitDate = commit.commit?.author?.date?.split('T')[0];
        if (commitDate && contributionCalendar.hasOwnProperty(commitDate)) {
          contributionCalendar[commitDate]++;
        }
      });
    }
    
    // Generate activity array for heatmap
    const activityData = [];
    let totalContribs = 0;
    let activeDays = 0;
    
    Object.keys(contributionCalendar).sort().forEach(date => {
      const count = contributionCalendar[date];
      const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 3));
      
      activityData.push({
        date,
        count,
        level
      });
      
      totalContribs += count;
      if (count > 0) activeDays++;
    });
    
    const contributionStats = {
      data: activityData,
      stats: {
        contribs: totalContribs,
        days: activeDays,
        loc: totalContribs * 25, // Estimate: average 25 lines per commit
      },
      updatedAt: new Date().toISOString()
    };

    // Write to files
    const fs = require('fs');
    const path = require('path');
    const outputPath = path.join(__dirname, OUTPUT_FILE);
    const contributionsPath = path.join(__dirname, CONTRIBUTIONS_FILE);
    
    fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
    console.log('✅ Stats saved to', OUTPUT_FILE);
    
    fs.writeFileSync(contributionsPath, JSON.stringify(contributionStats, null, 2));
    console.log('✅ Contributions saved to', CONTRIBUTIONS_FILE);
    
    console.log('\n📈 Summary:');
    console.log(`   - Repositories: ${stats.repositories}`);
    console.log(`   - Stars: ${stats.stars}`);
    console.log(`   - Forks: ${stats.forks}`);
    console.log(`   - Followers: ${stats.followers}`);
    console.log(`   - 90-day Contributions: ${contributionStats.stats.contribs}`);
    console.log(`   - Active Days: ${contributionStats.stats.days}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
