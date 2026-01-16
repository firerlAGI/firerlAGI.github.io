import type { APIRoute } from 'astro'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionStats {
  loc: number
  days: number
  contribs: number
}

interface ContributionData {
  data: ContributionDay[]
  stats: ContributionStats
  updatedAt: string
  cached?: boolean
}

// Simple in-memory cache
let cachedData: ContributionData | null = null
let cacheTime: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchContributionsWithGraphQL(): Promise<ContributionData> {
  const username = 'firerlAGI'
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN

  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token required for GraphQL API')
  }

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
  }

  const now = new Date()
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(now.getFullYear() - 1)

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          totalCommitContributions
          restrictedContributionsCount
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: oneYearAgo.toISOString(),
        to: now.toISOString(),
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`GitHub GraphQL API error: ${response.status}`)
  }

  const result = await response.json()

  if (result.errors) {
    console.error('GraphQL errors:', result.errors)
    throw new Error(result.errors[0].message)
  }

  const user = result.data.user
  const weeks = user.contributionsCollection.contributionCalendar.weeks

  const contributionDays: ContributionDay[] = []
  let totalContribs = 0
  let activeDays = 0

  weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      const count = day.contributionCount
      let level: 0 | 1 | 2 | 3 | 4 = 0

      if (count >= 30) level = 4
      else if (count >= 20) level = 3
      else if (count >= 10) level = 2
      else if (count >= 1) level = 1

      contributionDays.push({
        date: day.date,
        count,
        level,
      })

      if (count > 0) {
        totalContribs += count
        activeDays++
      }
    })
  })

  const avgLinesPerCommit = 42
  const stats: ContributionStats = {
    loc: totalContribs * avgLinesPerCommit,
    days: activeDays,
    contribs: totalContribs,
  }

  return {
    data: contributionDays.slice(-90),
    stats,
    updatedAt: now.toISOString(),
  }
}

async function fetchContributionsWithREST(): Promise<ContributionData> {
  const username = 'firerlAGI'
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  }

  const now = new Date()
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(now.getDate() - 90)

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    { headers }
  )

  if (!response.ok) {
    throw new Error(`GitHub REST API error: ${response.status}`)
  }

  const repos = await response.json()
  const contributionsByDate: Record<string, number> = {}

  for (const repo of repos) {
    if (!repo.full_name || repo.private) continue

    try {
      const commitsResponse = await fetch(
        `https://api.github.com/repos/${repo.full_name}/commits?since=${ninetyDaysAgo.toISOString()}&per_page=50`,
        { headers }
      )

      if (!commitsResponse.ok) continue

      const commits = await commitsResponse.json()

      if (!Array.isArray(commits)) continue

      commits.forEach((commit: any) => {
        if (commit.commit?.author?.date) {
          const date = commit.commit.author.date.split('T')[0]
          contributionsByDate[date] = (contributionsByDate[date] || 0) + 1
        }
      })
    } catch (e) {
      console.warn(`Failed to fetch commits for ${repo.full_name}:`, e)
    }
  }

  const contributionDays: ContributionDay[] = []
  let totalContribs = 0
  let activeDays = 0

  for (let i = 0; i < 90; i++) {
    const date = new Date(ninetyDaysAgo)
    date.setDate(ninetyDaysAgo.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]

    const count = contributionsByDate[dateStr] || 0
    let level: 0 | 1 | 2 | 3 | 4 = 0

    if (count >= 8) level = 4
    else if (count >= 5) level = 3
    else if (count >= 3) level = 2
    else if (count >= 1) level = 1

    contributionDays.push({
      date: dateStr,
      count,
      level,
    })

    if (count > 0) {
      totalContribs += count
      activeDays++
    }
  }

  const avgLinesPerCommit = 42
  const stats: ContributionStats = {
    loc: totalContribs * avgLinesPerCommit,
    days: activeDays,
    contribs: totalContribs,
  }

  return {
    data: contributionDays,
    stats,
    updatedAt: now.toISOString(),
  }
}

export const GET: APIRoute = async () => {
  try {
    const now = Date.now()
    
    // Check cache
    if (cachedData && (now - cacheTime) < CACHE_DURATION) {
      console.log('Returning cached data')
      return new Response(JSON.stringify({ ...cachedData, cached: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=600, s-maxage=1800',
        },
      })
    }

    const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN

    let data: ContributionData

    if (GITHUB_TOKEN) {
      try {
        data = await fetchContributionsWithGraphQL()
      } catch (graphqlError) {
        console.warn('GraphQL API failed, falling back to REST API:', graphqlError)
        data = await fetchContributionsWithREST()
      }
    } else {
      console.log('No GitHub token, using REST API (limited data)')
      data = await fetchContributionsWithREST()
    }

    // Update cache
    cachedData = data
    cacheTime = now

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=600, s-maxage=1800',
      },
    })
  } catch (error) {
    console.error('GitHub contributions API error:', error)

    // Return cached data if available on error
    if (cachedData) {
      console.log('API error, returning cached data')
      return new Response(JSON.stringify({ ...cachedData, cached: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new Response(
      JSON.stringify({ error: 'Failed to fetch GitHub contributions' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
