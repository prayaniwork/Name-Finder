import React, { useState, useEffect } from 'react';
import { X, KeyRound, ExternalLink, Check } from 'lucide-react';
import { getStoredGeminiKey, setStoredGeminiKey } from '../services/geminiService';

export default function ApiKeyModal({ isOpen, onClose, onKeySaved }) {
  const [keyInput, setKeyInput] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setKeyInput(getStoredGeminiKey());
      setSavedNotice(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setStoredGeminiKey(keyInput);
    setSavedNotice(true);
    if (onKeySaved) onKeySaved(Boolean(keyInput.trim()));
    setTimeout(() => {
      onClose();
    }, 800);
  };

  const handleRemove = () => {
    setStoredGeminiKey('');
    setKeyInput('');
    if (onKeySaved) onKeySaved(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="bento-card animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '28px',
          background: '#ffffff',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.25)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound style={{ width: '18px', height: '18px', color: 'var(--text-black)' }} />
            <h3 style={{ fontSize: '19px', fontWeight: '900', color: 'var(--text-black)' }}>Google Gemini AI Key</h3>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '6px', cursor: 'pointer' }}>
            <X style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '18px' }}>
          Unlock semantic AI naming powered by Google Gemini 1.5 Flash. Your key stays stored in your local browser and is never sent to third-party servers.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
            API Key
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            style={{
              width: '100%',
              background: '#f8f9fa',
              border: '1px solid var(--border-strong)',
              borderRadius: '12px',
              padding: '12px 14px',
              fontSize: '14px',
              fontFamily: 'var(--font-mono)',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12px',
              color: 'var(--text-black)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'underline',
              fontWeight: '600'
            }}
          >
            <span>Get a free Gemini API key</span>
            <ExternalLink style={{ width: '11px', height: '11px' }} />
          </a>

          {keyInput && (
            <button
              onClick={handleRemove}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ef4444',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Remove key
            </button>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={onClose} className="btn btn-outline" style={{ fontSize: '13px', padding: '7px 16px' }}>
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-black" style={{ fontSize: '13px', padding: '7px 18px' }}>
            {savedNotice ? (
              <>
                <Check style={{ width: '14px', height: '14px', color: 'var(--color-neon-lime)' }} />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Key</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
