import React, { useState } from 'react';
import { X, Monitor, Smartphone, CreditCard, Radio } from 'lucide-react';

export default function BrandMockupModal({ item, onClose }) {
  const [activeTab, setActiveTab] = useState('saas');

  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bento-card animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
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
              <span style={{ fontSize: '19px', fontWeight: '900', color: 'var(--text-black)' }}>Brand Mockup Visualizer</span>
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: '999px',
                background: 'var(--color-matte-black)',
                color: 'var(--color-neon-lime)'
              }}>{item.name}</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Instant live preview of "{item.name}" across real-world brand surfaces
            </p>
          </div>

          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px', borderRadius: '50%', cursor: 'pointer' }}>
            <X style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '8px',
          padding: '12px 26px',
          background: '#f8f9fa',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('saas')}
            className={`chip ${activeTab === 'saas' ? 'active' : ''}`}
          >
            <Monitor style={{ width: '13px', height: '13px' }} />
            <span>SaaS Website Hero</span>
          </button>

          <button
            onClick={() => setActiveTab('app')}
            className={`chip ${activeTab === 'app' ? 'active' : ''}`}
          >
            <Smartphone style={{ width: '13px', height: '13px' }} />
            <span>Mobile App Icon</span>
          </button>

          <button
            onClick={() => setActiveTab('card')}
            className={`chip ${activeTab === 'card' ? 'active' : ''}`}
          >
            <CreditCard style={{ width: '13px', height: '13px' }} />
            <span>Luxury Business Card</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`chip ${activeTab === 'media' ? 'active' : ''}`}
          >
            <Radio style={{ width: '13px', height: '13px' }} />
            <span>Podcast Cover</span>
          </button>
        </div>

        {/* Canvas Body */}
        <div style={{
          padding: '36px',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '380px',
          background: 'var(--bg-canvas)'
        }}>
          {/* TAB 1: SaaS Hero Mockup */}
          {activeTab === 'saas' && (
            <div style={{
              width: '100%',
              maxWidth: '640px',
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              {/* Browser Chrome */}
              <div style={{
                background: '#f1f3f5',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderBottom: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                </div>
                <div style={{
                  flex: 1,
                  background: '#ffffff',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  border: '1px solid var(--border-subtle)'
                }}>
                  https://{item.slug}.com
                </div>
              </div>

              {/* Website Mock Content */}
              <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                  <div style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: item.bgGradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: '900',
                    fontSize: '13px'
                  }}>
                    {item.monogram}
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: 'var(--text-black)' }}>{item.name}</span>
                </div>

                <h2 style={{ fontSize: '30px', fontWeight: '900', letterSpacing: '-0.03em', color: 'var(--text-black)', marginBottom: '12px', lineHeight: 1.2 }}>
                  The modern standard for high-velocity creators.
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '460px', margin: '0 auto 24px', lineHeight: 1.5 }}>
                  {item.rationale}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button className="btn btn-black" style={{ fontSize: '13px', padding: '8px 18px' }}>
                    Get Started Free
                  </button>
                  <button className="btn btn-outline" style={{ fontSize: '13px', padding: '8px 18px' }}>
                    Live Interactive Demo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Mobile App Icon (Ref Image 2: Clean Squircle) */}
          {activeTab === 'app' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '130px',
                height: '130px',
                borderRadius: '30px',
                background: item.bgGradient,
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2), inset 0 2px 2px rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                <span style={{ fontSize: '46px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.04em' }}>
                  {item.monogram}
                </span>
              </div>
              <h4 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-black)', marginBottom: '4px' }}>
                {item.name}
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                iOS & Android 180×180 Squircle
              </p>
            </div>
          )}

          {/* TAB 3: Luxury Business Card */}
          {activeTab === 'card' && (
            <div style={{
              width: '420px',
              height: '240px',
              borderRadius: '20px',
              background: 'radial-gradient(circle at 80% 20%, #20242c 0%, #111215 100%)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 24px 50px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#ffffff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="font-serif" style={{ fontSize: '26px', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#cbd5e1', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>
                    {item.tag || 'Brand Studio'}
                  </p>
                </div>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--color-neon-lime)',
                  color: '#111215',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '900'
                }}>
                  ✦
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Founder & Creator</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>hello@{item.slug}.com</div>
                </div>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--color-neon-lime)', fontWeight: '700' }}>
                  {item.slug}.com
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Podcast Cover */}
          {activeTab === 'media' && (
            <div style={{
              width: '260px',
              height: '260px',
              borderRadius: '24px',
              background: item.bgGradient,
              padding: '26px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff'
            }}>
              <div style={{
                alignSelf: 'flex-start',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(8px)',
                fontSize: '10px',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}>
                Podcast Series
              </div>

              <div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: '800' }}>
                  THE
                </span>
                <h3 style={{ fontSize: '34px', fontWeight: '900', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>
                  New Episodes Weekly
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 26px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#ffffff'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Domain: <strong style={{ color: 'var(--text-black)' }}>{item.slug}.com</strong> ({item.domains?.com?.status?.toUpperCase()})
          </span>
          <button onClick={onClose} className="btn btn-black" style={{ fontSize: '13px', padding: '6px 18px' }}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
