import React, { useState } from 'react';
import { X, Bookmark, Copy, Download, Trash2, Check } from 'lucide-react';

export default function ShortlistDrawer({
  isOpen,
  onClose,
  shortlist = [],
  onRemoveFromShortlist,
  onClearShortlist
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyList = () => {
    if (shortlist.length === 0) return;
    const formatted = shortlist.map((item, idx) => {
      const status = item.domains?.com?.status?.toUpperCase() || 'UNKNOWN';
      return `${idx + 1}. ${item.name} (${item.slug}.com · ${status})\n   - Rationale: ${item.rationale}`;
    }).join('\n\n');

    navigator.clipboard.writeText(`NameFinder Shortlist:\n\n${formatted}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCsv = () => {
    if (shortlist.length === 0) return;
    const header = 'Name,Domain,COM_Status,Archetype,FitScore,Rationale\n';
    const rows = shortlist.map(item => {
      const status = item.domains?.com?.status || 'unknown';
      const cleanRationale = `"${(item.rationale || '').replace(/"/g, '""')}"`;
      return `${item.name},${item.slug}.com,${status},${item.archetype},${item.fitScore},${cleanRationale}`;
    }).join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namefinder-shortlist-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (shortlist.length === 0) return;
    const blob = new Blob([JSON.stringify(shortlist, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `namefinder-shortlist-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div
        className="drawer-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--color-matte-black)',
              color: 'var(--color-neon-lime)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bookmark style={{ width: '15px', height: '15px' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'var(--text-black)' }}>Saved Shortlist</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {shortlist.length} {shortlist.length === 1 ? 'candidate' : 'candidates'} bookmarked
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px', borderRadius: '50%', cursor: 'pointer' }}>
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* Action Toolbar */}
        {shortlist.length > 0 && (
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            background: '#f8f9fa',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={handleCopyList}
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '5px 12px' }}
            >
              {copied ? <Check style={{ width: '13px', height: '13px', color: '#10b981' }} /> : <Copy style={{ width: '13px', height: '13px' }} />}
              <span>{copied ? 'Copied!' : 'Copy List'}</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '5px 12px' }}
            >
              <Download style={{ width: '13px', height: '13px' }} />
              <span>CSV</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '5px 12px' }}
            >
              <Download style={{ width: '13px', height: '13px' }} />
              <span>JSON</span>
            </button>
          </div>
        )}

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {shortlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <Bookmark style={{ width: '32px', height: '32px', color: 'var(--text-faint)', margin: '0 auto 12px' }} />
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Your shortlist is empty.</p>
              <p style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                Click the "Save" button on any card to bookmark your finalists.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {shortlist.map((item) => {
                const comStatus = item.domains?.com?.status || 'checking';
                return (
                  <div
                    key={item.id}
                    className="bento-card"
                    style={{
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="brand-mark" style={{ width: '40px', height: '40px', fontSize: '15px', background: item.bgGradient }}>
                        {item.monogram}
                      </div>
                      <div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-black)' }}>
                          {item.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                            {item.slug}.com
                          </span>
                          <span style={{
                            fontSize: '9px',
                            fontWeight: '800',
                            padding: '1px 6px',
                            borderRadius: '999px',
                            background: comStatus === 'available' ? 'rgba(204, 255, 0, 0.3)' : '#f1f5f9',
                            color: comStatus === 'available' ? '#1a7f37' : '#94a3b8'
                          }}>
                            {comStatus.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveFromShortlist(item)}
                      className="btn-ghost"
                      style={{ padding: '6px', color: 'var(--text-faint)', cursor: 'pointer' }}
                      title="Remove from shortlist"
                    >
                      <Trash2 style={{ width: '15px', height: '15px' }} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {shortlist.length > 0 && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f8f9fa'
          }}>
            <button
              onClick={onClearShortlist}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-faint)',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
            <button onClick={onClose} className="btn btn-black" style={{ fontSize: '13px', padding: '6px 16px' }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
