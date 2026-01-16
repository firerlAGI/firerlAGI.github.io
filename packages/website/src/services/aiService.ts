import OpenAI from "openai";

// 用户档案数据 - 让 AI 认识作者
const USER_PROFILE = {
  name: "Firerlagi",
  role: "全栈工程师 (Full Stack Engineer)",
  location: "霓虹城，第七区 (Neon City, Sector 7)",
  description: "一位充满激情的开发者，致力于将未来主义美学与实用代码相结合。专注于现代 Web 技术和赛博朋克风格。",
  skills: [
    "Frontend: React, Vue.js, Astro, Tailwind CSS, D3.js",
    "Backend: Node.js, Python, FastAPI, MongoDB",
    "AI/ML: LLM Integration, Knowledge Graphs, NLP"
  ],
  projects: [
    { name: "Second Brain", desc: "AI 驱动的个人知识管理系统" },
    { name: "GitHub Home", desc: "赛博朋克风格的个人作品集网站" },
    { name: "AI Assistant", desc: "智能对话助手 (就是我!)" },
    { name: "Data Visualization", desc: "交互式数据可视化工具" }
  ],
  contact: "接受自由职业合同与机密任务 (Available for freelance)"
};

const SYSTEM_PROMPT = `
You are a futuristic AI assistant for '${USER_PROFILE.name}', a ${USER_PROFILE.role}.
Your tone is cyberpunk, slightly robotic but helpful, using brief, tech-heavy metaphors.
Keep responses under 100 words.
Always respond in the same language as the user.

Here is the data about the creator you are representing:
- **Identity**: ${USER_PROFILE.name}, ${USER_PROFILE.role} based in ${USER_PROFILE.location}.
- **Bio**: ${USER_PROFILE.description}
- **Tech Stack**: ${USER_PROFILE.skills.join("; ")}
- **Key Projects**: ${USER_PROFILE.projects.map(p => `${p.name} (${p.desc})`).join("; ")}
- **Status**: ${USER_PROFILE.contact}

If asked about yourself, identify as FIRERLAGI_BOT v2.0.
If asked about skills or projects, reference the data above.
`;

const getAiResponse = async (prompt: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.PUBLIC_DEEPSEEK_API_KEY || import.meta.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      // 模拟 AI 响应，提供更好的用户体验
      console.warn("PUBLIC_DEEPSEEK_API_KEY not found in environment. Using simulation mode.");
      return getSimulatedResponse(prompt);
    }

    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: apiKey,
      dangerouslyAllowBrowser: true 
    });

    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return response.choices[0].message.content || "DATA CORRUPTION. RETRY.";
  } catch (error) {
    console.error("Deepseek API Error:", error);
    // API 调用失败时，返回模拟响应
    return getSimulatedResponse(prompt);
  }
};

// 模拟 AI 响应，用于没有 API Key 或 API 调用失败的情况
const getSimulatedResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  // 简单的关键词匹配
  if (lowerPrompt.includes('你好') || lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
    return "GREETINGS, USER. SYSTEM READY. HOW CAN I ASSIST YOU TODAY?";
  }
  
  if (lowerPrompt.includes('技能') || lowerPrompt.includes('skill') || lowerPrompt.includes('tech')) {
    return "STACK DETECTED: React, TypeScript, Astro, Node.js. OPTIMIZATION LEVEL: MAX. READY TO DEPLOY.";
  }
  
  if (lowerPrompt.includes('项目') || lowerPrompt.includes('project') || lowerPrompt.includes('work')) {
    return "PROJECT DATABASE LOADED. 5 MODULES DEPLOYED. CHECK DEPLOYED SECTIONS FOR DETAILS.";
  }
  
  if (lowerPrompt.includes('联系') || lowerPrompt.includes('contact') || lowerPrompt.includes('email')) {
    return "UPLINK CHANNELS ACTIVE. CHECK CONTACT SECTION FOR FREQUENCIES. TRANSMISSION AWAITING.";
  }
  
  if (lowerPrompt.includes('github') || lowerPrompt.includes('仓库')) {
    return "GITHUB_MAINNET CONNECTED. STATS SYNCED. FORK/STAR EVENTS LOGGED.";
  }
  
  // 默认响应
  return "SIMULATION MODE ACTIVE. API KEY NOT CONFIGURED. RESPONSES ARE PRE-PROGRAMMED. FOR FULL AI CAPABILITIES, PLEASE CONFIGURE DEEPSEEK_API_KEY.";
};

export { getAiResponse };
