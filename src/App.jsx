import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import BriefStudio from './components/BriefStudio';
import NameCard from './components/NameCard';
import CascadeDeck from './components/CascadeDeck';
import BrandMockupModal from './components/BrandMockupModal';
import CompareDrawer from './components/CompareDrawer';
import ShortlistDrawer from './components/ShortlistDrawer';
import ApiKeyModal from './components/ApiKeyModal';
import { generateNames } from './services/generatorEngine';
import { checkDomainsBatch } from './services/domainService';
import { generateNamesWithGemini, getStoredGeminiKey } from './services/geminiService';
import { Filter, ArrowUpDown, CheckCircle2, AlertCircle } from 'lucide-react';

const SHORTLIST_STORAGE = 'namefinder_shortlist';

export default function App() {
  const [brief, setBrief] = useState({
    category: 'saas',
    concept: '',
    archetype: 'All Styles',
    keywords: '',
    preferredTld: 'com'
  });

  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState(null);
  const [viewMode, setViewMode] = useState('bento'); // 'bento' or 'stack' (Ref Image 1 vs 2)

  // Shortlist State
  const [shortlist, setShortlist] = useState(() => {
    try {
      const saved = localStorage.getItem(SHORTLIST_STORAGE);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Compare State (max 2)
  const [comparedItems, setComparedItems] = useState([]);

  // Modals & Drawers
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [mockupItem, setMockupItem] = useState(null);
  const [hasApiKey, setHasApiKey] = useState(Boolean(getStoredGeminiKey()));

  // Filters & Sorting
  const [filterOnlyAvailable, setFilterOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState('fit');

  // Persist shortlist
  useEffect(() => {
    localStorage.setItem(SHORTLIST_STORAGE, JSON.stringify(shortlist));
  }, [shortlist]);

  // Initial load generation
  useEffect(() => {
    handleGenerate(brief);
  }, []);

  const handleGenerate = async (activeBrief = brief) => {
    setIsLoading(true);
    setErrorNotice(null);

    let generatedList = [];

    // Attempt Gemini AI if key exists
    const apiKey = getStoredGeminiKey();
    if (apiKey) {
      try {
        const aiNames = await generateNamesWithGemini(activeBrief, apiKey);
        if (Array.isArray(aiNames) && aiNames.length > 0) {
          generatedList = aiNames.map((item, idx) => {
            const cleanName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            const slug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');
            const syllables = Math.max(1, Math.min(3, Math.round(cleanName.length / 3)));
            
            // Assign reference tile styles for contrast
            const styles = ['black', 'lime', 'lilac', 'white'];
            const cardStyle = styles[idx % styles.length];

            return {
              id: `gemini-${Date.now()}-${idx}`,
              name: cleanName,
              slug,
              category: activeBrief.category,
              archetype: item.archetype || 'Modern Tech',
              tag: item.tag || 'AI Generated',
              syllables,
              cardStyle,
              fitScore: Math.floor(94 + Math.random() * 5),
              monogram: cleanName.slice(0, 2).toUpperCase(),
              bgGradient: 'linear-gradient(135deg, #111215 0%, #2a2d34 100%)',
              pronounceEase: syllables <= 2 ? 'Seamless' : 'Natural',
              rationale: item.rationale,
              domains: {
                com: { status: 'checking', tld: '.com' },
                ai: { status: 'available', tld: '.ai' },
                io: { status: 'available', tld: '.io' },
                co: { status: 'available', tld: '.co' }
              }
            };
          });
        }
      } catch (err) {
        if (err.message.includes('QUOTA_EXHAUSTED')) {
          setErrorNotice('Gemini daily limit reached. Seamlessly using local high-craft engine.');
        }
      }
    }

    // Fallback or default to local engine
    if (generatedList.length === 0) {
      generatedList = generateNames(activeBrief);
    }

    setNames(generatedList);
    setIsLoading(false);

    // Parallel live Verisign RDAP checks
    checkDomainsBatch(generatedList, (updatedCandidate) => {
      setNames(prev => prev.map(item => item.id === updatedCandidate.id ? updatedCandidate : item));
    });
  };

  const handleToggleShortlist = (item) => {
    setShortlist(prev => {
      const exists = prev.some(i => i.id === item.id || i.name === item.name);
      if (exists) {
        return prev.filter(i => i.id !== item.id && i.name !== item.name);
      }
      return [...prev, item];
    });
  };

  const handleToggleCompare = (item) => {
    setComparedItems(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length >= 2) {
        return [prev[1], item];
      }
      return [...prev, item];
    });
  };

  const filteredNames = useMemo(() => {
    let result = [...names];
    if (filterOnlyAvailable) {
      result = result.filter(n => n.domains?.com?.status === 'available');
    }
    if (sortBy === 'fit') {
      result.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'syllables') {
      result.sort((a, b) => (a.syllables || 0) - (b.syllables || 0));
    }
    return result;
  }, [names, filterOnlyAvailable, sortBy]);

  const availableCount = names.filter(n => n.domains?.com?.status === 'available').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Navigation Bar */}
      <Header
        shortlistCount={shortlist.length}
        compareCount={comparedItems.length}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onOpenShortlist={() => setIsShortlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenApiKey={() => setIsApiKeyOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Studio Arena */}
      <main style={{ flex: 1, padding: '36px 0 60px' }}>
        <div className="container">
          {/* Notice Alert */}
          {errorNotice && (
            <div style={{
              maxWidth: '680px',
              margin: '0 auto 24px',
              padding: '12px 18px',
              borderRadius: '999px',
              background: '#fef3c7',
              border: '1px solid #fcd34d',
              color: '#92400e',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Bento Brief Studio */}
          <BriefStudio
            brief={brief}
            onChangeBrief={setBrief}
            onGenerate={() => handleGenerate(brief)}
            isLoading={isLoading}
          />

          {/* Results Summary & Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            {/* Stats Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-black)' }}>
                {filteredNames.length} {filteredNames.length === 1 ? 'Candidate' : 'Candidates'} Generated
              </span>
              <span style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '999px',
                background: 'rgba(204, 255, 0, 0.3)',
                color: '#1a7f37',
                border: '1px solid #a3e635'
              }}>
                {availableCount} .COM AVAILABLE
              </span>
            </div>

            {/* Filter Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setFilterOnlyAvailable(prev => !prev)}
                className={`chip ${filterOnlyAvailable ? 'active' : ''}`}
                style={{ fontSize: '12px', padding: '6px 14px' }}
              >
                <CheckCircle2 style={{ width: '13px', height: '13px' }} />
                <span>Available .com Only</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <ArrowUpDown style={{ width: '13px', height: '13px' }} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '999px',
                    color: 'var(--text-black)',
                    fontSize: '12px',
                    fontWeight: '600',
                    padding: '6px 12px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="fit">Sort by Fit Score</option>
                  <option value="az">Sort A-Z</option>
                  <option value="syllables">Sort by Syllables</option>
                </select>
              </div>
            </div>
          </div>

          {/* VIEW MODE A: Bento Grid (Ref Image 1 & 4) */}
          {viewMode === 'bento' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '22px'
            }}>
              {filteredNames.map((item) => (
                <NameCard
                  key={item.id}
                  item={item}
                  isShortlisted={shortlist.some(s => s.id === item.id || s.name === item.name)}
                  isCompared={comparedItems.some(c => c.id === item.id)}
                  onToggleShortlist={handleToggleShortlist}
                  onToggleCompare={handleToggleCompare}
                  onOpenMockup={setMockupItem}
                />
              ))}
            </div>
          )}

          {/* VIEW MODE B: 3D Cascade Stack Deck (Directly from Ref Image 2!) */}
          {viewMode === 'stack' && (
            <CascadeDeck
              items={filteredNames}
              shortlist={shortlist}
              comparedItems={comparedItems}
              onToggleShortlist={handleToggleShortlist}
              onToggleCompare={handleToggleCompare}
              onOpenMockup={setMockupItem}
            />
          )}
        </div>
      </main>

      {/* Brand Mockup Modal */}
      <BrandMockupModal
        item={mockupItem}
        onClose={() => setMockupItem(null)}
      />

      {/* Compare Drawer */}
      <CompareDrawer
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedItems={comparedItems}
        onRemoveFromCompare={handleToggleCompare}
        onSelectWinner={(winner) => {
          handleToggleShortlist(winner);
          setIsCompareOpen(false);
        }}
      />

      {/* Shortlist Drawer */}
      <ShortlistDrawer
        isOpen={isShortlistOpen}
        onClose={() => setIsShortlistOpen(false)}
        shortlist={shortlist}
        onRemoveFromShortlist={handleToggleShortlist}
        onClearShortlist={() => setShortlist([])}
      />

      {/* Gemini API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyOpen}
        onClose={() => setIsApiKeyOpen(false)}
        onKeySaved={(hasKey) => setHasApiKey(hasKey)}
      />

      {/* Minimal Footer */}
      <footer style={{
        padding: '24px 0',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--text-muted)'
      }}>
        <div className="container">
          <p>NameFinder Studio · Built for solo founders, creators, and builders.</p>
        </div>
      </footer>
    </div>
  );
}
