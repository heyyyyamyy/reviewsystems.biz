import { GoogleGenAI } from "@google/genai";
import { Review } from "../types";

// Initialize the Gemini client
// Note: In a real production app, ensure API_KEY is set in your environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCompanyReviews = async (companyName: string, reviews: Review[]): Promise<string> => {
  const companyReviews = reviews.filter(r => r.companyName === companyName);
  
  if (companyReviews.length === 0) {
    return "No reviews available for analysis.";
  }

  const reviewsText = companyReviews.map(r => 
    `- Rating: ${r.rating}/5. Title: ${r.title}. Content: ${r.content}`
  ).join("\n");

  const prompt = `
    You are a senior corporate analyst. Analyze the following employee reviews for the company "${companyName}".
    
    Reviews:
    ${reviewsText}
    
    Provide a concise, professional executive summary (max 150 words) covering:
    1. Overall Sentiment (Positive/Negative/Mixed).
    2. Key Strengths.
    3. Major Concerns.
    
    Keep the tone objective and helpful for potential job seekers or investors.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Analysis could not be generated at this time.";
  } catch (error) {
    console.error("Error analyzing reviews:", error);
    return "Unable to generate AI analysis. Please ensure a valid API key is configured.";
  }
};