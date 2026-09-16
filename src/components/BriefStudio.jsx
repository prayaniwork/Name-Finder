import React from 'react';
import { Sparkles, RefreshCw, Compass, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'saas', label: 'SaaS & Tools', icon: '⚡', placeholder: 'e.g. AI-powered financial copilot for independent contractor teams...' },
  { id: 'newsletter', label: 'Newsletter & Media', icon: '📰', placeholder: 'e.g. Weekly deep dives into breakthrough climate tech and frontier biology...' },
  { id: 'consumer', label: 'Consumer & DTC', icon: '🌿', placeholder: 'e.g. Organic heirloom matcha bar and tactile ceramic living goods...' },
  { id: 'podcast', label: 'Podcast & Show', icon: '🎙️', placeholder: 'e.g. Candid late-night conversations with contrarian founders building hard tech...' }
];

const INSPIRATIONS = {
  saas: ['AI Developer CLI', 'Zero-Knowledge Vault', 'Autonomous Sales Agent', 'Micro-SaaS Billing'],
  newsletter: ['Venture Capital Insider', 'The Frontier Architect', 'Cognitive Edge Digest', 'Longevity Dispatch'],
  consumer: ['Heirloom Coffee Roastery', 'Ceramic Homeware', 'Botanical Sleep Elixir', 'Nordic Minimal Goods'],
  podcast: ['Midnight Founder Confessions', 'The Unfiltered Thesis', 'Silicon Echoes', 'The Deep Audio Hour']
};

const ARCHETYPES = [
  'All Styles',
  'Modern Tech',
  'Compound',
  'Neologism',
  'Minimal',
  'Prestige'
];

export default function BriefStudio({
  brief,
  onChangeBrief,
  onGenerate,
  isLoading = false
}) {
  const activeCategory = CATEGORIES.find(c => c.id === brief.category) || CATEGORIES[0];

  return (
    <section style={{ marginBottom: '40px' }}>
      {/* Editorial Hero Statement (Directly from Ref Image 4 & 3) */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 className="font-serif" style={{
          fontSize: '36px',
          fontWeight: '600',
          fontStyle: 'italic',
          color: 'var(--text-black)',
          letterSpacing: '-0.02em',
          marginBottom: '6px'
        }}>
          Together, we can build a brand.
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          High-recall naming architecture, real-time Verisign `.com` verification & live mockups.
        </p>
      </div>

      {/* Luminous Glowing Category Selector (Directly from Ref Image 3!) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px'
      }}>
        {CATEGORIES.map(cat => {
          const isActive = brief.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChangeBrief({ ...brief, category: cat.id, concept: '' })}
              className="glowing-pill"
              style={{
                background: isActive ? 'var(--color-matte-black)' : '#ffffff',
                color: isActive ? 'var(--color-neon-lime)' : 'var(--text-black)',
                boxShadow: isActive
                  ? '0 0 24px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)'
                  : '0 0 20px rgba(177, 117, 255, 0.4), 0 4px 10px rgba(0, 0, 0, 0.05)',
                borderColor: isActive ? 'var(--color-matte-black)' : 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Bento Intake Box (Ref Image 1) */}
      <div className="bento-card" style={{ padding: '28px', background: '#ffffff' }}>
        {/* Concept Input */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Concept Description
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
              {brief.concept.length}/140 chars
            </span>
          </div>

          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={brief.concept}
              onChange={(e) => onChangeBrief({ ...brief, concept: e.target.value })}
              placeholder={activeCategory.placeholder}
              style={{
                width: '100%',
                background: '#f8f9fa',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-pill)',
                padding: '14px 160px 14px 22px',
                fontSize: '15px',
                color: 'var(--text-black)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.04)'
              }}
              onKeyDown={(e) => { if (e.key === 'Enter') onGenerate(); }}
            />

            {/* Neon Lime CTA Button (Ref Image 1: High Visibility) */}
            <button
              onClick={onGenerate}
              disabled={isLoading}
              className="btn btn-lime"
              style={{
                position: 'absolute',
                right: '6px',
                top: '6px',
                bottom: '6px',
                padding: '0 22px',
                fontSize: '13px'
              }}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="animate-spin" style={{ width: '13px', height: '13px' }} />
                  <span>Generating…</span>
                </>
              ) : (
                <>
                  <Sparkles style={{ width: '13px', height: '13px' }} />
                  <span>Generate Names</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Inspiration Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Compass style={{ width: '12px', height: '12px' }} /> Try:
            </span>
            {INSPIRATIONS[brief.category]?.map((insp, idx) => (
              <button
                key={idx}
                onClick={() => onChangeBrief({ ...brief, concept: insp })}
                style={{
                  background: '#f1f3f5',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '999px',
                  color: 'var(--text-dark)',
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  cursor: 'pointer'
                }}
              >
                {insp}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          {/* Style Archetypes */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Archetype:
            </span>
            {ARCHETYPES.map(arch => {
              const isSelected = (brief.archetype || 'All Styles').toLowerCase() === arch.toLowerCase();
              return (
                <button
                  key={arch}
                  onClick={() => onChangeBrief({ ...brief, archetype: arch })}
                  className={`chip ${isSelected ? 'active' : ''}`}
                  style={{ fontSize: '11px', padding: '4px 11px' }}
                >
                  {arch}
                </button>
              );
            })}
          </div>

          {/* Seed Keywords */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Seed Word:
            </span>
            <input
              type="text"
              value={brief.keywords || ''}
              onChange={(e) => onChangeBrief({ ...brief, keywords: e.target.value })}
              placeholder="e.g. bloom, pulse"
              style={{
                background: '#f8f9fa',
                border: '1px solid var(--border-subtle)',
                borderRadius: '999px',
                padding: '4px 12px',
                fontSize: '12px',
                outline: 'none',
                width: '140px'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
