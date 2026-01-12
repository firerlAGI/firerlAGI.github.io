import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const username = 'firerlAGI'
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN

  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    }

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`
    }

    // 获取用户基本信息
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    })

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`)
    }

    const userData = await userResponse.json()

    // 获取仓库列表
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      { headers }
    )

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`)
    }

    const reposData = await reposResponse.json()

    // 获取最近的活动
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      { headers }
    )

    let eventsData = []
    if (eventsResponse.ok) {
      eventsData = await eventsResponse.json()
    }

    // 计算总 star 和 fork 数
    const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
    const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0)

    const stats = {
      repositories: userData.public_repos,
      stars: totalStars,
      forks: totalForks,
      followers: userData.followers,
      following: userData.following,
      recentActivity: eventsData.map((event: any) => ({
        type: event.type,
        repo: event.repo?.name,
        created_at: event.created_at,
        payload: {
          action: event.payload?.action,
          ref: event.payload?.ref,
          ref_type: event.payload?.ref_type,
        },
      })),
    }

    // 添加缓存头
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=600', // 缓存 5-10 分钟
      },
    })
  } catch (error) {
    console.error('GitHub API error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch GitHub stats' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
