import { GoogleGenAI } from "@google/genai";

const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // In a real deployed environment, this is critical. 
      // For this static demo, we return a simulated response if no key is present to prevent crashing.
      console.warn("API_KEY not found in environment.");
      return "ACCESS DENIED. ENCRYPTION KEY MISSING. PLEASE CONFIGURE ENV VARIABLES.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a futuristic AI assistant for 'Firerlagi', a Senior Frontend Engineer. Your tone is cyberpunk, slightly robotic but helpful, using brief, tech-heavy metaphors. Keep responses under 50 words.",
      }
    });

    return response.text || "DATA CORRUPTION. RETRY.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM FAILURE. CONNECTION RESET.";
  }
};

export { getGeminiResponse };