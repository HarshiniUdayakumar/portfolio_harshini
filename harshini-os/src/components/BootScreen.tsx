import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const LINES = [
  { text: '$ Initializing HARSHINI_U System...', color: 'rgba(6,182,212,0.7)', delay: 0 },

  { text: '> Loading Core Modules: AI/ML • Full-Stack • Cybersecurity', color: '#94A3B8', delay: 700 },

  { text: '> Syncing Experience & Projects...   ✓ Ready', color: '#10B981', delay: 1400 },

  { text: '> Verifying Profile...   ✓ Authenticated', color: '#10B981', delay: 2000 },

  { text: '$ System Ready — Welcome.', color: '#E2E8F0', delay: 2600, bold: true },

  { text: '', color: 'transparent', delay: 3000 },

  { text: '> Press ENTER to access system —', color: 'rgba(6,182,212,0.6)', delay: 3200 },
];

const TypingLine = ({ text, color, startTime, bold }: { text: string; color: string; startTime: number; bold?: boolean }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) { setDone(true); return; }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(iv); setDone(true); }
    }, 20);
    return () => clearInterval(iv);
  }, [text, startTime]);

  if (!text) return <div style={{ height: 16 }} />;

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color,
      fontWeight: bold ? 500 : 400,
      lineHeight: 1.8
    }}>
      {displayed}
      {!done && <span style={{ animation: 'blink 0.6s step-end infinite' }}>█</span>}
    </div>
  );
};

const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(prev => [...prev, i]), line.delay));
    });

    timers.push(setTimeout(() => setShowProgress(true), 1200));
    timers.push(setTimeout(() => setShowButton(true), 3500));
    timers.push(setTimeout(() => onComplete(), 5000));

    const startP = Date.now();
    const piv = setInterval(() => {
      const elapsed = Date.now() - startP - 1200;
      if (elapsed < 0) return;
      const p = Math.min(100, (elapsed / 2500) * 100);
      setProgress(Math.round(p));
    }, 50);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(piv);
    };
  }, [onComplete]);

  const handleEnter = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleEnter();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleEnter]);

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.99 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        fontFamily: 'var(--font-mono)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'auto',

        // 🔥 Premium Background
        background: `
          radial-gradient(circle at 20% 30%, rgba(124,58,237,0.15), transparent 40%),
          radial-gradient(circle at 80% 70%, rgba(6,182,212,0.15), transparent 40%),
          linear-gradient(135deg, #05070A 0%, #0B0F14 40%, #05070A 100%)
        `,
      }}
    >
      {/* Grid Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none'
      }} />

      {/* Top bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 32,
        background: 'rgba(13,17,23,0.9)',
        borderBottom: '1px solid rgba(6,182,212,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(6,182,212,0.6)', letterSpacing: '0.1em' }}>
          HARSHINI_U_PORTFOLIO v3.0
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
        </div>
      </div>

      {/* Terminal */}
      <div style={{
        width: 700,
        maxWidth: '90vw',
        background: 'rgba(13,17,23,0.9)',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: 12,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          height: 36,
          background: 'rgba(6,182,212,0.05)',
          borderBottom: '1px solid rgba(6,182,212,0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(6,182,212,0.5)', margin: '0 auto' }}>
            terminal — harshini@portfolio:~
          </span>
        </div>

        <div style={{ padding: 24, minHeight: 280 }}>
          {visibleLines.map(i => (
            <TypingLine
              key={i}
              text={LINES[i].text}
              color={LINES[i].color}
              startTime={LINES[i].delay}
              bold={(LINES[i] as any).bold}
            />
          ))}
        </div>
      </div>

      {/* Progress */}
      {showProgress && (
        <div style={{ width: 700, maxWidth: '90vw', marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(6,182,212,0.5)' }}>
              LOADING SYSTEM
            </span>
            <span style={{ fontSize: 10, color: '#06B6D4' }}>{progress}%</span>
          </div>

          <div style={{
            width: '100%',
            height: 2,
            background: 'rgba(6,182,212,0.1)',
            borderRadius: 9999,
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.5, ease: 'easeInOut' }}
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg,#06B6D4,#7C3AED)',
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      )}

      {/* Button */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleEnter}
          style={{
            marginTop: 32,
            border: '1px solid rgba(6,182,212,0.3)',
            padding: '10px 32px',
            borderRadius: 4,
            fontSize: 13,
            color: '#06B6D4',
            letterSpacing: '0.15em',
            cursor: 'pointer',
            background: 'transparent',
          }}
        >
          {'> ACCESS SYSTEM'}
          <span style={{ animation: 'blink 0.6s step-end infinite' }}>_</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default BootScreen; 