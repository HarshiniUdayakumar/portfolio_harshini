import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACTS = [
  { cmd: '$ contact --email', val: 'harshiniu176@gmail.com', color: '#06B6D4' },
  { cmd: '$ contact --phone', val: '+91 9360621577', color: '#fff' },
  { cmd: '$ contact --linkedin', val: 'linkedin.com/in/harshiniudayakumar', color: '#60A5FA' },
  { cmd: '$ contact --github', val: 'github.com/HarshiniUdayakumar', color: '#fff' },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  const inputStyle = (): React.CSSProperties => ({
    width: '100%', background: 'rgba(6,182,212,0.03)', border: '1px solid rgba(6,182,212,0.1)',
    borderRadius: 8, padding: '10px 14px', color: '#E2E8F0', fontSize: 13, fontFamily: 'var(--font-body)',
    outline: 'none', transition: 'border 0.2s',
  });

  return (
    <section id="contact" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: '60px 0 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.15em' }}>{'// MODULE_07 / INITIATE.CONTACT'}</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginTop: 8 }}>Get In Touch</h2>
          <div style={{ width: '100%', height: 1, background: 'rgba(6,182,212,0.08)', marginTop: 16 }} />
        </div>

        <div style={{ display: 'grid', gap: 48 }} className="md:grid-cols-2 grid-cols-1">
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.15em' }}>{'// OPEN_TO_CONNECT'}</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#fff', margin: '12px 0' }}>Let's Build Something.</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#4B5563', lineHeight: 1.85, marginBottom: 24 }}>
              Open to internships, collaborations, and impactful opportunities. Based in Chennai — available globally.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  {CONTACTS.map(c => {
    const icon =
      c.cmd.includes('email') ? (
        <svg width="16" height="16" fill="#06B6D4" viewBox="0 0 24 24">
          <path d="M20 4H4a2 2 0 0 0-2 2v.01l10 6 10-6V6a2 2 0 0 0-2-2zm0 4.2-8 4.8-8-4.8V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.2z"/>
        </svg>
      ) : c.cmd.includes('phone') ? (
        <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.59.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.26.2 2.47.57 3.59a1 1 0 0 1-.25 1l-2.2 2.2z"/>
        </svg>
      ) : c.cmd.includes('linkedin') ? (
        <svg width="16" height="16" fill="#60A5FA" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.7v2.2h.07c.66-1.25 2.28-2.56 4.7-2.56 5.02 0 5.94 3.3 5.94 7.59V24h-5v-7.5c0-1.8-.03-4.12-2.5-4.12-2.5 0-2.88 1.95-2.88 3.98V24h-5V8z"/>
        </svg>
      ) : (
        <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.84 10.91.57.1.78-.25.78-.56v-2.17c-3.19.69-3.86-1.54-3.86-1.54-.52-1.31-1.28-1.66-1.28-1.66-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.63.23 2.83.11 3.13.75.81 1.2 1.84 1.2 3.1 0 4.43-2.68 5.4-5.24 5.69.41.35.77 1.04.77 2.1v3.12c0 .31.21.67.79.56A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/>
        </svg>
      );

    return (
      <motion.div
        key={c.cmd}
        whileHover={{ x: 8 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: 'var(--font-mono)',
          fontSize: 13
        }}
      >
        {icon}
        <span style={{ color: c.color }}>{c.val}</span>
      </motion.div>
    );
  })}
</div>

            
          </div>

          <div style={{
            background: 'rgba(13,17,23,0.8)', border: '1px solid rgba(6,182,212,0.12)',
            borderRadius: 14, padding: 28, backdropFilter: 'blur(16px)',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgba(6,182,212,0.4)', letterSpacing: '0.15em' }}>{'// NEW_MESSAGE'}</span>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} style={{ marginTop: 20 }}>
                  {[
                    { label: 'NAME', field: 'name', type: 'text', placeholder: 'Enter your name' },
                    { label: 'EMAIL', field: 'email', type: 'email', placeholder: 'Enter your email' },
                  ].map(f => (
                    <div key={f.field} style={{ marginBottom: 16 }}>
                      <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        <span style={{ color: '#06B6D4' }}>▸</span> {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.field as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.field]: e.target.value })}
                        style={inputStyle()}
                        onFocus={e => { e.target.style.borderColor = 'rgba(6,182,212,0.4)'; e.target.style.boxShadow = '0 0 0 3px rgba(6,182,212,0.06)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(6,182,212,0.1)'; e.target.style.boxShadow = 'none'; }}
                        required
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span style={{ color: '#06B6D4' }}>▸</span> MESSAGE
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Your message..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle(), resize: 'vertical' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(6,182,212,0.4)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(6,182,212,0.1)'; }}
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ boxShadow: '0 0 40px rgba(6,182,212,0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      width: '100%', padding: '12px', borderRadius: 8, marginTop: 4,
                      background: 'linear-gradient(135deg,#06B6D4 0%,#7C3AED 100%)',
                      color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14,
                      letterSpacing: '0.05em', border: 'none', cursor: 'pointer',
                      boxShadow: '0 0 24px rgba(6,182,212,0.15)',
                    }}
                    disabled={loading}
                  >
                    {loading ? 'SENDING...' : '[ SEND MESSAGE ]'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ marginTop: 40, textAlign: 'center', padding: '40px 0' }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#06B6D4' }}>{'// MESSAGE_SENT'}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#4B5563', marginTop: 4 }}>I'll get back to you soon.</div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(6,182,212,0.5)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 16 }}
                  >[ send_another ]</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
