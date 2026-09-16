/**
 * NameFinder Gemini AI Ideation Service
 */

const GEMINI_STORAGE_KEY = 'namefinder_gemini_api_key';

export function getStoredGeminiKey() {
  return localStorage.getItem(GEMINI_STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY || '';
}

export function setStoredGeminiKey(key) {
  if (!key) {
    localStorage.removeItem(GEMINI_STORAGE_KEY);
  } else {
    localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
  }
}

export async function generateNamesWithGemini(brief, apiKey) {
  const key = apiKey || getStoredGeminiKey();
  if (!key) {
    throw new Error('NO_API_KEY');
  }

  const prompt = `You are a world-class brand naming director at an elite studio (like Pentagram or Lexicon).
Generate 10 distinct, memorable brand names based on this founder brief:
- Creator Category: "${brief.category || 'SaaS'}"
- Concept: "${brief.concept || 'Next-generation creator platform'}"
- Preferred Archetype: "${brief.archetype || 'Any'}"
- Seed Keywords: "${brief.keywords || 'None'}"
- Target TLD: "${brief.preferredTld || '.com'}"

Return ONLY a valid JSON array of objects with the exact schema:
[
  {
    "name": "SingleWordOrCompound",
    "archetype": "Modern Tech" | "Compound" | "Neologism" | "Minimal" | "Prestige" | "Editorial" | "Tactile & Organic" | "Punchy & Conversational",
    "tag": "Short 2-word punchy descriptor",
    "rationale": "1-2 sentences on why this name is uniquely suited to this category and positioning."
  }
]
No markdown fences, no explanatory text, just the raw JSON array.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        responseMimeType: 'application/json'
      }
    })
  });

  if (response.status === 429) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || 'Gemini daily rate limit or quota reached.';
    throw new Error(`QUOTA_EXHAUSTED: ${message}`);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Gemini API Error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Empty response from Gemini');

  return JSON.parse(rawText.replace(/```json|```/g, '').trim());
}
