import React from 'react';
import { X, Trophy, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CompareDrawer({
  isOpen,
  onClose,
  comparedItems = [],
  onRemoveFromCompare,
  onSelectWinner
}) {
  if (!isOpen) return null;

  const handleCrownWinner = (item) => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
    if (onSelectWinner) onSelectWinner(item);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bento-card animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#ffffff',
          boxShadow: '0 30px 70px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 26px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy style={{ width: '18px', height: '18px', color: '#f59e0b' }} />
              <span style={{ fontSize: '19px', fontWeight: '900', color: 'var(--text-black)' }}>Finalist Comparison Arena</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Head-to-head evaluation to crown your champion brand identity
            </p>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px', borderRadius: '50%', cursor: 'pointer' }}>
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '28px', overflowY: 'auto' }}>
          {comparedItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>No names selected for comparison yet.</p>
              <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>
                Click the "Compare" button on any 2 name cards to pit them head-to-head.
              </p>
            </div>
          ) : comparedItems.length === 1 ? (
            <div style={{ textAlign: 'center', padding: '30px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>
                You have selected <strong>"{comparedItems[0].name}"</strong>.
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>
                Select one more candidate to unlock the head-to-head showdown!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              {comparedItems.slice(0, 2).map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bento-card"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-strong)'
                  }}
                >
                  <div>
                    {/* Top Monogram + Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <div className="brand-mark" style={{ background: item.bgGradient }}>
                        {item.monogram}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '26px', fontWeight: '900', color: 'var(--text-black)' }}>
                          {item.name}
                        </h3>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {item.slug}.com
                        </span>
                      </div>
                    </div>

                    {/* Metrics Breakdown */}
                    <div style={{
                      background: '#f8f9fa',
                      borderRadius: '12px',
                      padding: '14px',
                      marginBottom: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Style Archetype:</span>
                        <strong style={{ color: 'var(--text-black)' }}>{item.archetype}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Cadence:</span>
                        <strong style={{ color: 'var(--text-black)' }}>{item.syllables} syl · {item.pronounceEase}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Brand Fit:</span>
                        <strong style={{ color: '#1a7f37' }}>{item.fitScore}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>.COM Availability:</span>
                        <strong style={{ color: item.domains?.com?.status === 'available' ? '#1a7f37' : 'var(--text-muted)' }}>
                          {item.domains?.com?.status?.toUpperCase()}
                        </strong>
                      </div>
                    </div>

                    {/* Brand Positioning */}
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                      {item.rationale}
                    </p>
                  </div>

                  {/* Crown Button */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleCrownWinner(item)}
                      className="btn btn-lime"
                      style={{ flex: 1, fontSize: '13px', padding: '9px 14px' }}
                    >
                      <Trophy style={{ width: '14px', height: '14px' }} />
                      <span>Crown Winner</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromCompare(item)}
                      className="btn btn-outline"
                      style={{ padding: '9px 12px' }}
                      title="Remove from comparison"
                    >
                      <X style={{ width: '14px', height: '14px' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 26px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: '#f8f9fa'
        }}>
          <button onClick={onClose} className="btn btn-black" style={{ fontSize: '13px', padding: '6px 18px' }}>
            Close Arena
          </button>
        </div>
      </div>
    </div>
  );
}
