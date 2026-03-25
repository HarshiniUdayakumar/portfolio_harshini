import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROLES = [
  { text: 'Full Stack Developer', color: '#06B6D4' },
  { text: 'AI/ML Engineer', color: '#7C3AED' },
  { text: 'Cybersecurity Analyst', color: '#EF4444' },
  { text: 'UI/UX Designer', color: '#F59E0B' },
];

const PROFILE_INFO = [
  { value: '📍 Chennai, India', label: 'LOCATION' },
  { value: '🎓 REC 2024–2028', label: 'EDUCATION' },
  { value: '💼 Open to Opportunities', label: 'STATUS' },
  { value: '🔒 CGPA 8.69', label: 'ACADEMICS' },
];

const SKILLS_BARS = [
  { name: 'Full-Stack Development', pct: 88 },
  { name: 'AI / ML', pct: 85 },
  { name: 'Cybersecurity', pct: 82 },
  { name: 'UI/UX Design', pct: 78 },
  { name: 'Data Analytics', pct: 80 },
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmall(window.innerWidth < 480);
    };

    handleResize(); // initial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setRoleIndex(p => (p + 1) % ROLES.length), 2800);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 52,
        paddingBottom: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gap: isMobile ? 32 : 64,
        }}
        className="lg:grid-cols-2 grid-cols-1"
      >
        {/* LEFT SIDE */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: isMobile ? 'center' : 'flex-start',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem,5.5vw,5rem)',
              lineHeight: 1.1,
              background: 'linear-gradient(90deg,#E2E8F0,#06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            HARSHINI U
          </motion.h1>

          {/* ROLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
            <div style={{
              width: 3,
              height: 28,
              background: 'linear-gradient(to bottom, #06B6D4, #7C3AED)'
            }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontWeight: 600,
                  fontSize: 'clamp(1.1rem,2.5vw,1.8rem)',
                  color: ROLES[roleIndex].color,
                }}
              >
                {'> '} {ROLES[roleIndex].text}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PROFILE INFO */}
          <div style={{
            display: 'flex',
            gap: 12,
            marginTop: 24,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            {PROFILE_INFO.map(s => (
              <div key={s.label} style={{
                background: 'rgba(6,182,212,0.04)',
                border: '1px solid rgba(6,182,212,0.12)',
                borderRadius: 8,
                padding: '10px 14px',
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#E2E8F0' }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 9,
                  color: 'rgba(6,182,212,0.5)',
                  letterSpacing: '0.1em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* BIO */}
          <p style={{
            fontSize: isMobile ? 15 : 18,
            color: '#6B7280',
            lineHeight: 1.8,
            marginTop: 16,
            maxWidth: isMobile ? '100%' : 480,
            fontWeight: 700,
          }}>
            Computer Science student building intelligent systems and scalable applications,
            focused on AI/ML, full-stack development, and cybersecurity.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: '100%',
              maxWidth: 380,
              background: 'rgba(13,17,23,0.8)',
              border: '1px solid rgba(6,182,212,0.15)',
              borderRadius: 16,
              padding: 24,
              backdropFilter: 'blur(20px)',
            }}
          >

            {/* PROFILE IMAGE */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <img
                src="/profile.jpg"
                alt="profile"
                style={{
                  width: isMobile ? 110 : 140,
                  height: isMobile ? 110 : 140,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(6,182,212,0.3)',
                }}
              />
            </div>

            {/* BUTTONS */}
            <div style={{
              display: 'flex',
              gap: 10,
              justifyContent: 'center',
              marginBottom: 20,
              flexDirection: isSmall ? 'column' : 'row',
              alignItems: 'center'
            }}>
              <button
                style={{
                  background: '#06B6D4',
                  color: '#0B0F14',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                CONNECT
              </button>

              <button
                style={{
                  background: 'transparent',
                  color: '#06B6D4',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: '1px solid rgba(6,182,212,0.3)',
                  cursor: 'pointer',
                }}
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                VIEW PROJECTS
              </button>
            </div>

            {/* SKILLS */}
            <div>
              {SKILLS_BARS.map(s => (
                <div key={s.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: '#fff' }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: '#06B6D4' }}>{s.pct}%</span>
                  </div>

                  <div style={{
                    height: 4,
                    background: 'rgba(6,182,212,0.1)',
                    borderRadius: 9999,
                    overflow: 'hidden',
                    marginTop: 4
                  }}>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      style={{
                        width: `${s.pct}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg,#06B6D4,#7C3AED)',
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;