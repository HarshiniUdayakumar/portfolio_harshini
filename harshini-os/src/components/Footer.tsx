const Footer = () => (
  <footer style={{
    position: 'relative', zIndex: 10, background: 'transparent',
    borderTop: '1px solid rgba(6,182,212,0.08)', padding: '40px 0',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}
      className="md:flex-row flex-col md:text-left text-center"
    >
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 9, color: '#06B6D4',
          flexDirection: 'column', lineHeight: 1,
        }}>
          <span>H</span><span>U</span>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: '#fff' }}>HARSHINI U</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.35)', marginTop: 2 }}>harshini_u@portfolio_os</div>
        </div>
      </div>

      {/* Center */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#374151' }}>Designed & Engineered by Harshini U · 2026</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.2)', marginTop: 2 }}>B.E Computer Science · REC Chennai</div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
        >↑ back_to_top</button>
      </div>
    </div>
  </footer>
);

export default Footer;
