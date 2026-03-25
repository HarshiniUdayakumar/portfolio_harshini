
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NODES = [
  {
    company: 'STAXTECH', role: 'Full Stack Java Developer Intern', date: 'DEC 2025 – JAN 2026',
    desc: 'Developed web applications using Java, Spring Boot, REST APIs and MySQL. Built and tested backend services using Postman.',
    tags: ['JAVA', 'SPRING_BOOT', 'MYSQL', 'REST_API', 'POSTMAN'], accent: '#06B6D4', above: true,
  },
  {
    company: 'SMARTBRIDGE · AICTE & GOOGLE', role: 'ML Engineer Intern', date: 'SEP 2025 – OCT 2025',
    desc: 'Implemented end-to-end ML workflows: data preprocessing, model training, evaluation and optimization.',
    tags: ['PYTHON', 'MACHINE_LEARNING', 'DATA_SCIENCE', 'GOOGLE'], accent: '#7C3AED', above: false,
  },
  {
    company: 'EDUNET · AICTE & MICROSOFT', role: 'Artificial Intelligence Intern', date: 'APR 2025 – MAY 2025',
    desc: 'Explored AI tools and machine learning workflows under Microsoft Azure mentorship program.',
    tags: ['AI', 'ML', 'MICROSOFT_AZURE', 'AICTE'], accent: '#3B82F6', above: true,
  },
  {
    company: 'SKILLS4FUTURE · EDUNET & SHELL', role: 'AI & Data Analytics Intern', date: 'APR 2025',
    desc: 'Applied ML and data analytics techniques for sustainable development and industry use cases.',
    tags: ['DATA_ANALYTICS', 'ML', 'SUSTAINABILITY', 'SHELL'], accent: '#10B981', above: false,
  },
  {
    company: 'EDUNET FOUNDATION · AICTE', role: 'Cybersecurity Intern', date: 'FEB – MAR 2025',
    desc: 'Studied network security fundamentals, cryptography protocols and cybersecurity defense tools.',
    tags: ['CYBERSECURITY', 'CRYPTOGRAPHY', 'NETWORK_SEC'], accent: '#EF4444', above: true,
  },
];

const ExperienceSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section id="experience" style={{ position: 'relative', zIndex: 10, background: 'transparent', padding: '80px 0 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgba(6,182,212,0.5)', letterSpacing: '0.15em' }}>{'// MODULE_03 / MISSION.LOG'}</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginTop: 8 }}>EXPERIENCE TIMELINE</h2>
          <div style={{ width: '100%', height: 1, background: 'rgba(6,182,212,0.08)', marginTop: 16 }} />
        </div>
      </div>

      {isMobile ? (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #06B6D4, #7C3AED)' }} />
          {NODES.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ marginLeft: 44, marginBottom: 24, position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: -32, top: 12, width: 12, height: 12, borderRadius: '50%',
                background: node.accent, border: '2px solid #0B0F14', boxShadow: `0 0 12px ${node.accent}`,
              }} />
              <NodeCard node={node} />
            </motion.div>
          ))}
        </div>
      ) : (
        /* Desktop: Zig-zag alternating layout */
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          {/* Central vertical timeline line */}
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, #06B6D4, #7C3AED, #06B6D4)',
            opacity: 0.3,
          }} />

          {NODES.map((node, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingBottom: 40,
                  position: 'relative',
                }}
              >
                {/* Timeline node dot */}
                <div style={{
                  position: 'absolute', left: '50%', top: 20, transform: 'translateX(-50%)',
                  width: 14, height: 14, borderRadius: '50%', background: node.accent,
                  border: '3px solid #0B0F14', boxShadow: `0 0 16px ${node.accent}, 0 0 32px ${node.accent}44`,
                  zIndex: 2,
                }}>
                  <div style={{
                    position: 'absolute', inset: -8, borderRadius: '50%', border: `1px solid ${node.accent}`,
                    animation: 'pulseRing 2s infinite', opacity: 0.5,
                  }} />
                </div>

                {/* Connector line from dot to card */}
                <div style={{
                  position: 'absolute', top: 25, height: 2,
                  ...(isLeft
                    ? { left: 'calc(50% - 60px)', width: 60 }
                    : { right: 'calc(50% - 60px)', width: 60 }
                  ),
                  background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, ${node.accent}60, transparent)`,
                }} />

                {/* Card - takes up ~45% of width */}
                <div style={{ width: '44%' }}>
                  <NodeCard node={node} enhanced />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

const NodeCard = ({ node, enhanced }: { node: typeof NODES[0]; enhanced?: boolean }) => (
  <motion.div
    whileHover={{
      y: -4,
      boxShadow: `0 8px 40px ${node.accent}15, 0 0 0 1px ${node.accent}33`,
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    style={{
      borderRadius: 12, padding: 20,
      border: `1px solid ${node.accent}26`, background: 'rgba(13,17,23,0.85)',
      backdropFilter: enhanced ? 'blur(16px)' : undefined,
      boxShadow: enhanced ? `0 4px 24px ${node.accent}08` : undefined,
      transition: 'border-color 0.3s',
      position: 'relative', overflow: 'hidden',
    }}
  >
    {/* Subtle ambient glow */}
    {enhanced && (
      <div style={{
        position: 'absolute', top: -30, right: -30, width: 80, height: 80,
        background: `radial-gradient(circle, ${node.accent}0a 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
    )}
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 14, color: node.accent, letterSpacing: '0.12em',
      background: `${node.accent}1a`, padding: '3px 8px', borderRadius: 3, display: 'inline-block',
    }}>{node.company}</span>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#fff', marginTop: 8 }}>{node.role}</div>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: `${node.accent}80`, marginTop: 4 }}>{node.date}</div>
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6B7280', marginTop: 8, lineHeight: 1.7 }}>{node.desc}</p>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
      {node.tags.map(t => (
        <span key={t} style={{
          fontFamily: 'var(--font-mono)', fontSize: 14, border: `1px solid ${node.accent}33`,
          borderRadius: 3, padding: '2px 6px', color: `${node.accent}b3`,
        }}>{t}</span>
      ))}
    </div>
  </motion.div>
);

export default ExperienceSection;
