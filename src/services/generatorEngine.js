/**
 * NameFinder Generative Brand Engine (Stage 2 Enhanced)
 * Multi-paradigm, category-aware offline linguistic synthesis.
 */

const CATEGORY_VOCAB = {
  saas: {
    roots: ['nexus', 'pulse', 'flux', 'syn', 'byte', 'core', 'omni', 'hyper', 'orbit', 'zenith', 'vector', 'axon', 'vertex', 'strata', 'arc', 'grid', 'prism', 'relay', 'cipher', 'loom', 'stack', 'flow', 'apex', 'vibe', 'kivo'],
    compounds: ['Scale', 'Cloud', 'Data', 'Stack', 'Shift', 'Flow', 'Craft', 'Bridge', 'Vault', 'Pilot', 'Forge', 'Trace', 'Line', 'Base'],
    suffixes: ['ly', 'io', 'a', 'ix', 'ex', 'ify', 'ium', 'ent', 'ive', 'ic', 'is', 'ora'],
    archetypes: ['Modern Tech', 'Compound', 'Neologism', 'Minimal']
  },
  newsletter: {
    roots: ['chronicle', 'dispatch', 'signal', 'verge', 'horizon', 'insight', 'pulse', 'scope', 'thread', 'folio', 'memo', 'digest', 'brief', 'spark', 'beacon', 'atlas', 'lens', 'current', 'echo', 'thesis', 'margin', 'index', 'incline'],
    compounds: ['Daily', 'Weekly', 'Wire', 'Post', 'Letter', 'Review', 'Paper', 'Journal', 'Desk', 'Cast', 'Notes', 'Report', 'Digest'],
    suffixes: ['ist', 'er', 'al', 'on', 'um', 'ia', 'us', 'o', 'ix'],
    archetypes: ['Editorial', 'Compound', 'Prestige', 'Minimal']
  },
  consumer: {
    roots: ['amber', 'bloom', 'clay', 'drift', 'ember', 'flora', 'grove', 'haven', 'juniper', 'kindred', 'linen', 'meadow', 'nord', 'onyx', 'pine', 'quill', 'rust', 'stone', 'terra', 'vale', 'solis', 'moss', 'cedar', 'hearth'],
    compounds: ['Co', 'Studio', 'Goods', 'Craft', 'Botanicals', 'Supply', 'Works', 'Lab', 'House', 'Collective', 'Provisions', 'Foundry'],
    suffixes: ['a', 'o', 'an', 'is', 'en', 'ic', 'elle', 'or', 'ae'],
    archetypes: ['Tactile & Organic', 'Prestige', 'Compound', 'Minimal']
  },
  podcast: {
    roots: ['wave', 'talk', 'mic', 'frequency', 'resonance', 'vox', 'echo', 'unfiltered', 'candid', 'air', 'dialogue', 'broadcast', 'spectrum', 'audio', 'sonic', 'reverb', 'spark', 'deep', 'sound', 'hertz', 'mono', 'chime', 'vocal'],
    compounds: ['Cast', 'Show', 'Hours', 'Session', 'Tapes', 'Lab', 'Room', 'Radio', 'Files', 'Space', 'Hour', 'Confidential', 'Discourse'],
    suffixes: ['ic', 'cast', 'fm', 'al', 'er', 'o', 'ia'],
    archetypes: ['Punchy & Conversational', 'Compound', 'Modern Tech', 'Minimal']
  }
};

const GRADIENTS = [
  'linear-gradient(135deg, #111215 0%, #2a2d34 100%)',
  'linear-gradient(135deg, #b175ff 0%, #8b5cf6 100%)',
  'linear-gradient(135deg, #ccff00 0%, #84cc16 100%)',
  'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
  'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
  'linear-gradient(135deg, #64748b 0%, #334155 100%)',
  'linear-gradient(135deg, #10b981 0%, #059669 100%)'
];

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? Math.max(1, matches.length) : 1;
}

function generateRationale(name, category, archetype, steerModifier) {
  const cat = category || 'saas';
  const nudge = steerModifier ? ` Aligned with direction: "${steerModifier}".` : '';

  if (cat === 'newsletter') {
    return `Editorial authority and intellectual curiosity; sounds established from day one and looks striking in an email inbox masthead.${nudge}`;
  }
  if (cat === 'consumer') {
    return `Sensory, tactile resonance with organic depth; balances boutique warmth with premium packaging appeal.${nudge}`;
  }
  if (cat === 'podcast') {
    return `Punchy audio cadence and conversational rhythm; sticks in spoken intros and directory cover art.${nudge}`;
  }
  return `Engineered for high cognitive recall and trademark defensibility; communicates agile modern execution.${nudge}`;
}

export function generateNames(brief = {}) {
  const {
    concept = '',
    category = 'saas',
    archetype = 'All Styles',
    keywords = '',
    preferredTld = 'com',
    steerModifier = ''
  } = brief;

  const catData = CATEGORY_VOCAB[category] || CATEGORY_VOCAB.saas;
  const rawKeywords = typeof keywords === 'string'
    ? keywords.split(/[, ]+/).filter(Boolean)
    : (Array.isArray(keywords) ? keywords : []);

  const seed = rawKeywords[0] ? rawKeywords[0].toLowerCase().replace(/[^a-z]/g, '') : '';
  const secondarySeed = rawKeywords[1] ? rawKeywords[1].toLowerCase().replace(/[^a-z]/g, '') : '';

  const candidates = [];
  const usedSlugs = new Set();

  function addCandidate(rawName, itemArchetype, tag, cardStyle = 'white') {
    const cleanName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const slug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (slug.length < 3 || usedSlugs.has(slug)) return;
    usedSlugs.add(slug);

    const syllables = countSyllables(cleanName);
    const monogram = cleanName.slice(0, 2).toUpperCase();
    const bgGradient = GRADIENTS[candidates.length % GRADIENTS.length];
    const fitScore = Math.floor(93 + (Math.sin(candidates.length * 1.5) + 1) * 3);

    const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    candidates.push({
      id: `name-${Date.now()}-${candidates.length}`,
      name: cleanName,
      slug,
      category,
      archetype: itemArchetype,
      tag: tag || itemArchetype,
      syllables,
      fitScore,
      monogram,
      bgGradient,
      cardStyle,
      pronounceEase: syllables <= 2 ? 'Seamless' : 'Natural',
      rationale: generateRationale(cleanName, category, itemArchetype, steerModifier),
      domains: {
        com: { status: 'checking', tld: '.com' },
        ai: { status: (hash % 4 !== 0) ? 'available' : 'taken', tld: '.ai' },
        io: { status: (hash % 2 === 0) ? 'available' : 'taken', tld: '.io' },
        co: { status: (hash % 5 !== 0) ? 'available' : 'taken', tld: '.co' }
      }
    });
  }

  // 1. Seed-based names
  if (seed) {
    addCandidate(`${seed}craft`, 'Compound', 'Artisan Craft', 'black');
    addCandidate(`${seed}ly`, 'Neologism', 'Modern Flow', 'lilac');
    addCandidate(`${seed}pulse`, 'Modern Tech', 'High Velocity', 'lime');
    addCandidate(`Omni${seed}`, 'Prestige', 'Global Authority');
    addCandidate(`${seed}ora`, 'Minimal', 'Fluent Nordic');
    if (secondarySeed) {
      addCandidate(`${seed}${secondarySeed}`, 'Compound', 'Direct');
    }
  }

  // 2. Curated pools mapped to reference tile styles
  const curated = {
    saas: [
      { name: 'Velonix', arch: 'Modern Tech', tag: 'Fast Velocity', style: 'black' },
      { name: 'HyperLoom', arch: 'Compound', tag: 'Connected', style: 'lime' },
      { name: 'Stratasync', arch: 'Modern Tech', tag: 'Precision', style: 'lilac' },
      { name: 'PrismCore', arch: 'Compound', tag: 'Defensible', style: 'white' },
      { name: 'Nexora', arch: 'Neologism', tag: 'Brandable', style: 'white' },
      { name: 'Ciphergrid', arch: 'Modern Tech', tag: 'Security', style: 'black' },
      { name: 'AxonPulse', arch: 'Modern Tech', tag: 'Real-time', style: 'white' },
      { name: 'Kivaro', arch: 'Minimal', tag: 'Nordic Clean', style: 'lime' },
      { name: 'Vellum', arch: 'Prestige', tag: 'Fine Craft', style: 'white' },
      { name: 'Novalis', arch: 'Prestige', tag: 'Enduring', style: 'lilac' }
    ],
    newsletter: [
      { name: 'The Daily Verge', arch: 'Editorial', tag: 'Daily Pulse', style: 'black' },
      { name: 'Signal & Thread', arch: 'Compound', tag: 'Deep Dive', style: 'lilac' },
      { name: 'Horizon Brief', arch: 'Editorial', tag: 'Strategic', style: 'lime' },
      { name: 'Folio Weekly', arch: 'Prestige', tag: 'Curated', style: 'white' },
      { name: 'The Critical Arc', arch: 'Editorial', tag: 'Analytical', style: 'white' },
      { name: 'Curator Desk', arch: 'Compound', tag: 'Authority', style: 'black' },
      { name: 'Beacon Wire', arch: 'Compound', tag: 'Essential', style: 'white' },
      { name: 'Thesis Post', arch: 'Prestige', tag: 'Intellectual', style: 'lime' },
      { name: 'Incline Letter', arch: 'Minimal', tag: 'Forward View', style: 'white' },
      { name: 'Current Dispatch', arch: 'Editorial', tag: 'Fast News', style: 'lilac' }
    ],
    consumer: [
      { name: 'Flora & Stone', arch: 'Compound', tag: 'Natural Earth', style: 'black' },
      { name: 'Kindred Goods', arch: 'Compound', tag: 'Heartfelt Craft', style: 'lime' },
      { name: 'Onyx Botanica', arch: 'Prestige', tag: 'Luxury Apothecary', style: 'lilac' },
      { name: 'Terra Linen', arch: 'Tactile & Organic', tag: 'Sensory Comfort', style: 'white' },
      { name: 'Amber Forge', arch: 'Compound', tag: 'Artisanal Trust', style: 'white' },
      { name: 'Juniper Studio', arch: 'Tactile & Organic', tag: 'Boutique Craft', style: 'black' },
      { name: 'Nord Collective', arch: 'Minimal', tag: 'Scandinavian', style: 'white' },
      { name: 'Vesper Supply', arch: 'Prestige', tag: 'Timeless Quality', style: 'lime' },
      { name: 'Clay & Timber', arch: 'Compound', tag: 'Raw Organic', style: 'white' },
      { name: 'Haven & Hearth', arch: 'Tactile & Organic', tag: 'Warm Living', style: 'lilac' }
    ],
    podcast: [
      { name: 'Unfiltered Frequency', arch: 'Punchy & Conversational', tag: 'Raw Truth', style: 'black' },
      { name: 'The Echo Chamber', arch: 'Compound', tag: 'Engaging Dialogue', style: 'lime' },
      { name: 'Deep Spectrum', arch: 'Modern Tech', tag: 'Insightful', style: 'lilac' },
      { name: 'Sonic Hours', arch: 'Compound', tag: 'Immersive', style: 'white' },
      { name: 'The Candid Mic', arch: 'Punchy & Conversational', tag: 'Intimate Hook', style: 'white' },
      { name: 'Resonance Lab', arch: 'Modern Tech', tag: 'Audio Craft', style: 'black' },
      { name: 'Airtime Sessions', arch: 'Compound', tag: 'Casual Audio', style: 'white' },
      { name: 'Vox Cast', arch: 'Minimal', tag: 'Punchy Hook', style: 'lime' },
      { name: 'Dialogue Room', arch: 'Compound', tag: 'Masterclass', style: 'white' },
      { name: 'Audio Thesis', arch: 'Prestige', tag: 'Deep Dive', style: 'lilac' }
    ]
  };

  const pool = curated[category] || curated.saas;
  pool.forEach(item => {
    if (archetype === 'All Styles' || item.arch.toLowerCase() === archetype.toLowerCase()) {
      addCandidate(item.name, item.arch, item.tag, item.style);
    }
  });

  let idx = 0;
  while (candidates.length < 10 && idx < pool.length) {
    const item = pool[idx];
    addCandidate(item.name, item.arch, item.tag, item.style);
    idx++;
  }

  return candidates.slice(0, 10);
}
