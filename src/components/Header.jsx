import React from 'react';
import { Bookmark, GitCompare, KeyRound, Globe } from 'lucide-react';

export default function Header({
  shortlistCount = 0,
  compareCount = 0,
  viewMode = 'bento', // 'bento' or 'stack'
  onChangeViewMode,
  onOpenShortlist,
  onOpenCompare,
  onOpenApiKey,
  hasApiKey = false
}) {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Logo & Geometric Emblem (Ref Image 1: Minimalist Round Mark) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--color-matte-black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
          }}>
            <span style={{ color: 'var(--color-neon-lime)', fontSize: '18px', fontWeight: '900', lineHeight: 1 }}>
              ◎
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-black)' }}>
                NameFinder
              </span>
              <span style={{
                fontSize: '10px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'var(--color-matte-black)',
                color: 'var(--color-neon-lime)'
              }}>
                STUDIO
              </span>
            </div>
            {/* Coordinate Stamp (Ref Image 3) */}
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              40.7128° N, 74.0060° W · Bento Edition
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* View Mode Toggle: Bento Grid vs 3D Stack */}
          <div style={{
            display: 'flex',
            background: '#ffffff',
            borderRadius: '999px',
            padding: '3px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <button
              onClick={() => onChangeViewMode('bento')}
              style={{
                border: 'none',
                background: viewMode === 'bento' ? 'var(--color-matte-black)' : 'transparent',
                color: viewMode === 'bento' ? '#ffffff' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: '700',
                padding: '5px 12px',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              ⊞ Bento
            </button>
            <button
              onClick={() => onChangeViewMode('stack')}
              style={{
                border: 'none',
                background: viewMode === 'stack' ? 'var(--color-matte-black)' : 'transparent',
                color: viewMode === 'stack' ? '#ffffff' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: '700',
                padding: '5px 12px',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              🗂️ 3D Stack
            </button>
          </div>

          {/* RDAP Status Indicator */}
          <div style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '999px',
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: '600'
          }} className="sm:flex">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
            <span>RDAP LIVE</span>
          </div>

          {/* AI Key Button */}
          <button
            onClick={onOpenApiKey}
            className="btn btn-outline"
            style={{ fontSize: '12px', padding: '6px 13px' }}
          >
            <KeyRound style={{ width: '13px', height: '13px' }} />
            <span>{hasApiKey ? 'Gemini Active' : 'AI Key'}</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="btn btn-outline"
            style={{
              fontSize: '12px',
              padding: '6px 13px',
              borderColor: compareCount > 0 ? 'var(--color-matte-black)' : 'var(--border-strong)',
              fontWeight: compareCount > 0 ? '800' : '600'
            }}
          >
            <GitCompare style={{ width: '13px', height: '13px' }} />
            <span>Compare</span>
            {compareCount > 0 && (
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--color-matte-black)',
                color: '#fff',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800'
              }}>
                {compareCount}
              </span>
            )}
          </button>

          {/* Shortlist Button (Ref Image 1: High-contrast Dark Pill) */}
          <button
            onClick={onOpenShortlist}
            className="btn btn-black"
            style={{ fontSize: '12px', padding: '7px 16px' }}
          >
            <Bookmark style={{ width: '13px', height: '13px' }} />
            <span>Shortlist</span>
            {shortlistCount > 0 && (
              <span style={{
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--color-neon-lime)',
                color: '#111215',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900'
              }}>
                {shortlistCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
