#!/usr/bin/env node

/**
 * Enhanced GitHub Stats Fetcher
 * Fetches comprehensive GitHub data for deep integration
 * - User profile & stats
 * - Repository list (sorted by stars)
 * - Top languages statistics
 * - Recent activity
 * - Contribution heatmap data
 */

const https = require('https');

const USERNAME = 'firerlAGI';
const OUTPUT_STATS_FILE = './public/github-stats.json';
const OUTPUT_REPOS_FILE = './public/github-repos.json';
const OUTPUT_CONTRIBS_FILE = './public/github-contributions.json';
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

function fetchWithGraphQL(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, variables });
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'firerlAGI-portfolio',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }

    const options = {
      hostname: 'api.github.com',
      path: '/graphql',
      method: 'POST',
      headers,
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          if (result.errors) {
            reject(new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`));
          } else {
            resolve(result.data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('🔗 Fetching comprehensive GitHub data for', USERNAME);

  try {
    // 1. Fetch basic user data
    const userData = await fetch(`https://api.github.com/users/${USERNAME}`);
    console.log('✓ User profile fetched');

    // 2. Fetch all repositories
    const reposData = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated&type=all`
    );
    console.log(`✓ Fetched ${reposData.length} repositories`);

    // 3. Fetch recent events
    const eventsData = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=30`
    );
    console.log(`✓ Fetched ${eventsData.length} recent events`);

    // 4. Try GraphQL for contributions (more accurate)
    let contributionData = null;
    try {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      const fromDate = ninetyDaysAgo.toISOString().split('T')[0];

      contributionData = await fetchWithGraphQL(`
        query($username: String!, $from: DateTime!) {
          user(login: $username) {
            contributionsCollection(from: $from) {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
              commitContributionsByRepository(maxRepositories: 10) {
                contributions {
                  repository {
                    name
                    url
                  }
                }
              }
            }
            repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
              nodes {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                isArchived
                isFork
                updatedAt
                createdAt
                licenseInfo {
                  name
                }
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(first: 1) {
                        edges {
                          node {
                            authoredDate
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            repositoryOwner {
              ... on Organization {
                memberStatuses(first: 10) {
                  nodes {
                    login
                  }
                }
              }
            }
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on RepositoryInfo {
                  name
                  description
                  url
                  stargazerCount
                  forkCount
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
            topRepositories(orderBy: {field: PUSHED_AT, direction: DESC}, first: 5) {
              nodes {
                name
                url
                stargazerCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      `, {
        username: USERNAME,
        from: `${fromDate}T00:00:00Z`,
      });

      console.log('✓ GraphQL data fetched successfully');
    } catch (graphqlError) {
      console.warn('⚠ GraphQL failed, falling back to REST API:', graphqlError.message);
    }

    // 5. Fallback: REST API for contributions
    if (!contributionData) {
      try {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        const fromDate = ninetyDaysAgo.toISOString().split('T')[0];

        const restContribs = await fetch(
          `https://api.github.com/search/commits?q=author:${USERNAME}+author-date:>${fromDate}&per_page=100`
        );

        console.log(`✓ REST fallback: ${restContribs.total_count || restContribs.items?.length || 0} contributions`);
      } catch (e) {
        console.warn('⚠ REST API also failed:', e.message);
      }
    }

    // ========== PROCESS DATA ==========

    // Calculate basic stats
    const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

    // Filter out forks and archived repos for main list
    const ownRepos = reposData.filter(repo => !repo.fork && !repo.archived);

    // Sort repositories by stars (descending)
    const sortedRepos = [...ownRepos].sort((a, b) => b.stargazers_count - a.stargazers_count);

    // Process repository list for display
    const repoList = sortedRepos.slice(0, 12).map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || '',
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      languageColor: getLanguageColor(repo.language),
      isFork: repo.fork,
      isArchived: repo.archived,
      updatedAt: repo.updated_at,
      createdAt: repo.created_at,
      topics: repo.topics || [],
      license: repo.license?.name || null,
      size: repo.size,
    }));

    // Calculate top languages from all repos
    const languageStats = {};
    reposData.forEach(repo => {
      if (repo.language && !repo.fork) {
        if (!languageStats[repo.language]) {
          languageStats[repo.language] = {
            name: repo.language,
            color: getLanguageColor(repo.language),
            repos: 0,
            bytes: 0,
          };
        }
        languageStats[repo.language].repos++;
        languageStats[repo.language].bytes += repo.size || 0;
      }
    });

    const topLanguages = Object.values(languageStats)
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 8);

    // Get pinned repos (from GraphQL or fallback to top starred)
    let pinnedRepos = [];
    if (contributionData?.user?.pinnedItems?.nodes) {
      pinnedRepos = contributionData.user.pinnedItems.nodes.map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name,
        languageColor: repo.primaryLanguage?.color,
      }));
    } else {
      // Fallback: use top 6 starred repos
      pinnedRepos = repoList.slice(0, 6).map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        stars: repo.stars,
        forks: repo.forks,
        language: repo.language,
        languageColor: repo.languageColor,
      }));
    }

    // Process recent activity with more details
    const recentActivity = eventsData.slice(0, 15).map(event => ({
      type: event.type,
      repo: event.repo?.name,
      repoUrl: event.repo ? `https://github.com/${event.repo.name}` : null,
      createdAt: event.created_at,
      payload: {
        action: event.payload?.action,
        ref: event.payload?.ref,
        ref_type: event.payload?.ref_type,
        issue: event.payload?.issue ? {
          number: event.payload.issue.number,
          title: event.payload.issue.title,
          url: event.payload.issue.html_url,
        } : null,
        pull_request: event.payload?.pull_request ? {
          number: event.payload.pull_request.number,
          title: event.payload.pull_request.title,
          url: event.payload.pull_request.html_url,
        } : null,
        release: event.payload?.release ? {
          tag_name: event.payload.release.tag_name,
          name: event.payload.release.name,
          url: event.payload.release.html_url,
        } : null,
      },
    }));

    // Generate contribution calendar data
    let contributionCalendar = {};
    let totalContribs = 0;
    let activeDays = 0;

    if (contributionData?.user?.contributionsCollection?.contributionCalendar) {
      const cal = contributionData.user.contributionsCollection.contributionCalendar;
      totalContribs = cal.totalContributions;

      cal.weeks.forEach(week => {
        week.contributionDays.forEach(day => {
          const dateStr = day.date.split('T')[0];
          contributionCalendar[dateStr] = day.contributionCount;
        });
      });
    } else {
      // Fallback: initialize with zeros
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 90);

      for (let i = 0; i < 90; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        contributionCalendar[dateStr] = 0;
      }
    }

    // Generate activity array for heatmap
    const activityData = [];
    const sortedDates = Object.keys(contributionCalendar).sort();

    sortedDates.forEach(date => {
      const count = contributionCalendar[date];
      const level = count === 0 ? 0 : Math.min(4, Math.ceil(count / 3));

      activityData.push({
        date,
        count,
        level,
      });

      if (count > 0) activeDays++;
    });

    // ========== BUILD OUTPUT FILES ==========

    // File 1: Basic Stats (enhanced)
    const stats = {
      user: {
        login: userData.login,
        name: userData.name || userData.login,
        avatarUrl: userData.avatar_url,
        bio: userData.bio,
        location: userData.location,
        company: userData.company,
        blog: userData.blog,
        twitterUsername: userData.twitter_username,
        joinedAt: userData.created_at,
      },
      stats: {
        repositories: userData.public_repos,
        stars: totalStars,
        forks: totalForks,
        followers: userData.followers,
        following: userData.following,
      },
      recentActivity,
      topLanguages,
      pinnedRepos: pinnedRepos.slice(0, 6),
      updatedAt: new Date().toISOString(),
    };

    // File 2: Full Repository List
    const reposOutput = {
      total: repoList.length,
      repositories: repoList,
      topLanguages,
      updatedAt: new Date().toISOString(),
    };

    // File 3: Contribution Data
    const contribsOutput = {
      data: activityData,
      stats: {
        contribs: totalContribs,
        days: activeDays,
        loc: totalContribs * 25,
      },
      updatedAt: new Date().toISOString(),
    };

    // Write files
    const fs = require('fs');
    const path = require('path');

    fs.writeFileSync(
      path.join(process.cwd(), OUTPUT_STATS_FILE),
      JSON.stringify(stats, null, 2)
    );
    console.log('✅ Stats saved to', OUTPUT_STATS_FILE);

    fs.writeFileSync(
      path.join(process.cwd(), OUTPUT_REPOS_FILE),
      JSON.stringify(reposOutput, null, 2)
    );
    console.log('✅ Repos saved to', OUTPUT_REPOS_FILE);

    fs.writeFileSync(
      path.join(process.cwd(), OUTPUT_CONTRIBS_FILE),
      JSON.stringify(contribsOutput, null, 2)
    );
    console.log('✅ Contributions saved to', OUTPUT_CONTRIBS_FILE);

    // Print summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 GITHUB DATA SUMMARY');
    console.log('='.repeat(50));
    console.log(`\n👤 User: ${userData.name || userData.login}`);
    console.log(`   Bio: ${userData.bio || 'N/A'}`);
    console.log(`   Location: ${userData.location || 'N/A'}`);
    console.log(`\n📈 Statistics:`);
    console.log(`   • Repositories: ${userData.public_repos}`);
    console.log(`   • Total Stars: ${totalStars}`);
    console.log(`   • Total Forks: ${totalForks}`);
    console.log(`   • Followers: ${userData.followers}`);
    console.log(`\n💻 Top Repositories (by ⭐):`);
    repoList.slice(0, 5).forEach((repo, i) => {
      console.log(`   ${i + 1}. ${repo.name} (${repo.stars}⭐ ${repo.forks}🍴) - ${repo.language || 'N/A'}`);
    });
    console.log(`\n🎨 Top Languages:`);
    topLanguages.slice(0, 5).forEach(lang => {
      console.log(`   • ${lang.name} (${lang.repos} repos)`);
    });
    console.log(`\n📅 90-Day Activity:`);
    console.log(`   • Total Contributions: ${totalContribs}`);
    console.log(`   • Active Days: ${activeDays}/${activityData.length}`);
    console.log(`\n📌 Pinned Repositories:`);
    pinnedRepos.forEach(repo => {
      console.log(`   • ${repo.name} (${repo.stars}⭐)`);
    });
    console.log('\n' + '='.repeat(50));

  } catch (error) {
    console.error('❌ Error fetching GitHub data:', error.message);
    process.exit(1);
  }
}

/**
 * Get color for programming language
 */
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#239120',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Ruby': '#701516',
    'PHP': '#4F5D95',
    'Swift': '#F05138',
    'Kotlin': '#A97BFF',
    'Dart': '#00B4AB',
    'Vue': '#41b883',
    'Astro': '#ff5d01',
    'HTML': '#e34c26',
    'CSS': '#563d7cf',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'Jupyter Notebook': '#DA5B0B',
    null: '#8b949e',
  };
  return colors[language] || '#8b949e';
}

main();
