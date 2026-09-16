import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, GitCompare, Eye, ArrowUpRight, Share2, Sparkles } from 'lucide-react';

export default function CascadeDeck({
  items = [],
  shortlist = [],
  comparedItems = [],
  onToggleShortlist,
  onToggleCompare,
  onOpenMockup
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Stack of up to 3 cards
  const stack = [
    items[activeIndex],
    items[(activeIndex + 1) % items.length],
    items[(activeIndex + 2) % items.length]
  ].filter(Boolean);

  const currentItem = stack[0];
  const isShortlisted = shortlist.some(s => s.id === currentItem?.id || s.name === currentItem?.name);
  const isCompared = comparedItems.some(c => c.id === currentItem?.id);
  const comStatus = currentItem?.domains?.com?.status || 'checking';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px 60px',
      position: 'relative'
    }}>
      {/* Deck Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <button
          onClick={handlePrev}
          className="btn btn-outline"
          style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
          title="Previous Name"
        >
          <ChevronLeft style={{ width: '18px', height: '18px' }} />
        </button>

        <span style={{ fontSize: '13px', fontWeight: '800', fontFamily: 'var(--font-mono)', color: 'var(--text-black)' }}>
          {activeIndex + 1} / {items.length}
        </span>

        <button
          onClick={handleNext}
          className="btn btn-outline"
          style={{ width: '40px', height: '40px', borderRadius: '50%', padding: 0 }}
          title="Next Name"
        >
          <ChevronRight style={{ width: '18px', height: '18px' }} />
        </button>
      </div>

      {/* 3D Layered Card Stack (Directly from Reference Image 2!) */}
      <div style={{
        position: 'relative',
        width: '320px',
        height: '440px',
        perspective: '1000px'
      }}>
        {stack.slice().reverse().map((item, reverseIdx) => {
          const depth = stack.length - 1 - reverseIdx; // 0 is top, 1 is middle, 2 is back
          const isTop = depth === 0;

          // Perspective styling from Reference Image 2
          const translateY = depth * 22; // 0px, 22px, 44px
          const scale = 1 - depth * 0.05; // 1, 0.95, 0.90
          const zIndex = 10 - depth;
          const opacity = 1 - depth * 0.15;

          return (
            <div
              key={item.id || depth}
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                borderRadius: '28px',
                background: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: isTop
                  ? '0 24px 50px -10px rgba(0, 0, 0, 0.18), 0 8px 20px rgba(0, 0, 0, 0.06)'
                  : '0 16px 36px rgba(0, 0, 0, 0.1)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Gradient Image Area (Ref Image 2) */}
              <div style={{
                height: '240px',
                borderRadius: '20px',
                background: item.bgGradient,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
                boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)'
              }}>
                {/* Share Icon in Top Right (Ref Image 2) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => onOpenMockup(item)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#ffffff'
                    }}
                    title="Preview live brand mockup"
                  >
                    <ArrowUpRight style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>

                {/* Center Monogram Display */}
                <div style={{ textAlign: 'center' }}>
                  <span style={{
                    fontSize: '54px',
                    fontWeight: '900',
                    color: '#ffffff',
                    letterSpacing: '-0.04em',
                    textShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}>
                    {item.monogram}
                  </span>
                </div>

                {/* Archetype Pill Tag */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: 'rgba(0, 0, 0, 0.4)',
                    color: '#ffffff',
                    backdropFilter: 'blur(8px)'
                  }}>
                    {item.tag || item.archetype}
                  </span>
                </div>
              </div>

              {/* Bottom Details (Directly from Ref Image 2) */}
              <div style={{ padding: '12px 6px 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.03em', color: 'var(--text-black)' }}>
                      {item.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: item.domains?.com?.status === 'available' ? '#10b981' : '#94a3b8'
                      }}></span>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {item.slug}.com · {item.domains?.com?.status?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dark Action Pill: "+ Add to contacts" style (Ref Image 2) */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onToggleShortlist(item)}
                    className="btn btn-black"
                    style={{ flex: 1, fontSize: '12px', padding: '9px 14px' }}
                  >
                    <Bookmark style={{ width: '13px', height: '13px', fill: isShortlisted ? '#fff' : 'none' }} />
                    <span>{isShortlisted ? 'Saved to shortlist' : 'Save to shortlist'}</span>
                  </button>

                  <button
                    onClick={() => onToggleCompare(item)}
                    className="btn btn-outline"
                    style={{
                      padding: '9px 12px',
                      background: isCompared ? 'var(--color-matte-black)' : '#fff',
                      color: isCompared ? '#fff' : 'var(--text-black)'
                    }}
                    title="Compare"
                  >
                    <GitCompare style={{ width: '13px', height: '13px' }} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
