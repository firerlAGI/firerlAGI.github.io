import { GoogleGenAI } from "@google/genai";

const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // 模拟 AI 响应，提供更好的用户体验
      console.warn("GEMINI_API_KEY not found in environment. Using simulation mode.");
      return getSimulatedResponse(prompt);
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        systemInstruction: "You are a futuristic AI assistant for 'Firerlagi', a Senior Frontend Engineer. Your tone is cyberpunk, slightly robotic but helpful, using brief, tech-heavy metaphors. Keep responses under 50 words. Always respond in the same language as the user.",
      }
    });

    return response.text || "DATA CORRUPTION. RETRY.";
  } catch (error) {
    console.error("Gemini API Error:", error);
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
  return "SIMULATION MODE ACTIVE. API KEY NOT CONFIGURED. RESPONSES ARE PRE-PROGRAMMED. FOR FULL AI CAPABILITIES, PLEASE CONFIGURE GEMINI_API_KEY.";
};

export { getGeminiResponse };
