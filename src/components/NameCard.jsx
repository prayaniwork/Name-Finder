import React from 'react';
import { Bookmark, GitCompare, Eye, ArrowUpRight, Check, ExternalLink } from 'lucide-react';

export default function NameCard({
  item,
  isShortlisted = false,
  isCompared = false,
  onToggleShortlist,
  onToggleCompare,
  onOpenMockup
}) {
  const comStatus = item.domains?.com?.status || 'checking';
  const isAvailable = comStatus === 'available';

  // Tile theme styling from Reference Image 1
  const cardStyle = item.cardStyle || 'white';
  let cardClass = 'bento-card';
  let isDarkText = true;

  if (cardStyle === 'black') {
    cardClass += ' bento-black';
    isDarkText = false;
  } else if (cardStyle === 'lime') {
    cardClass += ' bento-lime';
    isDarkText = true;
  } else if (cardStyle === 'lilac') {
    cardClass += ' bento-lilac';
    isDarkText = false;
  }

  return (
    <div
      className={`${cardClass} animate-fade-in`}
      style={{
        padding: '26px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '300px'
      }}
    >
      {/* Top Header: Monogram + Archetype Tag + ↗ Diagonal Arrow (Ref Image 1) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              className="brand-mark"
              style={{
                background: cardStyle === 'black'
                  ? 'linear-gradient(135deg, #22252c 0%, #15171c 100%)'
                  : item.bgGradient,
                border: cardStyle === 'black' ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
              }}
            >
              {item.monogram}
            </div>
            <div>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '999px',
                background: isDarkText ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.15)',
                color: isDarkText ? 'var(--text-dark)' : '#ffffff'
              }}>
                {item.tag || item.archetype}
              </span>
              <div style={{
                fontSize: '11px',
                color: isDarkText ? 'var(--text-muted)' : 'rgba(255, 255, 255, 0.7)',
                marginTop: '3px'
              }}>
                {item.syllables} {item.syllables === 1 ? 'syllable' : 'syllables'} · {item.pronounceEase}
              </div>
            </div>
          </div>

          {/* Interactive ↗ Diagonal Arrow Action (Ref Image 1) */}
          <button
            onClick={() => onOpenMockup(item)}
            style={{
              background: isDarkText ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isDarkText ? 'var(--text-black)' : '#ffffff',
              transition: 'transform 0.18s ease'
            }}
            title="Preview live brand mockup"
          >
            <ArrowUpRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        {/* Display Name */}
        <h3 style={{
          fontSize: '28px',
          fontWeight: '900',
          letterSpacing: '-0.035em',
          marginBottom: '10px',
          lineHeight: 1.15
        }}>
          {item.name}
        </h3>

        {/* Primary Domain Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div className={`domain-pill ${comStatus}`}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: isAvailable ? '#10b981' : (comStatus === 'checking' ? '#f59e0b' : '#94a3b8')
            }}></span>
            <span>{item.slug}.com</span>
            <span style={{ fontSize: '10px', fontWeight: '800' }}>
              {isAvailable ? 'AVAILABLE' : (comStatus === 'checking' ? 'CHECKING' : 'TAKEN')}
            </span>
          </div>

          {isAvailable && (
            <a
              href={`https://porkbun.com/checkout/search?q=${item.slug}.com`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '11px',
                color: isDarkText ? 'var(--text-muted)' : 'rgba(255, 255, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              <span>Get domain</span>
              <ExternalLink style={{ width: '10px', height: '10px' }} />
            </a>
          )}
        </div>

        {/* Brand Rationale Story */}
        <p style={{
          fontSize: '13px',
          color: isDarkText ? 'var(--text-muted)' : 'rgba(255, 255, 255, 0.85)',
          lineHeight: 1.45,
          marginBottom: '16px'
        }}>
          {item.rationale}
        </p>

        {/* Alternative TLD Badges */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '18px' }}>
          {Object.entries(item.domains || {}).filter(([tld]) => tld !== 'com').map(([tld, info]) => {
            const avail = info.status === 'available';
            return (
              <span
                key={tld}
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: '600',
                  padding: '2px 7px',
                  borderRadius: '6px',
                  background: isDarkText ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)',
                  color: isDarkText ? (avail ? 'var(--text-dark)' : 'var(--text-faint)') : (avail ? '#fff' : 'rgba(255,255,255,0.4)'),
                  textDecoration: avail ? 'none' : 'line-through'
                }}
              >
                .{tld}
              </span>
            );
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '14px',
        borderTop: `1px solid ${isDarkText ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)'}`,
        gap: '8px'
      }}>
        {/* Mockup Button */}
        <button
          onClick={() => onOpenMockup(item)}
          className="btn"
          style={{
            flex: 1,
            fontSize: '12px',
            padding: '6px 12px',
            background: isDarkText ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
            color: isDarkText ? 'var(--text-black)' : '#ffffff',
            border: isDarkText ? '1px solid var(--border-strong)' : '1px solid rgba(255,255,255,0.25)'
          }}
        >
          <Eye style={{ width: '13px', height: '13px' }} />
          <span>Mockup</span>
        </button>

        {/* Compare Button */}
        <button
          onClick={() => onToggleCompare(item)}
          className="btn"
          style={{
            fontSize: '12px',
            padding: '6px 12px',
            background: isCompared ? 'var(--color-matte-black)' : (isDarkText ? '#ffffff' : 'rgba(255,255,255,0.15)'),
            color: isCompared ? '#ffffff' : (isDarkText ? 'var(--text-black)' : '#ffffff'),
            border: isDarkText ? '1px solid var(--border-strong)' : '1px solid rgba(255,255,255,0.25)'
          }}
          title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
        >
          <GitCompare style={{ width: '13px', height: '13px' }} />
          <span>{isCompared ? 'Added' : 'Compare'}</span>
        </button>

        {/* Shortlist Save Button */}
        <button
          onClick={() => onToggleShortlist(item)}
          className="btn"
          style={{
            fontSize: '12px',
            padding: '6px 12px',
            background: isShortlisted ? '#f43f5e' : (isDarkText ? '#ffffff' : 'rgba(255,255,255,0.15)'),
            color: isShortlisted ? '#ffffff' : (isDarkText ? 'var(--text-black)' : '#ffffff'),
            border: isShortlisted ? '1px solid #f43f5e' : (isDarkText ? '1px solid var(--border-strong)' : '1px solid rgba(255,255,255,0.25)')
          }}
          title={isShortlisted ? 'Saved to shortlist' : 'Save to shortlist'}
        >
          <Bookmark style={{ width: '13px', height: '13px', fill: isShortlisted ? '#ffffff' : 'none' }} />
          <span>{isShortlisted ? 'Saved' : 'Save'}</span>
        </button>
      </div>
    </div>
  );
}
