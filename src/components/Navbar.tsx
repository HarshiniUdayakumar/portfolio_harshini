import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = ['About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Achievements', 'Contact'];
const SECTION_IDS = ['about', 'skills', 'experience', 'projects', 'certifications', 'achievements', 'contact'];

const Navbar = () => {
  const [active, setActive] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActive(id);
      }, { threshold: 0.4 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -52, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: 52,
        background: 'rgba(11,15,20,0.92)', backdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(6,182,212,0.12)',
        boxShadow: '0 1px 0 rgba(6,182,212,0.06), 0 4px 24px rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: '#06B6D4',
          flexDirection: 'column', lineHeight: 1,
        }}>
          <span>H</span><span>U</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '0.06em' }}>HARSHINI U</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.08em' }}>Portfolio OS v2.6</div>
        </div>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 0, position: 'relative' }}>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item}
            onClick={() => scrollTo(SECTION_IDS[i])}
            style={{
              position: 'relative', padding: '6px 14px', fontSize: 15, fontFamily: 'var(--font-body)',
              fontWeight: 800, letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer',
              color: active === SECTION_IDS[i] ? '#E2E8F0' : '#4B5563', transition: 'color 0.2s',
            }}
            onMouseEnter={e => { if (active !== SECTION_IDS[i]) (e.target as HTMLElement).style.color = '#94A3B8'; }}
            onMouseLeave={e => { if (active !== SECTION_IDS[i]) (e.target as HTMLElement).style.color = '#4B5563'; }}
          >
            {item}
            {active === SECTION_IDS[i] && (
              <motion.div
                layoutId="navUnderline"
                style={{
                  position: 'absolute', bottom: -1, left: 14, right: 14, height: 1,
                  background: 'linear-gradient(90deg, #06B6D4, #7C3AED)',
                  boxShadow: '0 0 8px rgba(6,182,212,0.6)',
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Right status */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', animation: 'pulseGlow 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500,color: '#10B981', letterSpacing: '0.12em' }}>AVAILABLE</span>
        </div>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: '#4B5563' }}>v2.6.0</span>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />
        <button
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,border: '1px solid rgba(6,182,212,0.25)',
            padding: '4px 12px', borderRadius: 4, color: '#06B6D4', background: 'transparent',
            letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            (e.target as HTMLElement).style.background = 'rgba(6,182,212,0.08)';
            (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.5)';
          }}
          onMouseLeave={e => {
            (e.target as HTMLElement).style.background = 'transparent';
            (e.target as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)';
          }}
        >
          [ RESUME ]
        </button>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
      >
        <div style={{ width: 18, height: 2, background: '#06B6D4', marginBottom: 4, transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
        <div style={{ width: 18, height: 2, background: '#06B6D4', marginBottom: 4, opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
        <div style={{ width: 18, height: 2, background: '#06B6D4', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
            style={{
              position: 'absolute', top: 52, left: 0, right: 0,
              background: 'rgba(11,15,20,0.98)', borderBottom: '1px solid rgba(6,182,212,0.15)',
              padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8,
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(SECTION_IDS[i])}
                style={{
                  background: 'none', border: 'none', borderLeft: `2px solid ${active === SECTION_IDS[i] ? '#06B6D4' : 'rgba(6,182,212,0.15)'}`,
                  padding: '8px 16px', textAlign: 'left', fontFamily: 'var(--font-body)', fontSize: 13,
                  color: active === SECTION_IDS[i] ? '#E2E8F0' : '#4B5563', cursor: 'pointer',
                }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
