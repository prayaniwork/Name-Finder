/**
 * NameFinder Gemini AI Ideation Service (Stage 2 Enhanced)
 * Sophisticated contextual naming engine with creator-category awareness,
 * brand positioning theory, and seamless quota resilience.
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

/**
 * Generate names using Google Gemini API with advanced brand architecture prompts
 */
export async function generateNamesWithGemini(brief, apiKey) {
  const key = apiKey || getStoredGeminiKey();
  if (!key) {
    throw new Error('NO_API_KEY');
  }

  const category = brief.category || 'saas';
  const concept = brief.concept || 'innovative creator product';
  const archetype = brief.archetype || 'All Styles';
  const keywords = brief.keywords || '';
  const steerModifier = brief.steerModifier || '';
  const tone = brief.tone || 'Modern & Authoritative';

  // Category-specific naming guidelines
  let categoryGuideline = '';
  if (category === 'saas') {
    categoryGuideline = 'Focus on high cognitive recall, agility, technical credibility, and clean phonosemantic structure (1-3 syllables). Avoid dated Web 2.0 tropes.';
  } else if (category === 'newsletter') {
    categoryGuideline = 'Focus on editorial authority, curiosity, intellectual intrigue, and publication gravitas that looks striking in an email inbox.';
  } else if (category === 'consumer') {
    categoryGuideline = 'Focus on sensory textures, organic resonance, tactile warmth, and artisanal craftsmanship that looks exceptional on packaging.';
  } else if (category === 'podcast') {
    categoryGuideline = 'Focus on spoken audio cadence, conversational punch, high recall, and visual impact on square streaming directory tiles.';
  }

  const prompt = `You are an elite brand naming partner at a world-renowned creative studio (like Pentagram or Lexicon Branding).
Generate 10 distinct, memorable brand names based on this comprehensive founder brief:

Creator Category: ${category.toUpperCase()}
Project Essence: "${concept}"
Category Strategy: ${categoryGuideline}
Style Archetype: "${archetype}"
Desired Tone: "${tone}"
Seed Keywords: "${keywords || 'None'}"
${steerModifier ? `Creative Nudge / Direction: "${steerModifier}"` : ''}

CRITICAL RULES:
1. Every name must be easy to spell, pronounce, and remember globally.
2. Mix of archetypes: Modern Tech, Compound, Neologism, Minimal Nordic, and Classical Prestige.
3. Provide a thoughtful 1-2 sentence brand positioning rationale explaining the psychological impression.

Return ONLY a valid JSON array of objects with the exact schema:
[
  {
    "name": "BrandName",
    "archetype": "Modern Tech" | "Compound" | "Neologism" | "Minimal" | "Prestige" | "Editorial" | "Tactile & Organic" | "Punchy & Conversational",
    "tag": "Short 2-word punchy descriptor",
    "rationale": "1-2 sentences explaining why this name anchors the brand positioning and appeals to the target audience."
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
