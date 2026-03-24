import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const LINES = [
  { text: '$ Initializing HARSHINI_U Portfolio System...', color: 'rgba(6,182,212,0.7)', delay: 0 },
  { text: '> Loading modules: [AI/ML] [FULLSTACK] [CYBERSEC] [UIUX]', color: '#94A3B8', delay: 600 },
  { text: '> Connecting to skill database...   ✓ Connected', color: '#10B981', delay: 1400 },
  { text: '> Verifying credentials...   ✓ CGPA: 8.69 / 10', color: '#10B981', delay: 2000 },
  { text: '> Loading experience: 5 internships found', color: '#94A3B8', delay: 2700 },
  { text: '> Running integrity check...   ✓ All systems nominal', color: '#10B981', delay: 3200 },
  { text: '$ System ready. Welcome to Harshini\'s Portfolio.', color: '#E2E8F0', delay: 3800, bold: true },
  { text: '', color: 'transparent', delay: 4400 },
  { text: '> Press ENTER or click below to access dashboard —', color: 'rgba(6,182,212,0.6)', delay: 4500 },
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
    }, 25);
    return () => clearInterval(iv);
  }, [text, startTime]);

  if (!text) return <div style={{ height: 16 }} />;

  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color, fontWeight: bold ? 500 : 400, lineHeight: 1.8 }}>
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
    timers.push(setTimeout(() => setShowProgress(true), 2000));
    timers.push(setTimeout(() => setShowButton(true), 5000));
    timers.push(setTimeout(() => onComplete(), 7000));

    // Progress counter
    const startP = Date.now();
    const piv = setInterval(() => {
      const elapsed = Date.now() - startP - 2000;
      if (elapsed < 0) return;
      const p = Math.min(100, (elapsed / 3500) * 100);
      setProgress(Math.round(p));
    }, 50);

    return () => { timers.forEach(clearTimeout); clearInterval(piv); };
  }, [onComplete]);

  const handleEnter = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Enter') handleEnter(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleEnter]);

  return (
    <motion.div
      exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.99 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0B0F14', fontFamily: 'var(--font-mono)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'auto',
      }}
    >
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 32,
        background: 'rgba(13,17,23,0.9)', borderBottom: '1px solid rgba(6,182,212,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(6,182,212,0.6)', letterSpacing: '0.1em' }}>
          HARSHINI_U_PORTFOLIO v2.6.0
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
        </div>
      </div>

      {/* Terminal window */}
      <div style={{
        width: 700, maxWidth: '90vw',
        background: 'rgba(13,17,23,0.9)',
        border: '1px solid rgba(6,182,212,0.2)',
        borderRadius: 12, overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          height: 36, background: 'rgba(6,182,212,0.04)',
          borderBottom: '1px solid rgba(6,182,212,0.1)',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: 11, color: 'rgba(6,182,212,0.5)', margin: '0 auto' }}>
            terminal — harshini@portfolio:~
          </span>
        </div>
        {/* Body */}
        <div style={{ padding: 24, minHeight: 320 }}>
          {visibleLines.map(i => (
            <TypingLine key={i} text={LINES[i].text} color={LINES[i].color} startTime={LINES[i].delay} bold={(LINES[i] as any).bold} />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {showProgress && (
        <div style={{ width: 700, maxWidth: '90vw', marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(6,182,212,0.5)' }}>LOADING PORTFOLIO</span>
            <span style={{ fontSize: 10, color: '#06B6D4', fontFamily: 'var(--font-mono)' }}>{progress}%</span>
          </div>
          <div style={{ width: '100%', height: 2, background: 'rgba(6,182,212,0.1)', borderRadius: 9999, overflow: 'hidden' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(90deg,#06B6D4,#7C3AED)',
                transformOrigin: 'left',
              }}
            />
          </div>
        </div>
      )}

      {/* Enter button */}
      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleEnter}
          style={{
            marginTop: 32, border: '1px solid rgba(6,182,212,0.3)',
            padding: '10px 32px', borderRadius: 4,
            fontFamily: 'var(--font-mono)', fontSize: 13, color: '#06B6D4',
            letterSpacing: '0.15em', cursor: 'pointer', background: 'transparent',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'rgba(6,182,212,0.06)';
            (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.6)';
            (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(6,182,212,0.15)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'transparent';
            (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.3)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {'> ACCESS DASHBOARD'}
          <span style={{ animation: 'blink 0.6s step-end infinite' }}>_</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default BootScreen;
