import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export async function generateBookSummary(bookTitle: string, authorName: string, otherDetails?: string): Promise<string> {
  if (!genAI) {
    return 'AI summaries not available - API key not configured.';
  }

  try {
    // Use the correct model name for Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Generate a brief, informative summary (2-3 sentences) for a Sindhi book with the following details:
    Title: ${bookTitle}
    Author: ${authorName}
    Additional Details: ${otherDetails || 'None provided'}
    
    The summary should be in English and focus on the book's significance in Sindhi literature, its genre, and key themes. Keep it concise and scholarly.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating book summary:', error);
    return 'Summary not available at this time.';
  }
}

export async function generateEmbeddings(text: string): Promise<number[]> {
  if (!genAI) {
    return [];
  }

  try {
    // Use the correct embedding model
    const model = genAI.getGenerativeModel({ model: 'embedding-001' });
    
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return [];
  }
}

export async function enhanceSearchQuery(query: string, script: string): Promise<string> {
  if (!genAI) {
    return query;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Enhance this search query for Sindhi literature: "${query}" in ${script} script.
    
    Provide:
    1. Alternative spellings or transliterations
    2. Related terms in Sindhi literature
    3. Common variations of the search terms
    
    Return only the enhanced search terms separated by spaces, no explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Error enhancing search query:', error);
    return query; // Return original query if enhancement fails
  }
}
